import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../uteis/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';

// Tipagem das props do Provider
type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  // useReducer com lazy initialization
  // Essa função só roda uma vez, na montagem do Provider
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    // Recupera o estado salvo no localStorage
    const storageState = localStorage.getItem('state');

    // Se não existir estado salvo, usa o estado inicial
    if (storageState === null) return initialTaskState;

    // Converte o estado salvo de string para objeto
    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    // Retorna o estado restaurado, mas:
    // - zera a tarefa ativa
    // - zera o tempo restante
    // Isso evita inconsistências ao recarregar a página
    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
  });

  // Referência para a função que toca o beep
  // useRef evita recriação desnecessária
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  // Singleton do Web Worker que controla o timer
  const worker = TimerWorkerManager.getInstance();

  // Efeito responsável por ouvir mensagens do Worker
  useEffect(() => {
    worker.onmessage(e => {
      const countDownSeconds = e.data;

      // Quando o tempo chega a zero
      if (countDownSeconds <= 0) {
        // Toca o som apenas uma vez
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }

        // Marca a tarefa como concluída
        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });

        // Encerra o worker
        worker.terminate();
      } else {
        // Atualiza o contador regressivo
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
  }, [worker, state]);

  // Efeito disparado sempre que o estado muda
  useEffect(() => {
    // Persiste o estado no localStorage
    localStorage.setItem('state', JSON.stringify(state));

    // Se não houver tarefa ativa, encerra o worker
    if (!state.activeTask) {
      worker.terminate();
    }

    // Atualiza o título da aba do navegador
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    // Envia o estado atual para o worker
    worker.postMessage(state);
  }, [worker, state]);

  // Controla o carregamento do som (beep)
  useEffect(() => {
    // Se existe tarefa ativa e o beep ainda não foi carregado
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      // Se não há tarefa ativa, remove o beep
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  // Provider que expõe state e dispatch para a aplicação
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
