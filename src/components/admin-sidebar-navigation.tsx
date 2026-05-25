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
  if (fromIndex === toIndex) {
    return items;
  }

  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);

  return next.map((entry, index) => ({
    ...entry,
    sortOrder: index + 1,
  }));
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
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function startEditing() {
    setIsEditing(true);
    setFeedback("");
    setErrorMessage("");
  }

  function restoreOrder() {
    setMenuItems(initialItems);
    setDragIndex(null);
    setHoverIndex(null);
    setFeedback("Ordem restaurada.");
    setErrorMessage("");
  }

  async function saveOrder() {
    setIsSaving(true);
    setErrorMessage("");
    setFeedback("");

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
      setErrorMessage(payload?.error ?? "Nao foi possivel salvar a nova ordem.");
      return;
    }

    setIsEditing(false);
    setDragIndex(null);
    setHoverIndex(null);
    setFeedback("Ordem salva com sucesso.");
    router.refresh();
  }

  function toggleEditor() {
    if (isEditing) {
      void saveOrder();
      return;
    }

    startEditing();
  }

  function moveItem(index: number, targetIndex: number) {
    if (index === targetIndex || targetIndex < 0 || targetIndex >= menuItems.length) {
      return;
    }

    setMenuItems((current) => reorder(current, index, targetIndex));
    setDragIndex(targetIndex);
    setHoverIndex(targetIndex);
  }

  function handleDragStart(index: number) {
    if (!isEditing) {
      return;
    }

    setDragIndex(index);
    setHoverIndex(index);
  }

  function handleDragEnter(index: number) {
    if (!isEditing || dragIndex === null || dragIndex === index) {
      return;
    }

    moveItem(dragIndex, index);
  }

  function handleDragEnd() {
    setDragIndex(null);
    setHoverIndex(null);
  }

  return (
    <div className={styles.shell}>
      <div className={styles.toolbar}>
        {isEditing ? (
          <button type="button" className={styles.restoreButton} onClick={restoreOrder} disabled={isSaving}>
            Restaurar
          </button>
        ) : null}

        <button
          type="button"
          className={`${styles.toggleButton} ${isEditing ? styles.toggleButtonSaving : styles.toggleButtonIdle}`}
          onClick={toggleEditor}
          disabled={isSaving}
        >
          <span className={styles.toggleIcon}>
            <AdminMenuIcon kind={isEditing ? "save" : "edit"} />
          </span>
          {isSaving ? "Salvando..." : isEditing ? "Salvar" : "Organizar"}
        </button>
      </div>

      {feedback ? <div className={styles.statusLine}>{feedback}</div> : null}
      {errorMessage ? <div className={`${styles.statusLine} ${styles.errorLine}`}>{errorMessage}</div> : null}

      <nav className={styles.list} aria-label="Menu lateral do ADM">
        {menuItems.map((item, index) => {
          const stateClass = `${styles.item} ${isEditing ? styles.itemButton : ""} ${isEditing ? styles.itemEdit : styles.itemView} ${
            activeHref === item.href ? styles.itemActive : ""
          } ${dragIndex === index ? styles.itemDragging : ""} ${hoverIndex === index ? styles.itemHover : ""}`.trim();

          const content = (
            <>
              {isEditing ? (
                <span className={styles.dragHandle} aria-hidden="true">
                  <AdminMenuIcon kind="grip" />
                </span>
              ) : null}

              <span className={styles.iconWrap}>
                <AdminMenuIcon kind={item.iconKey} />
              </span>

              <span className={styles.label}>{item.label}</span>
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
