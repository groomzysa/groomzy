import { api } from "./service.generated";

export const enhancedServiceApi = api.enhanceEndpoints({
  addTagTypes: ["Service"],
  endpoints: {
    service: { providesTags: ["Service"] },
  },
});

export const { useLazyServiceQuery, useServiceQuery } = enhancedServiceApi;
