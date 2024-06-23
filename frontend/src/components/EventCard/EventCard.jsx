import "./EventCard.css";

export default function EventCard({
  olympiadName,
  schoolName,
  startDate,
  endDate,
  description,
  backgroundImage,
  participants,
}) {
  return (
    <div
      className="event-card"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="event-card-content">
        <div className="event-card-header">
          <h2 className="olympiad-name">{olympiadName}</h2>
          <h3 className="school-name">{schoolName}</h3>
        </div>
        <div className="event-card-dates">
          <p className="participants">
            <strong>Participantes:</strong> {participants}
          </p>
          <p className="start-date">
            <strong>Data de Início:</strong> {startDate}
          </p>
          <p className="end-date">
            <strong>Data de Término:</strong> {endDate}
          </p>
        </div>
      </div>
      {/* <div className="event-card-description">
        <p>{description}</p>
      </div> */}
    </div>
  );
}
