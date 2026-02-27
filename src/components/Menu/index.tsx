// Importa ícones SVG como componentes React
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';

// Importa os estilos do Menu usando CSS Modules
import styles from './styles.module.css';

// Importa hooks do React
import { useEffect, useState } from 'react';

// Importa o componente de link para navegação interna
import { RouterLink } from '../RouterLink';

// Define os temas disponíveis na aplicação
type AvailableThemes = 'dark' | 'light';

// Declara e exporta o componente Menu
export function Menu() {
  // Estado responsável por controlar o tema atual da aplicação
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    // Tenta recuperar o tema salvo no localStorage
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';

    // Retorna o tema inicial
    return storageTheme;
  });

  // Mapeia qual ícone será exibido
  // de acordo com o tema atual
  const nextThemeIcon = {
    dark: <SunIcon />, // Se o tema atual é dark, mostra o ícone do sol
    light: <MoonIcon />, // Se o tema atual é light, mostra o ícone da lua
  };

  // Função chamada ao clicar no botão de trocar tema
  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    // Impede o comportamento padrão do link (<a>)
    // evitando navegação ou reload
    event.preventDefault(); // não segue o link

    // Atualiza o tema com base no valor anterior
    setTheme(prevTheme => {
      // Alterna entre dark e light
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';

      return nextTheme;
    });
  }

  // useEffect executado sempre que o tema muda
  useEffect(() => {
    // Define um atributo no <html>
    // Ex: <html data-theme="dark">
    document.documentElement.setAttribute('data-theme', theme);

    // Salva o tema no localStorage
    // para persistir entre reloads
    localStorage.setItem('theme', theme);
  }, [theme]); // Dependência: executa apenas quando o tema mudar

  // Renderização do menu de navegação
  return (
    // Elemento semântico <nav> para menus
    <nav className={styles.menu}>
      {/* Link para a Home */}
      <RouterLink
        className={styles.menuLink}
        href='/'
        aria-label='Ir para a home.'
        title='Ir para a home'
      >
        <HouseIcon />
      </RouterLink>

      {/* Link para o histórico */}
      <RouterLink
        className={styles.menuLink}
        href='/history/'
        aria-label='Ver historico.'
        title='Ver historico'
      >
        <HistoryIcon />
      </RouterLink>

      {/* Link para as configurações */}
      <RouterLink
        className={styles.menuLink}
        href='/settings/'
        aria-label='configurações.'
        title='configurações'
      >
        <SettingsIcon />
      </RouterLink>

      {/* Botão para alternar o tema */}
      <a
        className={styles.menuLink}
        href='#' // Link fictício
        aria-label='Mudar tema.'
        title='Mudar tema'
        onClick={handleThemeChange}
      >
        {/* Ícone exibido conforme o tema atual */}
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
