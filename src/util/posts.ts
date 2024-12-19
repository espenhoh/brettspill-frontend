import axios, { AxiosError, AxiosResponse } from "axios";
import { SpillData } from "../pages/CreateGame";

import type { Spill, SpillError } from "../types/api";

export function erOK(response: AxiosResponse) {
  return response.status >= 200 && response.status < 300;
}

//export async function postNyttToken(payload) {
//  return await post("/lobby/login/", payload);
//}

export async function postNyttSpill(
  payload: SpillData
): Promise<Spill | SpillError> {
  return await post<Spill, SpillError>("/lobby/spill/", payload);
}

async function post<T, TError>(
  url: string,
  payload: SpillData | any
): Promise<T | TError> {
  try {
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (!erOK(response)) {
      throw { message: "Failed to post", status: response.status };
    }

    return response.data;
  } catch (e) {
    return errorHandler<TError>(e);
  }
}

function errorHandler<TError>(e: any): TError {
  if (axios.isAxiosError(e)) {
    // Access to config, request, and response
    const error = e as AxiosError;
    if (error.response) {
      return { errors: error.response.data } as TError;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw {
        message: `Ingen respons fra server ved URL ${error.config?.url}`,
        status: 503,
      };
    } else {
      // En annen feil i oppsettet
      throw {
        message: `Feil ved oppsett av request: ${error.message}`,
        status: 400,
      };
    }
  } else if (e instanceof Error) {
    throw {
      message: `En annen feil oppstod: ${e.message}`,
      status: 500,
    };
  } else {
    throw {
      message: `Jeg gir opp: ${e}`,
      status: 500,
    };
  }
}
