// Importa o componente Link do react-router
// Ele é usado para navegação interna sem recarregar a página
import { Link } from 'react-router';

// Define o tipo das propriedades aceitas pelo RouterLink
type RouterLinkProps = {
  // Conteúdo que ficará dentro do link
  // Pode ser texto, ícone, ou qualquer JSX
  children: React.ReactNode;

  // URL de destino (equivalente ao href de um <a>)
  href: string;

  // Herda todas as propriedades nativas de um elemento <a>
  // Ex: className, title, aria-label, onClick, etc.
} & React.ComponentProps<'a'>;

// Declara e exporta o componente RouterLink
export function RouterLink({ children, href, ...props }: RouterLinkProps) {
  // Retorna o componente Link do react-router
  // O atributo `to` substitui o href tradicional
  return (
    <Link
      to={href} // Define a rota de destino
      {...props} // Repassa todas as outras props para o Link
    >
      {/* Renderiza o conteúdo interno do link */}
      {children}
    </Link>
  );
}
