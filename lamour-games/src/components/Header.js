import { Link } from "react-router-dom";
import { routes } from "../router/routes";
import { useState } from "react";

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div>
          <img src="/assets/logo.png" alt="Logo da L'AMour Games" />
        </div>

      <h1>L'Amour Games</h1>
      <button
        id="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen} // Acessibilidade
        aria-label="Toggle menu" // Acessibilidade
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
        </ul>
      </nav>
    </header>
  );
}
