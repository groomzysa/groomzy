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
export type CommentQueryVariables = Types.Exact<{
  commentId: Types.Scalars['Int'];
}>;


export type CommentQueryResult = { __typename?: 'Query', comment: { __typename?: 'Comment', id: number, message?: string | null, children?: Array<{ __typename?: 'Comment', id: number, message?: string | null }> | null, providerLikes?: Array<{ __typename?: 'ProviderLike', provider?: { __typename?: 'Provider', id: number } | null }> | null, clientLikes?: Array<{ __typename?: 'ClientLike', client?: { __typename?: 'Client', id: number } | null }> | null } };


export const CommentDocument = `
    query comment($commentId: Int!) {
  comment(commentId: $commentId) {
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
    comment: build.query<CommentQueryResult, CommentQueryVariables>({
      query: (variables) => ({ document: CommentDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCommentQuery, useLazyCommentQuery } = injectedRtkApi;
