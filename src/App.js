import React from "react";
import { config } from "./constants";

export default function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>This is the current config: {process.env.NODE_ENV}</p>
      <ul>{JSON.stringify(config, null, 1)}</ul>
    </div>
  );
}
