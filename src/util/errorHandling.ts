import { isRouteErrorResponse } from "react-router-dom";

export function extractErrorMessage(error: any): string {
  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    return error.statusText;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    console.error(error);
    return "Unknown error";
  }
}
