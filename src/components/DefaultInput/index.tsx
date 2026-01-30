import styles from './styles.module.css';
// Importa os estilos CSS Module específicos deste componente

// Tipagem das props do componente DefaultInput
type DefaultInputProps = {
  id: string; // ID do input (usado para acessibilidade e ligação com o label)
  labelText: string; // Texto que será exibido no label
} & React.ComponentProps<'input'>;
// Herda TODAS as props nativas do elemento <input> (value, onChange, placeholder, disabled, etc.)

// Componente reutilizável de input padrão
export function DefaultInput({
  id, // ID do input
  type, // Tipo do input (text, password, email, etc.)
  labelText, // Texto do label
  ...rest // Demais propriedades do input (spread)
}: DefaultInputProps) {
  return (
    <>
      {/* Label associado ao input pelo htmlFor (acessibilidade) */}
      <label htmlFor={id}>
        {labelText} {/* Texto exibido no label */}
      </label>

      {/* Input estilizado usando CSS Module */}
      <input
        className={styles.input} // Classe CSS aplicada ao input
        id={id} // ID do input
        type={type} // Tipo do input
        {...rest} // Espalha todas as outras props (onChange, value, placeholder, etc.)
      />
    </>
  );
}
