import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import config from "../constants";
import { json } from "react-router-dom";
import { z } from "zod";

const client = axios.create({
  baseURL: config.url.BASE_URL,
});

const getConfig: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  } as RawAxiosRequestHeaders,
};

export async function getSpillListe() {
  return await get(`/lobby/spill/`);
}

interface Spiller {
  username: string;
}

interface Spill {
  id: number;
  spill_type_navn: string;
  spill_navn: string;
  spill_type: string;
  opprettet_tid: string;
  start_tid: string | null;
  slutt_tid: string | null;
  spillere: Spiller[]; // Bytt `any[]` med en spesifikk type om spillere har en bestemt struktur
}

export async function getSpillTyper() {
  return await get("/lobby/spill/get_alle_spill_typer/");
}

export async function getSpill(id: number): Promise<Spill> {
  const data = await fetchValidatedData<Spill>(`/lobby/spill/${id}/`,

  );

  const response = await client.get<Spill>(`/lobby/spill/${id}/`, getConfig);
  if (validResponse(response)) {
  }

  return response;
}

async function fetchValidatedData<T>(
  url: string,
  validateFn?: (response: AxiosResponse) => void
): Promise<T> {
  const response = await client.get<T>(url, getConfig);

  validResponse(response);

  return response.data;
}

function validResponse(response: AxiosResponse): void {
  if (!(response.status >= 200 && response.status < 300)) {
    throw json({ message: "Failed to fetch." }, { status: response.status });
  }

  const responseType = response.headers["content-type"];
  if (responseType && responseType.includes("html")) {
    const url = response.config?.url || "ukjent endepunkt";
    throw json({ message: `Fant ikke endepunkt: ${url}` }, { status: 404 });
  }
}
