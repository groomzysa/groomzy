import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";
import { RootState } from "../store/store";
import { getToken } from "./helpers";

const graphqlClient: GraphQLClient = new GraphQLClient(
  process.env.REACT_APP_GROOMZY_API_BASE_URL || "",
  {}
);

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    //@ts-ignore
    client: graphqlClient,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.token || getToken();
      // update auth header.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Services"],
  endpoints: () => ({}),
});
