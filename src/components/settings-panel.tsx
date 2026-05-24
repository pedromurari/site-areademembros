"use client";

import { useState } from "react";
import styles from "@/app/dashboard/account.module.css";

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    liveClassReminder: true,
    certificateAlerts: true,
    compactView: false,
  });
  const [message, setMessage] = useState("");

  function updateField(field: keyof typeof settings) {
    setSettings((current) => ({ ...current, [field]: !current[field] }));
  }

  return (
    <div className={styles.infoGrid}>
      <article className={styles.infoCard}>
        <span>Notificacoes</span>
        <strong>Alertas por e-mail</strong>
        <p>Escolha quais avisos voce quer receber sobre aulas ao vivo, certificados e novas trilhas.</p>

        <div className={styles.fieldList}>
          <label className={styles.profileField}>
            <strong>Avisos gerais por e-mail</strong>
            <button type="button" className={styles.softButton} onClick={() => updateField("emailAlerts")}>
              {settings.emailAlerts ? "Ativado" : "Desativado"}
            </button>
          </label>

          <label className={styles.profileField}>
            <strong>Lembrete de aulas ao vivo</strong>
            <button type="button" className={styles.softButton} onClick={() => updateField("liveClassReminder")}>
              {settings.liveClassReminder ? "Ativado" : "Desativado"}
            </button>
          </label>

          <label className={styles.profileField}>
            <strong>Aviso de certificado liberado</strong>
            <button type="button" className={styles.softButton} onClick={() => updateField("certificateAlerts")}>
              {settings.certificateAlerts ? "Ativado" : "Desativado"}
            </button>
          </label>
        </div>
      </article>

      <article className={styles.infoCard}>
        <span>Experiencia</span>
        <strong>Preferencias do portal</strong>
        <p>Esses ajustes ajudam a deixar a area de membros mais alinhada ao seu jeito de navegar.</p>

        <div className={styles.fieldList}>
          <label className={styles.profileField}>
            <strong>Visualizacao compacta</strong>
            <button type="button" className={styles.softButton} onClick={() => updateField("compactView")}>
              {settings.compactView ? "Ativada" : "Desativada"}
            </button>
          </label>

          <label className={styles.profileField}>
            <strong>Seguranca da conta</strong>
            <span>Para trocar senha e regras de acesso, vamos integrar isso direto com o Supabase.</span>
          </label>
        </div>

        <div className={styles.platformActions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => setMessage("Preferencias salvas localmente nesta primeira versao do portal.")}
          >
            Salvar preferencias
          </button>
        </div>

        {message ? <p>{message}</p> : null}
      </article>
    </div>
  );
}
