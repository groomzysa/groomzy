import { api } from "./contactMail.generated";

export const enhancedContactMailApi = api.enhanceEndpoints({
  addTagTypes: [],
  endpoints: {
    contactMail: {},
  },
});

export const { useContactMailMutation } = enhancedContactMailApi;
