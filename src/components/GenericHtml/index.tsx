// Importa os estilos do componente usando CSS Modules
import styles from './styles.module.css';

// Define o tipo das propriedades aceitas pelo componente GenericHtml
type GenericHtmlProps = {
  // Conteúdo que será renderizado dentro do componente
  // React.ReactNode permite qualquer coisa renderizável:
  // texto, JSX, componentes, listas, etc.
  children: React.ReactNode;
};

// Declara e exporta o componente GenericHtml
export function GenericHtml({ children }: GenericHtmlProps) {
  // Retorna um div que envolve o conteúdo recebido
  // Aplica a classe CSS `genericHtml` para estilização
  return <div className={styles.genericHtml}>{children}</div>;
}
