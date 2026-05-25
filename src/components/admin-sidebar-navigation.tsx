"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminMenuIcon } from "@/components/admin-menu-icon";
import type { AdminNavigationItem } from "@/lib/admin-navigation-types";
import styles from "./admin-sidebar-navigation.module.css";

function sortByOrder(items: AdminNavigationItem[]) {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

function reorder(items: AdminNavigationItem[], fromIndex: number, toIndex: number) {
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next.map((entry, index) => ({ ...entry, sortOrder: index + 1 }));
}

export function AdminSidebarNavigation({
  items,
  activeHref,
}: {
  items: AdminNavigationItem[];
  activeHref: string;
}) {
  const router = useRouter();
  const initialItems = useMemo(() => sortByOrder(items), [items]);
  const [menuItems, setMenuItems] = useState(initialItems);
  const [isEditing, setIsEditing] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function startEditing() {
    setDragIndex(null);
    setHoverIndex(null);
    setIsEditing(true);
    setStatusMessage("Arraste os menus para redefinir a ordem.");
    setErrorMessage("");
  }

  function resetOrder() {
    setMenuItems(initialItems);
    setDragIndex(null);
    setHoverIndex(null);
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
        items: menuItems.map((item, index) => ({
          ...item,
          sortOrder: index + 1,
        })),
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setErrorMessage(payload?.error ?? "Nao foi possivel salvar a nova ordem do menu.");
      return;
    }

    setIsEditing(false);
    setStatusMessage("Ordem do menu salva com sucesso.");
    router.refresh();
  }

  function moveItem(index: number, targetIndex: number) {
    if (index === targetIndex || targetIndex < 0 || targetIndex >= menuItems.length) return;
    setMenuItems((current) => reorder(current, index, targetIndex));
    setDragIndex(targetIndex);
    setHoverIndex(targetIndex);
  }

  function handleToggle() {
    if (isEditing) {
      void saveOrder();
      return;
    }

    startEditing();
  }

  function handleDragStart(index: number) {
    if (!isEditing) return;
    setDragIndex(index);
  }

  function handleDragEnter(index: number) {
    if (!isEditing || dragIndex === null || dragIndex === index) return;
    moveItem(dragIndex, index);
  }

  function handleDragEnd() {
    setDragIndex(null);
    setHoverIndex(null);
  }

  return (
    <div className={styles.shell}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.toolbarLabel}>Navegacao do ADM</span>
          <span className={styles.toolbarHint}>
            {isEditing
              ? "Arraste os menus para definir a ordem."
              : "Clique em reordenar para liberar o arraste dos menus."}
          </span>
        </div>

        <div className={styles.toolbarActions}>
          {isEditing ? (
            <button type="button" className={styles.resetButton} onClick={resetOrder}>
              Restaurar
            </button>
          ) : null}

          <button
            type="button"
            className={`${styles.toggleButton} ${isEditing ? styles.toggleButtonEditing : styles.toggleButtonPrimary}`}
            onClick={handleToggle}
            disabled={isSaving}
          >
            <span className={styles.toggleIcon}>
              <AdminMenuIcon kind="navigation" />
            </span>
            {isSaving ? "Salvando..." : isEditing ? "Salvar ordem" : "Reordenar"}
          </button>
        </div>
      </div>

      {statusMessage ? <div className={styles.status}>{statusMessage}</div> : null}
      {errorMessage ? <div className={`${styles.status} ${styles.error}`}>{errorMessage}</div> : null}

      <nav className={styles.list}>
        {menuItems.map((item, index) => {
          const stateClass = `${isEditing ? styles.itemButton : styles.itemLink} ${
            activeHref === item.href ? styles.itemActive : ""
          } ${dragIndex === index ? styles.itemDragging : ""} ${hoverIndex === index ? styles.itemHover : ""}`.trim();

          const content = (
            <>
              <span className={styles.iconWrap}>
                <AdminMenuIcon kind={item.iconKey} />
              </span>
              <div className={styles.content}>
                <strong>{item.label}</strong>
                <span>{item.href}</span>
              </div>
              {isEditing ? <span className={styles.grip}>:::</span> : null}
            </>
          );

          if (isEditing) {
            return (
              <button
                key={item.slug}
                type="button"
                className={stateClass}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragOver={(event) => event.preventDefault()}
                onDragEnd={handleDragEnd}
                aria-label={`Reordenar ${item.label}`}
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={item.slug} href={item.href} className={stateClass}>
              {content}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
