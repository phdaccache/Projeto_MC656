import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./SignUp.css";
import axios from "../../instances/axios";

export default function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const responseUser = await axios.post("/users", {
        name: nome,
        birth_date: date,
        email: email,
        password,
        gender: gender,
        phone_number: phone,
      });
    } catch (error) {
      console.error(error);
      alert(`Ocorreu um erro ao criar o usuário: '${error.response.data.ok}'`);
      return;
    }

    const tempToken = (
      await axios.post("/login", {
        email: email,
        password: password,
      })
    ).data.token;

    if (isTeacher) {
      try {
        const responseSchool = await axios.post("/school", {
          name: school,
          manager: email,
        });
        console.log("resposta:", responseSchool);
      } catch (error) {
        while (true) {
          try {
            const responseDelUser = await axios.delete(`/users/${email}`, {
              headers: {
                authorization: tempToken,
              },
            });
            break;
          } catch (error) {
            console.error(error);
          }
        }
        console.error(error);
        alert(`Ocorreu um erro ao criar a escola: '${error.response.data.ok}'`);
        return;
      }
    }

    try {
      const responseSchoolUser = await axios.post("/schoolusers", {
        user: email,
        school: school,
        permission: isTeacher ? "teacher" : "student",
      });
    } catch (error) {
      while (true) {
        try {
          const responseDelUser = await axios.delete(`/users/${email}`, {
            headers: {
              authorization: tempToken,
            },
          });
          break;
        } catch (error) {
          console.error(error);
        }
      }
      console.error(error);
      alert(
        `Ocorreu um erro ao inserir o usuário na escola: '${error.response.data.ok}'`
      );
      return;
    }

    setSuccess(true); // Redireciona para a página de login
    // setError(true);
  };

  return (
    <div className="login-signup-background root-div-flex-row flex-center-vh">
      <div className="signup-container">
        <Link to="/login" className="signup-back">
          <i class="fa-solid fa-circle-arrow-left"></i>
        </Link>
        <h2 className="signup-title">Cadastro de Conta</h2>
        <h3>Insira suas credenciais</h3>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="main-infos">
            <div className="signup-column">
              <div className="signup-option">
                <label for="nome">Nome Completo:</label>
                <input
                  type="text"
                  placeholder="Nome Sobrenome"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="signup-option">
                <label for="email">E-mail:</label>
                <input
                  // type="email"
                  type="text"
                  placeholder="exemplo@email.com"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="signup-option">
                <label for="telefone">Telefone:</label>
                <input
                  // type="tel"
                  // pattern="[0-9]{2} [0-9]{5}-[0-9]{4}"
                  type="text"
                  placeholder="98765-4321"
                  id="telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <hr className="signup-hr" />

            <div className="signup-column">
              <div className="signup-option">
                <label for="genero">Gênero:</label>
                {/* <input type="text" placeholder="Gênero" required /> */}
                <select
                  name="genero"
                  id="genero"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option disabled value="">
                    {" "}
                    -- selecione aqui --{" "}
                  </option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>

              <div className="signup-option">
                <label for="data">Data de Nascimento:</label>
                <input
                  type="date"
                  value={date}
                  id="data"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="signup-option">
                <label for="escola">Escola:</label>
                <input
                  type="text"
                  placeholder="Escola"
                  id="escola"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="signup-passwords">
            <div className="signup-option">
              <label for="senha">Senha:</label>
              <input
                type="password"
                placeholder="Senha"
                id="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="signup-option">
              <label for="confirmar-senha">Confirmar Senha:</label>
              <input
                type="password"
                placeholder="Confirmar Senha"
                id="confirmar-senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="signup-option check-confirm">
            <label for="professor">Professor?</label>
            <input
              type="checkbox"
              id="professor"
              checked={isTeacher}
              onChange={(e) => setIsTeacher(e.target.checked)}
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
        {success && <Navigate to="/login" />}
      </div>
    </div>
  );
}
