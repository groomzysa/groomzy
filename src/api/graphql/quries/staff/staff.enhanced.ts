import { api } from "./staff.generated";

export const enhancedStaffApi = api.enhanceEndpoints({
  addTagTypes: ["Staff"],
  endpoints: {
    staff: { providesTags: ["Staff"] },
  },
});

export const { useStaffQuery, useLazyStaffQuery } = enhancedStaffApi;
