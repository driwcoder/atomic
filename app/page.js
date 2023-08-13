import Header from "./components/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <p>HOMEPAGE</p>
    </main>
  );
}
