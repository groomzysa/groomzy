import { api } from "./galleries.generated";

export const enhancedGalleriesApi = api.enhanceEndpoints({
  addTagTypes: ["Galleries"],
  endpoints: {
    galleries: { providesTags: ["Galleries"] },
  },
});

export const { useGalleriesQuery, useLazyGalleriesQuery } =
  enhancedGalleriesApi;
