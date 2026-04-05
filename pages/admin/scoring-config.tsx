import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Nav from "@/src/components/Nav";
import { verifyToken } from "@/src/lib/jwt";
import { ArrowLeft, Save } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ConfigRow {
  id: number;
  category: string;
  weight: number;
  enabled: boolean;
  updated_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  open_source: "Open Source",
  internships: "Internships",
  projects: "Projects",
  hackathons: "Hackathons",
  research: "Research",
  cp_platform: "CP Platform Rating",
  cp_competitions: "CP Competitions",
  skills: "Skills",
  cgpa: "CGPA",
};

export async function getServerSideProps(context: any) {
  const { req } = context;
  const token = req.cookies?.session;
  if (!token) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  const payload = verifyToken(token);
  const role =
    payload && typeof payload === "object" && typeof payload.role === "string"
      ? payload.role
      : "user";
  if (role !== "admin") {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: { jwtToken: token } };
}

export default function ScoringConfigPage({
  jwtToken,
}: {
  jwtToken: string;
}) {
  const [configs, setConfigs] = useState<ConfigRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const fetchConfigs = async () => {
    try {
      const res = await fetch("/api/admin/scoringConfig", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const json = await res.json();
      if (json.success) {
        setConfigs(json.data);
      } else {
        toast.error(json.error || "Failed to load config");
      }
    } catch {
      toast.error("Network error loading config");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const totalWeight = configs
    .filter((c) => c.enabled)
    .reduce((sum, c) => sum + Number(c.weight), 0);

  const updateWeight = (category: string, value: string) => {
    const num = Number(value);
    if (value !== "" && (isNaN(num) || num < 1 || num > 100)) return;
    setConfigs((prev) =>
      prev.map((c) =>
        c.category === category ? { ...c, weight: value === "" ? 0 : num } : c
      )
    );
    setDirty(true);
  };

  const toggleEnabled = (category: string) => {
    setConfigs((prev) =>
      prev.map((c) =>
        c.category === category ? { ...c, enabled: !c.enabled } : c
      )
    );
    setDirty(true);
  };

  const handleSave = async () => {
    // Validate all weights before saving
    for (const c of configs) {
      if (c.weight <= 0 || c.weight > 100) {
        toast.error(
          `Weight for ${CATEGORY_LABELS[c.category] || c.category} must be between 1 and 100`
        );
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/scoringConfig", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          configs: configs.map((c) => ({
            category: c.category,
            weight: c.weight,
            enabled: c.enabled,
          })),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setConfigs(json.data);
        setDirty(false);
        toast.success(`Weights saved! Total: ${json.totalWeight}%`);
      } else {
        toast.error(json.error || "Failed to save");
      }
    } catch {
      toast.error("Network error saving config");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="bg-white min-h-screen pt-32">
        <div className="p-10 max-w-screen-md mx-auto">
          <Button asChild variant="outline" className="mb-4">
              <Link
                href="/admin/"
                className="flex items-center gap-2 font-sans"
              >
                <ArrowLeft className="size-4" /> Back to Applications
              </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Scoring Configuration</CardTitle>
              <CardDescription className="text-base text-gray-700">
                Adjust category weights and enable/disable scoring categories.
                Changes affect all future scoring. Previously scored
                applications keep their old scores until re-scored.
              </CardDescription>
            </CardHeader>

            <CardContent className="font-sans">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                      <thead className="border-b">
                        <tr>
                          <th className="py-2 pr-4">Enabled</th>
                          <th className="py-2 pr-4">Category</th>
                          <th className="py-2 pr-4">Weight (%)</th>
                          <th className="py-2">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {configs.map((c) => (
                          <tr
                            key={c.category}
                            className={`border-b ${!c.enabled ? "opacity-50" : ""}`}
                          >
                            <td className="py-2 pr-4">
                              <Checkbox
                                checked={c.enabled}
                                onCheckedChange={() =>
                                  toggleEnabled(c.category)
                                }
                              />
                            </td>
                            <td className="py-2 pr-4 font-medium">
                              {CATEGORY_LABELS[c.category] || c.category}
                            </td>
                            <td className="py-2 pr-4">
                              <Input
                                type="number"
                                min={1}
                                max={100}
                                value={c.weight}
                                onChange={(e) =>
                                  updateWeight(c.category, e.target.value)
                                }
                                className="w-20"
                                disabled={!c.enabled}
                              />
                            </td>
                            <td className="py-2 text-xs text-gray-500" suppressHydrationWarning>
                              {new Date(c.updated_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Total weight summary */}
                  <div className="mt-4 flex items-center justify-between px-1">
                    <div>
                      <span className="font-medium">Total Weight: </span>
                      <span
                        className={`font-bold ${
                          totalWeight === 180
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {totalWeight}%
                      </span>
                      {totalWeight !== 180 && (
                        <span className="text-xs text-gray-500 ml-2">
                          (default: 180%)
                        </span>
                      )}
                    </div>

                    <Button
                      onClick={handleSave}
                      disabled={saving || !dirty}
                      className="font-sans"
                    >
                      <Save className="size-4 mr-2" />
                      {saving ? "Saving..." : "Save Weights"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
