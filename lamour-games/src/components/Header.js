import { Link } from "react-router-dom";
import { routes } from "../router/routes";
import { useState } from "react";
import { auth } from "../firebase-config"; 
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Verifica se o usuário está autenticado
  const user = auth.currentUser;

  return (
    <header>
      <div className="logolamour">
        <img src="https://i.ibb.co/0DwFRnk/L-amour-Games.png" alt="Logo da L'Amour Games" />
      </div>

      <h1>L'Amour Games</h1>
      <button
        id="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen} 
        aria-label="Toggle menu" 
      >
        <span className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </span>
      </button>

      <nav className={isMenuOpen ? "menu-open" : ""}>
        <ul>
          <li>
            <Link to={routes.home}>Home</Link>
          </li>
          <li>
            <Link to={routes.shop}>Loja</Link>
          </li>
          <li>
            <Link to={routes.about}>Sobre</Link>
          </li>
          <li>
            <Link to={routes.contact}>Contato</Link>
          </li>
          {/* Exibe o botão de Perfil ou os botões de Login e Signup */}
          {user ? (
            <li>
              <Link to={routes.userProfile}>Perfil</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to={routes.login}>Login</Link>
              </li>
              <li>
                <Link to={routes.signup}>Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
