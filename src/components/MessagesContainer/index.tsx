// Importa o container de notificações (ToastContainer)
// e o efeito de animação Bounce da biblioteca react-toastify
import { Bounce, ToastContainer } from 'react-toastify';

// Define o tipo das props do componente MessagesContainer
type MessagesContainerProps = {
  // Conteúdo filho que será renderizado normalmente
  // Pode ser qualquer JSX ou componente React
  children: React.ReactNode;
};

// Declara e exporta o componente MessagesContainer
export function MessagesContainer({ children }: MessagesContainerProps) {
  // Retorna um Fragment (<> </>) para não adicionar
  // elementos extras ao DOM
  return (
    <>
      {/* Renderiza os componentes filhos da aplicação */}
      {children}

      {/* Container global responsável por exibir os toasts */}
      <ToastContainer
        // Define a posição dos toasts na tela
        position='top-center'
        // Tempo (em ms) para fechar automaticamente o toast
        autoClose={10000}
        // Exibe a barra de progresso do tempo
        hideProgressBar={false}
        // Mantém a ordem de exibição (mais antigos primeiro)
        newestOnTop={false}
        // Permite fechar o toast ao clicar nele
        closeOnClick={true}
        // Define se o layout é da direita para esquerda
        rtl={false}
        // Pausa o tempo do toast quando a aba perde foco
        pauseOnFocusLoss
        // Permite arrastar o toast para fechá-lo
        draggable
        // Pausa o tempo do toast ao passar o mouse
        pauseOnHover
        // Tema visual do toast (light ou dark)
        theme='light'
        // Animação usada na entrada e saída do toast
        transition={Bounce}
      />
    </>
  );
}
