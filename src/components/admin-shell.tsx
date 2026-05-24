import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { LogoutButton } from "@/components/logout-button";
import styles from "./admin-shell.module.css";

const items = [
  { label: "Home", href: "/admin", icon: "⌂" },
  { label: "Painel de Engajamento", href: "/admin/secao/painel-engajamento", icon: "⌁" },
  { label: "Certificados", href: "/admin/certificados", icon: "✦" },
  { label: "Meus Cursos", href: "/admin/secao/meus-cursos", icon: "▥" },
  { label: "Aulas ao Vivo", href: "/admin/secao/aulas-ao-vivo", icon: "▶" },
  { label: "Gamificacao", href: "/admin/secao/gamificacao", icon: "★" },
  { label: "Comentarios", href: "/admin/secao/comentarios", icon: "✎" },
  { label: "Membros", href: "/admin/secao/membros", icon: "☰" },
  { label: "Combos", href: "/admin/secao/combos", icon: "◫" },
  { label: "Gestao de Midias", href: "/admin/secao/gestao-de-midias", icon: "▤" },
];

export function AdminShell({
  activeHref,
  userEmail,
  children,
}: {
  activeHref: string;
  userEmail: string;
  children: ReactNode;
}) {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
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
            <input type="search" placeholder="Pesquise por cursos, modulos ou aulas" className={styles.search} />
          </div>

          <div className={styles.topbarActions}>
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
