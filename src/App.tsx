import { FC } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login, { loginAction } from "./pages/Login";
import Spilliste from "./pages/Spilliste";
import SpillLobby, { loadSpillInfo } from "./pages/SpillLobby";
import CreateGame, { lagSpill } from "./pages/CreateGame";

import "./index.css";
import Register, { registerAction } from "./pages/Register";
import IkkeFunnet from "./pages/IkkeFunnet";
import Layout from "./pages/Layout";
import Feilside from "./pages/Feilside";
import { getSpillListe, getSpillTyper } from "./util/gets";
import SpillComponent from "./components/UI/SpillComponent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate replace to="login" />} />
      <Route path="spill/" element={<Spilliste />} loader={getSpillListe} />
      <Route
        path="spill/:spillId"
        element={<SpillLobby />}
        loader={loadSpillInfo}
      />
      <Route
        path="lag_spill"
        element={<CreateGame />}
        loader={getSpillTyper}
        action={lagSpill}
      />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="start_spill/:navn" element={<SpillComponent />} />
      <Route path="register" element={<Register />} action={registerAction} />
      <Route path="*" element={<IkkeFunnet />} />
    </Route>
  )
);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
