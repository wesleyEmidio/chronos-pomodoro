import styles from './styles.module.css';
// Importa os estilos CSS Module específicos do componente Heading

// Tipagem das propriedades aceitas pelo componente Heading
type HeadingProps = {
  children: React.ReactNode;
  // Conteúdo interno do componente (texto, spans, ícones, etc.)
};

// Componente Heading reutilizável
export function Heading({ children }: HeadingProps) {
  return (
    // Renderiza um título h1 estilizado
    <h1
      className={styles.heading} // Classe CSS aplicada ao h1
    >
      {children}
      {/* Conteúdo passado entre as tags <Heading>...</Heading> */}
    </h1>
  );
}
