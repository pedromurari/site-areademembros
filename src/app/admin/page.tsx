import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { readLocalAdminNavigation } from "@/lib/admin-navigation";
import {
  inspectPortalTables,
  loadAdminNavigation,
  loadBanners,
  loadStudentCourses,
} from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

const adminActions = [
  { label: "Reordenar cursos", href: "/admin/secao/meus-cursos" },
  { label: "Adicionar e gerenciar banners", href: "/admin/secao/gestao-de-midias" },
  { label: "Criar novo curso", href: "/admin/curso/novo-curso" },
];

export default async function AdminPage() {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !devSession) {
    redirect("/login");
  }

  const { data: courses, source: courseSource } = await loadStudentCourses(supabase);
  const { data: banners } = await loadBanners(supabase);
  const navigation = devSession
    ? (await readLocalAdminNavigation()) ?? (await loadAdminNavigation(supabase)).data
    : (await loadAdminNavigation(supabase)).data;
  const tableChecks = await inspectPortalTables(supabase);
  const missingTables = tableChecks.filter((item) => item.missing);

  return (
    <AdminShell activeHref="/admin" userEmail={user?.email ?? DEV_LOGIN.email}>
        <section className={styles.heroBanner}>
          <div className={styles.heroOverlay}>
            <p>Instituto Despertamente</p>
            <h1>Portal do Administrador</h1>
          </div>
        </section>

        <section className={styles.actionsRow}>
          {adminActions.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={index === 2 ? styles.primaryAction : styles.secondaryAction}
            >
              {action.label}
            </Link>
          ))}
        </section>

        <section id="conteudo" className={styles.contentArea}>
          <div className={styles.sectionHeader}>
            <h2>Instituto DespertaMente</h2>
            <p>Painel para organizar cursos, banners, turmas, membros e conteudos da plataforma.</p>
            {missingTables.length ? (
              <small className={styles.connectionStatus}>
                Supabase parcialmente conectado: faltam tabelas do portal. Veja `supabase/001_portal_schema.sql`.
              </small>
            ) : (
              <small className={styles.connectionStatus}>Supabase conectado para leitura de cursos e midias.</small>
            )}
          </div>

          <div className={styles.cardGrid}>
            {courses.map((course, index) => (
              <article key={course.title} className={styles.courseCard}>
                <Link href={`/admin/curso/${course.slug}`} className={styles.cardLink}>
                  <div className={styles.courseVisual}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.courseBody}>
                    <strong>{course.title}</strong>
                    <p>{course.metaLabel}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.managementGrid}>
            <article className={styles.managementCard}>
              <span>Turma ativa</span>
              <Link href="/admin/curso/psicanalise-integrativa-gratuita-36">
                <strong>Psicanalise Integrativa Gratuita #36</strong>
              </Link>
              <p>Controle de acessos, aulas do YouTube, bonus do fundador e banners da campanha.</p>
            </article>

            <article className={styles.managementCard}>
              <span>Banners</span>
              <Link href="/admin/secao/gestao-de-midias">
                <strong>Espaco de administracao visual</strong>
              </Link>
              <p>
                Area pensada para trocar artes, ordem do carrossel e anuncios do portal. Hoje: {banners.length} item(ns).
              </p>
            </article>

            <article className={styles.managementCard}>
              <span>Certificados</span>
              <Link href="/admin/certificados">
                <strong>Retirada e emissao da turma gratuita</strong>
              </Link>
              <p>Configure regras de liberacao, assinatura, codigo e retirada do curso gratuito de 3 dias.</p>
            </article>

            <article className={styles.managementCard}>
              <span>Membros</span>
              <Link href="/admin/secao/membros">
                <strong>Gestao de alunos e permissoes</strong>
              </Link>
              <p>Estrutura pronta para ligarmos usuarios, planos, turmas e cursos no Supabase.</p>
            </article>

            <article className={styles.managementCard}>
              <span>Menu lateral</span>
              <Link href="/admin/secao/navegacao">
                <strong>Ordem e icones do painel</strong>
              </Link>
              <p>
                Reordene o menu lateral do ADM, troque a sequencia e confirme {navigation.length} item(ns)
                configuraveis.
              </p>
            </article>

            <article className={styles.managementCard}>
              <span>Base de dados</span>
              <Link href="/admin/secao/painel-engajamento">
                <strong>{courseSource === "supabase" ? "Cursos lidos do Supabase" : "Portal em modo fallback"}</strong>
              </Link>
              <p>
                {courseSource === "supabase"
                  ? "A vitrine de cursos ja esta vindo do banco."
                  : "Assim que as tabelas forem criadas, o portal troca automaticamente para a base real."}
              </p>
            </article>
          </div>
        </section>
    </AdminShell>
  );
}
