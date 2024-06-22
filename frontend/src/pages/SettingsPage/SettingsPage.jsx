import { React, useState, useContext } from "react";
import SettingsComponent from "../../components/SettingsComponent/SettingsComponent";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../instances/axios";

import "./SettingsPage.css";

export default function SettingsPage() {
  const { auth, logout } = useContext(AuthContext);

  const [settings, setSettings] = useState([
    {
      settingName: "Name",
      settingValue: "John Doe",
    },
    {
      settingName: "School",
      settingValue: "School Name",
    },
    {
      settingName: "Email",
      settingValue: "johndoe123@email.com",
    },
    {
      settingName: "Phone Number",
      settingValue: "123-456-7890",
    },
    {
      settingName: "Birthday",
      settingValue: "01/01/2000",
    },
    {
      settingName: "Gender",
      settingValue: "Male",
    },
    {
      settingName: "Password",
      settingValue: "********",
    },
  ]);

  const handleSave = (settingName, newValue) => {
    const updatedSettings = settings.map((setting) => {
      if (setting.settingName === settingName) {
        return { ...setting, settingValue: newValue };
      }
      return setting;
    });
    setSettings(updatedSettings);
  };

  const handleDeleteAcc = async () => {
    const confirm = window.confirm("Deseja salvar as alterações?");

    if (confirm) {
      try {
        const loggedEmail = localStorage.getItem("email");

        const responseDelUser = await axios.delete(`/users/${loggedEmail}`, {
          headers: {
            authorization: auth
          }
        });
        alert("Conta deletada com sucesso!");
        logout();
      } catch (error) {
        alert(`Ocorreu um erro ao apagar a conta: '${error.response.data.ok}'`);
        console.error(error);
      }
    }
  }

  return (
    <div className="settings-info-page-container">
      <div className="page-title">
        <h1><span>Minhas Configurações</span></h1>
        <p>Altere suas informações pessoais e visualize sua política de privacidade.</p>
      </div>
      <div className="settings-container">
        <div className="settings-profile">
          <h2>Meu Perfil</h2>
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="profile-picture"
          />
          <h3>{settings[0].settingValue}</h3>
          <div className="delete-profile-btn">
            <button onClick={handleDeleteAcc}>Delete Profile</button>
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
          Croissant carrot cake dessert marzipan gingerbread sweet. Tiramisu
          cotton candy gingerbread sugar plum toffee croissant cupcake carrot
          cake pudding. Apple pie caramels icing croissant fruitcake danish.
          Sesame snaps cake cotton candy caramels gummies jelly. Gingerbread
          cupcake candy canes apple pie donut ice cream sugar plum. Toffee
          brownie chocolate bar chocolate cake candy canes cupcake muffin. Cake
          liquorice pie oat cake chocolate cake. Dessert halvah icing toffee
          wafer bonbon caramels oat cake cheesecake. Topping dragée powder jelly
          beans candy danish. Shortbread gingerbread candy canes sesame snaps
          apple pie toffee candy lollipop tiramisu. Jujubes liquorice chupa
          chups gingerbread icing. Icing marshmallow gummi bears jujubes sesame
          snaps ice cream. Jujubes carrot cake icing chocolate cake oat cake
          jujubes jujubes.
        </p>
      </div>
    </div>
  );
}
