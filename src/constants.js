const dev = {
  url: {
    BASE_URL: "http://brettspill.localhost:8008/",
    AUTH_URL: "http://brettspill.localhost:8008/auth",
  },
};

const prod = {
  url: {
    BASE_URL: "http://brettspill.holtebu.eu/",
    AUTH_URL: "http://brettspill.holtebu.eu/auth/",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
