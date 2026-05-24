import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { UserMenu } from "@/components/user-menu";
import styles from "./student-shell.module.css";

const navItems = [
  { label: "Home", href: "/dashboard", icon: "H" },
  { label: "Certificados", href: "/dashboard/certificados", icon: "C" },
  { label: "Meus Cursos", href: "/dashboard/meus-cursos", icon: "M" },
  { label: "Aulas Ao Vivo", href: "/dashboard/aulas-ao-vivo", icon: "A" },
];

export function StudentShell({
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
  return (
    <main className={styles.page} data-student-shell>
      <aside className={styles.sidebar} data-student-sidebar>
        <div className={styles.sidebarBrand}>
          <Image
            src="/logo-despertamente.png"
            alt="Instituto Despertamente"
            width={148}
            height={62}
            className={styles.logo}
          />
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
            <Image
              src="/logo-despertamente.png"
              alt="Instituto Despertamente"
              width={124}
              height={52}
              className={styles.mobileLogo}
            />
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
            <UserMenu userEmail={userEmail} userName={userName} />
          </div>
        </header>

        {children}
      </section>
    </main>
  );
}
