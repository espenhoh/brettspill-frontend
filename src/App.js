import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login, { loginAction } from "./pages/Login";
import Spilliste from "./pages/Spilliste";
import SpillLobby from "./pages/SpillLobby";
import CreateGame, { spillTypeLoader, lagSpill } from "./pages/CreateGame";

import "./index.css";
import Register, { registerAction } from "./pages/Register";
import IkkeFunnet from "./pages/IkkeFunnet";
import Layout from "./pages/Layout";
import Feilside from "./pages/Feilside";
import { getSpillListe, getSpill, getSpillTyper } from "./util/gets";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate replace to="login" />} />
      <Route path="spill/" element={<Spilliste />} loader={getSpillListe} />
      <Route
        path="spill/:spillId"
        element={<SpillLobby />}
        loader={({ params }) => getSpill(params.spillId)}
      />
      <Route
        path="lag_spill"
        element={<CreateGame />}
        loader={getSpillTyper}
        action={lagSpill}
      />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="register" element={<Register />} action={registerAction} />
      <Route path="*" element={<IkkeFunnet />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
