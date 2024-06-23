import { React, useState, useContext, useEffect } from "react";
import SettingsComponent from "../../components/SettingsComponent/SettingsComponent";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../instances/axios";

import "./SettingsPage.css";

export default function SettingsPage() {
  const { auth, logout } = useContext(AuthContext);
  const [settings, setSettings] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const userDataResponse = await axios.get("/users/", {
        headers: {
          authorization: auth,
        },
      });

      const userSchoolResponse = await axios.get("/schoolusers/", {
        headers: {
          authorization: auth,
        },
      });

      const userData = userDataResponse.data.userList[0];
      const schoolData = userSchoolResponse.data.userSchoolList[0];

      setSettings([
        {
          settingName: "Nome",
          settingValue: userData.name,
        },
        {
          settingName: "Escola",
          settingValue: schoolData.school,
        },
        {
          settingName: "Email",
          settingValue: userData.email,
        },
        {
          settingName: "Telefone",
          settingValue: userData.phone_number,
        },
        {
          settingName: "Data de Nascimento",
          settingValue: new Date(userData.birth_date)
            .toISOString()
            .split("T")[0],
        },
        {
          settingName: "Gênero",
          settingValue: userData.gender,
        },
        {
          settingName: "Senha",
          settingValue: userData.password.slice(0, 10),
        },
      ]);
    };

    fetchData();
  }, [settings]);

  const handleSave = async (settingName, newValue) => {
    const getPassword = () => {
      const password = prompt("Digite sua senha para confirmar as alterações:");
      return password;
    };

    const updatedSettings = settings.map((setting) => {
      if (setting.settingName === settingName) {
        return { ...setting, settingValue: newValue };
      }
      return setting;
    });
    setSettings(updatedSettings);

    const loggedEmail = localStorage.getItem("email");

    try {
      const responseUpdtUser = await axios.put(
        `/users/${loggedEmail}`,
        {
          name: updatedSettings[0].settingValue,
          email: settings[2].settingValue,
          phone_number: updatedSettings[3].settingValue,
          birth_date: updatedSettings[4].settingValue,
          gender: updatedSettings[5].settingValue,
          password:
            settingName === "Senha"
              ? updatedSettings[6].settingValue
              : getPassword(),
        },
        {
          headers: {
            authorization: auth,
          },
        }
      );
      return { ok: true };
    } catch (error) {
      alert(`Erro ao atualizar os dados: ${error.response.data.ok}`);
      return { ok: false };
    }
  };

  const handleDeleteAcc = async () => {
    const confirm = window.confirm(
      "Você tem certeza que quer excluir sua conta permanentemente?"
    );

    if (confirm) {
      try {
        const loggedEmail = localStorage.getItem("email");

        const responseDelUser = await axios.delete(`/users/${loggedEmail}`, {
          headers: {
            authorization: auth,
          },
        });
        alert("Conta deletada com sucesso!");
        logout();
      } catch (error) {
        alert(
          "Contate um administrador do sistema para apagar sua conta de professor."
        );
        console.error(error);
      }
    }
  };

  return (
    <div className="settings-info-page-container">
      <div className="page-title">
        <h1>
          <span>Minhas Configurações</span>
        </h1>
        <p>
          Altere suas informações pessoais e visualize sua política de
          privacidade.
        </p>
      </div>
      <div className="settings-container">
        <div className="settings-profile">
          <h2>Meu Perfil</h2>
          <img
            src={`https://robohash.org/${localStorage.getItem(
              "email"
            )}?set=set4`}
            alt="profile"
            className="profile-picture"
          />
          <h3>{settings[0].settingValue}</h3>
          <div onClick={handleDeleteAcc} className="delete-profile-btn">
            Apagar Conta
          </div>
        </div>
        <hr />
        <div className="settings-information">
          <h2>Informações Pessoais</h2>
          <div className="all-settings-container">
            {settings.map((setting) => (
              <SettingsComponent
                settingName={setting.settingName}
                settingValue={setting.settingValue}
                onSave={handleSave}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="politica-privacidade">
        <h2>Política de Privacidade</h2>
        <p>
          As únicas informações armazenadas pelo sistema são as disponibilizadas
          diretamente no cadastro (seja da conta ou de alguma olimpíada). A
          senha utilizada no cadastro é armazenada com segurança. Ao deletar a
          sua conta, as informações são removidas completamente do sistema.
        </p>
      </div>
    </div>
  );
}
