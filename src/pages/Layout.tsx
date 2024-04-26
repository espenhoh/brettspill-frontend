import React from "react";
import { Outlet } from "react-router-dom";
import { useBSSelector } from "../hooks/typed-redux-hooks";
import Counter from "../components/UI/Counter";
import Sidenav from "../components/Sidenav/Sidenav";
import Logout from "../components/Content/Logout";
import { useLocation } from "react-router-dom";

import { config } from "../constants";

const Layout = () => {
  const auth = useBSSelector((state) => state.auth);
  const location = useLocation();

  return (
    <>
      {auth.logoutVisible ? <Logout /> : null}
      {location.pathname !== "/oslo_conquest" ? <Sidenav /> : null}
      <main>
        <Outlet />
        <Counter />
      </main>
      <div>
        <h1>Hello World!</h1>
        <p>This is the current config: {process.env.NODE_ENV}</p>
        <p>Base url: {config.url.BASE_URL}</p>
      </div>
    </>
  );
};

export default Layout;
