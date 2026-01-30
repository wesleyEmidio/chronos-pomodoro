// Importa os ícones que serão usados no menu (SVG como componentes React)
import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';

// Importa os estilos CSS usando CSS Modules (escopo isolado)
import styles from './styles.module.css';

// Declara e exporta o componente Menu
export function Menu() {
  // Retorna o JSX que será renderizado na tela
  return (
    // Div principal que envolve todo o menu
    <div className={styles.menu}>
      {/* Link do menu para a página inicial */}
      <a
        className={styles.menuLink} // Classe responsável pelo estilo do botão
        href='#' // Link fictício (placeholder)
      >
        <HouseIcon /> {/* Ícone de casa (Home) */}
      </a>

      {/* Link do menu para histórico */}
      <a
        className={styles.menuLink} // Reutiliza o mesmo estilo
        href='#' // Link fictício
      >
        <HistoryIcon /> {/* Ícone de histórico */}
      </a>

      {/* Link do menu para configurações */}
      <a
        className={styles.menuLink} // Classe do botão do menu
        href='#' // Link fictício
      >
        <SettingsIcon /> {/* Ícone de configurações */}
      </a>

      {/* Link do menu para alternar tema (claro/escuro) */}
      <a
        className={styles.menuLink} // Mesmo padrão visual
        href='#' // Link fictício
      >
        <SunIcon /> {/* Ícone de sol (tema claro) */}
      </a>
    </div> // Fim do container principal do menu
  );
}
