import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  Token: localStorage.getItem("Token") ? JSON.parse(localStorage.getItem("Token")) : null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setUser(state, value) {
      state.user = value.payload
    },
    setToken(state, value) {
      state.Token = value.payload;
    },
  },
});

export const { setSignupData, setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
