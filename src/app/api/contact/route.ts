import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{8,20}$/;

type ContactPayload = {
  companyName?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function normalizePhone(value: string) {
  const digits = value.replace(/[\s\-()]/g, "").replace(/\+/g, "");
  if (!digits) {
    return "";
  }
  return `+${digits}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch (error) {
    console.error("Invalid contact payload", error);
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const companyName = (payload.companyName ?? "").trim();
  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (companyName.length < 2) {
    return NextResponse.json({ ok: false, error: "Company name must be at least 2 characters." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  if (!PHONE_REGEX.test(phone)) {
    return NextResponse.json({ ok: false, error: "Enter a valid phone number." }, { status: 400 });
  }

  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 20) {
    return NextResponse.json({ ok: false, error: "Phone number must be between 8 and 20 digits." }, { status: 400 });
  }

  if (message.length < 5) {
    return NextResponse.json({ ok: false, error: "Message must be at least 5 characters." }, { status: 400 });
  }

  const normalizedPhone = normalizePhone(phone);
  if (!normalizedPhone) {
    return NextResponse.json({ ok: false, error: "Enter a valid phone number." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return NextResponse.json({ ok: false, error: "Email service is unavailable." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const html = `
    <table style="width:100%;max-width:600px;border-collapse:collapse;font-family:Arial,sans-serif;">
      <tbody>
        <tr>
          <td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;">Company name</td>
          <td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(companyName)}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;">Email</td>
          <td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;">Phone</td>
          <td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(normalizedPhone)}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #e2e8f0;font-weight:600;vertical-align:top;">Message</td>
          <td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(message).replace(/\n/g, "<br />")}</td>
        </tr>
      </tbody>
    </table>
  `;

  const { data, error } = await resend.emails.send({
    from: "5SOLO Resume <noreply@resume.5solo.com>",
    to: ["m0504471533@gmail.com"],
    subject: `Resume contact from ${companyName}`,
    html
  });

  if (error) {
    console.error("Resend error", error);
    return NextResponse.json({ ok: false, error: "Unable to send message at this time." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data?.id ?? "" });
}
