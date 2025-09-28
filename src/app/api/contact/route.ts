import { NextResponse } from "next/server";

const EMAIL_REGEX = /.+@.+\..+/;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  if (!payload.name || !payload.email || !payload.message || !EMAIL_REGEX.test(payload.email)) {

    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  // Simulated delivery. Integrate with an email provider or CRM in production.

  console.log("Incoming contact request", payload);

  return NextResponse.json({ success: true });
}
