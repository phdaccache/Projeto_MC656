import React, { createContext, useState, useEffect } from 'react';
import axios from "../instances/axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('token'));

  const login = (token) => {
    setAuth(token);
    // axios.defaults.headers.common["authorization"] = token;
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    localStorage.setItem('email', decodedToken.userEmail);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    // delete axios.defaults.headers.common["authorization"];
  };

  const value = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
