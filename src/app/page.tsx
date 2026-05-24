import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

/* ── Nav ───────────────────────────────────────────── */
const navLinks = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Jornadas", href: "#jornadas" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

/* ── Stats ─────────────────────────────────────────── */
const stats = [
  { value: "+3.200", label: "alunos transformados" },
  { value: "14", label: "jornadas ativas" },
  { value: "+220h", label: "de conteúdo exclusivo" },
  { value: "98%", label: "de satisfação" },
];

/* ── Recursos da plataforma ────────────────────────── */
const features = [
  {
    title: "Jornadas Estruturadas",
    desc: "Trilhas pedagógicas completas, do básico ao avançado, com progressão clara e objetivos definidos a cada etapa.",
  },
  {
    title: "Aulas ao Vivo",
    desc: "Encontros semanais com especialistas, mentorias em grupo e plantões de dúvidas — tudo gravado para assistir quando quiser.",
  },
  {
    title: "Comunidade Ativa",
    desc: "Conecte-se com milhares de alunos, participe de grupos de estudo e compartilhe experiências com sua turma.",
  },
  {
    title: "Certificados Oficiais",
    desc: "Certificado de conclusão para cada jornada finalizada. Documentação completa do seu desenvolvimento.",
  },
  {
    title: "Material Complementar",
    desc: "E-books, exercícios práticos, meditações guiadas e ferramentas exclusivas para aprofundar sua jornada.",
  },
  {
    title: "Acesso Vitalício",
    desc: "Estude no seu próprio ritmo. Todo o conteúdo adquirido fica disponível para sempre, sem prazo de expiração.",
  },
];

/* ── Jornadas ──────────────────────────────────────── */
const modules = [
  {
    category: "Fundamentos",
    title: "Jornada do Autoconhecimento",
    desc: "O ponto de partida para quem deseja iniciar uma transformação real e duradoura, de dentro para fora.",
    duration: "12 semanas",
    level: "Iniciante",
    accent: "#c79a3b",
  },
  {
    category: "Espiritualidade",
    title: "Numerologia Despertamente",
    desc: "Decodifique sua missão de vida, talentos e desafios ocultos através da linguagem universal dos números.",
    duration: "8 semanas",
    level: "Todos os níveis",
    accent: "#177c6b",
  },
  {
    category: "Consciência",
    title: "Astrologia Aplicada",
    desc: "Entenda seu mapa astral como ferramenta de autoconhecimento e orientação para as grandes decisões da vida.",
    duration: "10 semanas",
    level: "Iniciante ao intermediário",
    accent: "#6d4ab5",
  },
  {
    category: "Prática Contemplativa",
    title: "Meditação e Presença",
    desc: "Técnicas de meditação, mindfulness e respiração para cultivar equilíbrio e clareza mental no cotidiano.",
    duration: "6 semanas",
    level: "Todos os níveis",
    accent: "#2b7a9e",
  },
  {
    category: "Desenvolvimento",
    title: "Espiritualidade Integrativa",
    desc: "Uma visão ampla que integra filosofia, ciência e espiritualidade em um caminho coerente e transformador.",
    duration: "10 semanas",
    level: "Intermediário",
    accent: "#8b5cf6",
  },
  {
    category: "Prosperidade",
    title: "Finanças e Propósito",
    desc: "Reconecte sua relação com o dinheiro e a prosperidade a partir de uma perspectiva de abundância consciente.",
    duration: "8 semanas",
    level: "Todos os níveis",
    accent: "#c79a3b",
  },
];

/* ── Depoimentos ───────────────────────────────────── */
const testimonials = [
  {
    text: "O IDM mudou completamente a forma como me relaciono comigo mesma. As jornadas são profundas, práticas e muito bem estruturadas. Me sinto apoiada a cada passo do caminho.",
    name: "Fernanda M.",
    city: "Belo Horizonte, MG",
    initial: "F",
  },
  {
    text: "Nunca imaginei que uma plataforma online poderia entregar tanto. As aulas ao vivo são transformadoras e a comunidade me ajudou a manter constância nos estudos.",
    name: "Ricardo A.",
    city: "São Paulo, SP",
    initial: "R",
  },
  {
    text: "A jornada de Numerologia foi uma verdadeira revelação. Entendi padrões que se repetem na minha vida há anos. O conteúdo é denso, mas muito didático e acessível.",
    name: "Carla T.",
    city: "Porto Alegre, RS",
    initial: "C",
  },
];

/* ── Planos ────────────────────────────────────────── */
const plans = [
  {
    name: "Essencial",
    price: "97",
    period: "/mês",
    desc: "Para quem está começando a explorar o autoconhecimento.",
    features: [
      "Acesso a 2 jornadas à escolha",
      "Material de apoio incluso",
      "Comunidade de alunos",
      "Certificados de conclusão",
      "Suporte por e-mail",
    ],
    cta: "Começar agora",
    highlight: false,
    tag: null,
  },
  {
    name: "Completo",
    price: "197",
    period: "/mês",
    desc: "Acesso total à plataforma, jornadas, aulas ao vivo e comunidade VIP.",
    features: [
      "Acesso a todas as jornadas",
      "Aulas ao vivo semanais",
      "Comunidade VIP exclusiva",
      "Certificados de conclusão",
      "Material complementar completo",
      "Suporte prioritário",
    ],
    cta: "Escolher Completo",
    highlight: true,
    tag: "Mais popular",
  },
  {
    name: "Vitalício",
    price: "1.997",
    period: " único",
    desc: "Acesso permanente a todo o conteúdo da plataforma, para sempre.",
    features: [
      "Tudo do plano Completo",
      "Acesso vitalício sem mensalidade",
      "Novas jornadas incluídas",
      "Acesso antecipado a novidades",
      "Mentoria individual inclusa",
      "Suporte VIP prioritário",
    ],
    cta: "Garantir acesso vitalício",
    highlight: false,
    tag: "Melhor investimento",
  },
];

/* ── FAQ ───────────────────────────────────────────── */
const faqs = [
  {
    q: "O que é o Instituto Despertamente?",
    a: "O IDM é uma plataforma educacional especializada em autoconhecimento, espiritualidade e desenvolvimento humano. Oferecemos jornadas estruturadas, aulas ao vivo e uma comunidade ativa para apoiar sua transformação de forma profunda e duradoura.",
  },
  {
    q: "Como funciona o acesso após a inscrição?",
    a: "Imediatamente após a confirmação do pagamento, você recebe um e-mail com seus dados de acesso. A partir daí, pode entrar na plataforma a qualquer hora e começar sua jornada no seu próprio ritmo.",
  },
  {
    q: "Preciso ter experiência prévia para participar?",
    a: "Não. Nossas jornadas acolhem desde quem está dando os primeiros passos até quem já tem caminho percorrido. Cada trilha indica o nível recomendado para você escolher a mais adequada ao seu momento.",
  },
  {
    q: "Como funcionam as aulas ao vivo?",
    a: "As aulas acontecem semanalmente por videoconferência e têm duração média de 1h30. Você pode participar em tempo real, fazer perguntas ao vivo, ou assistir à gravação disponível na plataforma em até 24h após a transmissão.",
  },
  {
    q: "Posso cancelar minha assinatura a qualquer momento?",
    a: "Sim. Os planos mensais podem ser cancelados a qualquer momento sem multa ou burocracia. O acesso permanece ativo até o final do período já pago. Também oferecemos garantia de 7 dias em todos os planos.",
  },
  {
    q: "Os certificados emitidos têm validade?",
    a: "Os certificados são emitidos digitalmente com autenticação e carga horária registrada. São documentos válidos para comprovação de desenvolvimento pessoal e educação continuada.",
  },
  {
    q: "Como é a comunidade do IDM?",
    a: "A comunidade é um ambiente exclusivo para alunos, com grupos temáticos, fóruns de discussão e espaços de troca moderados pela equipe IDM. É um dos recursos mais valorizados pelos nossos alunos — um lugar seguro e genuinamente inspirador.",
  },
  {
    q: "Terei suporte se tiver dúvidas?",
    a: "Sim. Todos os planos incluem suporte por e-mail. Os planos Completo e Vitalício contam com suporte prioritário e acesso a plantões de dúvidas mensais com nossa equipe pedagógica.",
  },
];

/* ── Footer ────────────────────────────────────────── */
const footerLinks: Record<string, string[]> = {
  Plataforma: ["Jornadas", "Aulas ao Vivo", "Comunidade", "Certificados"],
  Instituto: ["Sobre o IDM", "Nossa Missão", "Equipe", "Blog"],
  Suporte: ["Central de Ajuda", "Contato", "Política de Privacidade", "Termos de Uso"],
};

/* ── Icons ─────────────────────────────────────────── */
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}

function IconAcademic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m19 9-7 7-7-7" />
    </svg>
  );
}

const featureIcons = [IconBook, IconVideo, IconUsers, IconAcademic, IconDocument, IconStar];

const heroModules = [
  { title: "Autoconhecimento", progress: "72" },
  { title: "Numerologia", progress: "48" },
  { title: "Meditação", progress: "20" },
];

/* ── Page ──────────────────────────────────────────── */
export default function Home() {
  return (
    <div className={styles.page}>

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <Image
              src="/logo-despertamente.png"
              alt="Instituto Despertamente"
              width={180}
              height={60}
              priority
              className={styles.logo}
            />
          </Link>

          <nav className={styles.nav} aria-label="Menu principal">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} className={styles.navLink}>
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.headerCtas}>
            <Link href="/login" className={styles.loginLink}>
              Entrar
            </Link>
            <Link href="/login" className={styles.headerCta}>
              Acessar plataforma
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Plataforma de autoconhecimento e desenvolvimento humano
          </div>

          <h1 className={styles.heroTitle}>
            Desperte o melhor
            <br />
            <em>que existe em você</em>
          </h1>

          <p className={styles.heroDesc}>
            O Instituto Despertamente oferece jornadas estruturadas, aulas ao vivo e uma
            comunidade ativa para quem busca transformação real — do autoconhecimento à
            espiritualidade aplicada na vida cotidiana.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/login" className={styles.primaryCta}>
              Começar minha jornada
            </Link>
            <a href="#plataforma" className={styles.secondaryCta}>
              Conhecer a plataforma
            </a>
          </div>

          <div className={styles.heroStats}>
            {stats.map(({ value, label }) => (
              <div key={label} className={styles.heroStat}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.heroCard}>
            <div className={styles.heroCardHeader}>
              <div className={styles.heroCardSymbolWrap}>
                <Image
                  src="/despertamente-simbolo.png"
                  alt=""
                  width={36}
                  height={36}
                  className={styles.heroCardSymbol}
                />
              </div>
              <div className={styles.heroCardHeaderText}>
                <strong>Portal IDM</strong>
                <span>Área de membros</span>
              </div>
              <div className={styles.heroCardLivePill}>● Ao vivo</div>
            </div>

            <p className={styles.heroCardLabel}>Suas jornadas</p>

            <div className={styles.heroCardModules}>
              {heroModules.map(({ title, progress }) => (
                <div key={title} className={styles.heroCardModule}>
                  <div className={styles.heroCardModuleDot} />
                  <span>{title}</span>
                  <div className={styles.heroCardProgressWrap}>
                    <div
                      className={styles.heroCardProgressBar}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className={styles.heroCardProgressPct}>{progress}%</span>
                </div>
              ))}
            </div>

            <div className={styles.heroCardFooter}>
              <div>
                <span>Próxima aula ao vivo</span>
                <strong>Quarta-feira, 20h</strong>
              </div>
              <div className={styles.heroCardJoinBtn}>Entrar</div>
            </div>
          </div>

          <div className={styles.floatCard1}>
            <strong>+3.200</strong>
            <span>alunos ativos</span>
          </div>
          <div className={styles.floatCard2}>
            <span className={styles.floatStars}>★★★★★</span>
            <span>98% de satisfação</span>
          </div>
        </div>
      </section>

      {/* PLATAFORMA / RECURSOS */}
      <section id="plataforma" className={styles.features}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Por que o IDM?</p>
            <h2 className={styles.sectionTitle}>
              Tudo o que você precisa para transformar sua jornada
            </h2>
            <p className={styles.sectionSub}>
              Uma plataforma completa, pensada para oferecer a melhor experiência de
              aprendizado em autoconhecimento e desenvolvimento humano.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map(({ title, desc }, i) => {
              const Icon = featureIcons[i];
              return (
                <article key={title} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Icon />
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* JORNADAS */}
      <section id="jornadas" className={styles.modules}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Jornadas disponíveis</p>
            <h2 className={styles.sectionTitle}>Escolha o caminho certo para você</h2>
            <p className={styles.sectionSub}>
              Cada jornada é cuidadosamente estruturada com conteúdo, ritmo e profundidade
              pensados para gerar resultados reais e duradouros.
            </p>
          </div>

          <div className={styles.modulesGrid}>
            {modules.map(({ category, title, desc, duration, level, accent }) => (
              <article
                key={title}
                className={styles.moduleCard}
                style={{ "--module-accent": accent } as React.CSSProperties}
              >
                <div className={styles.moduleTop}>
                  <span className={styles.moduleCategory}>{category}</span>
                  <div className={styles.moduleAccentLine} />
                </div>
                <div className={styles.moduleBody}>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className={styles.moduleMeta}>
                    <span>{duration}</span>
                    <span className={styles.moduleDot}>·</span>
                    <span>{level}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className={styles.testimonials}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrowLight}>Depoimentos</p>
            <h2 className={styles.sectionTitleLight}>O que nossos alunos dizem</h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map(({ text, name, city, initial }) => (
              <blockquote key={name} className={styles.testimonialCard}>
                <div className={styles.testimonialStars} aria-label="5 estrelas">
                  ★★★★★
                </div>
                <p>{text}</p>
                <footer className={styles.testimonialFooter}>
                  <div className={styles.testimonialAvatar}>{initial}</div>
                  <div>
                    <strong>{name}</strong>
                    <span>{city}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className={styles.plans}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Planos</p>
            <h2 className={styles.sectionTitle}>Investimento na sua transformação</h2>
            <p className={styles.sectionSub}>
              Escolha o plano ideal para o seu momento. Todos incluem garantia de 7 dias sem perguntas.
            </p>
          </div>

          <div className={styles.plansGrid}>
            {plans.map(({ name, price, period, desc, features: pf, cta, highlight, tag }) => (
              <article
                key={name}
                className={`${styles.planCard} ${highlight ? styles.planHighlight : ""}`}
              >
                {tag && <div className={styles.planTag}>{tag}</div>}
                <h3 className={styles.planName}>{name}</h3>
                <p className={styles.planDesc}>{desc}</p>
                <div className={styles.planPrice}>
                  <span className={styles.planCurrency}>R$</span>
                  <strong>{price}</strong>
                  <span className={styles.planPeriod}>{period}</span>
                </div>
                <ul className={styles.planFeatures}>
                  {pf.map((f) => (
                    <li key={f}>
                      <IconCheck />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`${styles.planCta} ${highlight ? styles.planCtaHighlight : ""}`}
                >
                  {cta}
                </Link>
              </article>
            ))}
          </div>

          <p className={styles.plansNote}>
            Todos os planos incluem garantia incondicional de 7 dias. Cancele quando quiser, sem burocracia.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.faq}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Dúvidas frequentes</p>
            <h2 className={styles.sectionTitle}>Perguntas e respostas</h2>
            <p className={styles.sectionSub}>
              Não encontrou o que procura? Entre em contato com nosso suporte.
            </p>
          </div>

          <div className={styles.faqList}>
            {faqs.map(({ q, a }) => (
              <details key={q} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{q}</span>
                  <span className={styles.faqChevron}>
                    <IconChevron />
                  </span>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <Image
            src="/despertamente-simbolo-branco.png"
            alt=""
            width={64}
            height={64}
            className={styles.finalCtaSymbol}
            aria-hidden
          />
          <h2>Pronto para iniciar sua jornada?</h2>
          <p>
            Junte-se a mais de 3.200 alunos que já transformaram suas vidas com o
            Instituto Despertamente. Comece hoje, com garantia de 7 dias.
          </p>
          <Link href="/login" className={styles.finalCtaBtn}>
            Começar minha jornada agora
          </Link>
          <span className={styles.finalCtaNote}>
            Garantia de 7 dias &nbsp;·&nbsp; Cancele quando quiser &nbsp;·&nbsp; Suporte dedicado
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Image
              src="/logo-despertamente.png"
              alt="Instituto Despertamente"
              width={160}
              height={52}
              className={styles.footerLogo}
            />
            <p>
              Desperte o melhor que existe em você através do autoconhecimento,
              da espiritualidade e do desenvolvimento humano.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className={styles.footerGroup}>
              <h4>{group}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Instituto Despertamente. Todos os direitos reservados.</span>
          <Link href="/login" className={styles.footerCta}>
            Acessar plataforma →
          </Link>
        </div>
      </footer>

    </div>
  );
}
