import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../instances/axios";

import "./CreateEvent.css";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [school, setSchool] = useState("");
  const { auth } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const schoolResponse = await axios.get("/schoolusers", {
        headers: {
          authorization: `${auth}`,
        },
      });
      setSchool(schoolResponse.data.userSchoolList[0].school);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(`Nome: ${eventName} Início: ${eventStartDate} Término: ${eventEndDate} Descrição: ${eventDescription}`);

    let success = false;
    try {
      const response = await axios.post("/olympiad", {
        name: eventName,
        date_start: eventStartDate,
        date_end: eventEndDate,
        school: school,
        description: eventDescription,
      });

      const defaultEvents = [
        "Corrida de 100m",
        "Tênis de Mesa",
        "Natação 100m livre",
        "Esgrima",
      ];
      for (let i = 0; i < defaultEvents.length; i++) {
        await axios.post("/olympiadsports", {
          sport: defaultEvents[i],
          olympiad: eventName,
          school: school,
        });
      }

      success = response.status === 200;
    } catch (error) {
      alert(
        `Ocorreu um erro ao criar a olimpíada: '${error.response.data.ok}'`
      );
      console.error(error);
    }

    setSuccess(success);
    setError(!success);
  };

  return (
    <div className="create-event-container">
      <div className="create-event-header page-title">
        <h1>
          <span>Criar Olimpíada</span>
        </h1>
        <p>Preencha os campos abaixo para criar uma nova olimpíada.</p>
      </div>
      <form onSubmit={handleSubmit} className="create-event-form">
        <h2>Criar uma Olimpíada</h2>
        <Link to={"/home"} className="back-create-form">
          <i class="fa-solid fa-circle-arrow-left"></i>
        </Link>
        <div className="create-event-form-field">
          <label for="nome-evento">Nome da Olimpíada:</label>
          <input
            type="text"
            id="nome-evento"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="create-event-form-field">
          <label for="start-date">Data de Início:</label>
          <input
            type="date"
            id="start-date"
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
          />
        </div>
        <div className="create-event-form-field">
          <label for="end-date">Data de Término:</label>
          <input
            type="date"
            id="end-date"
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
          />
        </div>
        <div className="create-event-form-field">
          <label for="description">Descrição:</label>
          <textarea
            id="description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="create-event-form-fieldpadrao-esportes">
          <label for="esportes">Pré-definir esportes?</label>
          <input type="checkbox" id="esportes" checked={true} disabled />
        </div>
        <div className="create-event-form-field">
          <button type="submit">Criar Olimpíada</button>
        </div>
      </form>
      {success && <Navigate to="/home" />}
      {/* {error && (<StatusPopup status="failure" message="Ocorreu um Erro..." />)} */}
    </div>
  );
}
