import { useState, useRef, useEffect } from "react";
import "./SportComponent.css";

export default function Sport({ name, players, duration, rules, description, backgroundColor }) {
  const [openSport, setOpenSport] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (openSport) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      content.style.maxHeight = "0px";
    }
  }, [openSport]); // Dependency on openSportIndex ensures this runs every time it changes

  return (
    <div className="sport-item">
      <div className="sport-header" onClick={() => setOpenSport(!openSport)}>
        <h3>{name}</h3>
        <span className="sport-icon">{openSport ? "-" : "+"}</span>
      </div>
      <div className="sport-content" ref={contentRef}>
        <div className="sport-content-container">
          <p><strong>Jogadores:</strong> {players}</p>
          <p><strong>Duração:</strong> {duration}</p>
          <p><strong>Regras:</strong> {rules}</p>
          <p><strong>Descrição:</strong> {description}</p>
          <button className="register-button">Registrar/Gostar</button>
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