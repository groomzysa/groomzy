import { api } from "./updateSocial.generated";

export const enhancedUpdateSocialApi = api.enhanceEndpoints({
  addTagTypes: ["Socials"],
  endpoints: {
    updateSocial: { invalidatesTags: ["Socials"] },
  },
});

export const { useUpdateSocialMutation } = enhancedUpdateSocialApi;
