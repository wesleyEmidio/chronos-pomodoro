// Importa o componente de botão padrão reutilizável
import { DefaultButton } from '../DefaultButton';

// Importa ícones prontos (SVG como componentes React)
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

// Importa os estilos específicos deste componente (CSS Modules)
import styles from './styles.module.css';

// Importa o tipo das props usadas pelo conteúdo de um Toast
// ToastContentProps define propriedades como closeToast e data
import type { ToastContentProps } from 'react-toastify';

// Declara e exporta o componente Dialog
// Ele recebe as props do Toast, tipadas como string para o `data`
export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  // Retorna o JSX que será exibido dentro do toast
  return (
    <>
      {/* Container principal do diálogo */}
      <div className={styles.container}>
        {/* Texto exibido no diálogo
            `data` é a mensagem passada quando o toast foi criado */}
        <p>{data}</p>

        {/* Container dos botões de ação */}
        <div className={styles.buttonsContainer}>
          {/* Botão de confirmação */}
          <DefaultButton
            // Ao clicar, fecha o toast retornando `true`
            // Esse valor será recebido pelo callback externo
            onClick={() => closeToast(true)}
            // Ícone de confirmação (positivo)
            icon={<ThumbsUpIcon />}
            // Texto acessível para leitores de tela
            aria-label='Confirmar ação e fechar'
            // Tooltip exibido ao passar o mouse
            title='Confirmar ação e fechar'
          />

          {/* Botão de cancelamento */}
          <DefaultButton
            // Ao clicar, fecha o toast retornando `false`
            onClick={() => closeToast(false)}
            // Ícone de cancelamento (negativo)
            icon={<ThumbsDownIcon />}
            // Define a variante visual vermelha do botão
            color='red'
            // Texto acessível para leitores de tela
            aria-label='Cancelar ação e fechar'
            // Tooltip exibido ao passar o mouse
            title='Cancelar ação e fechar'
          />
        </div>
      </div>
    </>
  );
}
