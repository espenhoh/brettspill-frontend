import axios, { AxiosResponse } from "axios";
import { json } from "react-router-dom";

function erOK(response: AxiosResponse) {
  return response.status >= 200 && response.status < 300;
}

export async function getSpillListe() {
  return await get(`/lobby/spill/`);
}

export async function getSpill(id: number) {
  return await get(`/lobby/spill/${id}/`);
}

export async function getSpillTyper() {
  return await get("/lobby/spill/get_alle_spill_typer/");
}

async function get(url: string) {
  const response = await axios.get(url, {
    headers: { Accept: "application/json" },
  });

  if (!erOK(response)) {
    throw json({ message: "Failed to fetch." }, { status: response.status });
  }
  const responseType = response.headers["content-type"];
  if (responseType.includes("html")) {
    throw json({ message: `Fant ikke endepunkt: ${url}` }, { status: 404 });
  }
  return response;
}
