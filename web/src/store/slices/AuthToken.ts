import { createSlice } from "@reduxjs/toolkit";

const AuthToken = createSlice({
  name: "AuthToken",
  initialState: {
    token: [],
    dataUser: [],
    isLoged: 'false',
    dataOng : [],
    tokenOng : []
  },

  reducers: {
    takeToken: (state, action) => {
      state.token = action.payload[0];
    },

    saveDataUser: (state, action) => {
      state.dataUser = action.payload[0];
    },

    saveDataOng : (state, action) => {
      state.dataOng = action.payload[0];
    },

    LogUser: (state, action) => {
      state.isLoged = action.payload;
      console.log(action.payload);
    },
  },
});

export const Token = AuthToken.reducer;

export const { takeToken, LogUser, saveDataUser,saveDataOng } = AuthToken.actions;
