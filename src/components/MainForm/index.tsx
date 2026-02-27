// Importa ícones de play e stop como componentes React (SVG)
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

// Importa o componente que exibe os ciclos (bolinhas)
import { Cycles } from '../Cycles';

// Importa o botão padrão reutilizável
import { DefaultButton } from '../DefaultButton';

// Importa o input padrão reutilizável
import { DefaultInput } from '../DefaultInput';

// Importa React e o hook useRef
import React, { useRef } from 'react';

// Importa o modelo de dados de uma tarefa
import type { TaskModel } from '../../models/TaskModel';

// Importa o hook para acessar o contexto de tarefas
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// Importa a função que calcula o próximo ciclo
import { getNextCycle } from '../../uteis/getNextCycle';

// Importa a função que retorna o tipo do ciclo
import { getNextCycleType } from '../../uteis/getNextCycleType';

// Importa os tipos de ações do reducer de tarefas
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

// Importa o componente de dicas
import { Tips } from '../Tips';

// Importa o adapter de mensagens (toast)
import { showMessage } from '../../adapters/showMessage';

// Declara e exporta o componente principal do formulário
export function MainForm() {
  // Obtém o estado global e o dispatch do contexto de tarefas
  const { state, dispatch } = useTaskContext();

  // Cria uma referência para o input do nome da tarefa
  // Permite acessar diretamente o valor do input
  const taskNameInput = useRef<HTMLInputElement>(null);

  // Recupera o nome da última tarefa criada
  // Usado como valor padrão no input
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  // =====================
  // LÓGICA DE CICLOS
  // =====================

  // Calcula qual será o próximo ciclo com base no ciclo atual
  const nextCycle = getNextCycle(state.currentCycle);

  // Obtém o tipo do próximo ciclo
  // (workTime, shortBreakTime ou longBreakTime)
  const NextCycleType = getNextCycleType(nextCycle);

  // =====================
  // CRIAÇÃO DE NOVA TAREFA
  // =====================

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    // Impede o comportamento padrão do formulário (reload da página)
    event.preventDefault();

    // Fecha qualquer toast aberto anteriormente
    showMessage.dismiss();

    // Garante que a referência do input existe
    if (taskNameInput.current === null) return;

    // Obtém o valor digitado no input e remove espaços extras
    const taskName = taskNameInput.current.value.trim();

    // Validação: nome da tarefa vazio
    if (!taskName) {
      showMessage.warning('Digite o nome da tarefa.');
      return;
    }

    // Cria um novo objeto de tarefa seguindo o modelo TaskModel
    const newTask: TaskModel = {
      id: Date.now().toString(), // ID único baseado no timestamp
      name: taskName, // Nome da tarefa
      startDate: Date.now(), // Data/hora de início
      completeDate: null, // Ainda não concluída
      interruptDate: null, // Ainda não interrompida
      duration: state.config[NextCycleType], // Duração baseada no tipo do ciclo
      type: NextCycleType, // Tipo do ciclo
    };

    // Dispara a ação para iniciar a tarefa no contexto global
    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    // Exibe mensagem de sucesso
    showMessage.success('Tarefa iniciada.');
  }

  // =====================
  // INTERRUPÇÃO DE TAREFA
  // =====================

  function handleInterruptTask() {
    // Fecha qualquer toast aberto
    showMessage.dismiss();

    // Exibe mensagem de aviso
    showMessage.warning('Tarefa interrompida.');

    // Dispara a ação de interrupção da tarefa
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  // =====================
  // RENDERIZAÇÃO DO FORMULÁRIO
  // =====================

  return (
    // Formulário principal
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      {/* Linha do input da tarefa */}
      <div className='formRow'>
        <DefaultInput
          labelText='Task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput} // Referência para leitura do valor
          disabled={!!state.activeTask} // Desabilita se houver tarefa ativa
          defaultValue={lastTaskName} // Última tarefa como valor inicial
        />
      </div>

      {/* Linha das dicas */}
      <div className='formRow'>
        <Tips />
      </div>

      {/* Exibe os ciclos somente se houver pelo menos 1 ciclo */}
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      {/* Linha dos botões */}
      <div className='formRow'>
        {/* Botão de iniciar tarefa (apenas se não houver tarefa ativa) */}
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key='botao_submit'
          />
        )}

        {/* Botão de interromper tarefa (apenas se houver tarefa ativa) */}
        {!!state.activeTask && (
          <DefaultButton
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key='botao_button'
          />
        )}
      </div>
    </form>
  );
}
