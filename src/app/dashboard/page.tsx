import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { loadStudentCourses } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "./student-home.module.css";

export default async function DashboardPage() {
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
  const { data: courses } = await loadStudentCourses(supabase);

  return (
    <StudentShell activeHref="/dashboard" userEmail={email}>
      <section className={styles.banner}>
        <div className={styles.bannerInner}>
          <p>Instituto Despertamente</p>
          <h1>Portal do Aluno</h1>
          <span>Seus cursos, aulas, certificados e proximos encontros em um so lugar.</span>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2>Instituto DespertaMente</h2>
          <p>Acompanhe abaixo sua vitrine de cursos, acessos gratuitos e proximos passos dentro do IDM.</p>
        </div>

        <div className={styles.courseGrid}>
          {courses.map((course, index) => (
            <article key={course.title} className={styles.courseCard}>
              <Link href={`/dashboard/curso/${course.slug}`} className={styles.cardLink}>
                <div className={styles.cardVisual}>
                  <small>{course.badge}</small>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className={styles.cardProgress}>Progresso: {course.progress}%</p>
                <strong>{course.title}</strong>
                <em className={styles.cardMeta}>{course.metaLabel}</em>
                <span className={styles.cardSummary}>{course.summary}</span>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.infoGrid}>
          <article className={styles.infoCard}>
            <span>Certificados</span>
            <strong>Curso gratuito de 3 dias</strong>
            <p>Retire seu certificado da turma #36 diretamente pela sessao Certificados do portal.</p>
            <Link href="/dashboard/certificados">Abrir certificados</Link>
          </article>

          <article className={styles.infoCard}>
            <span>Aulas ao vivo</span>
            <strong>Agenda e replays</strong>
            <p>Organizamos aqui as proximas transmissoes do IDM e os replays disponiveis para voce.</p>
            <Link href="/dashboard/aulas-ao-vivo">Ver aulas ao vivo</Link>
          </article>
        </div>
      </section>
    </StudentShell>
  );
}
