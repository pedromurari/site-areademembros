import Image from "next/image";
import styles from "./idm-wordmark.module.css";

export function IdmWordmark({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`${styles.wordmark} ${compact ? styles.compact : styles.hero} ${className}`.trim()}
    >
      <Image
        src="/despertamente-simbolo.png"
        alt=""
        width={compact ? 34 : 52}
        height={compact ? 34 : 52}
        className={styles.symbol}
        aria-hidden="true"
      />
      <span className={styles.text} aria-hidden="true">
        <span className={styles.top}>Instituto</span>
        <span className={styles.name}>
          <span>desperta</span>
          <strong>MENTE</strong>
        </span>
        <span className={styles.tagline}>Psicanalise - PNL - Terapia Breve</span>
      </span>
    </span>
  );
}
