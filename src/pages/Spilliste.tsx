import React, { useEffect, useState, useCallback } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { slettSpill } from "../util/deletes";

//import styles from "./Home.module.css";

const DATE_FORMAT = "DD/MM/YY h:m";

const liste = [
  {
    id: 9999,
    spill_type_navn: "Fire på rad",
    spill_navn: "Dummyspill",
    spill_type: "4PRA",
    opprettet_tid: "2023-02-02T21:34:33.692353Z",
    start_tid: null,
    slutt_tid: null,
    spillere: [],
  },
];

const Spilliste = () => {
  const spillListe = useLoaderData().data;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Spilliste";
  }, []);

  const slettSpillHandler = (spillId) => {
    return async () => {
      const sikker_paa_aa_slette = window.confirm(
        "Sikker på at du vil slette spillet??"
      );
      if (sikker_paa_aa_slette) {
        console.log(`Sletter ${spillId}`);
        await slettSpill(spillId);
        navigate("/spill/", { replace: true });
      }
    };
  };

  return (
    <React.Fragment>
      <h1>Velkommen til brettspill!</h1>
      <h2>Spilliste</h2>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Type</th>
            <th>Starttid</th>
            <th>Sluttid</th>
          </tr>
        </thead>

        <tbody>
          {spillListe.map((spill) => (
            <tr key={spill.id}>
              <td>
                <Link to={`${spill.id}/`}>{spill.spill_navn}</Link>
              </td>
              <td>{spill.spill_type_navn}</td>
              <td>
                {spill.start_tid
                  ? dayjs(spill.start_tid).format(DATE_FORMAT)
                  : "Ikke startet"}
              </td>
              <td>
                {spill.slutt_tid
                  ? dayjs(spill.slutt_tid).format(DATE_FORMAT)
                  : "Ikke ferdig"}
              </td>
              <td>
                <button onClick={slettSpillHandler(spill.id)}>slett</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Spilliste;
