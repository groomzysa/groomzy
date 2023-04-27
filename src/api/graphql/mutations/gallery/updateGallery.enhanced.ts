import { api } from "./updateGallery.generated";

export const enhancedUpdateGalleryApi = api.enhanceEndpoints({
  addTagTypes: ["Galleries"],
  endpoints: {
    updateGallery: { invalidatesTags: [] },
  },
});

export const { useUpdateGalleryMutation } = enhancedUpdateGalleryApi;
