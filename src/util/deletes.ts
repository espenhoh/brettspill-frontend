import axios, { AxiosResponse } from "axios";
import { Response } from "webpack-dev-server";
import SpillData from "../pages/CreateGame";

function erOK(response: AxiosResponse) {
  return response.status >= 200 && response.status < 300;
}

export async function slettSpill(spillId: number) {
  return await slett<typeof SpillData>(`/lobby/spill/${spillId}/`);
}

async function slett<T>(url: string) {
  try {
    const response = await axios.delete<T>(url);

    if (!erOK(response)) {
      throw { message: "Failed to delete", status: response.status };
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
