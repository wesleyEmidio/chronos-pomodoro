// Importa os estilos do componente Footer usando CSS Modules
import styles from './styles.module.css';

// Importa o componente RouterLink
// Ele é um wrapper para navegação interna (SPA)
import { RouterLink } from '../RouterLink';

// Declara e exporta o componente Footer
export function Footer() {
  // Retorna o JSX do rodapé
  return (
    // Elemento semântico <footer>, usado para rodapés da página
    <footer className={styles.footer}>
      {/* Link para a página que explica a técnica Pomodoro */}
      <RouterLink href='/about-pomodoro/'>
        {/* Texto do link com emoji (🍅) */}
        Entenda como funciona a técnica pomodoro &#x1F345;
      </RouterLink>

      {/* Link para a página inicial */}
      <RouterLink href='/'>
        {/* 
          Nome da aplicação + símbolo de copyright
          new Date().getFullYear() garante que o ano seja sempre o atual
          Emoji de coração verde para dar um toque humano
        */}
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com o
        &#128154;
      </RouterLink>
    </footer>
  );
}
