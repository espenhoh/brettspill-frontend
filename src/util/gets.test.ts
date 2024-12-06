import axios from "axios"; // Bruker den globale mocken
import { getSpill } from "./gets";
import { get } from "https";

/*
// Testdata for mock
const data = {
  id: 1,
  spill_type_navn: "Monopol",
  spill_navn: "Testspill",
  spill_type: "MPOL",
  opprettet_tid: "2024-11-22T23:30:39.235528Z",
  start_tid: null,
  slutt_tid: null,
  spillere: [],
};

it("should fetch spill data", async () => {
  // Testdata for mock
  (axios.get as jest.Mock).mockResolvedValue({
    data: data,
    status: 200,
    statusText: "Ok",
    headers: {},
    config: {},
  });

  const spill = await getSpill(1);

  expect(spill).toEqual(data);
  expect(axios.get).toHaveBeenCalledWith("/lobby/spill/1/", expect.anything());
});

it("should fail", async () => {
  // Testdata for mock
  (axios.get as jest.Mock).mockRejectedValue({
    data: data,
    status: 400,
    statusText: "Ok",
    headers: {},
    config: {},
  });
  debugger;
  return getSpill(-1).then((spill) => {
    expect(spill).rejects.toMatch("Failed to fetch.");
  });
});

*/
it("should integrate", async () => {
  // Testdata for mock
  //const axios = jest.requireActual("axios");
  debugger;
  let utdata = await getSpill(1);

  console.log(utdata);
});
