import Link from "next/link";
import { AdminMenuIcon } from "@/components/admin-menu-icon";
import type { AdminNavigationItem } from "@/lib/admin-navigation-types";
import styles from "./admin-navigation-manager.module.css";

function sortByOrder(items: AdminNavigationItem[]) {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function AdminNavigationManager({
  items,
}: {
  items: AdminNavigationItem[];
}) {
  const orderedItems = sortByOrder(items);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>Menu lateral do ADM</span>
          <h2>Organize a navegacao pelo botao da sidebar</h2>
          <p>
            Ative <strong>Organizar</strong> no menu lateral, arraste os itens e clique em <strong>Salvar</strong>.
            A ordem vale para alunos e administradores.
          </p>
        </div>

        <Link href="/admin" className={styles.backLink}>
          Voltar ao painel
        </Link>
      </div>

      <div className={styles.preview}>
        {orderedItems.map((item, index) => (
          <article key={item.slug} className={styles.row}>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.icon}>
              <AdminMenuIcon kind={item.iconKey} />
            </span>
            <div className={styles.content}>
              <strong>{item.label}</strong>
              <span>{item.href}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
