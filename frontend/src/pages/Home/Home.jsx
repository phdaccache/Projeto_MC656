import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../instances/axios";

import EventCard from "../../components/EventCard/EventCard";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { auth } = useContext(AuthContext);
  const [teacher, setTeacher] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const schoolResponse = await axios.get("/schoolusers", {
          headers: {
            authorization: `${auth}`,
          },
        });

        setTeacher(schoolResponse.data.userSchoolList[0].permission !== "student");

        const response = await axios.get("/olympiad", {
          headers: {
            authorization: `${auth}`,
          },
        });

        const { olympiadList } =  response.data;
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

  return (
    <div className="home-container">
      <div className="home-header page-title">
        <h1><span>Minhas Olimpíadas</span></h1>
        <p>Confira as olimpíadas que você pode participar! Clique em qualquer evento para entrar em sua página principal.</p>
      </div>
      <div className="home-events-container">
        {events.map((event) => (
          <div onClick={() => navigate(`/events/view/${event.id}`, { state: { event }})}>
            <EventCard
              // key={index}
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
      {teacher && (
        <div className="add-event-button">
          <Link to={"/events/create"}><i class="fa-solid fa-circle-plus"></i></Link>
        </div>
      )}
    </div>
  );
};