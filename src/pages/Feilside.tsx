import { useSelector } from "react-redux";
import { useRouteError } from "react-router-dom";
import Logout from "../components/Content/Logout";
import Sidenav from "../components/Sidenav/Sidenav";

const Feilside = () => {
    const auth = useSelector((state) => state.auth);
    const error = useRouteError();

    return (
        <>
            {auth.logoutVisible ? <Logout /> : null}
            <Sidenav/>
            <main>
                <h1>Det har skjedd en feil!</h1>
                <p>{error.data.message}</p>
            </main>
        </>
    )
}

export default Feilside;