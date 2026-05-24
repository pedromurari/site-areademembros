"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./logout-button.module.css";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={async () => {
        const supabase = createClient();
        await fetch("/api/dev-logout", { method: "POST" });
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
      }}
    >
      Sair
    </button>
  );
}
