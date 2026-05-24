import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { LogoutButton } from "@/components/logout-button";
import styles from "./student-shell.module.css";

const navItems = [
  { label: "Home", href: "/dashboard", icon: "⌂" },
  { label: "Certificados", href: "/dashboard/certificados", icon: "✦" },
  { label: "Meus Cursos", href: "/dashboard/meus-cursos", icon: "▥" },
  { label: "Aulas Ao Vivo", href: "/dashboard/aulas-ao-vivo", icon: "▶" },
];

export function StudentShell({
  activeHref,
  userEmail,
  children,
}: {
  activeHref: string;
  userEmail: string;
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
          <div className={styles.searchWrap}>
            <input
              type="search"
              placeholder="Pesquise por cursos, modulos ou aulas"
              className={styles.search}
            />
          </div>

          <div className={styles.topbarActions}>
            <Link href="/admin" className={styles.adminLink}>
              Admin
            </Link>
            <span className={styles.notification}>2</span>
            <div className={styles.avatar}>{userEmail.slice(0, 1).toUpperCase()}</div>
            <LogoutButton />
          </div>
        </header>

        {children}
      </section>
    </main>
  );
}
