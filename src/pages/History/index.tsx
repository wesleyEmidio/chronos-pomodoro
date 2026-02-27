import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { useMemo, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { sortTasks } from '../../uteis/sortTasks';
import { formatDate } from '../../uteis/formatDate';
import { getTaskStatus } from '../../uteis/getTaskStatus';
import type { TaskModel } from '../../models/TaskModel';

type SortField = 'name' | 'duration' | 'startDate';
type SortDirection = 'asc' | 'desc';

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

  const [field, setField] = useState<SortField>('startDate');
  const [direction, setDirection] = useState<SortDirection>('desc');

  // ✅ Valor derivado (forma correta)
  const sortedTasks = useMemo(() => {
    return sortTasks({
      tasks: state.tasks,
      field,
      direction,
    });
  }, [state.tasks, field, direction]);

  function handleSortTasks(newField: SortField) {
    const newDirection =
      field === newField && direction === 'desc' ? 'asc' : 'desc';

    setField(newField);
    setDirection(newDirection);
  }

  function handleResetHistory() {
    if (!confirm('Tem certeza que deseja apagar todo o histórico?')) return;
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>

          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks('name')}
                    className={styles.thSort}
                  >
                    Tarefa ↕
                  </th>

                  <th
                    onClick={() => handleSortTasks('duration')}
                    className={styles.thSort}
                  >
                    Duração ↕
                  </th>

                  <th
                    onClick={() => handleSortTasks('startDate')}
                    className={styles.thSort}
                  >
                    Data ↕
                  </th>

                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasks.map(task => {
                  const taskTypeDictionary: Record<TaskModel['type'], string> =
                    {
                      workTime: 'Foco',
                      shortBreakTime: 'Descanso curto',
                      longBreakTime: 'Descanso longo',
                    };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
