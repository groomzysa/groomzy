import { Provider } from "../../../api/graphql/api.schema";

/**
 *
 * States
 *
 */

export interface IHomeSliceState {
  provider?: Provider;
  search?: string;
  searchTmp?: string;
}

/**
 *
 * Actions
 *
 */

export interface ISetProviderAction {
  type: string;
  payload: {
    provider?: Provider;
  };
}

export interface ISetSearchAction {
  type: string;
  payload: {
    search?: string;
  };
}

export interface ISetSearchTmpAction {
  type: string;
  payload: {
    searchTmp?: string;
  };
}
