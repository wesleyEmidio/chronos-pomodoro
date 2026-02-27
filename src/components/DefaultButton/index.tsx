// Importa os estilos do componente usando CSS Modules
import styles from './styles.module.css';

// Define o tipo das propriedades aceitas pelo componente DefaultButton
type DefaultButtonProps = {
  // Ícone que será renderizado dentro do botão
  // React.ReactNode permite passar JSX, ícones, texto, etc.
  icon: React.ReactNode;

  // Cor opcional do botão
  // Aceita apenas 'green' ou 'red'
  // Se não for informada, será definido um valor padrão no componente
  color?: 'green' | 'red';

  // Herda todas as propriedades nativas do elemento <button>
  // Exemplo: onClick, disabled, type, title, etc.
} & React.ComponentProps<'button'>;

// Declara e exporta o componente DefaultButton
export function DefaultButton({
  // Ícone exibido dentro do botão
  icon,

  // Define 'green' como cor padrão caso nenhuma seja passada
  color = 'green',

  // Captura todas as outras propriedades do botão
  // (onClick, disabled, type, etc.)
  ...props
}: DefaultButtonProps) {
  // Retorna o JSX do componente
  return (
    <>
      {/* Botão HTML padrão */}
      <button
        // Combina a classe base do botão
        // com a classe correspondente à cor escolhida
        className={`${styles.button} ${styles[color]}`}
        // Espalha todas as propriedades restantes no botão
        {...props}
      >
        {/* Renderiza o ícone passado via props */}
        {icon}
      </button>
    </>
  );
}
