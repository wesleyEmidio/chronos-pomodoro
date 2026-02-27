import type { TaskStateModel } from './TaskStateModel';
// Importa APENAS o tipo TaskStateModel (TypeScript não gera JS disso)
// Ele será usado para reaproveitar os tipos de configuração (config)

export type TaskModel = {
  id: string;
  // Identificador único da tarefa (geralmente gerado com Date.now().toString())

  name: string;
  // Nome da tarefa digitado pelo usuário

  duration: number;
  // Duração da tarefa em MINUTOS (ex: 25, 5, 15)

  startDate: number;
  // Timestamp (Date.now()) indicando quando a tarefa começou

  completeDate: number | null;
  // Timestamp de quando a tarefa foi concluída
  // null enquanto a tarefa não for finalizada

  interruptDate: number | null;
  // Timestamp de quando a tarefa foi interrompida
  // null se a tarefa não foi interrompida

  type: keyof TaskStateModel['config'];
  // Define o tipo da tarefa com base nas chaves do config:
  // 'workTime' | 'shortBreakTime' | 'longBreakTime'
};
