const dev = {
  url: {
    BASE_URL: "http://brettspill.localhost:8008",
    AUTH_URL: "http://brettspill.localhost:8008/auth",
  },
};

const prod = {
  url: {
    BASE_URL: "http://brettspill.holtebu.eu",
    AUTH_URL: "http://brettspill.holtebu.eu/auth",
  },
};

//process.env.NODE_ENV is set by Webpack's DefinePlugin when scripts are run with npm in package.json
const config = process.env.NODE_ENV === "development" ? dev : prod;
export default config;
