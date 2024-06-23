import { useState, useRef, useEffect, useContext } from "react";
import "./SportComponent.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../instances/axios";

export default function Sport({
  eventName,
  name,
  players,
  participants,
  duration,
  rules,
  description,
  backgroundColor,
}) {
  const [openSport, setOpenSport] = useState(false);
  const contentRef = useRef(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const content = contentRef.current;
    if (openSport) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      content.style.maxHeight = "0px";
    }
  }, [openSport]); // Dependency on openSportIndex ensures this runs every time it changes

  async function handleRegister() {
    let userSchool = "";
    try {
      const response = await axios.get("/schoolusers", {
        headers: {
          authorization: auth,
        },
      });
      userSchool = response.data.userSchoolList[0].school;
    } catch (error) {
      console.log(error);
    }

    const userEmail = localStorage.getItem("email");

    try {
      const response = await axios.post("/userolympiadsports", {
        olympiad: eventName,
        school: userSchool,
        sport: name,
        email: userEmail,
        preference: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sport-item">
      <div className="sport-header" onClick={() => setOpenSport(!openSport)}>
        <h3>
          {name} ({participants} cadastrados)
        </h3>
        <span className="sport-icon">{openSport ? "-" : "+"}</span>
      </div>
      <div className="sport-content" ref={contentRef}>
        <div className="sport-content-container">
          <p>
            <strong>Jogadores:</strong> {players}
          </p>
          <p>
            <strong>Duração:</strong> {duration}
          </p>
          <p>
            <strong>Regras:</strong> {rules}
          </p>
          <p>
            <strong>Descrição:</strong> {description}
          </p>
          <button className="register-button" onClick={handleRegister}>
            Registrar/Gostar
          </button>
        </div>
      </div>
    </div>
  );
}

// import "./Sport.css";

// export default function Sport({ name, players, duration, rules, description, backgroundColor }) {
//   return (
//     <div className="sport-item" style={{ backgroundColor: backgroundColor }}>
//       <div className="sport-header">
//         <h3>{name}</h3>
//       </div>
//       <div className="sport-content">
//         <div className="sport-content-container">
//           <p><strong>Jogadores:</strong> {players}</p>
//           <p><strong>Duração:</strong> {duration}</p>
//           <p><strong>Regras:</strong> {rules}</p>
//           <p><strong>Descrição:</strong> {description}</p>
//           <button className="register-button">Registrar/Gostar</button>
//         </div>
//       </div>
//     </div>
//   );
// }
