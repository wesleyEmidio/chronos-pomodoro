// Importa o hook personalizado useTaskContext
// Ele permite acessar o contexto global relacionado às tarefas (TaskContext)
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

// Importa os estilos CSS Modules específicos deste componente
// `styles` será um objeto com os nomes das classes gerados automaticamente
import styles from './styles.module.css';

// Declara e exporta o componente funcional CountDown
export function CountDown() {
  // Desestrutura o objeto retornado pelo contexto,
  // pegando apenas o `state`, que contém os dados atuais da tarefa
  const { state } = useTaskContext();

  // Retorna o JSX que será renderizado na tela
  return (
    // Div principal do contador
    // Aplica a classe CSS `container` vinda do CSS Module
    <div className={styles.container}>
      {/* 
        Exibe o valor `formattedSecondsRemaining`,
        que normalmente já vem formatado (ex: "05:32")
        e representa o tempo restante da tarefa
      */}
      {state.formattedSecondsRemaining}
    </div>
  );
}
