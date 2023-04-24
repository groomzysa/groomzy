/**
 *
 * States
 *
 */
export interface IAppSliceState {
  token?: string;
}

/**
 *
 * Actions
 *
 */
export interface ISetTokenAction {
  type: string;
  payload: {
    token?: string;
  };
}
