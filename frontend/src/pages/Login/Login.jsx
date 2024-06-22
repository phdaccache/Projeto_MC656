import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../instances/axios";
import "./Login.css";

// import StatusPopup from "../../components/StatusPopup/StatusPopup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      login(response.data.token);
    } catch (error) {
      alert("Ocorreu um erro ao fazer login.");
      console.error(error);
    }
    setUser(true);
    // setError(true);
  };

  return (
    <div className="login-signup-background root-div-flex-row flex-center-vh">
      <div className="login-container">
        <h2>Bem-Vindo ao Sistema!</h2>
        <h3>Insira suas credenciais</h3>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            // type="email"
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="signup-forgot-links">
            <Link to={"/signup"}>Não possui uma conta?</Link>
            {/* <Link to={"/forgot"}>Esqueceu a senha?</Link> */}
          </div>
          <button type="submit">Login</button>
          {user && (<Navigate to="/home" />)}
          {/* {error && (<StatusPopup status="failure" message="Ocorreu um Erro..." />)} */}
        </form>
      </div>
    </div>
  );
}
