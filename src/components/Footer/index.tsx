import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href=''>Entenda como funciona a técnica pomodoro &#x1F345;</a>
      <a href=''>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com o
        &#128154;
      </a>
    </footer>
  );
}
