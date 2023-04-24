/**
 *
 * States
 *
 */
export interface IAccountSliceState {
  isImageUpload: boolean;
}

/**
 *
 * Actions
 *
 */
export interface IIsImageUploadAction {
  type: string;
  payload: {
    isImageUpload: boolean;
  };
}
