import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { loadCertificatesForEmail } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export default async function CertificatesPage() {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !devSession) redirect("/login");
  const email = user?.email ?? DEV_LOGIN.email;
  const { data: certificates } = await loadCertificatesForEmail(supabase, email);
  const primaryCertificate = certificates[0];
  if (!primaryCertificate) redirect("/dashboard");

  const completedAllLessons =
    primaryCertificate.completedLessons >= primaryCertificate.minimumLessons;
  const bonusReady = !primaryCertificate.bonusIncluded || primaryCertificate.bonusCompleted;

  return (
    <StudentShell activeHref="/dashboard/certificados" userEmail={email}>
      <section className={styles.page}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Certificados</span>
            <h1>Retirada de certificados</h1>
            <p>
              Aqui o aluno retira os certificados liberados pela equipe do IDM, acompanha os criterios
              da emissao e baixa o PDF quando estiver disponivel.
            </p>
          </div>
        </div>

        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <span>Status</span>
            <strong>{primaryCertificate.isAvailable ? "Disponivel agora" : "Aguardando liberacao"}</strong>
            <p>{primaryCertificate.deliveryMessage}</p>
          </article>

          <article className={styles.summaryCard}>
            <span>Turma</span>
            <strong>{primaryCertificate.courseTitle} {primaryCertificate.turma}</strong>
            <p>{primaryCertificate.durationLabel} • {primaryCertificate.hours}</p>
          </article>

          <article className={styles.summaryCard}>
            <span>Regra</span>
            <strong>{primaryCertificate.minimumLessons} aulas + bonus do fundador</strong>
            <p>{primaryCertificate.releaseWindow}</p>
          </article>
        </div>

        <div className={styles.contentGrid}>
          <article className={styles.certificateCard}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.badge}>Curso gratuito de 3 dias</span>
                <h2>{primaryCertificate.title}</h2>
                <p>
                  Certificado do aluno para a jornada gratuita de Psicanalise Integrativa da turma #
                  {primaryCertificate.turma.replace("#", "")}.
                </p>
              </div>
              <div className={styles.codeBox}>
                <small>Codigo</small>
                <strong>{primaryCertificate.code}</strong>
              </div>
            </div>

            <div className={styles.ruleList}>
              <div className={completedAllLessons ? styles.ruleReady : styles.rulePending}>
                <strong>Aulas principais</strong>
                <p>
                  {primaryCertificate.completedLessons}/{primaryCertificate.minimumLessons} aulas
                  concluidas.
                </p>
              </div>

              <div className={bonusReady ? styles.ruleReady : styles.rulePending}>
                <strong>Bonus do fundador</strong>
                <p>
                  {primaryCertificate.bonusCompleted
                    ? "Bonus concluido e contabilizado."
                    : "Bonus ainda nao concluido."}
                </p>
              </div>
            </div>

            <div className={styles.lessonBlock}>
              <strong>Aulas validadas para emissao</strong>
              <ul>
                {primaryCertificate.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </div>

            <div className={styles.cardActions}>
              <Link
                href={`/dashboard/certificados/${primaryCertificate.slug}`}
                className={styles.primaryAction}
              >
                Abrir certificado
              </Link>
              <Link
                href="/dashboard/curso/psicanalise-integrativa-gratuita-36"
                className={styles.secondaryAction}
              >
                Voltar para o curso gratuito
              </Link>
            </div>
          </article>

          <aside className={styles.sidePanel}>
            <div className={styles.sideCard}>
              <span>Proximo passo</span>
              <strong>Compartilhe e avance</strong>
              <p>
                Depois de retirar o certificado, voce pode seguir para a formacao completa e continuar
                sua jornada dentro do IDM.
              </p>
            </div>

            <div className={styles.sideCard}>
              <span>Suporte</span>
              <strong>Validacao e ajuda</strong>
              <p>
                Caso a equipe precise ajustar nome, turma ou liberacao, essa configuracao fica no painel
                admin em Certificados.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </StudentShell>
  );
}
