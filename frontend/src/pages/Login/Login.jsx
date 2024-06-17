import { Link } from "react-router-dom";
import "./Login.css"

export default function Login() {
    return (
        <div className="login-signup-background root-div-flex-row flex-center-vh">
            <div className="login-container">
                <h2>Bem-Vindo ao Sistema!</h2>
                <h3>Insira suas credenciais</h3>
                <form className="login-form">
                    <input type="text" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <div className="signup-forgot-links">
                        <Link to={"/signup"}>Não possui uma conta?</Link>
                        {/* <Link to={"/forgot"}>Esqueceu a senha?</Link> */}
                    </div>
                    <Link to="/"><button type="submit">Login</button></Link>
                </form>
            </div>
        </div>
    );
};