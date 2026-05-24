"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getDisplayInitial, getDisplayName } from "@/lib/user-identity";
import styles from "./user-menu.module.css";

function MenuIcon({ kind }: { kind: "student" | "profile" | "settings" | "courses" | "platforms" | "logout" }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    case "student":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8" />
          <path d="M12 16v4" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c1.5-3.2 4-5 7-5s5.5 1.8 7 5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.5" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1 0 2.8 2 2 0 0 1-2.8 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8 0 2 2 0 0 1 0-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 0-2.8 2 2 0 0 1 2.8 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 0 2 2 0 0 1 0 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
        </svg>
      );
    case "courses":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="7" height="14" rx="1.5" />
          <rect x="13" y="5" width="7" height="14" rx="1.5" />
          <path d="M11 7.5h2" />
        </svg>
      );
    case "platforms":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14.5 14.5 0 0 1 0 18" />
          <path d="M12 3a14.5 14.5 0 0 0 0 18" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M9 7 4 12l5 5" />
          <path d="M4 12h10" />
          <path d="M14 5h5v14h-5" />
        </svg>
      );
  }
}

function BellIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 17H5.5a1.5 1.5 0 0 1-1.2-2.4L6 12.3V10a6 6 0 1 1 12 0v2.3l1.7 2.3a1.5 1.5 0 0 1-1.2 2.4H15" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function UserMenu({
  userEmail,
  userName,
}: {
  userEmail: string;
  userName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const displayName = getDisplayName(userEmail, userName);
  const initial = getDisplayInitial(userEmail, userName);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  async function handleLogout() {
    setIsLoggingOut(true);
    const supabase = createClient();
    await fetch("/api/dev-logout", { method: "POST" });
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <span className={styles.notification}>
        <BellIcon />
        <small>2</small>
      </span>

      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.avatar}>{initial}</span>
        <span className={styles.caret}>{open ? "v" : ">"}</span>
      </button>

      {open ? (
        <div className={styles.menu} role="menu">
          <div className={styles.profile}>
            <span className={styles.profileAvatar}>{initial}</span>
            <div>
              <strong>{displayName}</strong>
              <p>{userEmail}</p>
            </div>
          </div>

          <nav className={styles.menuList}>
            <Link href="/dashboard" className={styles.menuItem} onClick={() => setOpen(false)}>
              <span className={styles.iconWrap}><MenuIcon kind="student" /></span>
              Ver como Aluno
            </Link>
            <Link href="/dashboard/perfil" className={styles.menuItem} onClick={() => setOpen(false)}>
              <span className={styles.iconWrap}><MenuIcon kind="profile" /></span>
              Meu Perfil
            </Link>
            <Link href="/dashboard/configuracoes" className={styles.menuItem} onClick={() => setOpen(false)}>
              <span className={styles.iconWrap}><MenuIcon kind="settings" /></span>
              Configuracoes
            </Link>
            <Link href="/dashboard/meus-cursos" className={styles.menuItem} onClick={() => setOpen(false)}>
              <span className={styles.iconWrap}><MenuIcon kind="courses" /></span>
              Meus Cursos
            </Link>
            <Link href="/dashboard/plataformas" className={styles.menuItem} onClick={() => setOpen(false)}>
              <span className={styles.iconWrap}><MenuIcon kind="platforms" /></span>
              Minhas Plataformas
            </Link>
            <button
              type="button"
              className={styles.menuButton}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <span className={styles.iconWrap}><MenuIcon kind="logout" /></span>
              {isLoggingOut ? "Saindo..." : "Sair"}
            </button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
