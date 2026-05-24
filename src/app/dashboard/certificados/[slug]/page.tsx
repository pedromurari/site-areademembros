import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CertificateStudentActions } from "@/components/certificate-student-actions";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { loadCertificateBySlug } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export default async function CertificatePreviewPage({
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
  const email = user?.email ?? DEV_LOGIN.email;
  const { data: certificate } = await loadCertificateBySlug(supabase, email, slug);
  if (!certificate) redirect("/dashboard/certificados");

  return (
    <StudentShell
      activeHref="/dashboard/certificados"
      userEmail={email}
    >
      <section className={styles.page}>
        <div className={styles.topRow}>
          <div>
            <Link href="/dashboard/certificados" className={styles.backLink}>
              Voltar para certificados
            </Link>
            <h1>{certificate.title}</h1>
            <p>
              Visualizacao do certificado liberado para a jornada gratuita de 3 dias da turma{" "}
              {certificate.turma}.
            </p>
          </div>

          <CertificateStudentActions code={certificate.code} />
        </div>

        <div className={styles.layout}>
          <article className={styles.sheet}>
            <div className={styles.sheetHeader}>
              <span>Instituto Despertamente</span>
              <strong>{certificate.title}</strong>
            </div>

            <div className={styles.sheetBody}>
              <p className={styles.lead}>
                Certificamos que
              </p>
              <h2>{certificate.studentName}</h2>
              <p className={styles.description}>
                concluiu com aproveitamento a jornada <strong>{certificate.courseTitle} {certificate.turma}</strong>,
                correspondente ao <strong>{certificate.durationLabel}</strong>, com carga horaria de{" "}
                <strong>{certificate.hours}</strong>.
              </p>

              <div className={styles.lessonPanel}>
                <strong>Aulas validadas</strong>
                <ul>
                  {certificate.lessons.map((lesson) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.signatureRow}>
                <div>
                  <span>Emitido em</span>
                  <strong>{certificate.issueDate}</strong>
                </div>
                <div>
                  <span>Codigo de validacao</span>
                  <strong>{certificate.code}</strong>
                </div>
              </div>

              <div className={styles.signatureBlock}>
                <div className={styles.signatureLine} />
                <strong>{certificate.signatoryName}</strong>
                <p>{certificate.signatoryRole}</p>
              </div>
            </div>
          </article>

          <aside className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <span>Retirada</span>
              <strong>Pronto para baixar</strong>
              <p>{certificate.deliveryMessage}</p>
            </div>

            <div className={styles.infoCard}>
              <span>Regras da emissao</span>
              <strong>{certificate.minimumLessons} aulas obrigatorias</strong>
              <p>{certificate.releaseWindow}</p>
            </div>
          </aside>
        </div>
      </section>
    </StudentShell>
  );
}
