// Importa o hook personalizado para acessar o TaskContext
// Ele fornece o estado global das tarefas e ciclos
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// Importa a função que calcula qual será o próximo ciclo
import { getNextCycle } from '../../uteis/getNextCycle';

// Importa a função que define o tipo do ciclo
// (workTime, shortBreakTime ou longBreakTime)
import { getNextCycleType } from '../../uteis/getNextCycleType';

// Declara e exporta o componente Tips
export function Tips() {
  // Obtém o estado global do contexto de tarefas
  const { state } = useTaskContext();

  // Calcula qual será o próximo ciclo com base no ciclo atual
  const nextCycle = getNextCycle(state.currentCycle);

  // Obtém o tipo do próximo ciclo
  const nextCyleType = getNextCycleType(nextCycle);

  // ============================
  // DICAS QUANDO HÁ TAREFA ATIVA
  // ============================

  // Mapeia o tipo da tarefa ativa para a dica correspondente
  const tipsForWhenActiveTask = {
    // Se estiver em ciclo de foco
    workTime: <span>Foque por {state.config.workTime}min</span>,

    // Se estiver em descanso curto
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,

    // Se estiver em descanso longo
    longBreakTime: <span>Descanso longo</span>,
  };

  // ===============================
  // DICAS QUANDO NÃO HÁ TAREFA ATIVA
  // ===============================

  // Mapeia o próximo tipo de ciclo para a dica correspondente
  const tipsForNoActiveTask = {
    // Próximo ciclo será de foco
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime}min</b>
      </span>
    ),

    // Próximo ciclo será descanso curto
    shortBreakTime: (
      <span>Próximo descaso é de {state.config.shortBreakTime}min</span>
    ),

    // Próximo ciclo será descanso longo
    longBreakTime: <span>Próximo descanso será longo</span>,
  };

  // =====================
  // RENDERIZAÇÃO
  // =====================

  return (
    <>
      {/* 
        Se existir uma tarefa ativa:
        mostra a dica baseada no tipo da tarefa atual
      */}
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}

      {/*
        Se NÃO existir tarefa ativa:
        mostra a dica baseada no próximo tipo de ciclo
      */}
      {!state.activeTask && tipsForNoActiveTask[nextCyleType]}
    </>
  );
}
