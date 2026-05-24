"use client";

import { useState } from "react";
import styles from "./certificate-student-actions.module.css";

export function CertificateStudentActions({ code }: { code: string }) {
  const [message, setMessage] = useState("");

  return (
    <div className={styles.wrap}>
      <div className={styles.actions}>
      <button
        type="button"
        className={styles.primaryButton}
        onClick={() => {
          window.print();
          setMessage("Janela de impressao aberta para salvar em PDF.");
        }}
      >
        Baixar PDF
      </button>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={() => setMessage(`Codigo ${code} validado para a turma gratuita #36.`)}
      >
        Validar codigo
      </button>
      </div>
      {message ? <p className={styles.message}>{message}</p> : null}
    </div>
  );
}
