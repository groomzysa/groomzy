import { SerializedError } from "@reduxjs/toolkit";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const getErrorMessage = (
  error: ErrorResponse | SerializedError | undefined
): string | undefined => error?.message?.split(": {")?.[0];

export const storeToken = async (token: string) => {
  localStorage.setItem("@token", token);
};

export const removeToken = async () => {
  localStorage.removeItem("@token");
};

export const getToken = () => {
  const token = localStorage.getItem("@token");
  return token || "";
};
