import { useEffect, useState } from "react";
import { useLoaderData, useParams, LoaderFunctionArgs } from "react-router-dom";
import dayjs from "dayjs";
import { getSpill } from "../util/gets";

const SpillLobby = () => {
  const params = useParams();
  const spillDetaljer = useLoaderData().data;

  const id = parseInt(params.spillId);

  useEffect(() => {
    document.title = "Spillobby";
  }, []);

  const spillere =
    spillDetaljer.spillere && spillDetaljer.spillere.length > 0 ? (
      <ul>
        {spillDetaljer.spillere.map((spiller) => (
          <li key={spiller}>{spiller}</li>
        ))}
      </ul>
    ) : (
      <p>Ingen registrerte spillere!</p>
    );

  return spillDetaljer ? (
    <section>
      <h1>
        Lobby for {spillDetaljer.spill_navn} ({spillDetaljer.spill_type_navn})
      </h1>
      <p>
        {spillDetaljer.start_tid
          ? "Spillet startet: " +
            dayjs(spillDetaljer.start_tid).format("DD/MM/YYYY h:mm")
          : "Spillet har enda ikke startet."}
      </p>
      <p>
        {spillDetaljer.slutt_tid
          ? "Spillet sluttet: " +
            dayjs(spillDetaljer.slutt_tid).format("DD/MM/YYYY h:mm")
          : "Spillet er ikke avsluttet enda."}
      </p>
      <p>Spillere:</p>
      {spillere}{" "}
    </section>
  ) : (
    <p>Laster data ...</p>
  );
};

export default SpillLobby;

export function loadSpillInfo({ params }: LoaderFunctionArgs) {
  const spillId = Number(params.spillId);

  if (isNaN(spillId)) {
    throw new Error("spillId must be a number");
  }

  return getSpill(spillId);
}
