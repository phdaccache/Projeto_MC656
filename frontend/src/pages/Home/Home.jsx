import { Link } from "react-router-dom";

import EventCard from "../../components/EventCard/EventCard";

import "./Home.css";

export default function Home() {

  const events = [
    {
      olympiadName: "Olimpíada do Segundo Bimestre",
      schoolName: "Escola Estadual de Campinas",
      startDate: "05/06/2024",
      endDate: "19/06/2024",
      description: "A Olimpíada do Segundo Bimestre visa promover a integração entre os alunos e estimular a prática esportiva.",
      backgroundImage: "https://www.newscaststudio.com/wp-content/uploads/2023/01/nbc-summer-olympics-2024-logo.jpg",
    },
    {
      olympiadName: "Olimpíada de Esportes Aquáticos",
      schoolName: "Escola Estadual de Campinas",
      startDate: "05/03/2024",
      endDate: "12/03/2024",
      description: "A Olimpíada de Esportes Aquáticos visa promover a integração entre os alunos e estimular a prática esportiva.",
      backgroundImage: "https://architectureofthegames.net/wp-content/uploads/2018/04/6_RIO-2016-OLYMPIC-STADIUM_88.jpg",
    },
    {
      olympiadName: "Olimpíada de Inverno",
      schoolName: "Escola Estadual de Campinas",
      startDate: "05/08/2024",
      endDate: "12/08/2024",
      description: "A Olimpíada de Inverno visa promover a integração entre os alunos e estimular a prática esportiva.",
      backgroundImage: "https://www.italybyrun.com/draft/wp-content/uploads/2018/02/winter-olympic-games.jpg",
    },
  ];
  events.push(events[0]);

  return (
    <div className="home-container">
      <div className="home-header page-title">
        <h1><span>Minhas Olimpíadas</span></h1>
        <p>Confira as olimpíadas que você pode participar! Clique em qualquer evento para entrar em sua página principal.</p>
      </div>
      <div className="home-events-container">
        {events.map((event, index) => (
          <EventCard
            key={index}
            olympiadName={event.olympiadName}
            schoolName={event.schoolName}
            startDate={event.startDate}
            endDate={event.endDate}
            description={event.description}
            backgroundImage={event.backgroundImage}
          />
        ))}
      </div>
      <div className="add-event-button">
        <Link to={"/events/create"}><i class="fa-solid fa-circle-plus"></i></Link>
      </div>
    </div>
  );
};