import { api } from "./updateStaff.generated";

export const enhancedUpdateStaffApi = api.enhanceEndpoints({
  addTagTypes: ["Staffs"],
  endpoints: {
    updateStaff: { invalidatesTags: [] },
  },
});

export const { useUpdateStaffMutation } = enhancedUpdateStaffApi;
