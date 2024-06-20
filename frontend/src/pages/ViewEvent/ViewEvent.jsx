import { Link, useLocation } from "react-router-dom";

import SportComponent from "../../components/SportComponent/SportComponent";
import "./ViewEvent.css";

export default function ViewEvent() {
  const location = useLocation();
  const { event } = location.state || {};

  const currDateObj = new Date();
  const startDateObj = new Date(event.startDate.split("/").reverse().join("-"));
  const endDateObj = new Date(event.endDate.split("/").reverse().join("-"))

  let eventStatus = "", eventMessage = "";
  if (currDateObj < startDateObj) {
    eventStatus = "not-started";
    eventMessage = "aberta"
  }
  else if (currDateObj < endDateObj) {
    eventStatus = "in-progress";
    eventMessage = "em andamento"
  }
  else {
    eventStatus = "finished";
    eventMessage = "finalizada"
  }

  const participantes = 100;
  const esportes = 10;
  const sports_data = [
    {
      name: "Basquete",
      players: 5,
      duration: "40 minutos",
      rules: "Cada time tem 5 jogadores e o objetivo é fazer mais pontos que o adversário.",
      description: "Basquete é um esporte coletivo que consiste em arremessar uma bola em um cesto.",
      backgroundColor: "#FF0000",
    },
    {
      name: "Futebol",
      players: 11,
      duration: "90 minutos",
      rules: "Cada time tem 11 jogadores e o objetivo é fazer mais gols que o adversário.",
      description: "Futebol é um esporte coletivo que consiste em fazer gols no gol adversário.",
      backgroundColor: "#00FF00",
    },
    {
      name: "Natação",
      players: 1,
      duration: "1 minuto",
      rules: "Cada nadador tem que nadar o mais rápido possível.",
      description: "Natação é um esporte individual que consiste em nadar o mais rápido possível.",
      backgroundColor: "#0000FF",
    },
    {
      name: "Vôlei",
      players: 6,
      duration: "60 minutos",
      rules: "Cada time tem 6 jogadores e o objetivo é fazer mais pontos que o adversário.",
      description: "Vôlei é um esporte coletivo que consiste em fazer pontos no campo adversário.",
      backgroundColor: "#FFFF00",
    },
  ];

  return (
    <div className="view-event-container">
      {/* <div className="page-title">
        <h1><span>Visualizar Olimpíada</span></h1>
        <p>Confira nesta página todas as informações sobre o evento atual. Aqui você encontrará seu <i>status</i>, seus esportes presentes, a quantidade de participantes e datas de início e fim.</p>
      </div> */}
      <Link to={"/home"} className="back-view-event">
          <i class="fa-solid fa-circle-arrow-left"></i>
      </Link>
      <div className="event-header-container" >
        <div className="event-info">
          <div className="event-title-status">
            <h1>{event.olympiadName}
              <span className={eventStatus}>{eventMessage}</span>
            </h1>
          </div>
          <ul>
            <li><p><b>Nome da Olimpíada:</b> {event.olympiadName}</p></li>
            <li><p><b>Nome da Escola:</b> {event.schoolName}</p></li>
            <li><p><b>Descrição:</b> {event.description}</p></li>
          </ul>
        </div>
        <div className="event-summary">
          <h2>Sumário</h2>
          <ul>
            <li><h3>Participantes:</h3> <span className="summary-data">{participantes}</span></li>
            <li><h3>Esportes:</h3> <span className="summary-data">{esportes}</span></li>
            <li><h3>Início:</h3> <span className="summary-data">{event.startDate}</span></li>
            <li><h3>Fim:</h3> <span className="summary-data">{event.endDate}</span></li>
          </ul>
        </div>
      </div>
      <div className="event-body-container">
        <div className="event-sports">
          <h1>Lista de Esportes:</h1>
          <p>Expanda um esporte para poder se cadastrar e ver mais informações.</p>
          <ul>
            {sports_data.map((sport) => (
              <li>
                <SportComponent
                  name={sport.name}
                  players={sport.players}
                  duration={sport.duration}
                  rules={sport.rules}
                  description={sport.description}
                  backgroundColor={sport.backgroundColor}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};