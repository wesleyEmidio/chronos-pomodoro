import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';
import { TimerIcon } from 'lucide-react';

//exportando a função
export function App() {
  return (
    <>
      <Heading>
        Olá mundo 1
        <button>
          <TimerIcon />
        </button>
      </Heading>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum cumque
        incidunt accusamus commodi quasi sit, doloribus in fugiat, repellat
        laudantium voluptas praesentium labore dolore unde! Aliquam, dolorem! A,
        quia rerum!
      </p>
    </>
  );
}

//export default App; posso usar qualquer nome quando for exportar
//export { App }; //Obriga a exportar com o mesmo nome
