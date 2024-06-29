import { React, useState, useRef, useEffect } from "react";
import "./SettingsComponent.css";
import StatusPopup from "../StatusPopup/StatusPopup";

export default function SettingsComponent({
  settingName,
  settingValue,
  onSave,
}) {
  const [editando, setEditando] = useState(false);
  const [inputValue, setInputValue] = useState(settingValue);
  const inputRef = useRef(null);

  const [settingsSaved, setSettingsSaved] = useState(false);

  const toggleEditing = () => {
    if (settingName !== "Email") {
      setEditando(!editando);
      if (!editando) {
        setInputValue(settingValue);
      }
    } else {
      alert("Não é possível alterar o email nessa versão.");
    }
  };

  useEffect(() => {
    if (editando && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editando]);

  const saveEdit = async () => {
    const confirm = window.confirm("Deseja salvar as alterações?");
    if (confirm) {
      const { ok } = await onSave(settingName, inputValue);
      console.log(ok);

      if (ok) {
        setSettingsSaved(true);

        setTimeout(() => {
          setSettingsSaved(false);
        }, 3130);
      }
    }
    toggleEditing();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="setting">
        <div className="setting-name">
          {settingName}:
          {!editando ? (
            <button className="edit-btn showing" onClick={toggleEditing}>
              <i class="fa-solid fa-pen-to-square showing"></i>
            </button>
          ) : (
            <button className="edit-btn not-showing" onClick={toggleEditing}>
              <i class="fa-solid fa-pen-to-square not-showing"></i>
            </button>
          )}
        </div>
        <div className="setting-value">
          <form onSubmit={(e) => e.preventDefault()}>
            {settingName !== "Gênero" ? (
              <input
                type={
                  settingName != "Senha"
                    ? settingName != "Data de Nascimento"
                      ? "text"
                      : "date"
                    : "password"
                }
                className="edit-field"
                value={editando ? inputValue : settingValue}
                onChange={handleInputChange}
                ref={inputRef}
                readOnly={!editando}
              />
            ) : (
              <select
                className="edit-field"
                value={editando ? inputValue : settingValue}
                onChange={handleInputChange}
                ref={inputRef}
                disabled={!editando}
                style={{ opacity: "1", color: "black", }}
              >
                <option disabled value="">
                    {" "}
                    -- selecione aqui --{" "}
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            )}
          </form>
        </div>
        {editando ? (
          <div className="confirm-reject showing">
            <i className="confirm fa-solid fa-check" onClick={saveEdit}></i>
            <i className="reject fa-solid fa-xmark" onClick={toggleEditing}></i>
          </div>
        ) : (
          <div className="confirm-reject not-showing">
            <i className="confirm fa-solid fa-check"></i>
            <i className="reject fa-solid fa-xmark"></i>
          </div>
        )}
      </div>
      {settingsSaved ? (
        <StatusPopup status="success" message="Configurações salvas!" />
      ) : null}
    </>
  );
}
