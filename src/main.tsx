// Importa o StrictMode do React
// Ele ajuda a identificar problemas e más práticas durante o desenvolvimento
import { StrictMode } from 'react';

// Importa a função createRoot responsável por inicializar a aplicação React
// Essa é a API moderna introduzida no React 18
import { createRoot } from 'react-dom/client';

// Importa o componente principal da aplicação
// Normalmente é onde ficam as rotas, layouts e providers globais
import { App } from './App';

// Cria a raiz da aplicação React
// document.getElementById('root') busca o elemento <div id="root"></div> no HTML
// O operador "!" informa ao TypeScript que esse elemento nunca será null
createRoot(document.getElementById('root')!).render(
  // StrictMode envolve toda a aplicação
  // Ele NÃO afeta produção, apenas desenvolvimento
  // Ajuda a detectar efeitos colaterais, renders desnecessários e APIs obsoletas
  <StrictMode>
    {/* Componente principal da aplicação */}
    <App />
  </StrictMode>, // Fim do StrictMode
);
