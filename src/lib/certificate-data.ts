export type CertificateDefinition = {
  slug: string;
  title: string;
  courseTitle: string;
  turma: string;
  durationLabel: string;
  hours: string;
  minimumLessons: number;
  completedLessons: number;
  bonusIncluded: boolean;
  bonusCompleted: boolean;
  isAvailable: boolean;
  issueDate: string;
  code: string;
  studentName: string;
  signatoryName: string;
  signatoryRole: string;
  description: string;
  deliveryMessage: string;
  releaseWindow: string;
  lessons: string[];
};

export const freeCourseCertificate: CertificateDefinition = {
  slug: "psicanalise-integrativa-gratuita-36",
  title: "Certificado de Participacao",
  courseTitle: "Psicanalise Integrativa",
  turma: "#36",
  durationLabel: "Curso gratuito de 3 dias",
  hours: "12 horas",
  minimumLessons: 3,
  completedLessons: 3,
  bonusIncluded: true,
  bonusCompleted: true,
  isAvailable: true,
  issueDate: "24/05/2026",
  code: "IDM-PI36-0001",
  studentName: "Pedro Murari",
  signatoryName: "Rodrygo Murari",
  signatoryRole: "Fundador do Instituto Despertamente",
  description:
    "Certificado emitido para alunos que concluirem a jornada gratuita de 3 dias e cumprirem os criterios definidos pela equipe do IDM.",
  deliveryMessage:
    "Seu certificado ja esta liberado para retirada aqui no portal do aluno, com validacao e download em PDF.",
  releaseWindow: "Liberado apos a conclusao dos 3 dias e da aula bonus do fundador.",
  lessons: [
    "Dia 01 - Fundamentos da Psicanalise Integrativa",
    "Dia 02 - Estrutura emocional e leitura clinica",
    "Dia 03 - Integracao, aplicacao e chamada para proximo passo",
  ],
};

export const certificateLibrary = [freeCourseCertificate];

export function getCertificateBySlug(slug: string) {
  return certificateLibrary.find((certificate) => certificate.slug === slug);
}
