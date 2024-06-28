import { useState, useRef, useEffect, useContext } from "react";
import "./SportComponent.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../instances/axios";

export default function Sport({
  eventName,
  school,
  teacher,
  name,
  players,
  participants,
  duration,
  rules,
  description,
  backgroundColor,
}) {
  const [openSport, setOpenSport] = useState(false);
  const [userList, setUserList] = useState([]);
  const contentRef = useRef(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const content = contentRef.current;
    if (openSport) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      content.style.maxHeight = "0px";
    }

    handleParticipants();
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

    window.location.reload();
  }

  async function handleParticipants() {
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

    try {
      const response = await axios.get(
        `/userolympiadsports/${eventName}/${userSchool}/${name}`,
        {
          headers: {
            authorization: auth,
          },
        }
      );

      let userList = "";
      response.data.forEach((user) => {
        userList += " " + user.email;
      });
      setUserList(userList);
      console.log(userList);
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
          {teacher ? (
            <p>
              <strong>Interessados:</strong> {userList}
            </p>
          ) : (
            <button className="register-button" onClick={handleRegister}>
              Registrar/Gostar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
