import { createSlice } from "@reduxjs/toolkit";
import {
  IProviderHomeSliceState,
  ISetDayOptionsAction,
  ISetSocialOptionsAction,
  ISetOperatingTimeAction,
  ISetServiceAction,
  ISetSocialAction,
  ISetIsOpenAction,
} from "./types";

const initialState: IProviderHomeSliceState = {
  dayOptions: [],
  socialOptions: [],
  operatingTime: undefined,
  service: undefined,
  social: undefined,
  isOpen: false,
};

export const homeProviderSlice = createSlice({
  name: "providerHomeSlice",
  initialState,
  reducers: {
    setDayOptions: (state, { payload }: ISetDayOptionsAction) => {
      state.dayOptions = payload.dayOptions;
    },
    setSocialOptions: (state, { payload }: ISetSocialOptionsAction) => {
      state.socialOptions = payload.socialOptions;
    },
    setOperatingTime: (state, { payload }: ISetOperatingTimeAction) => {
      state.operatingTime = payload.operatingTime;
    },
    setService: (state, { payload }: ISetServiceAction) => {
      state.service = payload.service;
    },
    setSocial: (state, { payload }: ISetSocialAction) => {
      state.social = payload.social;
    },
    setIsOpen: (state, { payload }: ISetIsOpenAction) => {
      state.isOpen = payload.isOpen;
    },
  },
});

export const {
  setDayOptions,
  setOperatingTime,
  setService,
  setSocial,
  setSocialOptions,
  setIsOpen,
} = homeProviderSlice.actions;

export default homeProviderSlice.reducer;
