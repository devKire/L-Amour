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

      <input
        type="checkbox"
        id="menu-toggle"
        checked={isMenuOpen}
        onChange={() => setIsMenuOpen(!isMenuOpen)}
      />
      <label className="hamburger" htmlFor="menu-toggle">
        <div></div>
        <div></div>
        <div></div>
      </label>

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
