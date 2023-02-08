import { useState, useEffect } from "react";

import React from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  navIsActive: false,
  login: () => {},
  logout: () => {},
  navChange: () => {},
});

const AuthContextProvider = (props) => {
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [navIsActive, setNavIsActive] = useState(false);

  const navChangeHandler = () => {
    setNavIsActive(!navIsActive);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", 1);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const authCtx = {
    isLoggedIn,
    navIsActive,
    login: loginHandler,
    logout: logoutHandler,
    navChange: navChangeHandler,
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
