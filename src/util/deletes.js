import axios from "axios";

function erOK(response) {
  return response.status >= 200 && response.status < 300;
}

export async function slettSpill(spillId) {
  return await slett(`/lobby/spill/${spillId}/`);
}

async function slett(url) {
  try {
    const response = await axios.delete(url);

    if (!erOK(response)) {
      throw { message: "Failed to delete", status: response.status };
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
