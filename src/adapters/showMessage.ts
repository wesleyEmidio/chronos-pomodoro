// Importa a função `toast` da biblioteca react-toastify,
// usada para exibir notificações (toasts) na tela
import { toast } from 'react-toastify';

// Importa o componente Dialog, que será usado
// como conteúdo personalizado de um toast de confirmação
import { Dialog } from '../components/Dialog';

// Exporta um objeto chamado showMessage,
// que centraliza todas as formas de exibir mensagens no sistema
export const showMessage = {
  // Exibe uma notificação de sucesso
  // Recebe uma mensagem (string)
  success: (msg: string) => toast.success(msg),

  // Exibe uma notificação de erro
  // Recebe uma mensagem (string)
  error: (msg: string) => toast.error(msg),

  // Exibe uma notificação de aviso (warn)
  // Geralmente usada para alertas não críticos
  warn: (msg: string) => toast.warn(msg),

  // Exibe uma notificação de aviso (warning)
  // Similar ao warn, depende apenas do padrão visual da lib
  warning: (msg: string) => toast.warning(msg),

  // Exibe uma notificação informativa
  // Usada para mensagens neutras
  info: (msg: string) => toast.info(msg),

  // Fecha/remover todos os toasts atualmente abertos
  dismiss: () => toast.dismiss(),

  // Exibe um toast de confirmação usando um componente customizado (Dialog)
  // `data`: texto ou informação a ser exibida no diálogo
  // `onClosing`: callback que recebe true ou false conforme a confirmação
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast(Dialog, {
      // Dados que serão passados como props para o componente Dialog
      data,

      // Função chamada quando o toast é fechado
      // `confirmation` vem do componente Dialog
      onClose: confirmation => {
        // Se o usuário confirmou, retorna true no callback
        if (confirmation) return onClosing(true);

        // Caso contrário, retorna false
        return onClosing(false);
      },

      // Impede o fechamento automático do toast
      autoClose: false,

      // Impede fechar o toast ao clicar nele
      closeOnClick: false,

      // Remove o botão padrão de fechar (X)
      closeButton: false,

      // Impede que o toast seja arrastado
      draggable: false,
    }),
};
