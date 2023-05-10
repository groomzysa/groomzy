import { api } from "./deleteStaff.generated";

export const enhancedDeleteStaffApi = api.enhanceEndpoints({
  addTagTypes: ["Staffs"],
  endpoints: {
    deleteStaff: { invalidatesTags: [] },
  },
});

export const { useDeleteStaffMutation } = enhancedDeleteStaffApi;
