import { api } from "./deleteGallery.generated";

export const enhancedDeleteGalleryApi = api.enhanceEndpoints({
  addTagTypes: ["Galleries"],
  endpoints: {
    deleteGallery: { invalidatesTags: [] },
  },
});

export const { useDeleteGalleryMutation } = enhancedDeleteGalleryApi;
