import React, { useState, useEffect, FC, PropsWithChildren } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  logoutVisible: false,
  setLogoutVisible: (value: boolean) => {},
  onLogin: (username: string, password: string) => {},
  onLogout: () => {},
});

export const AuthContexProvider: FC<PropsWithChildren> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const loginHandler = (username: string, password: string) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
    setLogoutVisible(true);
  };

  /* useEffect does something after the rendering. React guarantees the DOM has
   been updated by the time it runs the effects. Setting state inside useEffect
   causes component to rerender, except when the state is the same as the last
   rerender, like here. */
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logoutVisible: logoutVisible,
        setLogoutVisible: setLogoutVisible,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
