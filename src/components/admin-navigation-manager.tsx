"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminNavigationItem } from "@/lib/admin-navigation-types";
import { AdminMenuIcon } from "@/components/admin-menu-icon";
import styles from "./admin-navigation-manager.module.css";

function reorder(items: AdminNavigationItem[], fromIndex: number, toIndex: number) {
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next.map((entry, index) => ({ ...entry, sortOrder: index + 1 }));
}

export function AdminNavigationManager({
  items,
}: {
  items: AdminNavigationItem[];
}) {
  const router = useRouter();
  const initialItems = useMemo(
    () => [...items].sort((a, b) => a.sortOrder - b.sortOrder),
    [items],
  );
  const [menuItems, setMenuItems] = useState(initialItems);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function moveItem(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= menuItems.length) return;
    setMenuItems((current) => reorder(current, index, targetIndex));
  }

  function resetOrder() {
    setMenuItems(initialItems);
    setStatusMessage("Ordem restaurada para o padrao atual.");
    setErrorMessage("");
  }

  async function saveOrder() {
    setIsSaving(true);
    setErrorMessage("");
    setStatusMessage("");

    const response = await fetch("/api/admin/navigation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: menuItems.map((item, index) => ({ ...item, sortOrder: index + 1 })),
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setErrorMessage(payload?.error ?? "Nao foi possivel salvar a nova ordem do menu.");
      return;
    }

    setStatusMessage("Ordem do menu salva com sucesso.");
    router.refresh();
  }

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.hint}>Sistema de menu lateral do ADM</span>
        <p>
          Reordene os itens manualmente com as setas. No dev local, a ordem fica salva em arquivo local; no
          Supabase, ela vai para a tabela de navegação e vale para qualquer administrador.
        </p>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryButton} onClick={resetOrder}>
            Restaurar padrao
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => void saveOrder()}
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar ordem"}
          </button>
        </div>
      </div>

      {statusMessage ? <div className={styles.status}>{statusMessage}</div> : null}
      {errorMessage ? <div className={`${styles.status} ${styles.error}`}>{errorMessage}</div> : null}

      <div className={styles.list}>
        {menuItems.map((item, index) => (
          <article key={item.slug} className={styles.item}>
            <span className={styles.order}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.icon}>
              <AdminMenuIcon kind={item.iconKey} />
            </span>
            <div className={styles.content}>
              <strong>{item.label}</strong>
              <span>{item.href}</span>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                aria-label={`Mover ${item.label} para cima`}
              >
                ↑
              </button>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() => moveItem(index, 1)}
                disabled={index === menuItems.length - 1}
                aria-label={`Mover ${item.label} para baixo`}
              >
                ↓
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
