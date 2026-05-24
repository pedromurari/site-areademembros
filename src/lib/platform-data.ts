import type { AdminNavigationItem } from "@/lib/admin-navigation-types";
import { defaultAdminNavigationItems } from "@/lib/admin-navigation";
export type { AdminNavigationItem } from "@/lib/admin-navigation-types";

export type LessonItem = {
  slug: string;
  title: string;
  kind: "video" | "bonus" | "material";
  duration: string;
  provider?: string;
};

export type ModuleItem = {
  slug: string;
  title: string;
  lessons: LessonItem[];
};

export type CourseItem = {
  slug: string;
  title: string;
  progress: number;
  metaLabel: string;
  summary: string;
  badge: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  certificateSlug?: string;
  modules: ModuleItem[];
};

export const studentCourses: CourseItem[] = [
  {
    slug: "formacao-psicanalise-clinica-integrativa",
    title: "Formacao em Psicanalise Clinica Integrativa",
    progress: 0,
    metaLabel: "Alunos ativos",
    summary: "Acesso a aulas gravadas, biblioteca digital, materiais e trilhas avancadas.",
    badge: "Principal",
    heroEyebrow: "Formacao completa do IDM",
    heroTitle: "Portal do Aluno",
    heroDescription:
      "Acompanhe suas aulas, materiais, certificados e proximos encontros em um so lugar.",
    modules: [
      {
        slug: "modulo-1",
        title: "Modulo 1 - Introducao a Psicanalise Clinica Integrativa",
        lessons: [
          {
            slug: "aula-1-introducao",
            title: "Aula 1 - Introducao a Psicanalise Clinica Integrativa",
            kind: "video",
            duration: "42 min",
            provider: "Panda Video",
          },
        ],
      },
      {
        slug: "modulo-2",
        title: "Modulo 2 - Teorias do Aparelho Psiquico",
        lessons: [
          {
            slug: "aula-2-aparelho-psiquico",
            title: "Aula 2 - Teorias do Aparelho Psiquico",
            kind: "video",
            duration: "38 min",
            provider: "Panda Video",
          },
        ],
      },
      {
        slug: "biblioteca-1",
        title: "Biblioteca Digital",
        lessons: [
          {
            slug: "biblioteca-digital",
            title: "Biblioteca Digital",
            kind: "material",
            duration: "Arquivos",
          },
        ],
      },
      {
        slug: "biblioteca-2",
        title: "Biblioteca Digital 2",
        lessons: [
          {
            slug: "biblioteca-digital-2",
            title: "Biblioteca Digital 2",
            kind: "material",
            duration: "Arquivos",
          },
        ],
      },
    ],
  },
  {
    slug: "psicanalise-integrativa-gratuita-36",
    title: "Psicanalise Integrativa Gratuita #36",
    progress: 100,
    metaLabel: "Campanha gratuita",
    summary: "Jornada de 3 dias com bonus do fundador e retirada de certificado dentro do portal.",
    badge: "Turma #36",
    heroEyebrow: "Curso gratuito de 3 dias",
    heroTitle: "Psicanalise Integrativa #36",
    heroDescription:
      "Assista as 3 aulas da jornada gratuita, desbloqueie o bonus do fundador e retire seu certificado.",
    certificateSlug: "psicanalise-integrativa-gratuita-36",
    modules: [
      {
        slug: "dia-1",
        title: "Modulo 1 - Abertura da Jornada",
        lessons: [
          {
            slug: "dia-1-fundamentos",
            title: "Dia 01 - Fundamentos da Psicanalise Integrativa",
            kind: "video",
            duration: "54 min",
            provider: "YouTube",
          },
        ],
      },
      {
        slug: "dia-2",
        title: "Modulo 2 - Estrutura Emocional",
        lessons: [
          {
            slug: "dia-2-estrutura-emocional",
            title: "Dia 02 - Estrutura emocional e leitura clinica",
            kind: "video",
            duration: "49 min",
            provider: "YouTube",
          },
        ],
      },
      {
        slug: "dia-3",
        title: "Modulo 3 - Integracao Final",
        lessons: [
          {
            slug: "dia-3-integracao-final",
            title: "Dia 03 - Integracao, aplicacao e chamada para proximo passo",
            kind: "video",
            duration: "61 min",
            provider: "YouTube",
          },
        ],
      },
      {
        slug: "bonus-fundador",
        title: "Bonus do Fundador",
        lessons: [
          {
            slug: "bonus-fundador",
            title: "Aula bonus do fundador",
            kind: "bonus",
            duration: "32 min",
            provider: "YouTube",
          },
        ],
      },
    ],
  },
];

export function getStudentCourseBySlug(slug: string) {
  return studentCourses.find((course) => course.slug === slug);
}

export const adminSections = [
  {
    slug: "navegacao",
    title: "Menu lateral",
    description: "Reordene os menus do ADM, troque os icones e defina a visibilidade de cada item.",
  },
  {
    slug: "painel-engajamento",
    title: "Painel de Engajamento",
    description: "Acompanhe progresso, participacao e movimentacao dos alunos por curso e por turma.",
  },
  {
    slug: "certificados",
    title: "Certificados",
    description: "Configure regras de emissao, liberacao e retirada de certificados no portal.",
  },
  {
    slug: "meus-cursos",
    title: "Meus Cursos",
    description: "Organize capas, ordem dos cursos, modulos, aulas e disponibilidade.",
  },
  {
    slug: "aulas-ao-vivo",
    title: "Aulas ao Vivo",
    description: "Cadastre proximas transmissoes e controle o replay das aulas especiais.",
  },
  {
    slug: "gamificacao",
    title: "Gamificacao",
    description: "Espaco para rankings, selos e dinamicas de engajamento dos alunos.",
  },
  {
    slug: "comentarios",
    title: "Comentarios",
    description: "Modere interacoes e acompanhe perguntas que surgirem nas aulas.",
  },
  {
    slug: "membros",
    title: "Membros",
    description: "Gerencie usuarios, acessos, turmas, perfis e permissoes da plataforma.",
  },
  {
    slug: "combos",
    title: "Combos",
    description: "Agrupe trilhas, cursos e campanhas em pacotes de acesso.",
  },
  {
    slug: "gestao-de-midias",
    title: "Gestao de Midias",
    description: "Atualize banners, artes de destaque, logos e comunicados da plataforma.",
  },
];

export function getAdminSectionBySlug(slug: string) {
  return adminSections.find((section) => section.slug === slug);
}

export const adminNavigationItems: AdminNavigationItem[] = defaultAdminNavigationItems;

export const liveClasses = [
  {
    title: "Plantao de duvidas da turma #36",
    datetime: "27/05/2026 - 20h00",
    status: "Agendada",
    audience: "Curso gratuito de Psicanalise Integrativa",
  },
  {
    title: "Encontro de aprofundamento clinico",
    datetime: "31/05/2026 - 19h30",
    status: "Em breve",
    audience: "Formacao em Psicanalise Clinica Integrativa",
  },
];

export const engagementHighlights = [
  {
    label: "Alunos ativos",
    value: "146",
    detail: "Somando formacao completa, gratuito #36 e bonus liberados.",
  },
  {
    label: "Conclusao da turma #36",
    value: "78%",
    detail: "Percentual de alunos que chegaram ao fim das 3 aulas da jornada gratuita.",
  },
  {
    label: "Retirada de certificados",
    value: "52",
    detail: "Certificados ja abertos ou baixados no portal do aluno.",
  },
];

export const adminMembers = [
  {
    name: "Pedro Murari",
    email: "pdrmurari@gmail.com",
    role: "Admin",
    access: "Total",
    status: "Ativo",
    turma: "#36",
  },
  {
    name: "Ana Clara Freitas",
    email: "ana.clara@aluno.idm.com.br",
    role: "Aluna",
    access: "Curso gratuito",
    status: "Ativo",
    turma: "#36",
  },
  {
    name: "Rafael Costa",
    email: "rafael.costa@aluno.idm.com.br",
    role: "Aluno",
    access: "Formacao completa",
    status: "Pendente",
    turma: "Clinica 2026",
  },
];

export const mediaBanners = [
  {
    title: "Banner principal da home do aluno",
    placement: "Topo do portal",
    audience: "Todos os alunos",
    status: "Publicado",
  },
  {
    title: "Campanha Psicanalise Integrativa #36",
    placement: "Curso gratuito",
    audience: "Turma #36",
    status: "Publicado",
  },
  {
    title: "Chamada para formacao completa",
    placement: "Apos a aula bonus",
    audience: "Leads do gratuito",
    status: "Rascunho",
  },
];

export const moderationComments = [
  {
    author: "Camila Souza",
    context: "Dia 02 - Estrutura emocional e leitura clinica",
    status: "Aguardando moderacao",
  },
  {
    author: "Marcos Vieira",
    context: "Aula 1 - Introducao a Psicanalise Clinica Integrativa",
    status: "Respondido",
  },
  {
    author: "Priscila Andrade",
    context: "Aula bonus do fundador",
    status: "Novo",
  },
];

export const comboItems = [
  {
    title: "Combo entrada IDM",
    content: "Curso gratuito + bonus do fundador + convite para formacao",
    status: "Ativo",
  },
  {
    title: "Combo clinico avancado",
    content: "Formacao + biblioteca digital + encontros ao vivo",
    status: "Planejamento",
  },
];
