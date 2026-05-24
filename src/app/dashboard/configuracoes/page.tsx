import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SettingsPanel } from "@/components/settings-panel";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { createClient } from "@/lib/supabase/server";
import { getDisplayName } from "@/lib/user-identity";
import styles from "../account.module.css";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !devSession) redirect("/login");

  const email = user?.email ?? DEV_LOGIN.email;
  const userName = getDisplayName(email);

  return (
    <StudentShell activeHref="/dashboard" userEmail={email} userName={userName}>
      <section className={styles.page}>
        <div className={styles.header}>
          <h1>Configuracoes</h1>
          <p>
            Um painel simples para controlar notificacoes, preferencias e pequenos ajustes da sua area de
            membros.
          </p>
        </div>

        <SettingsPanel />
      </section>
    </StudentShell>
  );
}
