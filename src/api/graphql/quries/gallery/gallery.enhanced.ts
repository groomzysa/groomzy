import { api } from "./gallery.generated";

export const enhancedGalleryApi = api.enhanceEndpoints({
  addTagTypes: ["Gallery"],
  endpoints: {
    gallery: { providesTags: ["Gallery"] },
  },
});

export const { useGalleryQuery, useLazyGalleryQuery } = enhancedGalleryApi;
