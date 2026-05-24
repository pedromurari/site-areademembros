import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { loadStudentCourses } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "../student-home.module.css";

export default async function CoursesPage() {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !devSession) redirect("/login");
  const email = user?.email ?? DEV_LOGIN.email;
  const { data: courses } = await loadStudentCourses(supabase);

  return (
    <StudentShell activeHref="/dashboard/meus-cursos" userEmail={email}>
      <section className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2>Meus Cursos</h2>
          <p>Escolha abaixo qual trilha voce quer abrir agora dentro da sua area de membros.</p>
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
      </section>
    </StudentShell>
  );
}
