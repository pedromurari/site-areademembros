import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { CertificateAdminPanel } from "@/components/certificate-admin-panel";
import { freeCourseCertificate } from "@/lib/certificate-data";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { inspectPortalTables } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export default async function AdminCertificatesPage() {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user && !devSession) redirect("/login");
  const checks = await inspectPortalTables(supabase);
  const hasCertificateTable = checks.some((item) => item.table === "certificates" && item.ready);

  return (
    <AdminShell activeHref="/admin/certificados" userEmail={user?.email ?? DEV_LOGIN.email}>
      <section className={styles.page}>
        <div className={styles.header}>
          <h1>Certificados</h1>
          <p>
            Configure a retirada do certificado do curso gratuito de 3 dias e a logica de emissao da turma #36.
          </p>
          <small className={styles.statusNote}>
            {hasCertificateTable
              ? "Tabela de certificados encontrada no Supabase."
              : "Tabela de certificados ainda nao existe no Supabase. Rode a migracao SQL para ativar a base real."}
          </small>
          <Link
            href={`/dashboard/certificados/${freeCourseCertificate.slug}`}
            className={styles.previewLink}
          >
            Abrir visao do aluno
          </Link>
        </div>

        <CertificateAdminPanel />
      </section>
    </AdminShell>
  );
}
