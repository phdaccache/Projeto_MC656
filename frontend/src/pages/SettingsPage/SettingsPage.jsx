import { React, useState } from "react";
import SettingsComponent from "../../components/SettingsComponent/SettingsComponent";

import "./SettingsPage.css";

export default function SettingsPage() {
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

  return (
    <div className="settings-info-page-container">
      <div className="settings-container">
        <div className="settings-profile">
          <h1>Meu Perfil</h1>
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="profile-picture"
          />
          <h3>{settings[0].settingValue}</h3>
          <div className="delete-profile-btn">
            <button>Delete Profile</button>
          </div>
        </div>
        <hr />
        <div className="settings-information">
          <h1>Informações Pessoais</h1>
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
