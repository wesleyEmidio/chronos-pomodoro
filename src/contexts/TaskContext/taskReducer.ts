import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../uteis/formatSecondsToMinutes';
import { getNextCycle } from '../../uteis/getNextCycle';
import { initialTaskState } from './initialTaskState';
import type { TaskActionModel } from './taskActions';
import { TaskActionTypes } from './taskActions';

// Reducer responsável por controlar TODAS as mudanças de estado das tarefas
export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel /* FORÇANDO o retorno do estado */ {
  switch (action.type) {
    // ===============================
    // INICIAR UMA NOVA TAREFA
    // ===============================
    case TaskActionTypes.START_TASK: {
      // Nova tarefa enviada pelo dispatch
      const newTask = action.payload;

      // Calcula qual será o próximo ciclo (work, break, etc)
      const nextCycle = getNextCycle(state.currentCycle);

      // Converte minutos para segundos
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask, // Define a tarefa ativa
        currentCycle: nextCycle, // Atualiza o ciclo atual
        secondsRemaining, // Tempo total em segundos
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask], // Adiciona a nova tarefa na lista
      };
    }

    // ===============================
    // INTERROMPER TAREFA
    // ===============================
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null, // Remove tarefa ativa
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          // Marca apenas a tarefa ativa como interrompida
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }

    // ===============================
    // FINALIZAR TAREFA
    // ===============================
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null, // Remove tarefa ativa
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          // Marca apenas a tarefa ativa como concluída
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }

    // ===============================
    // RESETAR TODO O ESTADO
    // ===============================
    case TaskActionTypes.RESET_STATE: {
      // Retorna um novo estado baseado no estado inicial
      return { ...initialTaskState };
    }

    // ===============================
    // CONTAGEM REGRESSIVA (TIMER)
    // ===============================
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }

    // ===============================
    // ALTERAR CONFIGURAÇÕES
    // ===============================
    case TaskActionTypes.CHANGE_SETTINGS: {
      return {
        ...state,
        config: { ...action.payload }, // Atualiza tempos do pomodoro
      };
    }

    // ===============================
    // DEFAULT (OBRIGATÓRIO)
    // ===============================
    default:
      // Reducer SEMPRE deve retornar o estado
      return state;
  }
}
