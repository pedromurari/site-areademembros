import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { createClient } from "@/lib/supabase/server";
import { getDisplayName } from "@/lib/user-identity";
import styles from "../account.module.css";

const platforms = [
  {
    title: "Portal do Aluno",
    label: "Area principal",
    description: "Seu ambiente principal para acompanhar aulas, certificados, replays e materiais.",
    href: "/dashboard",
  },
  {
    title: "Painel Administrativo",
    label: "Operacao IDM",
    description: "Acesso para organizar cursos, banners, membros, certificados e configuracoes da plataforma.",
    href: "/admin",
  },
  {
    title: "Curso Gratuito #36",
    label: "Entrada da campanha",
    description: "Atalho direto para a trilha gratuita de Psicanalise Integrativa com bonus do fundador.",
    href: "/dashboard/curso/psicanalise-integrativa-gratuita-36",
  },
];

export default async function PlatformsPage() {
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
          <h1>Minhas Plataformas</h1>
          <p>Atalhos simples para os ambientes que voce usa hoje dentro da operacao e da area de membros do IDM.</p>
        </div>

        <div className={styles.platformGrid}>
          {platforms.map((platform) => (
            <article key={platform.href} className={styles.platformCard}>
              <span>{platform.label}</span>
              <strong>{platform.title}</strong>
              <p>{platform.description}</p>
              <div className={styles.platformActions}>
                <Link href={platform.href} className={styles.primaryButton}>
                  Abrir plataforma
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}
