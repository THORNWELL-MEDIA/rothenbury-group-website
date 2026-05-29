import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, linkedin, resumeUrl, whyYou, referral, role } = body;

    if (!firstName || !lastName || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Careers Portal <onboarding@resend.dev>",
      to: ["careers@rothenbury.com"],
      replyTo: email,
      subject: `New Application: ${role} — ${firstName} ${lastName}`,
      html: `
        <h2>New Job Application — Rothenbury Group</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Role</td><td style="padding:8px;border-bottom:1px solid #eee">${role}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">${phone || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">LinkedIn</td><td style="padding:8px;border-bottom:1px solid #eee">${linkedin ? `<a href="${linkedin}">${linkedin}</a>` : "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Resume</td><td style="padding:8px;border-bottom:1px solid #eee">${resumeUrl ? `<a href="${resumeUrl}">${resumeUrl}</a>` : "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Why this role</td><td style="padding:8px;border-bottom:1px solid #eee">${whyYou || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">How they heard</td><td style="padding:8px">${referral || "Not provided"}</td></tr>
        </table>
        <p style="margin-top:24px;color:#666;font-size:12px">Sent from rothenbury.com/careers</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
