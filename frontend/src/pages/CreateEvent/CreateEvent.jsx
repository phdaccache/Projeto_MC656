import { Link } from "react-router-dom";

import "./CreateEvent.css";

export default function CreateEvent() {
    return (
        <div className="create-event-container">
            <div className="create-event-header page-title">
                <h1><span>Criar Olimpíada</span></h1>
                <p>Preencha os campos abaixo para criar uma nova olimpíada.</p>
            </div>
            <form className="create-event-form">
                <h2>Criar uma Olimpíada</h2>
                <Link to={"/home"} className="back-create-form">
                    <i class="fa-solid fa-circle-arrow-left"></i>
                </Link>
                <div className="create-event-form-field">
                    <label>Nome da Olimpíada:</label>
                    <input type="text" />
                </div>
                <div className="create-event-form-field">
                    <label>Data de Início:</label>
                    <input type="date" />
                </div>
                <div className="create-event-form-field">
                    <label>Data de Término:</label>
                    <input type="date" />
                </div>
                <div className="create-event-form-field">
                    <label>Descrição:</label>
                    <input type="text" />
                </div>
                <div className="create-event-form-field">
                    <button type="submit">Criar Olimpíada</button>
                </div>
            </form>
        </div>
    );
};