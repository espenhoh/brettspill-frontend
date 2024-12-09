import { useSelector } from "react-redux";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Logout from "../components/Content/Logout";
import Sidenav from "../components/Sidenav/Sidenav";
import { extractErrorMessage } from "../util/errorHandling";

import type { RootState } from "../store/index";

const Feilside = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const errorMessage = extractErrorMessage(useRouteError());

  return (
    <>
      {auth.logoutVisible ? <Logout /> : null}
      <Sidenav />
      <main>
        <h1>Det har skjedd en feil!</h1>
        <p>{errorMessage}</p>
      </main>
    </>
  );
};

export default Feilside;
