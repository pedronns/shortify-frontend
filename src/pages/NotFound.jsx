import { Link } from "react-router-dom";

import "../App.css"

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <h1 className="display-1 mb-3">404</h1>
      <h2 className="mb-3">Página não encontrada</h2>
      <p className="mb-4">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link to="/" className="btn btn-primary">
        Voltar para a Home
      </Link>
    </div>
  );
}
