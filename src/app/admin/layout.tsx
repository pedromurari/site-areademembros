import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { resolvePortalAccess } from "@/lib/portal-access";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !devSession) {
    redirect("/login");
  }

  const email = user?.email ?? DEV_LOGIN.email;
  const access = await resolvePortalAccess(supabase, email);

  if (!access.canAccessAdmin) {
    redirect("/dashboard");
  }

  return children;
}
