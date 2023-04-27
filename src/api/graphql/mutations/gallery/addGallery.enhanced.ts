import { api } from "./addGallery.generated";

export const enhancedAddGalleryApi = api.enhanceEndpoints({
  addTagTypes: ["Galleries"],
  endpoints: {
    addGallery: { invalidatesTags: [] },
  },
});

export const { useAddGalleryMutation } = enhancedAddGalleryApi;
