import { api } from "./deleteSocial.generated";

export const enhancedDeleteSocialApi = api.enhanceEndpoints({
  addTagTypes: ["Socials"],
  endpoints: {
    deleteSocial: { invalidatesTags: ["Socials"] },
  },
});

export const { useDeleteSocialMutation } = enhancedDeleteSocialApi;
