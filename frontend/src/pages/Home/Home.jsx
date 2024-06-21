import { useState, useEffect } from "react"; // TODO - importei novos
import { Link, useNavigate } from "react-router-dom";
import axios from "../../instances/axios";

import EventCard from "../../components/EventCard/EventCard";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const events2 = [
    {
      olympiadName: "Olimpíada do Segundo Bimestre",
      schoolName: "Escola Estadual de Campinas",
      startDate: "05/03/2024",
      endDate: "19/03/2024",
      description: "A Olimpíada do Segundo Bimestre visa promover a integração entre os alunos e estimular a prática esportiva.",
      backgroundImage: "https://www.newscaststudio.com/wp-content/uploads/2023/01/nbc-summer-olympics-2024-logo.jpg",
    },
    {
      olympiadName: "Olimpíada de Esportes Aquáticos",
      schoolName: "Escola Estadual de Campinas",
      startDate: "05/06/2024",
      endDate: "22/07/2024",
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
  events2.push(events2[0]);

  useEffect(() => {
    // TODO - necessário usar um effect para buscar os eventos
    async function fetchData() {
      try {
        const response = await axios.get("/olympiad");
        // console.log("data da api:", response.data.olympiadList);
        const { olympiadList } =  response.data;
        // TODO - data estranha
        olympiadList.forEach((event) => {
          // TODO - mais papeis de parede, escolher um aleatório
          event.date_start = new Date(event.date_start).toLocaleDateString("pt-BR");
          event.date_end = new Date(event.date_end).toLocaleDateString("pt-BR");
          event.backgroundImage = "https://architectureofthegames.net/wp-content/uploads/2018/04/6_RIO-2016-OLYMPIC-STADIUM_88.jpg"
        });
        console.log("eventos:", olympiadList);
        setEvents(olympiadList);
        // setEvents(events2);
      } catch (error) {
        alert("Ocorreu um erro ao buscar as olimpíadas.");
      }
    };
    fetchData();
  }, []);

  console.log("eventos:", events);

  // TODO - precisei mudar os nomes das propriedades para seguir o padrão do backend
  // TODO - estranho os cards não estão na mesma linha
  return (
    <div className="home-container">
      <div className="home-header page-title">
        <h1><span>Minhas Olimpíadas</span></h1>
        <p>Confira as olimpíadas que você pode participar! Clique em qualquer evento para entrar em sua página principal.</p>
      </div>
      <div className="home-events-container">
        {events.map((event, index) => (
          <div onClick={() => navigate(`/events/view/${index}`, { state: { event }})}>
            <EventCard
              key={index}
              olympiadName={event.name}
              schoolName={event.school}
              startDate={event.date_start}
              endDate={event.date_end}
              description={event.description}
              backgroundImage={event.backgroundImage}
            />
          </div>
        ))}
      </div>
      <div className="add-event-button">
        <Link to={"/events/create"}><i class="fa-solid fa-circle-plus"></i></Link>
      </div>
    </div>
  );
};