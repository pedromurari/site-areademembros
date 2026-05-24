import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DEV_LOGIN } from "@/lib/dev-auth";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (
    email?.toLowerCase() !== DEV_LOGIN.email ||
    password !== DEV_LOGIN.password
  ) {
    return NextResponse.json(
      { error: "Credenciais invalidas." },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(DEV_LOGIN.cookieName, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
