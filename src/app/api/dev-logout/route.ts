import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DEV_LOGIN } from "@/lib/dev-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(DEV_LOGIN.cookieName);
  return NextResponse.json({ ok: true });
}
