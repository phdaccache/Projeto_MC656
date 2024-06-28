import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../instances/axios";
import SportComponent from "../../components/SportComponent/SportComponent";
import "./ViewEvent.css";

export default function ViewEvent() {
  const location = useLocation();
  const { event } = location.state || {};
  const [sportsList, setSportsList] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const [teacher, setTeacher] = useState(false);
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const schoolResponse = await axios.get("/schoolusers", {
        headers: {
          authorization: `${auth}`,
        },
      });

      setTeacher(
        schoolResponse.data.userSchoolList[0].permission !== "student"
      );

      const participantResponse = await axios.get(`/olympiadusers/${id}`, {
        headers: {
          authorization: auth,
        },
      });
      setParticipantsList(participantResponse.data);
      console.log(participantResponse.data);

      const sportsResponse = await axios.get(`/olympiadsports/${id}`, {
        headers: {
          authorization: auth,
        },
      });
      setSportsList(sportsResponse.data);
    };
    fetchData();
  }, []);

  const currDateObj = new Date();
  const startDateObj = new Date(
    event.date_start.split("/").reverse().join("-")
  );
  const endDateObj = new Date(event.date_end.split("/").reverse().join("-"));

  let eventStatus = "",
    eventMessage = "";
  if (currDateObj.getTime() < startDateObj.getTime()) {
    eventStatus = "not-started";
    eventMessage = "aberta";
  } else if (currDateObj.getTime() < endDateObj.getTime()) {
    eventStatus = "in-progress";
    eventMessage = "em andamento";
  } else {
    eventStatus = "finished";
    eventMessage = "finalizada";
  }

  const esportes = 4;

  return (
    // TODO - alterar botão registrar/gostar para gostar
    <div className="view-event-container">
      {/* <div className="page-title">
        <h1><span>Visualizar Olimpíada</span></h1>
        <p>Confira nesta página todas as informações sobre o evento atual. Aqui você encontrará seu <i>status</i>, seus esportes presentes, a quantidade de participantes e datas de início e fim.</p>
      </div> */}
      <Link to={"/home"} className="back-view-event">
        <i class="fa-solid fa-circle-arrow-left"></i>
      </Link>
      <div className="event-header-container">
        <div className="event-info">
          <div className="event-title-status">
            <h1>
              {event.name}
              <span className={eventStatus}>{eventMessage}</span>
            </h1>
          </div>
          <ul>
            <li>
              <p>
                <b>Nome da Olimpíada:</b> {event.name}
              </p>
            </li>
            <li>
              <p>
                <b>Nome da Escola:</b> {event.school}
              </p>
            </li>
            <li>
              <p>
                <b>Descrição:</b> {event.description}
              </p>
            </li>
          </ul>
        </div>
        <div className="event-summary">
          <h2>Sumário</h2>
          <ul>
            <li>
              <h3>Esportes:</h3>{" "}
              <span className="summary-data">{esportes}</span>
            </li>
            <li>
              <h3>Início:</h3>{" "}
              <span className="summary-data">{event.date_start}</span>
            </li>
            <li>
              <h3>Fim:</h3>{" "}
              <span className="summary-data">{event.date_end}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="event-body-container">
        {teacher && (
          <div className="event-participants-container">
            <h1>Lista de Participantes:</h1>
            <p>Veja a lista de alunos participantes (apenas professores).</p>
            <ol>
              {participantsList.map((participant) => (
                <li>
                  <p>
                    <b>Nome: </b>
                    {participant.name}
                  </p>
                  <p>
                    <b>Email: </b>
                    {participant.email}
                  </p>
                  <p>
                    <b>Telefone: </b>
                    {participant.phone_number}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className="event-sports">
          <h1>Lista de Esportes:</h1>
          <p>
            Expanda um esporte para poder se cadastrar e ver mais informações.
          </p>
          <ul>
            {sportsList.map((sport) => (
              <li>
                <SportComponent
                  eventName={event.name}
                  name={sport.name}
                  players={sport.max_players}
                  participants={sport.participants}
                  duration={`${
                    (sport.duration.minutes ? sport.duration.minutes : 0) +
                    60 * (sport.duration.hours ? sport.duration.hours : 0)
                  } minutos`}
                  rules={sport.ruleset}
                  description={sport.extra_info}
                  backgroundColor={"#FF0000"}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
