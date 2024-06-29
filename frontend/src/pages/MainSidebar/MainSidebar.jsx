import { React, useState, useContext, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useName } from "../../context/NameContext";
import axios from "../../instances/axios";

import "./MainSidebar.css";

export default function MainSidebar() {
  const { auth, logout } = useContext(AuthContext);
  const { name, setName } = useName();

  useEffect(() => {
    const fetchData = async () => {
      const userDataResponse = await axios.get("/users/", {
        headers: {
          authorization: auth,
        },
      });

      const userData = userDataResponse.data.userList[0];
      setName(userData.name.split(" ")[0]);
    };

    fetchData();
  }, []);

  // State to control sidebar collapse
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => {
    setSidebar(!sidebar);
    setShowConfirmation(false);
  };

  // State to control logout button visibility (arrow icon)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleLogout = () => {
    setShowConfirmation(!showConfirmation);
  };

  return (
    <div className="main-sidebar-background root-div-flex-row">
      <nav
        className={`sidebar-style ${
          sidebar ? "main-sidebar" : "main-sidebar-collapsed"
        }`}
      >
        <div className="toggle-sidebar" onClick={showSidebar}>
          <i
            className={
              sidebar ? "fa-solid fa-chevron-left" : "fa-solid fa-chevron-right"
            }
          ></i>
        </div>
        <div className="sidebar-logo">
          <i class="fa-solid fa-medal"></i>
          <h2 className="sidebar-text">Olympics</h2>
        </div>
        <hr />
        <ul className="nav-links">
          <li className="nav-link">
            <NavLink
              to={"/home"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <i className="fa-solid fa-house"></i>
              <span className="sidebar-text">Home</span>
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to={"/settings"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <i className="fa-solid fa-user"></i>
              <span className="sidebar-text">Minha Conta</span>
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to={"/help"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <i className="fa-solid fa-circle-question"></i>
              <span className="sidebar-text">Ajuda</span>
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="sidebar-footer">
          <img
            src={`https://robohash.org/${localStorage.getItem(
              "email"
            )}?set=set4`}
            alt="profile"
            className="profile-picture"
          />
          <p className="sidebar-text">{name}</p>
          <div className="sidebar-logout sidebar-text" onClick={handleLogout}>
            {/* <i className={`fa-solid ${showConfirmation ? 'fa-caret-up' : 'fa-caret-down'}`}></i> */}
            <i
              className={`fa-solid fa-caret-down arrow-icon ${
                showConfirmation ? "rotate-up" : ""
              }`}
            ></i>
          </div>
          <div className={`logout-link-a ${showConfirmation ? "active" : ""}`}>
            <p onClick={logout}>Deslogar</p>
          </div>
        </div>
      </nav>
      <div
        className={
          sidebar ? "childApp-normal-sidebar" : "childApp-small-sidebar"
        }
      >
        <header></header>
        <Outlet />
      </div>
    </div>
  );
}
