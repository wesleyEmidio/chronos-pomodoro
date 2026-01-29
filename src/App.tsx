import './styles/theme.css';
import './styles/global.css';

//exportando a função
export function App() {
  return (
    <>
      <div className='container'>
        <div className='content'>
          <section>LOGO</section>
        </div>
      </div>

      <div className='container'>
        <div className='content'>
          <section>MENU</section>
        </div>
      </div>

      <div className='container'>
        <div className='content'>
          <section>FORM</section>
        </div>
      </div>

      <div className='container'>
        <div className='content'>
          <section>FOOTER</section>
        </div>
      </div>
    </>
  );
}

//export default App; posso usar qualquer nome quando for exportar
//export { App }; //Obriga a exportar com o mesmo nome
