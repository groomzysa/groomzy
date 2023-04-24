import { createSlice } from "@reduxjs/toolkit";
import { IAppSliceState, ISetTokenAction } from "./types";

const initialState: IAppSliceState = {
  token: undefined,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setToken: (state, { payload }: ISetTokenAction) => {
      state.token = payload.token;
    },
  },
});

export const { setToken } = appSlice.actions;

export default appSlice.reducer;
