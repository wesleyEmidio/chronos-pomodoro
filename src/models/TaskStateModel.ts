import type { TaskModel } from './TaskModel';
// Importa o modelo de Task para tipar a lista de tarefas e a tarefa ativa

export type TaskStateModel = {
  tasks: TaskModel[];
  // Lista com TODAS as tarefas criadas (ativas, concluídas ou interrompidas)

  secondsRemaining: number;
  // Quantidade de segundos restantes do ciclo atual (usado pelo timer)

  formattedSecondsRemaining: string;
  // Versão formatada do tempo (MM:SS) para exibição na interface

  activeTask: TaskModel | null;
  // Tarefa atualmente em execução
  // null quando não há tarefa ativa

  currentCycle: number;
  // Contador de ciclos executados (usado para decidir work / break)

  config: {
    workTime: number;
    // Tempo de foco (em minutos)

    shortBreakTime: number;
    // Tempo de descanso curto (em minutos)

    longBreakTime: number;
    // Tempo de descanso longo (em minutos)
  };
};
