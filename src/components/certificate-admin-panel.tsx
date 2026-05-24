"use client";

import { useState } from "react";
import { freeCourseCertificate } from "@/lib/certificate-data";
import styles from "@/app/admin/certificados/page.module.css";

export function CertificateAdminPanel() {
  const [form, setForm] = useState({
    title: freeCourseCertificate.title,
    courseTitle: freeCourseCertificate.courseTitle,
    turma: freeCourseCertificate.turma,
    hours: freeCourseCertificate.hours,
    signatoryName: freeCourseCertificate.signatoryName,
    signatoryRole: freeCourseCertificate.signatoryRole,
    code: freeCourseCertificate.code,
    minimumLessons: String(freeCourseCertificate.minimumLessons),
    completedLessons: String(freeCourseCertificate.completedLessons),
    releaseWindow: freeCourseCertificate.releaseWindow,
    deliveryMessage: freeCourseCertificate.deliveryMessage,
    bonusIncluded: freeCourseCertificate.bonusIncluded,
    emailNotification: true,
    allowDownload: true,
    active: freeCourseCertificate.isAvailable,
  });
  const [status, setStatus] = useState("Configuracao pronta para a turma gratuita #36.");

  function updateField(field: string, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <section className={styles.grid}>
      <div className={styles.configPanel}>
        <div className={styles.panelHeader}>
          <h2>Configuracao do certificado</h2>
          <p>Defina a regra de emissao, a liberacao e a experiencia do aluno dentro do portal.</p>
        </div>

        <div className={styles.formGrid}>
          <label>
            Titulo do certificado
            <input value={form.title} onChange={(event) => updateField("title", event.target.value)} />
          </label>

          <label>
            Nome do curso
            <input
              value={form.courseTitle}
              onChange={(event) => updateField("courseTitle", event.target.value)}
            />
          </label>

          <label>
            Turma
            <input value={form.turma} onChange={(event) => updateField("turma", event.target.value)} />
          </label>

          <label>
            Carga horaria
            <input value={form.hours} onChange={(event) => updateField("hours", event.target.value)} />
          </label>

          <label>
            Minimo de aulas
            <input
              value={form.minimumLessons}
              onChange={(event) => updateField("minimumLessons", event.target.value)}
            />
          </label>

          <label>
            Aulas concluidas no exemplo
            <input
              value={form.completedLessons}
              onChange={(event) => updateField("completedLessons", event.target.value)}
            />
          </label>

          <label>
            Assinatura
            <input
              value={form.signatoryName}
              onChange={(event) => updateField("signatoryName", event.target.value)}
            />
          </label>

          <label>
            Cargo
            <input
              value={form.signatoryRole}
              onChange={(event) => updateField("signatoryRole", event.target.value)}
            />
          </label>

          <label>
            Codigo
            <input value={form.code} onChange={(event) => updateField("code", event.target.value)} />
          </label>

          <label className={styles.fullWidth}>
            Janela de liberacao
            <input
              value={form.releaseWindow}
              onChange={(event) => updateField("releaseWindow", event.target.value)}
            />
          </label>

          <label className={styles.fullWidth}>
            Mensagem para o aluno
            <input
              value={form.deliveryMessage}
              onChange={(event) => updateField("deliveryMessage", event.target.value)}
            />
          </label>

          <label className={styles.toggleField}>
            <input
              type="checkbox"
              checked={form.bonusIncluded}
              onChange={(event) => updateField("bonusIncluded", event.target.checked)}
            />
            Exigir a aula bonus do fundador
          </label>

          <label className={styles.toggleField}>
            <input
              type="checkbox"
              checked={form.emailNotification}
              onChange={(event) => updateField("emailNotification", event.target.checked)}
            />
            Enviar aviso por e-mail quando o certificado for liberado
          </label>

          <label className={styles.toggleField}>
            <input
              type="checkbox"
              checked={form.allowDownload}
              onChange={(event) => updateField("allowDownload", event.target.checked)}
            />
            Permitir download em PDF direto pela area do aluno
          </label>

          <label className={styles.toggleField}>
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => updateField("active", event.target.checked)}
            />
            Certificado liberado para retirada
          </label>
        </div>

        <div className={styles.actionRow}>
          <button type="button" onClick={() => setStatus("Rascunho salvo localmente para esta configuracao.")}>
            Salvar rascunho
          </button>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={() =>
              setStatus("Certificado da turma gratuita #36 marcado como pronto para retirada dos alunos.")
            }
          >
            Liberar certificado
          </button>
        </div>

        <p className={styles.status}>{status}</p>
      </div>

      <div className={styles.previewPanel}>
        <div className={styles.previewHeader}>
          <h3>Preview da retirada do aluno</h3>
          <p>Visao da experiencia do aluno na secao Certificados.</p>
        </div>

        <div className={styles.previewCard}>
          <span>{form.active ? "Disponivel para retirada" : "Em configuracao"}</span>
          <strong>
            {form.title} - {form.courseTitle} {form.turma}
          </strong>
          <p>
            {form.hours} • {form.minimumLessons} aulas minimas • {form.completedLessons} concluidas
          </p>
          <p>{form.bonusIncluded ? "Bonus do fundador incluso na regra de emissao" : "Bonus nao obrigatorio"}</p>
          <p>{form.releaseWindow}</p>
          <p>{form.deliveryMessage}</p>
          <p>Codigo: {form.code}</p>
        </div>

        <div className={styles.checklist}>
          <h4>Checklist operacional</h4>
          <ul>
            <li>{form.active ? "Retirada liberada no portal do aluno" : "Retirada ainda bloqueada no portal"}</li>
            <li>{form.allowDownload ? "Download em PDF disponivel" : "Download em PDF desativado"}</li>
            <li>{form.emailNotification ? "Aviso automatico por e-mail ativo" : "Sem aviso automatico por e-mail"}</li>
            <li>
              {form.bonusIncluded
                ? "Aula bonus do fundador entra na validacao"
                : "Aula bonus nao entra na validacao"}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
