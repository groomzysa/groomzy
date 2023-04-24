import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import appReducer from "./slices/appSlice/appSlice";
import homeReducer from "./slices/homeSlice/homeSlice";
import homeProviderReducer from "./slices/providerHomeSlice/providerHomeSlice";
import accountReducer from "./slices/accountSlice/accountSlice";

import { api } from "../api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appReducer,
    home: homeReducer,
    homeProvider: homeProviderReducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
