/**
 *
 * THIS FILE IS AUTOGENERATED, DO NOT EDIT IT!
 *
 * instead, edit one of the `.graphql` files in this project and run
 *
 * npm run graphql-codegen
 *
 * for this file to be re-created
 */

import type * as Types from '../../api.schema';

import { api } from '../../..';
export type UserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserQueryResult = { __typename?: 'Query', user?: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, email?: string | null, role?: Types.UserRole | null, state?: Types.UserStatus | null, userImageUrl?: string | null, address?: { __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null } | null, provider?: { __typename?: 'Provider', id: number, tradingName?: string | null, phone?: string | null, addresses?: Array<{ __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null }> | null } | null } | null };


export const UserDocument = `
    query user {
  user {
    id
    firstName
    lastName
    email
    role
    state
    userImageUrl
    address {
      id
      streetNumber
      streetName
      town
      city
      province
      areaCode
    }
    provider {
      id
      tradingName
      phone
      addresses {
        id
        streetNumber
        streetName
        town
        city
        province
        areaCode
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    user: build.query<UserQueryResult, UserQueryVariables | void>({
      query: (variables) => ({ document: UserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUserQuery, useLazyUserQuery } = injectedRtkApi;

