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

interface SpillListe extends Array<Spill> {}

interface SpillType {}

export async function getSpillListe(): Promise<SpillListe> {
  return await fetchValidatedData<SpillListe>(`/lobby/spill/`);
}

export async function getSpillTyper(): Promise<SpillType> {
  return await fetchValidatedData<SpillType>(
    "/lobby/spill/get_alle_spill_typer/"
  );
}

export async function getSpill(id: number): Promise<Spill> {
  const data = await fetchValidatedData<Spill>(`/lobby/spill/${id}/`);

  return data;
}

async function fetchValidatedData<T>(
  url: string,
  validateFn?: (response: AxiosResponse) => void
): Promise<T> {
  const baseURL = config.url.BASE_URL + url;
  const response = await axios.get<T>(baseURL, getConfig);

  validResponse(response);

  return response.data;
}

function validResponse(response: AxiosResponse): void {
  if (!(response.status >= 200 && response.status < 300)) {
    throw { message: "Failed to fetch.", status: response.status };
  }

  const responseType = response.headers["content-type"];
  if (responseType && responseType.includes("html")) {
    const url = response.config?.url || "ukjent endepunkt";
    throw { message: `Fant ikke endepunkt: ${url}`, status: 404 };
  }
}
