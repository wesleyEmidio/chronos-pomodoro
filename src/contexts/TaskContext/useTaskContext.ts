import { useContext } from 'react';
// Importa o hook useContext do React, usado para acessar um contexto

import { TaskContext } from './TaskContext';
// Importa o contexto de tarefas que foi criado com createContext

// Hook customizado para facilitar o acesso ao TaskContext
export function useTaskContext() {
  // useContext permite consumir os valores fornecidos pelo TaskContext.Provider
  return useContext(TaskContext);
}
