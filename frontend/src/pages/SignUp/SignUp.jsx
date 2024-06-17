import { Link } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  return (
    <div className="login-signup-background root-div-flex-row flex-center-vh">
      <div className="signup-container">
        <Link to="/login" className="signup-back">
          <i class="fa-solid fa-circle-arrow-left"></i>
        </Link>
        <h2 className="signup-title">Cadastro de Conta</h2>
        <h3>Insira suas credenciais</h3>
        <form className="signup-form">
          <div className="main-infos">

            <div className="signup-column">
              <div className="signup-option">
                <label for="nome">Nome Completo:</label>
                <input type="text" placeholder="Nome Completo" required />
              </div>

              <div className="signup-option">
                <label for="email">E-mail:</label>
                <input type="text" placeholder="E-mail" required />
              </div>

              <div className="signup-option">
                <label for="telefone">Telefone: 12 12345-1234</label>
                <input
                  type="tel"
                  pattern="[0-9]{2} [0-9]{5}-[0-9]{4}"
                  placeholder="Telefone"
                  required
                />
              </div>
            </div>

            <hr className="signup-hr" />

            <div className="signup-column">
              <div className="signup-option">
                <label for="genero">Gênero:</label>
                <input type="text" placeholder="Gênero" required />
              </div>

              <div className="signup-option">
                <label for="data">Data de Nascimento:</label>
                <input type="date" placeholder="Data de Nascimento" required />
              </div>

              <div className="signup-option">
                <label for="escola">Escola:</label>
                <input type="text" placeholder="Escola" required />
              </div>
            </div>
          </div>

          <div className="signup-passwords">
            <div className="signup-option">
              <label for="senha">Senha:</label>
              <input type="password" placeholder="Senha" required />
            </div>

            <div className="signup-option">
              <label for="confirmar-senha">Confirmar Senha:</label>
              <input type="password" placeholder="Confirmar Senha" required />
            </div>
          </div>

          <div className="signup-option check-confirm">
            <label for="professor">Professor?</label>
            <input type="checkbox" />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
