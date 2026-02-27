import { createContext } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';
import type { TaskActionModel } from './taskActions';

// Define o formato (contrato) do Context
// Tudo que for compartilhado globalmente via TaskContext
// precisa estar tipado aqui
type TaskContextProps = {
  // Estado global das tarefas (useReducer state)
  state: TaskStateModel;

  // Função dispatch do useReducer
  // Aceita apenas actions válidas (TaskActionModel)
  dispatch: React.Dispatch<TaskActionModel>;
};

// Valor inicial do Context
// Esse valor é usado apenas:
// - para satisfazer o createContext
// - para evitar undefined ao usar o Context fora do Provider
//
// IMPORTANTE:
// Esse dispatch vazio NUNCA será usado de verdade,
// pois o Provider sobrescreve esse valor com o dispatch real
const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};

// Criação do Context
// Tipado com TaskContextProps para garantir:
// - autocomplete
// - segurança de tipos
// - prevenção de actions inválidas no dispatch
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
