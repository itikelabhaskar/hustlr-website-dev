import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { verifyToken } from "@/src/lib/jwt";
import { supabaseAdmin } from "@/src/lib/supabase-admin";
import { ApplicationStatus } from "@/src/lib/schemas/formSchema";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.headers.cookie || "";
  const { session } = parse(cookies);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const decoded = verifyToken(session);
  const email = typeof decoded === "string" ? null : decoded.email;

  if (!email) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  const { data, error } = await supabaseAdmin
    .from("vettingapplications")
    .select("status")
    .eq("email", email)
    .single();

  if (error || !data) {
    return res.status(404).json({ status: "not_found", email });
  }

  const status: ApplicationStatus = data.status;
  // if (data.isComplete && data.isAccepted && !data.isUnderReview)
  //   status = "accepted";
  // else if (data.isComplete && data.isRejected && !data.isUnderReview)
  //   status = "rejected";
  // console.log(status);
  return res.status(200).json({ status, email });
}
