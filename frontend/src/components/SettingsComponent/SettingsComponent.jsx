import { React, useState, useRef, useEffect } from "react";
import "./SettingsComponent.css";
// import SettingsSavedPopup from './SettingsSavedPopup';

export default function SettingsComponent({ settingName, settingValue, onSave }) {
  const [editando, setEditando] = useState(false);
  const [inputValue, setInputValue] = useState(settingValue);
  const inputRef = useRef(null);

  // const [settingsSaved, setSettingsSaved] = useState(false);

  const toggleEditing = () => {
    setEditando(!editando);
    if (!editando) {
      setInputValue(settingValue);
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
      try {
        // TODO - implementar a integração com o backend
        // const response = axios.post('http://localhost:3000/', {
        // if (!response.ok) {
        //     throw new Error('Failed to save setting');
        // }
        // const data = await response.json();
        console.log("Saved value:", inputValue);
        onSave(settingName, inputValue);
        // setSettingsSaved(true);

        // setTimeout(() => {
        //   setSettingsSaved(false);
        // }, 3000);
      } catch (error) {
        console.error(error);
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
            <input
              type="text"
              className="edit-field"
              value={editando ? inputValue : settingValue}
              onChange={handleInputChange}
              ref={inputRef}
              readOnly={!editando}
            />
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
      {/* {settingsSaved ? (
        <div className="fade-in">
          <SettingsSavedPopup />
        </div>
      ) : null} */}
    </>
  );
}
