import { api } from "./requestPasswordReset.generated";

export const enhancedRequestPasswordResetApi = api.enhanceEndpoints({
  endpoints: {
    requestPasswordReset: {},
  },
});

export const { useRequestPasswordResetMutation } =
  enhancedRequestPasswordResetApi;
