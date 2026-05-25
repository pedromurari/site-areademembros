import { cookies } from "next/headers";
import { ReactNode } from "react";
import { AdminSidebarNavigation } from "@/components/admin-sidebar-navigation";
import { IdmWordmark } from "@/components/idm-wordmark";
import { UserMenu } from "@/components/user-menu";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { readLocalAdminNavigation } from "@/lib/admin-navigation";
import { loadAdminNavigation } from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "./admin-shell.module.css";

export async function AdminShell({
  activeHref,
  userEmail,
  userName,
  children,
}: {
  activeHref: string;
  userEmail: string;
  userName?: string;
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const navigationResult = devSession
    ? (await readLocalAdminNavigation()) ?? (await loadAdminNavigation(supabase)).data
    : (await loadAdminNavigation(supabase)).data;

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <IdmWordmark compact className={styles.sidebarWordmark} />
        </div>

        <AdminSidebarNavigation
          key={navigationResult
            .map((item) => `${item.slug}:${item.label}:${item.href}:${item.iconKey}:${item.sortOrder}:${item.isVisible}`)
            .join("|")}
          items={navigationResult.filter((item) => item.isVisible)}
          activeHref={activeHref}
        />
      </aside>

      <section className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.searchWrap}>
            <input
              type="search"
              placeholder="Pesquise por cursos, modulos ou aulas"
              className={styles.search}
            />
          </div>

          <div className={styles.topbarActions}>
            <UserMenu userEmail={userEmail} userName={userName} mode="admin" canAccessAdmin />
          </div>
        </header>

        {children}
      </section>
    </main>
  );
}
