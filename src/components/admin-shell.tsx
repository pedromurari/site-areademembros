import { cookies } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";
import { AdminMenuIcon } from "@/components/admin-menu-icon";
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

        <nav className={styles.sidebarNav}>
          {navigationResult
            .filter((item) => item.isVisible)
            .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={activeHref === item.href ? styles.navItemActive : styles.navItem}
            >
              <span className={styles.navIcon}>
                <AdminMenuIcon kind={item.iconKey} />
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
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
