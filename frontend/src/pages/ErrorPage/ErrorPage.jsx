import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const { error } = useRouteError();

  return (
    <div className="main-sidebar-background root-div-flex-col flex-center-vh">
      <div className="error-container">
        <h1>Erro!</h1>
        <h3>Ocorreu um erro ao carregar a página, por favor tente novamente ou entre em contato com algum administrador.</h3>
        <p>Erro: <em>{error.statusText || error.message}</em></p>
      </div>
    </div>
  );
}