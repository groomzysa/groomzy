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
export type GalleriesQueryVariables = Types.Exact<{
  providerId?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  cursor?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  paginationType?: Types.InputMaybe<Types.PaginationType>;
}>;


export type GalleriesQueryResult = { __typename?: 'Query', galleries?: { __typename?: 'GalleriesQueryResults', cursor?: number | null, count?: number | null, galleries: Array<{ __typename?: 'Gallery', id: number, name?: string | null, galleryImageUrl?: string | null }> } | null };


export const GalleriesDocument = `
    query galleries($providerId: Int, $limit: Int, $cursor: Int, $page: Int, $paginationType: PaginationType) {
  galleries(
    providerId: $providerId
    limit: $limit
    cursor: $cursor
    page: $page
    paginationType: $paginationType
  ) {
    galleries {
      id
      name
      galleryImageUrl
    }
    cursor
    count
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    galleries: build.query<GalleriesQueryResult, GalleriesQueryVariables | void>({
      query: (variables) => ({ document: GalleriesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGalleriesQuery, useLazyGalleriesQuery } = injectedRtkApi;

