import Link from "next/link";
import { ReactNode } from "react";
import { IdmWordmark } from "@/components/idm-wordmark";
import { UserMenu } from "@/components/user-menu";
import styles from "./admin-shell.module.css";

const items = [
  { label: "Home", href: "/admin", icon: "H" },
  { label: "Certificados", href: "/admin/certificados", icon: "C" },
  { label: "Meus Cursos", href: "/admin/secao/meus-cursos", icon: "M" },
  { label: "Aulas Ao Vivo", href: "/admin/secao/aulas-ao-vivo", icon: "A" },
  { label: "Membros", href: "/admin/secao/membros", icon: "U" },
  { label: "Gestao de Midias", href: "/admin/secao/gestao-de-midias", icon: "D" },
];

export function AdminShell({
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
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <IdmWordmark compact className={styles.sidebarWordmark} />
        </div>

        <nav className={styles.sidebarNav}>
          {items.map((item) => (
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
