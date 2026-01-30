import styles from './styles.module.css'; // Importa os estilos CSS Module específicos deste componente

// Tipagem das props do componente Container
type ContainerProps = {
  children: React.ReactNode; // Conteúdo React que será renderizado dentro do container
};

// Componente Container responsável por estruturar o layout da página
export function Container({ children }: ContainerProps) {
  return (
    // Div externa que controla largura máxima e centralização geral
    <div className={styles.container}>
      {/* Div interna responsável pelo espaçamento e organização do conteúdo */}
      <div className={styles.content}>
        {children}{' '}
        {/* Renderiza qualquer componente ou elemento passado como filho */}
      </div>
    </div>
  );
}
