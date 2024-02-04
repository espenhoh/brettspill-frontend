import counter from "./counterSlice";
import auth from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    counter,
    auth,
  },
});

export default store;
