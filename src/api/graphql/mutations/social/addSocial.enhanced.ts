import { api } from "./addSocial.generated";

export const enhancedAddSocialApi = api.enhanceEndpoints({
  addTagTypes: ["Socials"],
  endpoints: {
    addSocial: { invalidatesTags: ["Socials"] },
  },
});

export const { useAddSocialMutation } = enhancedAddSocialApi;
