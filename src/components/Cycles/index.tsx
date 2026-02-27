// Importa o hook personalizado para acessar o TaskContext
// Ele fornece o estado global relacionado aos ciclos e tarefas
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// Importa a função que calcula qual é o próximo ciclo
// com base no índice atual
import { getNextCycle } from '../../uteis/getNextCycle';

// Importa a função que determina o tipo do ciclo
// (workTime, shortBreakTime ou longBreakTime)
import { getNextCycleType } from '../../uteis/getNextCycleType';

// Importa os estilos usando CSS Modules
import styles from './styles.module.css';

// Declara e exporta o componente Cycles
export function Cycles() {
  // Obtém o estado global do contexto de tarefas
  const { state } = useTaskContext();

  // Cria um array com o tamanho do número de ciclos atuais
  // Exemplo: currentCycle = 3 → [undefined, undefined, undefined]
  // Esse array é usado apenas para iterar e renderizar os indicadores
  const cycleStep = Array.from({ length: state.currentCycle });

  // Mapeia o tipo do ciclo para um texto amigável
  // Usado para acessibilidade (aria-label) e tooltip (title)
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  // Retorna o JSX do componente
  return (
    // Container principal dos ciclos
    <div className={styles.cycles}>
      {/* Texto fixo indicando a seção */}
      <span>Ciclos:</span>

      {/* Container dos pontos (bolinhas) que representam os ciclos */}
      <div className={styles.cycleDots}>
        {/* Itera sobre cada ciclo já concluído */}
        {cycleStep.map((_, index) => {
          // Calcula qual é o próximo ciclo com base no índice
          const nextCycle = getNextCycle(index);

          // Obtém o tipo do ciclo (workTime, shortBreakTime, longBreakTime)
          const NextCycleType = getNextCycleType(nextCycle);

          // Retorna o indicador visual do ciclo
          return (
            <span
              // Chave única para o React identificar o elemento
              key={nextCycle}
              // Aplica a classe base do ponto
              // e a classe específica de acordo com o tipo do ciclo
              className={`${styles.cycleDot} ${styles[NextCycleType]}`}
              // Texto acessível para leitores de tela
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[NextCycleType]}`}
              // Tooltip exibido ao passar o mouse
              title={`Indicador de ciclo de ${cycleDescriptionMap[NextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
