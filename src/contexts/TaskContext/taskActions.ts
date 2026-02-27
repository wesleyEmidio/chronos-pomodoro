// useReducer <- hook do React que recebe um reducer e um estado inicial
// reducer <- função que recebe o estado atual e uma ação, e retorna o novo estado
// state <- o estado atual
// action <- a ação disparada, geralmente é um objeto com type e (opcionalmente) payload
// type <- o tipo da ação, geralmente uma string (pode ser enum, constante, etc)
// payload <- os dados extras enviados junto com a action, se necessário para atualizar o estado

// Importa o modelo de uma tarefa individual
import type { TaskModel } from '../../models/TaskModel';

// Importa o modelo do estado global das tarefas
import type { TaskStateModel } from '../../models/TaskStateModel';

// Define um objeto com todos os tipos de ações possíveis do TaskReducer
// O "as const" garante que os valores sejam literais imutáveis (string literal types)
export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS',
} as const;

// Cria um tipo que representa todos os valores possíveis
// do objeto TaskActionTypes
// Resultado: 'START_TASK' | 'INTERRUPT_TASK' | ...
export type TaskActionTypes =
  (typeof TaskActionTypes)[keyof typeof TaskActionTypes];

// ================================
// AÇÕES QUE POSSUEM PAYLOAD
// ================================

// Define o tipo das actions que carregam dados adicionais (payload)
export type TaskActionsWithPayload =
  | {
      // Ação para iniciar uma tarefa
      type: typeof TaskActionTypes.START_TASK;

      // Dados necessários para iniciar a tarefa
      payload: TaskModel;
    }
  | {
      // Ação disparada a cada contagem regressiva
      type: typeof TaskActionTypes.COUNT_DOWN;

      // Atualiza apenas os segundos restantes
      payload: { secondsRemaining: number };
    }
  | {
      // Ação para alterar as configurações do Pomodoro
      type: typeof TaskActionTypes.CHANGE_SETTINGS;

      // Recebe apenas o objeto config do estado
      payload: TaskStateModel['config'];
    };

// ================================
// AÇÕES QUE NÃO POSSUEM PAYLOAD
// ================================

// Define o tipo das actions que não precisam de dados extras
export type TaskActionsWithoutPayload =
  | {
      // Reseta todo o estado para o estado inicial
      type: typeof TaskActionTypes.RESET_STATE;
    }
  | {
      // Interrompe a tarefa ativa
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      // Marca a tarefa atual como concluída
      type: typeof TaskActionTypes.COMPLETE_TASK;
    };

// ================================
// MODELO FINAL DE ACTION
// ================================

// Une todas as actions possíveis em um único tipo
// Esse tipo é usado no reducer
export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
