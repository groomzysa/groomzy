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
export type AddStaffMutationVariables = Types.Exact<{
  firstName: Types.Scalars['String'];
  lastName: Types.Scalars['String'];
}>;


export type AddStaffMutationResult = { __typename?: 'Mutation', addStaff: { __typename?: 'Staff', id: number, firstName?: string | null, lastName?: string | null } };


export const AddStaffDocument = `
    mutation addStaff($firstName: String!, $lastName: String!) {
  addStaff(firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    addStaff: build.mutation<AddStaffMutationResult, AddStaffMutationVariables>({
      query: (variables) => ({ document: AddStaffDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAddStaffMutation } = injectedRtkApi;
