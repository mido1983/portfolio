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
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  // Имитация отправки. В production интегрировать с внешним сервисом.
  console.log("Incoming contact request", payload);

  return NextResponse.json({ success: true });
}
