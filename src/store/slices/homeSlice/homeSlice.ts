import { createSlice } from "@reduxjs/toolkit";
import {
  IHomeSliceState,
  ISetProviderAction,
  ISetSearchAction,
  ISetSearchTmpAction,
} from "./types";

const initialState: IHomeSliceState = {
  provider: undefined,
  search: undefined,
  searchTmp: undefined,
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    setProvider: (state, { payload }: ISetProviderAction) => {
      state.provider = payload.provider;
    },
    setSearch: (state, { payload }: ISetSearchAction) => {
      state.search = payload.search;
    },
    setSearchTmp: (state, { payload }: ISetSearchTmpAction) => {
      state.searchTmp = payload.searchTmp;
    },
  },
});

export const { setProvider, setSearch, setSearchTmp } = homeSlice.actions;

export default homeSlice.reducer;
