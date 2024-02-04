import { createSlice } from "@reduxjs/toolkit";

const initAuthState = { isAuthenticated: false, logoutVisible: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    loggingOut(state) {
      state.logoutVisible = true;
    },
    loggedOut(state) {
      state.logoutVisible = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
