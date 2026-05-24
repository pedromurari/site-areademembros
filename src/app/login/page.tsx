import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IdmWordmark } from "@/components/idm-wordmark";
import styles from "./page.module.css";
import { LoginForm } from "@/components/login-form";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user || devSession) {
    redirect("/dashboard");
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.formSide}>
          <div className={styles.formWrap}>
            <div className={styles.logo} aria-label="Instituto Despertamente">
              <IdmWordmark />
            </div>

            <div className={styles.heading}>
              <h1>Entrar na sua conta</h1>
              <p>Insira seus dados abaixo para continuar sua jornada na area de membros do IDM.</p>
            </div>

            <LoginForm />

            <p className={styles.footerText}>
              Nao tem uma conta? <Link href="/">Cadastre-se</Link>
            </p>
          </div>
        </div>

        <aside className={styles.brandSide}>
          <div className={styles.brandGrid} />
          <div className={styles.brandContent}>
            <div className={styles.badge}>
              <Image
                src="/despertamente-simbolo-branco.png"
                alt="Simbolo IDM"
                width={28}
                height={28}
              />
              <span>IDM</span>
            </div>

            <div className={styles.stage}>
              <div className={styles.bars}>
                <div />
                <div />
                <div />
              </div>

              <div className={styles.portalMark}>
                <div className={styles.ringOuter} />
                <div className={styles.ringInner} />
                <Image
                  src="/despertamente-simbolo-branco.png"
                  alt="Simbolo do portal IDM"
                  width={112}
                  height={112}
                  className={styles.portalIcon}
                />
              </div>
            </div>

            <div className={styles.message}>
              <p>ACELERANDO</p>
              <h2>A JORNADA DO ALUNO</h2>
              <span>futuro, profundidade e experiencia</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
