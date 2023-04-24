import { api } from "./socials.generated";

export const enhancedSocialsApi = api.enhanceEndpoints({
  addTagTypes: ["Socials"],
  endpoints: {
    socials: { providesTags: ["Socials"] },
  },
});

export const { useLazySocialsQuery, useSocialsQuery } = enhancedSocialsApi;
