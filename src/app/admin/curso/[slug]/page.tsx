import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { inspectPortalTables, loadStudentCourses } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "@/app/admin/shared-detail.module.css";

export default async function AdminCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user && !devSession) redirect("/login");

  const { data: courses } = await loadStudentCourses(supabase);
  const tableChecks = await inspectPortalTables(supabase);
  const course = courses.find((item) => item.slug === slug);

  if (!course && slug !== "novo-curso") redirect("/admin");

  if (slug === "novo-curso") {
    return (
      <AdminShell activeHref="/admin/secao/meus-cursos" userEmail={user?.email ?? DEV_LOGIN.email}>
        <section className={styles.page}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Cursos</span>
            <h1>Novo curso</h1>
            <p>Espaco preparado para cadastrar uma nova capa, trilha, modulos, aulas e regras de acesso.</p>
            <small className={styles.helper}>
              Quando as tabelas do portal estiverem criadas no Supabase, esta tela vira cadastro real.
            </small>
          </div>
        </section>
      </AdminShell>
    );
  }

  return (
    <AdminShell activeHref="/admin/secao/meus-cursos" userEmail={user?.email ?? DEV_LOGIN.email}>
      <section className={styles.page}>
        <div className={styles.header}>
          <Link href="/admin" className={styles.backLink}>
            Voltar ao admin
          </Link>
          <span className={styles.eyebrow}>Gestao de curso</span>
          <h1>{course?.title}</h1>
          <p>{course?.summary}</p>
          {tableChecks.some((item) => item.missing) ? (
            <small className={styles.helper}>
              Supabase ainda sem todas as tabelas do portal. O curso segue em modo fallback ate a migracao.
            </small>
          ) : null}
        </div>

        <div className={styles.actionRow}>
          <Link href="/admin/secao/meus-cursos" className={styles.secondaryAction}>
            Reordenar cursos
          </Link>
          <Link href={`/dashboard/curso/${course?.slug}`} className={styles.secondaryAction}>
            Ver no portal do aluno
          </Link>
          <Link href="/admin/secao/gestao-de-midias" className={styles.secondaryAction}>
            Atualizar capa e banners
          </Link>
          {course?.certificateSlug ? (
            <Link href="/admin/certificados" className={styles.primaryAction}>
              Configurar certificado
            </Link>
          ) : (
            <Link href="/admin/secao/membros" className={styles.primaryAction}>
              Gerenciar acessos
            </Link>
          )}
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <span>Status</span>
            <strong>{course?.badge}</strong>
            <p>Progresso demonstrativo do curso no portal do aluno: {course?.progress}%.</p>
          </article>

          <article className={styles.card}>
            <span>Meta</span>
            <strong>{course?.metaLabel}</strong>
            <p>Bloco pensado para turmas, publico, campanhas e observacoes operacionais.</p>
          </article>

          <article className={styles.card}>
            <span>Aluno</span>
            <strong>Experiencia conectada</strong>
            <p>Ao clicar no curso, o aluno entra direto na trilha com video, modulos e proximas aulas.</p>
          </article>

          <article className={styles.card}>
            <span>Player</span>
            <strong>Embed e materiais</strong>
            <p>Espaco preparado para links do YouTube, Panda, PDFs, downloads e comentarios por aula.</p>
          </article>
        </div>

        <div className={styles.moduleGrid}>
          {course?.modules.map((module) => (
            <article key={module.slug} className={styles.moduleCard}>
              <span>Modulo</span>
              <strong>{module.title}</strong>
              <ul>
                {module.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    {lesson.title} - {lesson.duration} - {lesson.provider ?? "Material interno"}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className={styles.stack}>
          <article className={styles.wideCard}>
            <span>Proximas configuracoes</span>
            <strong>O que entra nesta tela depois</strong>
            <p>
              Vamos encaixar aqui a edicao real da capa do curso, ordenacao de modulos, upload de materiais,
              troca do player, liberacao por data e controle de acesso por turma.
            </p>
          </article>
        </div>
      </section>
    </AdminShell>
  );
}
