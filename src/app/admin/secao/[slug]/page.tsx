import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { AdminNavigationManager } from "@/components/admin-navigation-manager";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { readLocalAdminNavigation } from "@/lib/admin-navigation";
import { getAdminSectionBySlug } from "@/lib/platform-data";
import {
  inspectPortalTables,
  loadAdminNavigation,
  loadBanners,
  loadCombos,
  loadEngagementHighlights,
  loadLiveClasses,
  loadMembers,
  loadModerationComments,
  loadStudentCourses,
} from "@/lib/supabase/platform";
import { createClient } from "@/lib/supabase/server";
import styles from "@/app/admin/shared-detail.module.css";

type SectionData = {
  courses: Awaited<ReturnType<typeof loadStudentCourses>>["data"];
  liveClasses: Awaited<ReturnType<typeof loadLiveClasses>>["data"];
  members: Awaited<ReturnType<typeof loadMembers>>["data"];
  banners: Awaited<ReturnType<typeof loadBanners>>["data"];
  combos: Awaited<ReturnType<typeof loadCombos>>["data"];
  comments: Awaited<ReturnType<typeof loadModerationComments>>["data"];
  engagement: Awaited<ReturnType<typeof loadEngagementHighlights>>["data"];
  navigation: Awaited<ReturnType<typeof loadAdminNavigation>>["data"];
  missingTables: string[];
};

function renderSectionBody(slug: string, data: SectionData) {
  switch (slug) {
    case "painel-engajamento":
      return (
        <>
          <div className={styles.grid}>
            {data.engagement.map((item) => (
              <article key={item.label} className={styles.card}>
                <span>Indicador</span>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
                <small className={styles.helper}>{item.detail}</small>
              </article>
            ))}
          </div>

          <div className={styles.stack}>
            <article className={styles.wideCard}>
              <span>Leitura rapida</span>
              <strong>Funil da turma gratuita conectado ao portal</strong>
              <p>
                A jornada gratuita ja aponta entrada, consumo das aulas e retirada do certificado. O passo
                seguinte ideal aqui e medir conversao da turma #36 para a formacao principal.
              </p>
            </article>
          </div>
        </>
      );

    case "meus-cursos":
      return (
        <>
          <div className={styles.grid}>
            {data.courses.map((course) => (
              <article key={course.slug} className={styles.card}>
                <span>{course.badge}</span>
                <strong>{course.title}</strong>
                <p>{course.summary}</p>
                <Link href={`/admin/curso/${course.slug}`} className={styles.inlineLink}>
                  Abrir configuracao do curso
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.moduleGrid}>
            {data.courses.map((course, index) => (
              <article key={course.slug} className={styles.moduleCard}>
                <span>Ordem no portal</span>
                <strong>
                  {String(index + 1).padStart(2, "0")} • {course.title}
                </strong>
                <ul>
                  <li>{course.modules.length} modulos cadastrados</li>
                  <li>{course.progress}% de progresso demonstrativo</li>
                  <li>{course.certificateSlug ? "Tem certificado vinculado" : "Sem certificado vinculado"}</li>
                </ul>
              </article>
            ))}
          </div>
        </>
      );

    case "aulas-ao-vivo":
      return (
        <div className={styles.grid}>
          {data.liveClasses.map((liveClass) => (
            <article key={liveClass.title} className={styles.card}>
              <span>{liveClass.status}</span>
              <strong>{liveClass.title}</strong>
              <p>{liveClass.audience}</p>
              <small className={styles.helper}>{liveClass.datetime}</small>
            </article>
          ))}
        </div>
      );

    case "comentarios":
      return (
        <div className={styles.grid}>
          {data.comments.map((comment) => (
            <article key={`${comment.author}-${comment.context}`} className={styles.card}>
              <span>{comment.status}</span>
              <strong>{comment.author}</strong>
              <p>{comment.context}</p>
              <small className={styles.helper}>Pronto para moderar, responder ou arquivar.</small>
            </article>
          ))}
        </div>
      );

    case "membros":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Perfil</th>
                <th>Acesso</th>
                <th>Status</th>
                <th>Turma</th>
              </tr>
            </thead>
            <tbody>
              {data.members.map((member) => (
                <tr key={member.email}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>{member.access}</td>
                  <td>{member.status}</td>
                  <td>{member.turma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "combos":
      return (
        <div className={styles.grid}>
          {data.combos.map((combo) => (
            <article key={combo.title} className={styles.card}>
              <span>{combo.status}</span>
              <strong>{combo.title}</strong>
              <p>{combo.content}</p>
            </article>
          ))}
        </div>
      );

    case "gestao-de-midias":
      return (
        <>
          <div className={styles.grid}>
            {data.banners.map((banner) => (
              <article key={banner.title} className={styles.card}>
                <span>{banner.status}</span>
                <strong>{banner.title}</strong>
                <p>{banner.placement}</p>
                <small className={styles.helper}>Publico: {banner.audience}</small>
              </article>
            ))}
          </div>

          <div className={styles.stack}>
            <article className={styles.wideCard}>
              <span>Artes do IDM</span>
              <strong>Espaco para trocar banners, chamadas e anuncios</strong>
              <p>
                Aqui vamos encaixar uploads reais de capa, desktop, mobile, links promocionais e a ordem
                de exibicao no portal do aluno.
              </p>
            </article>
          </div>
        </>
      );

    case "navegacao":
      return <AdminNavigationManager items={data.navigation} />;

    case "gamificacao":
      return (
        <div className={styles.grid}>
          <article className={styles.card}>
            <span>Meta</span>
            <strong>Selo aluno em movimento</strong>
            <p>Espaco para metas de conclusao, streaks, ranking e pequenas recompensas internas.</p>
          </article>
          <article className={styles.card}>
            <span>Regras</span>
            <strong>Concluir aulas e comentar</strong>
            <p>A dinamica pode combinar consumo de aula, bonus, interacao e retirada de certificado.</p>
          </article>
        </div>
      );

    default:
      return (
        <div className={styles.grid}>
          <article className={styles.card}>
            <span>Configuracao</span>
            <strong>Parametros da secao</strong>
            <p>Espaco pensado para filtros, listagens e blocos operacionais da plataforma.</p>
          </article>
        </div>
      );
  }
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getAdminSectionBySlug(slug);
  if (!section) redirect("/admin");

  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user && !devSession) redirect("/login");

  const [courses, liveClasses, members, banners, combos, comments, engagement, checks] = await Promise.all([
    loadStudentCourses(supabase),
    loadLiveClasses(supabase),
    loadMembers(supabase),
    loadBanners(supabase),
    loadCombos(),
    loadModerationComments(),
    loadEngagementHighlights(),
    inspectPortalTables(supabase),
  ]);

  const navigation = devSession
    ? (await readLocalAdminNavigation()) ?? (await loadAdminNavigation(supabase)).data
    : (await loadAdminNavigation(supabase)).data;

  const missingTables = checks.filter((item) => item.missing).map((item) => item.table);

  return (
    <AdminShell activeHref={`/admin/secao/${slug}`} userEmail={user?.email ?? DEV_LOGIN.email}>
      <section className={styles.page}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Area administrativa</span>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
          {missingTables.length ? (
            <small className={styles.helper}>
              Faltam tabelas no Supabase: {missingTables.join(", ")}. Rode `supabase/001_portal_schema.sql`.
            </small>
          ) : null}
        </div>

        <div className={styles.actionRow}>
          <Link href="/admin" className={styles.secondaryAction}>
            Voltar ao painel
          </Link>
          <Link href="/admin/secao/meus-cursos" className={styles.secondaryAction}>
            Gerenciar cursos
          </Link>
          <Link href="/admin/certificados" className={styles.primaryAction}>
            Abrir certificados
          </Link>
        </div>

        {renderSectionBody(slug, {
          courses: courses.data,
          liveClasses: liveClasses.data,
          members: members.data,
          banners: banners.data,
          combos: combos.data,
          comments: comments.data,
          engagement: engagement.data,
          navigation,
          missingTables,
        })}
      </section>
    </AdminShell>
  );
}
