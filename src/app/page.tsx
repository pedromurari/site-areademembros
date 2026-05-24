import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const navItems = [
  "Plataforma",
  "Recursos",
  "Planos",
  "Diferenciais",
  "Integracoes",
  "Blog",
];

const sections = [
  "Banner de prova social",
  "Sessao de recursos",
  "Sessao de modulos",
  "Sessao de integracoes",
  "Sessao de planos",
  "Sessao de FAQ",
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/logo-despertamente.png"
            alt="Instituto Despertamente"
            width={220}
            height={80}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={styles.navLink}>
              {item}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <Link href="/login" className={styles.loginLink}>
            Login
          </Link>
          <Link href="/login" className={styles.ctaButton}>
            Acessar area de membros
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span />
          Plataforma educacional para jornadas, cursos e comunidade
        </div>

        <h1>Uma estrutura moderna para apresentar o IDM antes da area de membros.</h1>
        <p>
          Aqui fica a landing principal inspirada no ritmo visual de plataformas
          premium: menu forte, banner hero, artes institucionais e secoes prontas para
          receber conteudo depois.
        </p>

        <div className={styles.heroActions}>
          <Link href="/login" className={styles.primaryButton}>
            Entrar no portal
          </Link>
          <a href="#estrutura" className={styles.secondaryButton}>
            Ver estrutura
          </a>
        </div>

        <div className={styles.heroStage}>
          <div className={styles.notifications}>
            <div>Nova aula liberada na trilha de Numerologia</div>
            <div>Encontro ao vivo confirmado para quarta-feira</div>
            <div>Material complementar disponivel para download</div>
          </div>

          <div className={styles.visualPanel}>
            <div className={styles.visualTop}>
              <span>IDM Portal</span>
              <span>Preview</span>
            </div>

            <div className={styles.visualInner}>
              <div className={styles.visualGraph}>
                <div />
                <div />
                <div />
              </div>

              <div className={styles.visualSymbolWrap}>
                <Image
                  src="/despertamente-simbolo-branco.png"
                  alt="Simbolo IDM"
                  width={180}
                  height={180}
                  className={styles.visualSymbol}
                />
              </div>

              <div className={styles.visualText}>
                <strong>Experiencia premium para alunos</strong>
                <p>Apresentacao, cursos, progresso e acesso centralizados em uma unica experiencia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.structure} id="estrutura">
        {sections.map((section, index) => (
          <article
            key={section}
            id={navItems[index]?.toLowerCase() ?? `secao-${index + 1}`}
            className={styles.placeholder}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{section}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
