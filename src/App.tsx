import './styles/theme.css';
import './styles/global.css';

//exportando a função
export function App() {
  console.log('oi');

  return (
    // react fragment <> </>
    <>
      <h1>Olá mundo ! (do App)</h1>
      <p>Teste wesley</p>
    </>
  );
}

//export default App; posso usar qualquer nome quando for exportar
//export { App }; //Obriga a exportar com o mesmo nome
