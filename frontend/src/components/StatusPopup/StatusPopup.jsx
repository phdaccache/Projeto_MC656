import "./StatusPopup.css";

export default function StatusPopup({ status, message }) {
  return (
    <div className="notification">
        <div className={`notification-body ${status}`}>
            {status === "success" ? (
              <i className="fa-solid fa-circle-check"></i>
            ) : (
              <i className="fa-solid fa-circle-xmark"></i>
            )}
            {message}
        </div>
        <div className={`notification-progress ${status}`}></div>
    </div>
  );
}