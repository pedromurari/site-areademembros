import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { UserMenu } from "@/components/user-menu";
import styles from "./admin-shell.module.css";

const items = [
  { label: "Home", href: "/admin", icon: "H" },
  { label: "Painel de Engajamento", href: "/admin/secao/painel-engajamento", icon: "E" },
  { label: "Certificados", href: "/admin/certificados", icon: "C" },
  { label: "Meus Cursos", href: "/admin/secao/meus-cursos", icon: "M" },
  { label: "Aulas ao Vivo", href: "/admin/secao/aulas-ao-vivo", icon: "A" },
  { label: "Gamificacao", href: "/admin/secao/gamificacao", icon: "G" },
  { label: "Comentarios", href: "/admin/secao/comentarios", icon: "O" },
  { label: "Membros", href: "/admin/secao/membros", icon: "U" },
  { label: "Combos", href: "/admin/secao/combos", icon: "B" },
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
            <input
              type="search"
              placeholder="Pesquise por cursos, modulos ou aulas"
              className={styles.search}
            />
          </div>

          <div className={styles.topbarActions}>
            <UserMenu userEmail={userEmail} userName={userName} />
          </div>
        </header>

        {children}
      </section>
    </main>
  );
}
