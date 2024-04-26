import axios from "axios";

export function erOK(response) {
  return response.status >= 200 && response.status < 300;
}

export async function postNyttToken(payload) {
  return await post("/lobby/login/", payload);
}

export async function postNyttSpill(payload) {
  return await post("/lobby/spill/", payload);
}

async function post(url, payload) {
  try {
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });
    /*
    if(response.code === 400) {
      return response;
    }

    if (!erOK(response)) {
      throw { message: "Failed to post", status: response.status };
    }*/

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      return { errors: error.response.data };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}
