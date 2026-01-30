import { TimerIcon } from 'lucide-react';
// Importa o ícone de timer da biblioteca lucide-react

import styles from './styles.module.css';
// Importa os estilos CSS Module específicos do componente Logo

// Componente Logo da aplicação
export function Logo() {
  return (
    // Container principal do logo
    <div
      className={styles.logo} // Classe responsável pelo alinhamento geral do logo
    >
      {/* Link clicável do logo */}
      <a
        className={styles.logoLink} // Classe que estiliza o link (fonte, cor, hover, layout)
        href='#' // Link fictício (pode ser trocado por rota real)
      >
        <TimerIcon />
        {/* Ícone visual do logo (relógio / timer) */}

        <span>Chronos</span>
        {/* Nome da aplicação exibido abaixo ou ao lado do ícone */}
      </a>
    </div>
  );
}
