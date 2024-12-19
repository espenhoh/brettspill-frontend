import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import config from "../constants";
import type { Spill, Spiller, SpillListe, SpillType } from "../types/api";
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

export async function getSpillListe(): Promise<SpillListe> {
  return await fetchValidatedData<SpillListe>(`/lobby/spill/`);
}

export async function getSpillTyper(): Promise<SpillType[]> {
  return await fetchValidatedData<SpillType[]>(
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
