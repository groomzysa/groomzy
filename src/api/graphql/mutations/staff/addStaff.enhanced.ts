import { api } from "./addStaff.generated";

export const enhancedAddStaffApi = api.enhanceEndpoints({
  addTagTypes: ["Staffs"],
  endpoints: {
    addStaff: { invalidatesTags: [] },
  },
});

export const { useAddStaffMutation } = enhancedAddStaffApi;
