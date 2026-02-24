import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../uteis/getNextCycle';
import { getNextCycleType } from '../../uteis/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const NextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={nextCycle}
              className={`${styles.cycleDot} ${styles[NextCycleType]}`}
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[NextCycleType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[NextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
