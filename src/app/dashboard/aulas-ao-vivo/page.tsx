import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentShell } from "@/components/student-shell";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { loadLiveClasses } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export default async function LiveClassesPage() {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !devSession) redirect("/login");
  const email = user?.email ?? DEV_LOGIN.email;
  const { data: liveClasses } = await loadLiveClasses(supabase);

  return (
    <StudentShell activeHref="/dashboard/aulas-ao-vivo" userEmail={email}>
      <section className={styles.page}>
        <div className={styles.header}>
          <span>Aulas ao vivo</span>
          <h1>Agenda e replays do IDM</h1>
          <p>
            Aqui ficam as transmissoes ao vivo, os links de entrada e os replays liberados para cada
            turma e curso.
          </p>
        </div>

        <div className={styles.grid}>
          {liveClasses.map((liveClass) => (
            <article key={liveClass.title} className={styles.card}>
              <span>{liveClass.status}</span>
              <strong>{liveClass.title}</strong>
              <p>{liveClass.audience}</p>
              <small>{liveClass.datetime}</small>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}
