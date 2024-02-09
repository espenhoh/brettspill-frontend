import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Counter from "../components/UI/Counter";
import Sidenav from "../components/Sidenav/Sidenav";
import Logout from "../components/Content/Logout";

import { config } from "../constants";

const Layout = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {auth.logoutVisible ? <Logout /> : null}
      <Sidenav />
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
