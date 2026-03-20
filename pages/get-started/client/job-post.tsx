import Head from "next/head";
import { FormEvent, useState } from "react";
import Nav from "@/src/components/Nav";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

type SkillItem = {
  name: string;
  level: SkillLevel;
};

const PROJECT_CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "AI/ML",
];

const LEVEL_OPTIONS: SkillLevel[] = ["Beginner", "Intermediate", "Advanced"];

export default function ClientJobPostPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [timelineEstimate, setTimelineEstimate] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel | "">("");
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function addSkill() {
    const normalized = skillInput.trim();
    if (!normalized) {
      toast.error("Please enter a skill name.");
      return;
    }

    if (!skillLevel) {
      toast.error("Please choose a proficiency level.");
      return;
    }

    const alreadyExists = skills.some(
      (skill) => skill.name.toLowerCase() === normalized.toLowerCase(),
    );
    if (alreadyExists) {
      toast.error("This skill is already added.");
      return;
    }

    setSkills((prev) => [...prev, { name: normalized, level: skillLevel }]);
    setSkillInput("");
    setSkillLevel("");
  }

  function removeSkill(index: number) {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }

  function validateStepOne() {
    if (!title.trim()) return "Project Title is required.";
    if (title.trim().length < 5) return "Project Title should be at least 5 characters.";

    if (!category) return "Please select a Project Category.";

    if (!description.trim()) return "Project Description is required.";
    if (description.trim().length < 40) {
      return "Project Description should have enough detail (at least 40 characters).";
    }

    if (!skills.length) return "Please add at least one required skill.";

    return null;
  }

  function validateStepTwo() {
    if (!timelineEstimate.trim()) {
      return "Please enter the estimated timeline (for example: 2 months or 3 weeks).";
    }

    if (!deliverables.trim()) return "Please add expected deliverables.";
    if (deliverables.trim().length < 20) {
      return "Deliverables should be at least 20 characters.";
    }

    return null;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (step === 1) {
      const validationError = validateStepOne();
      if (validationError) {
        toast.error(validationError);
        return;
      }

      setStep(2);
      return;
    }

    const validationError = validateStepTwo();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    toast.success("Project draft created successfully. Preview is ready.");
    setIsSubmitting(false);
  }

  return (
    <>
      <Head>
        <title>Create Job Post - Hustlr</title>
      </Head>

      <Nav />

      <main className="min-h-screen bg-[#f4f4f4] pt-16 md:pt-20">
        <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 md:px-14 lg:px-20">
          <div
            className={`grid grid-cols-1 gap-10 ${
              step === 1 ? "md:grid-cols-[minmax(0,1fr)_420px]" : ""
            }`}
          >
            <div className="w-full max-w-3xl font-ovo text-black">
              <h1 className="font-serif text-4xl font-normal tracking-tight text-black/90">
                Post Your First Project
              </h1>
              <p className="mt-3 text-[1.2rem] font-semibold text-[#58b7ba]">
                Describe the project you want help with. We&apos;ll recommend the best student talent for the job.
              </p>
              <form onSubmit={onSubmit} className="mt-10 space-y-8">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-black">Project Title</label>
                      <p className="text-[11px] text-[#7e8f4f]">
                        Keep the title clear and specific so students understand the project quickly.
                      </p>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-9 rounded-md border border-black/20 bg-[#e9e9e9] text-sm font-sans text-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-black">Project Category</label>
                      <p className="text-[11px] text-[#7e8f4f]">
                        This helps us match your project with students who have expertise in this area.
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="h-9 w-full rounded-md border border-black/20 bg-[#e9e9e9] text-sm font-sans text-black sm:w-[180px]">
                            <SelectValue placeholder="project category" />
                          </SelectTrigger>
                          <SelectContent>
                            {PROJECT_CATEGORIES.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-black">Project Description</label>
                      <p className="text-[11px] text-[#7e8f4f]">
                        Clear project descriptions attract better students.
                      </p>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        placeholder={`Describe the project in detail.\n\nExample:\nWe are looking for a student developer to build a responsive landing page for our startup. The page should include a hero section, product overview, pricing section, and contact form. Students should be comfortable working with React and Tailwind CSS.`}
                        className="min-h-[110px] resize-none rounded-md border border-black/20 bg-[#e9e9e9] py-2 text-sm font-sans text-black"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-black">Required Skills</label>
                      <p className="text-[11px] text-[#7e8f4f]">
                        Add the skills and minimum experience level students should have for this project.
                      </p>

                      {!!skills.length && (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <div
                              key={`${skill.name}-${index}`}
                              className="inline-flex items-center gap-2 rounded-md bg-[#58b7ba]/25 px-3 py-1 text-xs font-semibold text-black"
                            >
                              <span>{skill.name}</span>
                              <span className="text-black/55">{skill.level}</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="rounded p-[1px] text-black/60 transition-colors hover:bg-black/10 hover:text-black"
                                aria-label={`Remove ${skill.name}`}
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex flex-1 items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={addSkill}
                            className="h-9 rounded-md border border-black/15 bg-[#e9e9e9] px-2 text-black hover:bg-[#dcdcdc]"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Input
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            placeholder="Add Skill"
                            className="h-9 rounded-md border border-black/20 bg-[#e9e9e9] text-sm font-sans text-black"
                          />
                        </div>

                        <Select
                          value={skillLevel}
                          onValueChange={(value) => setSkillLevel(value as SkillLevel)}
                        >
                          <SelectTrigger className="h-9 w-full rounded-md border border-black/20 bg-[#e9e9e9] text-sm font-sans text-black sm:w-[190px]">
                            <SelectValue placeholder="Choose Proficiency" />
                          </SelectTrigger>
                          <SelectContent>
                            {LEVEL_OPTIONS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="h-10 rounded-lg bg-black px-8 text-sm text-white hover:bg-black/90"
                      >
                        Continue to Timeline
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="block text-2xl font-semibold text-black">Timeline</label>
                      <p className="text-[11px] text-[#7e8f4f]">
                        Choose the approximate time needed to complete the project.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-black">Weeks</label>
                      <Input
                        value={timelineEstimate}
                        onChange={(e) => setTimelineEstimate(e.target.value)}
                        placeholder="e.g. 2 months or 3 weeks"
                        className="h-9 w-[120px] rounded-md border border-black/20 bg-[#e9e9e9] text-sm font-sans text-black"
                      />
                      <p className="text-[11px] text-[#58b7ba]">
                        Calculate the duration: eg 2 months or 3 weeks
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-2xl font-semibold text-black">Deliverables</label>
                      <p className="text-[11px] text-[#7e8f4f]">
                        List what the final outcome of the project should include.
                      </p>
                      <Textarea
                        value={deliverables}
                        onChange={(e) => setDeliverables(e.target.value)}
                        rows={5}
                        placeholder={`Example:\n- Fully responsive landing page\n- Clean codebase\n- Deployment on Vercel`}
                        className="min-h-[110px] resize-none rounded-md border border-black/20 bg-[#e9e9e9] py-2 text-sm font-sans text-black"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-8">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setStep(1)}
                        className="h-10 rounded-lg border border-black/20 px-6 text-sm text-black hover:bg-black/5"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-10 rounded-lg bg-black px-8 text-sm text-white hover:bg-black/90"
                      >
                        {isSubmitting ? "Please wait..." : "Preview Project"}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </div>

            {step === 1 && (
              <aside className="relative h-fit w-full rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] bg-[#b9cc84] px-8 py-6 font-sans text-[16px] font-medium leading-[1.24] text-[#5d742d] md:mt-8 md:w-[385px] md:justify-self-end before:absolute before:-left-[26px] before:top-0 before:h-[26px] before:w-[26px] before:translate-x-px before:bg-[#b9cc84] before:[clip-path:polygon(100%_0,100%_100%,0_0)] before:content-['']">
                Our AI Job Post Helper will optimize your job post for tone, grammar, and phrasing. Fill in the basic details and leave the rest to us!
              </aside>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
