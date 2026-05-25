import { AdminSidebarNavigation } from "@/components/admin-sidebar-navigation";
import type { AdminNavigationItem } from "@/lib/admin-navigation-types";
import styles from "./admin-navigation-manager.module.css";

export function AdminNavigationManager({
  items,
}: {
  items: AdminNavigationItem[];
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.hint}>Sistema de menu lateral do ADM</span>
        <p>
          Use o mesmo botão minimalista do painel lateral para liberar o arraste, reorganizar os menus e
          salvar a nova ordem.
        </p>
      </div>

      <AdminSidebarNavigation items={items} activeHref="/admin/secao/navegacao" />
    </section>
  );
}
