import { createSlice } from "@reduxjs/toolkit";
import { IAccountSliceState, IIsImageUploadAction } from "./types";

const initialState: IAccountSliceState = {
  isImageUpload: false,
};

export const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    setIsImageUpload: (state, { payload }: IIsImageUploadAction) => {
      state.isImageUpload = payload.isImageUpload;
    },
  },
});

export const { setIsImageUpload } = accountSlice.actions;

export default accountSlice.reducer;
