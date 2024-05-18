import axios, { AxiosResponse } from "axios";
import { Response } from "webpack-dev-server";

function erOK(response: AxiosResponse) {
  return response.status >= 200 && response.status < 300;
}

export async function slettSpill(spillId: number) {
  return await slett(`/lobby/spill/${spillId}/`);
}

async function slett(url: string) {
  try {
    const response = await axios.delete<>(url);

    if (!erOK(response)) {
      throw { message: "Failed to delete", status: response.status };
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
