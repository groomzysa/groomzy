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
export type SignInMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
  role: Types.UserRole;
}>;


export type SignInMutationResult = { __typename?: 'Mutation', signIn: { __typename?: 'UserToken', token: string, user: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, email?: string | null, role?: Types.UserRole | null, state?: Types.UserStatus | null, address?: { __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null } | null, provider?: { __typename?: 'Provider', id: number, tradingName?: string | null, phone?: string | null, addresses?: Array<{ __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null }> | null } | null } } };


export const SignInDocument = `
    mutation signIn($email: String!, $password: String!, $role: UserRole!) {
  signIn(email: $email, password: $password, role: $role) {
    token
    user {
      id
      firstName
      lastName
      email
      role
      state
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
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<SignInMutationResult, SignInMutationVariables>({
      query: (variables) => ({ document: SignInDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSignInMutation } = injectedRtkApi;

