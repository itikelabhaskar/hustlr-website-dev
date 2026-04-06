import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/src/lib/jwt";
import { supabaseAdmin } from "@/src/lib/supabase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { path } = req.query;
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];
  let email: string;

  try {
    const payload = verifyToken(token);
    email = typeof payload === "string" ? "" : payload.email;
    if (!email) throw new Error("Invalid JWT payload");
  } catch (err: unknown) {
    if (err) console.error(err); return res.status(401).json({ error: "Invalid or expired token" });
  }

  const filePath = path as string;
  if (!filePath) {
    return res.status(404).json({ error: "Forbidden: No such file exists" });
  }

  if (!filePath.includes(email)) {
    return res
      .status(403)
      .json({ error: "Forbidden: file path does not match user" });
  }

  try {
    const filename = filePath.split("/").pop();
    const folderPath = filePath.split("/").slice(0, -1).join("/");

    const { data: metadata } = await supabaseAdmin.storage
      .from("vetting-files-storage")
      .list(folderPath, { search: filename });

    const { data: signedUrlData } = await supabaseAdmin.storage
      .from("vetting-files-storage")
      .createSignedUrl(filePath, 60 * 60); // 1 hour

    if (!signedUrlData?.signedUrl || !metadata?.[0]) {
      return res.status(404).json({ error: "File not found" });
    }

    return res.status(200).json({
      success: true,
      file: {
        url: signedUrlData.signedUrl,
        name: metadata[0].name,
        size: Number(metadata[0].metadata?.size) || 0,
      },
    });
  } catch (err: unknown) {
    if(err) console.error("Error in getFileMeta:", err);
    return res.status(500).json({ error: "Failed to retrieve file metadata" });
  }
}
