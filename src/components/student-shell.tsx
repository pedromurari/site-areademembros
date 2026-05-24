import Link from "next/link";
import { ReactNode } from "react";
import { IdmWordmark } from "@/components/idm-wordmark";
import { UserMenu } from "@/components/user-menu";
import { createClient } from "@/lib/supabase/server";
import { resolvePortalAccess } from "@/lib/portal-access";
import styles from "./student-shell.module.css";

const navItems = [
  { label: "Home", href: "/dashboard", icon: "H" },
  { label: "Certificados", href: "/dashboard/certificados", icon: "C" },
  { label: "Meus Cursos", href: "/dashboard/meus-cursos", icon: "M" },
  { label: "Aulas Ao Vivo", href: "/dashboard/aulas-ao-vivo", icon: "A" },
];

export async function StudentShell({
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
  const supabase = await createClient();
  const access = await resolvePortalAccess(supabase, userEmail);

  return (
    <main className={styles.page} data-student-shell>
      <aside className={styles.sidebar} data-student-sidebar>
        <div className={styles.sidebarBrand}>
          <IdmWordmark compact className={styles.sidebarWordmark} />
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={activeHref === item.href ? styles.navItemActive : styles.navItem}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <section className={styles.main} data-student-main>
        <header className={styles.topbar} data-student-topbar>
          <details className={styles.mobileMenu}>
            <summary className={styles.mobileMenuTrigger} aria-label="Abrir menu">
              <span />
              <span />
              <span />
            </summary>
            <nav className={styles.mobileMenuPanel}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={activeHref === item.href ? styles.mobileNavItemActive : styles.mobileNavItem}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>

          <Link href="/dashboard" className={styles.mobileBrand} aria-label="Portal do Aluno IDM">
            <IdmWordmark compact />
          </Link>

          <div className={styles.searchWrap}>
            <input
              type="search"
              placeholder="Pesquise por cursos, modulos ou aulas"
              className={styles.search}
            />
          </div>

          <details className={styles.mobileSearch}>
            <summary className={styles.mobileSearchTrigger} aria-label="Abrir busca" />
            <div className={styles.mobileSearchPanel}>
              <input
                type="search"
                placeholder="Pesquise por cursos, modulos ou aulas"
                className={styles.search}
              />
            </div>
          </details>

          <div className={styles.topbarActions}>
            <UserMenu
              userEmail={userEmail}
              userName={userName}
              mode="student"
              canAccessAdmin={access.canAccessAdmin}
            />
          </div>
        </header>

        {children}
      </section>
    </main>
  );
}
