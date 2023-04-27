import { isEmpty } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  useAddTradingInfo,
  useUpdateTradingInfo,
} from "../../../../../../../api/hooks/mutations";
import {
  ADD_PROVIDER_TRADING_INFO_MESSAGE,
  UPDATE_PROVIDER_TRADING_INFO_MESSAGE,
} from "../../../../../../../utils/messages";
import { IInput, IPhoto } from "../../../../../../../utils/types";
import { useNativeElementsSizeInfo } from "../../../../../../../hooks";
import { useFetchProvider } from "../../../../../../../api/hooks/queries";
import { useSuccessControl } from "../../../../../../../hooks/useSuccessControl";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { RefresherEventDetail } from "@ionic/react";

export const useTradingInfo = () => {
  const [tradingName, setTradingName] = useState<IInput<string>>();
  const [phoneNumber, setPhoneNumber] = useState<IInput<string>>();
  const [photo, setPhoto] = useState<IPhoto>();
  const [logo, setLogo] = useState<Blob>();
  const [addTradingInfoLoading, setAddTradingInfoLoading] = useState(false);
  const [updateTradingInfoLoading, setUpdateTradingInfoLoading] =
    useState(false);

  /**
   *
   * Hooks
   *
   */
  const { successControl } = useSuccessControl();

  const { fetchProvider, provider } = useFetchProvider();
  const { isKeyboardOpen, topToolBarHeight, bottomToolBarHeight } =
    useNativeElementsSizeInfo();

  const { addTradingInfo } = useAddTradingInfo();

  const { updateTradingInfo } = useUpdateTradingInfo();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    fetchProvider();
  }, [fetchProvider]);

  /**
   *
   * Handlers
   *
   */
  const base64FromPath = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("method did not return a string");
        }
      };
      reader.readAsDataURL(blob);
    });
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100,
    });

    const newPhoto = {
      filepath: new Date() + "." + photo.format,
      webviewPath: photo.webPath,
    };

    const base64Data = await base64FromPath(photo.webPath!);

    const response = await fetch(base64Data);
    const blob = await response.blob();
    setPhoto(newPhoto);
    setLogo(blob);
  };

  const onInputCheckUpdate = (
    value: string,
    error: string,
    setValue: Dispatch<SetStateAction<IInput<string> | undefined>>
  ) => {
    if (!value) {
      setValue({ value, error });
    } else {
      setValue({ value, error: "" });
    }
  };

  const onTradingNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      provider ? "" : "Trading name is required.",
      setTradingName
    );
  };

  const onPhoneNumberChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      provider ? "" : "Phone number is required.",
      setPhoneNumber
    );
  };

  const onAddTradingInfo = async () => {
    if (!onCanAddTradingInfo) return;

    setAddTradingInfoLoading(true);

    try {
      await addTradingInfo({
        tradingName: tradingName!.value,
        phone: phoneNumber!.value,
        logo,
      }).unwrap();
      setAddTradingInfoLoading(false);

      successControl(ADD_PROVIDER_TRADING_INFO_MESSAGE, undefined);
    } catch (error) {
      setAddTradingInfoLoading(false);
      successControl(
        getErrorMessage(error as ErrorResponse) ||
          "Something went wrong creating provider",
        undefined
      );
    }
  };

  const onUpdateTradingInfo = async () => {
    if (!provider) return;

    setUpdateTradingInfoLoading(true);
    try {
      await updateTradingInfo({
        providerId: provider.id,
        tradingName: tradingName?.value,
        phone: phoneNumber?.value,
        logo,
      }).unwrap();
      setUpdateTradingInfoLoading(false);
      successControl(UPDATE_PROVIDER_TRADING_INFO_MESSAGE, undefined);
    } catch (error) {
      setUpdateTradingInfoLoading(false);

      successControl(
        getErrorMessage(error as ErrorResponse) ||
          "Something went wrong creating provider",
        undefined
      );
    }
  };

  const onCanAddTradingInfo = (): boolean => {
    const error = !isEmpty(tradingName?.error) || !isEmpty(phoneNumber?.error);
    const missingFilled =
      isEmpty(tradingName?.value) || isEmpty(phoneNumber?.value);

    return !error && !missingFilled;
  };

  const onRefetchTradingInfo = (event: CustomEvent<RefresherEventDetail>) => {
    fetchProvider();
    event.detail.complete();
  };

  return {
    provider,
    tradingName,
    phoneNumber,
    photo,
    addTradingInfoLoading,
    updateTradingInfoLoading,
    isKeyboardOpen,
    topToolBarHeight,
    bottomToolBarHeight,
    onTradingNameChange,
    onPhoneNumberChange,
    onAddTradingInfo,
    onUpdateTradingInfo,
    takePhoto,
    onRefetchTradingInfo,
  };
};
