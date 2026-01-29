import './styles/theme.css';
import './styles/global.css';

import { Heading } from './components/Heading';
import { Container } from './components/Container';

//exportando a função
export function App() {
  return (
    <>
      <Container>
        <Heading>LOGO</Heading>
      </Container>

      <Container>
        <Heading>MENU</Heading>
      </Container>
    </>
  );
}
