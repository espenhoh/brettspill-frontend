import axios from "axios";
import { getSpill } from "./gets";
import { get } from "https";

// Testdata for mock
const mockData = {
  mocked: "data",
};

describe("Mocked axios tests", () => {
  it("should fetch spill data", async () => {
    // Testdata for mock
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: mockData,
      status: 200,
      statusText: "Ok",
      headers: {},
      config: {},
    });

    const spill = await getSpill(1);

    expect(spill).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "/lobby/spill/1/",
      expect.anything()
    );
  });

  /*
  it("should fail", async () => {
    // Testdata for mock
    (axios.get as jest.Mock).mockRejectedValue({
      data: mockData,
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
});

describe("Integration tests", () => {
  it("should integrate", async () => {
    debugger;
    let utdata = await getSpill(1);

    console.log(utdata);
  });

  beforeEach(() => {
    jest.resetModules();
  });
});
