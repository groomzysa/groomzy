import { api } from "./addUser.generated";

export const enhancedAddUserApi = api.enhanceEndpoints({
  endpoints: {
    addUser: {},
  },
});

export const { useAddUserMutation } = enhancedAddUserApi;
