import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testTimeout: 50000,
};

export default config;
