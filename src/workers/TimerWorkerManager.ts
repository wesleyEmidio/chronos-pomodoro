import type { TaskStateModel } from '../models/TaskStateModel';
// Importa apenas o TIPO do estado global das tarefas
// Será usado para tipar as mensagens enviadas ao Web Worker

// Variável que guarda a instância única do TimerWorkerManager (Singleton)
let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
  // Propriedade privada que mantém a referência do Web Worker
  private worker: Worker;

  // Construtor privado para impedir criação direta com "new"
  // Isso força o uso do método getInstance()
  private constructor() {
    // Cria um novo Web Worker apontando para o arquivo timerWorker.js
    // new URL + import.meta.url garante compatibilidade com Vite/Webpack
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
  }

  // Método estático responsável por retornar a instância única da classe
  static getInstance() {
    // Se ainda não existir instância, cria uma
    if (!instance) {
      instance = new TimerWorkerManager();
    }

    // Retorna sempre a mesma instância
    return instance;
  }

  // Envia uma mensagem para o Web Worker
  // Nesse caso, envia o estado inteiro da aplicação
  postMessage(message: TaskStateModel) {
    this.worker.postMessage(message);
  }

  // Define a função que será executada quando o Worker responder
  onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb;
  }

  // Finaliza o Worker
  terminate() {
    // Encerra a execução do Web Worker
    this.worker.terminate();

    // Remove a instância para permitir recriação futura
    instance = null;
  }
}
