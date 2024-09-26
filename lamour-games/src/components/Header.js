import { Link } from "react-router-dom";
import { routes } from "../router/routes";

export default function Header() {
  return (
    <header>
      <Link to={routes.about} type="button">
        <div>
          <img src="/assets/logo.png" alt="Logo da L'AMour Games" />
        </div>
      </Link>

      <h1>L'Amour Games</h1>
    </header>
  );
}
