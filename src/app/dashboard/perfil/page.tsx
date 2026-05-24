import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { loadCertificatesForEmail, loadStudentCourses } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import { getDisplayInitial, getDisplayName } from "@/lib/user-identity";
import styles from "../account.module.css";

const tabs = [
  { id: "dados", label: "Dados Cadastrais" },
  { id: "compras", label: "Compras" },
  { id: "senha", label: "Senha" },
  { id: "idioma", label: "Idioma" },
] as const;

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ aba?: string }>;
}) {
  const { aba } = await searchParams;
  const currentTab = tabs.some((tab) => tab.id === aba) ? (aba as (typeof tabs)[number]["id"]) : "dados";

  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !devSession) redirect("/login");

  const email = user?.email ?? DEV_LOGIN.email;
  const userName = getDisplayName(email);
  const initial = getDisplayInitial(email);
  const { data: courses } = await loadStudentCourses(supabase);
  const { data: certificates } = await loadCertificatesForEmail(supabase, email);

  return (
    <StudentShell activeHref="/dashboard" userEmail={email} userName={userName}>
      <section className={styles.page}>
        <div className={styles.header}>
          <h1>Meu Perfil</h1>
          <p>Dados simples, acessos atuais e organizacao pessoal da sua jornada dentro do IDM.</p>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/dashboard/perfil?aba=${tab.id}`}
              className={currentTab === tab.id ? styles.tabActive : styles.tab}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {currentTab === "dados" ? (
          <div className={styles.profileGrid}>
            <article className={styles.avatarCard}>
              <div className={styles.avatarCircle}>{initial}</div>
              <button type="button" className={styles.softButton}>
                Carregar imagem
              </button>
              <p className={styles.hint}>
                Tamanho maximo do arquivo: 2MB
                <br />
                Dimensao minima: 200x200
                <br />
                Dimensao maxima: 1500x1500
              </p>
            </article>

            <article className={styles.tabPanel}>
              <div className={styles.fieldList}>
                <div className={styles.profileField}>
                  <strong>Nome completo</strong>
                  <span>{userName}</span>
                </div>
                <div className={styles.profileField}>
                  <strong>Data de nascimento</strong>
                  <span>Digite sua data de nascimento</span>
                </div>
                <div className={styles.profileField}>
                  <strong>CPF/CNPJ</strong>
                  <span>428.768.158-42</span>
                </div>
                <div className={styles.profileField}>
                  <strong>Telefone</strong>
                  <span>(11) 97537-9719</span>
                </div>
                <div className={styles.profileField}>
                  <strong>E-mail</strong>
                  <span>{email}</span>
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {currentTab === "compras" ? (
          <article className={styles.tabPanel}>
            <div className={styles.courseList}>
              {courses.map((course) => (
                <div key={course.slug} className={styles.courseCard}>
                  <span className={styles.badge}>{course.badge}</span>
                  <strong>{course.title}</strong>
                  <p>{course.summary}</p>
                  <span className={styles.courseMeta}>Acesso ativo • Progresso {course.progress}%</span>
                </div>
              ))}

              <div className={styles.courseCard}>
                <span className={styles.badge}>Certificados</span>
                <strong>{certificates.length} certificado(s) disponivel(is)</strong>
                <p>Quando a equipe libera o certificado, ele aparece aqui dentro do seu perfil e na secao dedicada.</p>
                <Link href="/dashboard/certificados" className={styles.inlineLink}>
                  Abrir certificados
                </Link>
              </div>
            </div>
          </article>
        ) : null}

        {currentTab === "senha" ? (
          <div className={styles.infoGrid}>
            <article className={styles.infoCard}>
              <span>Senha</span>
              <strong>Seguranca da conta</strong>
              <p>
                Nesta primeira versao, o acesso continua simples. O proximo passo sera conectar troca de senha
                real diretamente com o Supabase.
              </p>
            </article>
            <article className={styles.infoCard}>
              <span>Acesso</span>
              <strong>Login atual</strong>
              <p>
                Seu login continua funcionando pela area de membros. Quando a integracao completa do Supabase
                estiver pronta, vamos expandir a parte de redefinicao e recuperacao de senha.
              </p>
            </article>
          </div>
        ) : null}

        {currentTab === "idioma" ? (
          <div className={styles.infoGrid}>
            <article className={styles.infoCard}>
              <span>Idioma ativo</span>
              <strong>Portugues (Brasil)</strong>
              <p>Essa area vai receber em seguida a configuracao real de idioma e preferencias regionais.</p>
            </article>
            <article className={styles.infoCard}>
              <span>Formato</span>
              <strong>Data, horario e comunicacao</strong>
              <p>Hoje a plataforma esta padronizada para o uso em portugues e horario do Brasil.</p>
            </article>
          </div>
        ) : null}
      </section>
    </StudentShell>
  );
}
