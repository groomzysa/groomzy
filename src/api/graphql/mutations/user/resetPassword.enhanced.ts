import { api } from "./resetPassword.generated";

export const enhancedResetPasswordApi = api.enhanceEndpoints({
  endpoints: {
    resetPassword: {},
  },
});

export const { useResetPasswordMutation } = enhancedResetPasswordApi;
