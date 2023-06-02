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
export type UpdateCommentMutationVariables = Types.Exact<{
  commentId: Types.Scalars['Int'];
  message?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UpdateCommentMutationResult = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: number, message?: string | null, children?: Array<{ __typename?: 'Comment', id: number, message?: string | null }> | null, providerLikes?: Array<{ __typename?: 'ProviderLike', provider?: { __typename?: 'Provider', id: number } | null }> | null, clientLikes?: Array<{ __typename?: 'ClientLike', client?: { __typename?: 'Client', id: number } | null }> | null } };


export const UpdateCommentDocument = `
    mutation updateComment($commentId: Int!, $message: String) {
  updateComment(commentId: $commentId, message: $message) {
    id
    message
    children {
      id
      message
    }
    providerLikes {
      provider {
        id
      }
    }
    clientLikes {
      client {
        id
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateComment: build.mutation<UpdateCommentMutationResult, UpdateCommentMutationVariables>({
      query: (variables) => ({ document: UpdateCommentDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateCommentMutation } = injectedRtkApi;
