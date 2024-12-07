import axios, { AxiosResponse } from "axios";
import { getSpill } from "./gets";
import { get } from "https";

// Testdata for mock
const mockData = {
  mocked: "data",
};

describe("Mocked axios tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

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
    expect(axios.get).toHaveBeenCalled();
  });

  it("should fail", async () => {
    // Testdata for mock
    jest.spyOn(axios, "get").mockRejectedValueOnce({
      data: mockData,
      status: 400,
      statusText: "Bad Request",
    });

    await expect(getSpill(-1)).rejects.toEqual({
      data: mockData,
      status: 400,
      statusText: "Bad Request",
    });
  });

  test("throws error for invalid status code", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: {},
      status: 404,
      statusText: "Not Found",
      headers: {},
      config: {},
    });

    try {
      await getSpill(1);
    } catch (error: any) {
      expect(error).toEqual({
        message: "Failed to fetch.",
        status: 404,
      });
    }
  });

  test("HTML content type means that endpoint doesnt exist", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: {},
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "text/html", // Simulerer HTML content type
      },
      config: { url: "https://example.com" },
    });

    try {
      await getSpill(1);
    } catch (error: any) {
      expect(error).toEqual({
        message: "Fant ikke endepunkt: https://example.com",
        status: 404,
      });
    }
  });
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
