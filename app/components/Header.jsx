import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <main className={styles.header}>
      <div className={styles.contentHeader}>
        <Image
          src="/dog.png"
          width={40}
          height={40}
          alt="Picture of the author"
        />
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/cadastro">Cadastro</Link>
          <Link href="/calculadora">Calculadora</Link>
          <Link href="/tabela">Tabela</Link>
        </nav>
      </div>
    </main>
  );
}
