import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { loadStudentCourses } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ aula?: string }>;
}) {
  const { slug } = await params;
  const { aula } = await searchParams;

  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user && !devSession) redirect("/login");

  const { data: courses } = await loadStudentCourses(supabase);
  const course = courses.find((item) => item.slug === slug);
  if (!course) redirect("/dashboard");

  const lessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleTitle: module.title,
    })),
  );

  const currentIndex = Math.max(
    0,
    aula ? lessons.findIndex((lesson) => lesson.slug === aula) : 0,
  );
  const currentLesson = lessons[currentIndex] ?? lessons[0];
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <StudentShell activeHref="/dashboard/meus-cursos" userEmail={user?.email ?? DEV_LOGIN.email}>
      <section className={styles.layout}>
        <div className={styles.viewer}>
          <div className={styles.viewerHeader}>
            <div className={styles.lessonHeading}>
              <div>
                <Link href="/dashboard/meus-cursos" className={styles.backButton}>
                  Voltar
                </Link>
                <p className={styles.moduleEyebrow}>{currentLesson.moduleTitle}</p>
                <h1>{currentLesson.title}</h1>
              </div>

              <div className={styles.viewerActions}>
                <span>Avaliar aula: ☆☆☆☆☆</span>
                <div className={styles.actionButtons}>
                  {previousLesson ? (
                    <Link
                      href={`/dashboard/curso/${slug}?aula=${previousLesson.slug}`}
                      className={styles.lightButton}
                    >
                      Anterior
                    </Link>
                  ) : (
                    <span className={styles.lightButton}>Anterior</span>
                  )}
                  <Link
                    href={`/dashboard/curso/${slug}?aula=${currentLesson.slug}&status=concluida`}
                    className={styles.midButton}
                  >
                    Concluir aula
                  </Link>
                  {nextLesson ? (
                    <Link
                      href={`/dashboard/curso/${slug}?aula=${nextLesson.slug}`}
                      className={styles.darkButton}
                    >
                      Proximo
                    </Link>
                  ) : (
                    <span className={styles.darkButton}>Proximo</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.videoStage}>
            <div className={styles.videoBadge}>
              {currentLesson.provider ?? "Conteudo"} • {currentLesson.duration}
            </div>
            <div className={styles.playCircle}>▶</div>
          </div>

          <div className={styles.lessonFooter}>
            <div className={styles.lessonInfoCard}>
              <span>Descricao</span>
              <strong>{currentLesson.title}</strong>
              <p>
                Aula organizada dentro do portal do IDM, preparada para receber embed, materiais de apoio e
                comentarios dos alunos.
              </p>
            </div>

            {course.certificateSlug ? (
              <div className={styles.lessonInfoCard}>
                <span>Certificado</span>
                <strong>Retirada disponivel</strong>
                <p>Essa trilha gratuita ja conversa com a area de certificados do aluno.</p>
                <Link href="/dashboard/certificados" className={styles.inlineLink}>
                  Ir para certificados
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.courseInfo}>
            <span>{course.heroEyebrow}</span>
            <h2>{course.title}</h2>
            <p>Progresso no curso: {course.progress}%</p>
            <div className={styles.progressBar}>
              <span style={{ width: `${course.progress}%` }} />
            </div>
          </div>

          <div className={styles.moduleList}>
            {course.modules.map((module) => (
              <section key={module.slug} className={styles.moduleCard}>
                <div className={styles.moduleTitle}>
                  <strong>{module.title}</strong>
                </div>

                <div className={styles.lessonList}>
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/dashboard/curso/${slug}?aula=${lesson.slug}`}
                      className={lesson.slug === currentLesson.slug ? styles.lessonRowActive : styles.lessonRow}
                    >
                      <span>{lesson.kind === "bonus" ? "★" : lesson.kind === "material" ? "▤" : "▶"}</span>
                      <div>
                        <p>{lesson.title}</p>
                        <small>{lesson.duration}</small>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </aside>
      </section>
    </StudentShell>
  );
}
