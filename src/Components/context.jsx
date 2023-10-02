
import React from "react";
import { Routes, Route, Link, HashRouter } from 'react-router-dom';

const UserContext = React.createContext(null);


const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthentic, setIsAuthentic] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(true)
  const [activeButton, setActiveButton] = React.useState(null);


  const login = () => {
    setIsAuthentic(true);
  };

  const logout = () => {
    setIsAuthentic(false);
  };

  return (
    <AuthContext.Provider value={{activeButton, setActiveButton, showMessage,setShowMessage , isAuthentic, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export { UserContext };


  