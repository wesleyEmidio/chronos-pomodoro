// Importa o tipo que define o formato do estado das tarefas
import type { TaskStateModel } from '../../models/TaskStateModel';

// Define o estado inicial do TaskContext
// Esse objeto representa a situação inicial da aplicação
export const initialTaskState: TaskStateModel = {
  // Lista de tarefas (inicialmente vazia)
  tasks: [],

  // Quantidade de segundos restantes do ciclo atual
  // Começa em 0 pois nenhuma tarefa foi iniciada
  secondsRemaining: 0,

  // Versão formatada do tempo restante (mm:ss)
  // Usada diretamente na interface
  formattedSecondsRemaining: '00:00',

  // Referência para a tarefa ativa no momento
  // null indica que não há tarefa em execução
  activeTask: null,

  // Contador de ciclos já realizados
  // Inicia em 0 (nenhum ciclo executado)
  currentCycle: 0,

  // Configurações de duração dos ciclos (em minutos)
  config: {
    // Tempo padrão de foco (Pomodoro)
    workTime: 25,

    // Tempo de descanso curto
    shortBreakTime: 5,

    // Tempo de descanso longo
    longBreakTime: 15,
  },
};
