import { SupabaseClient } from "@supabase/supabase-js";
import {
  certificateLibrary,
  freeCourseCertificate,
  getCertificateBySlug,
  type CertificateDefinition,
} from "@/lib/certificate-data";
import {
  adminMembers as fallbackMembers,
  adminNavigationItems as fallbackAdminNavigation,
  comboItems as fallbackCombos,
  engagementHighlights as fallbackEngagement,
  liveClasses as fallbackLiveClasses,
  mediaBanners as fallbackBanners,
  moderationComments as fallbackComments,
  studentCourses as fallbackCourses,
  type AdminNavigationItem,
  type CourseItem,
  type LessonItem,
  type ModuleItem,
} from "@/lib/platform-data";
import type { AdminMenuIconKind } from "@/lib/admin-navigation-types";

export type DataSource = "supabase" | "fallback";

export type PlatformResult<T> = {
  data: T;
  source: DataSource;
  reason?: string;
};

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  progress: number | null;
  meta_label: string | null;
  summary: string | null;
  badge: string | null;
  hero_eyebrow: string | null;
  hero_title: string | null;
  hero_description: string | null;
  certificate_slug: string | null;
  sort_order: number | null;
};

type ModuleRow = {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  sort_order: number | null;
};

type LessonRow = {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  kind: "video" | "bonus" | "material" | null;
  duration: string | null;
  provider: string | null;
  sort_order: number | null;
};

type ProfileRow = {
  full_name?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  access_level?: string | null;
  access?: string | null;
  status?: string | null;
  turma?: string | null;
};

type BannerRow = {
  title?: string | null;
  placement?: string | null;
  audience?: string | null;
  status?: string | null;
};

type LiveClassRow = {
  title?: string | null;
  datetime_label?: string | null;
  datetime?: string | null;
  status?: string | null;
  audience?: string | null;
};

type CertificateRow = {
  slug?: string | null;
  title?: string | null;
  course_title?: string | null;
  turma?: string | null;
  duration_label?: string | null;
  hours?: string | null;
  minimum_lessons?: number | null;
  completed_lessons?: number | null;
  bonus_included?: boolean | null;
  bonus_completed?: boolean | null;
  is_available?: boolean | null;
  issue_date?: string | null;
  code?: string | null;
  student_name?: string | null;
  student_email?: string | null;
  signatory_name?: string | null;
  signatory_role?: string | null;
  description?: string | null;
  delivery_message?: string | null;
  release_window?: string | null;
  lessons?: string[] | null;
};

type AdminNavigationRow = {
  id?: string;
  slug: string;
  label: string;
  href: string;
  icon_key: AdminMenuIconKind | null;
  sort_order: number | null;
  is_visible: boolean | null;
};

function isMissingRelationError(message?: string) {
  return Boolean(
    message &&
      (message.includes("schema cache") ||
        message.includes("does not exist") ||
        message.includes("Could not find the table")),
  );
}

function fallbackResult<T>(data: T, reason: string): PlatformResult<T> {
  return { data, source: "fallback", reason };
}

export async function loadStudentCourses(supabase: SupabaseClient): Promise<PlatformResult<CourseItem[]>> {
  const { data: courses, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .order("sort_order", { ascending: true });

  if (courseError) {
    return fallbackResult(fallbackCourses, courseError.message);
  }

  if (!courses || courses.length === 0) {
    return fallbackResult(fallbackCourses, "Tabela courses sem dados.");
  }

  const courseRows = courses as CourseRow[];
  const courseIds = courseRows.map((course) => course.id);

  const { data: modules, error: moduleError } = await supabase
    .from("modules")
    .select("*")
    .in("course_id", courseIds)
    .order("sort_order", { ascending: true });

  if (moduleError) {
    return fallbackResult(fallbackCourses, moduleError.message);
  }

  const moduleRows = (modules ?? []) as ModuleRow[];
  const moduleIds = moduleRows.map((module) => module.id);

  const { data: lessons, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .in("module_id", moduleIds)
    .order("sort_order", { ascending: true });

  if (lessonError) {
    return fallbackResult(fallbackCourses, lessonError.message);
  }

  const lessonRows = (lessons ?? []) as LessonRow[];

  const mappedCourses = courseRows.map((course) => {
    const mappedModules: ModuleItem[] = moduleRows
      .filter((module) => module.course_id === course.id)
      .map((module) => {
        const mappedLessons: LessonItem[] = lessonRows
          .filter((lesson) => lesson.module_id === module.id)
          .map((lesson) => ({
            slug: lesson.slug,
            title: lesson.title,
            kind: lesson.kind ?? "video",
            duration: lesson.duration ?? "Sem duracao",
            provider: lesson.provider ?? undefined,
          }));

        return {
          slug: module.slug,
          title: module.title,
          lessons: mappedLessons,
        };
      });

    return {
      slug: course.slug,
      title: course.title,
      progress: course.progress ?? 0,
      metaLabel: course.meta_label ?? "Conteudo do portal",
      summary: course.summary ?? "Curso integrado ao Supabase.",
      badge: course.badge ?? "Curso",
      heroEyebrow: course.hero_eyebrow ?? "Instituto Despertamente",
      heroTitle: course.hero_title ?? course.title,
      heroDescription: course.hero_description ?? "Curso carregado do Supabase.",
      certificateSlug: course.certificate_slug ?? undefined,
      modules: mappedModules,
    } satisfies CourseItem;
  });

  return { data: mappedCourses, source: "supabase" };
}

export async function loadLiveClasses(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("live_classes").select("*");

  if (error) {
    return fallbackResult(fallbackLiveClasses, error.message);
  }

  if (!data || data.length === 0) {
    return fallbackResult(fallbackLiveClasses, "Tabela live_classes sem dados.");
  }

  return {
    data: (data as LiveClassRow[]).map((item) => ({
      title: item.title ?? "Aula ao vivo",
      datetime: item.datetime_label ?? item.datetime ?? "Sem data",
      status: item.status ?? "Em breve",
      audience: item.audience ?? "Todos os alunos",
    })),
    source: "supabase" as const,
  };
}

export async function loadMembers(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("profiles").select("*").limit(50);

  if (error) {
    return fallbackResult(fallbackMembers, error.message);
  }

  if (!data || data.length === 0) {
    return fallbackResult(fallbackMembers, "Tabela profiles sem dados.");
  }

  return {
    data: (data as ProfileRow[]).map((member) => ({
      name: member.full_name ?? member.name ?? "Membro IDM",
      email: member.email ?? "sem-email@idm.com.br",
      role: member.role ?? "Aluno",
      access: member.access_level ?? member.access ?? "Portal",
      status: member.status ?? "Ativo",
      turma: member.turma ?? "-",
    })),
    source: "supabase" as const,
  };
}

export async function loadBanners(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("banners").select("*");

  if (error) {
    return fallbackResult(fallbackBanners, error.message);
  }

  if (!data || data.length === 0) {
    return fallbackResult(fallbackBanners, "Tabela banners sem dados.");
  }

  return {
    data: (data as BannerRow[]).map((banner) => ({
      title: banner.title ?? "Banner do portal",
      placement: banner.placement ?? "Home",
      audience: banner.audience ?? "Todos os alunos",
      status: banner.status ?? "Publicado",
    })),
    source: "supabase" as const,
  };
}

export async function loadAdminNavigation(
  supabase: SupabaseClient,
): Promise<PlatformResult<AdminNavigationItem[]>> {
  const { data, error } = await supabase
    .from("admin_navigation_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return fallbackResult(fallbackAdminNavigation, error.message);
  }

  if (!data || data.length === 0) {
    return fallbackResult(fallbackAdminNavigation, "Tabela admin_navigation_items sem dados.");
  }

  const mapped = (data as AdminNavigationRow[]).map((item, index) => ({
    slug: item.slug,
    label: item.label,
    href: item.href,
    iconKey: item.icon_key ?? "home",
    sortOrder: Number.isFinite(item.sort_order ?? NaN) ? (item.sort_order as number) : index + 1,
    isVisible: item.is_visible !== false,
  }));

  return { data: mapped, source: "supabase" };
}

export async function loadCertificatesForEmail(
  supabase: SupabaseClient,
  email: string,
): Promise<PlatformResult<CertificateDefinition[]>> {
  const { data, error } = await supabase.from("certificates").select("*").eq("student_email", email);

  if (error) {
    return fallbackResult(certificateLibrary, error.message);
  }

  if (!data || data.length === 0) {
    return fallbackResult(certificateLibrary, "Tabela certificates sem dados para este e-mail.");
  }

  const mapped = (data as CertificateRow[]).map<CertificateDefinition>((item) => ({
    slug: item.slug ?? "certificado-idm",
    title: item.title ?? "Certificado de Participacao",
    courseTitle: item.course_title ?? "Curso do IDM",
    turma: item.turma ?? "#00",
    durationLabel: item.duration_label ?? "Jornada do IDM",
    hours: item.hours ?? "0 horas",
    minimumLessons: item.minimum_lessons ?? 0,
    completedLessons: item.completed_lessons ?? 0,
    bonusIncluded: item.bonus_included ?? false,
    bonusCompleted: item.bonus_completed ?? false,
    isAvailable: item.is_available ?? false,
    issueDate: item.issue_date ?? "",
    code: item.code ?? "",
    studentName: item.student_name ?? freeCourseCertificate.studentName,
    signatoryName: item.signatory_name ?? freeCourseCertificate.signatoryName,
    signatoryRole: item.signatory_role ?? freeCourseCertificate.signatoryRole,
    description: item.description ?? freeCourseCertificate.description,
    deliveryMessage: item.delivery_message ?? freeCourseCertificate.deliveryMessage,
    releaseWindow: item.release_window ?? freeCourseCertificate.releaseWindow,
    lessons: item.lessons ?? freeCourseCertificate.lessons,
  }));

  return { data: mapped, source: "supabase" };
}

export async function loadCertificateBySlug(
  supabase: SupabaseClient,
  email: string,
  slug: string,
): Promise<PlatformResult<CertificateDefinition | null>> {
  const certificates = await loadCertificatesForEmail(supabase, email);
  const found = certificates.data.find((certificate) => certificate.slug === slug);

  if (found) {
    return {
      data: found,
      source: certificates.source,
      reason: certificates.reason,
    };
  }

  return {
    data: getCertificateBySlug(slug) ?? null,
    source: "fallback",
    reason: "Certificado nao encontrado no Supabase para este aluno.",
  };
}

export async function loadEngagementHighlights() {
  return {
    data: fallbackEngagement,
    source: "fallback" as const,
    reason: "Indicadores ainda em modo demonstrativo.",
  };
}

export async function loadModerationComments() {
  return {
    data: fallbackComments,
    source: "fallback" as const,
    reason: "Comentarios ainda em modo demonstrativo.",
  };
}

export async function loadCombos() {
  return {
    data: fallbackCombos,
    source: "fallback" as const,
    reason: "Combos ainda em modo demonstrativo.",
  };
}

export async function inspectPortalTables(supabase: SupabaseClient) {
  const tables = [
    "courses",
    "modules",
    "lessons",
    "banners",
    "certificates",
    "live_classes",
    "admin_navigation_items",
  ];
  const checks = await Promise.all(
    tables.map(async (table) => {
      const { error } = await supabase.from(table).select("*").limit(1);
      return {
        table,
        ready: !error,
        missing: isMissingRelationError(error?.message),
        reason: error?.message,
      };
    }),
  );

  return checks;
}
