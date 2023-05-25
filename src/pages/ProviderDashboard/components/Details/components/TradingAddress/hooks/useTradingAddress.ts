import { isEmpty } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  useAddTradingAddress,
  useUpdateTradingAddress,
} from "../../../../../../../api/hooks/mutations";
import {
  ADD_PROVIDER_TRADING_ADDRESS_MESSAGE,
  UPDATE_PROVIDER_TRADING_ADDRESS_MESSAGE,
} from "../../../../../../../utils/messages";
import { IInput } from "../../../../../../../utils/types";
import { useNativeElementsSizeInfo } from "../../../../../../../hooks";
import { useFetchProvider } from "../../../../../../../api/hooks/queries";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { RefresherEventDetail } from "@ionic/react";

export const useTradingAddress = () => {
  const [streetNumber, setStreetNumber] = useState<IInput<string>>();
  const [streetName, setStreetName] = useState<IInput<string>>();
  const [townName, setTownName] = useState<IInput<string>>();
  const [cityName, setCityName] = useState<IInput<string>>();
  const [provinceName, setProvinceName] = useState<IInput<string>>();
  const [areaCode, setAreaCode] = useState<IInput<string>>();
  const [addTradingAddressLoading, setAddTradingAddressLoading] =
    useState(false);
  const [updateTradingAddressLoading, setUpdateTradingAddressLoading] =
    useState(false);

  /**
   *
   * Hooks
   *
   */
  const { toast } = useCustomToast();

  const { fetchProvider, provider } = useFetchProvider();

  const { isKeyboardOpen } = useNativeElementsSizeInfo();

  const { addTradingAddress } = useAddTradingAddress();

  const { updateTradingAddress } = useUpdateTradingAddress();

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

  const onStreetNumberChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      provider ? "" : "Street number is required.",
      setStreetNumber
    );
  };

  const onStreetNameChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      provider ? "" : "Street name is required.",
      setStreetName
    );
  };

  const onTownNameChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      provider ? "" : "Town / Suburb name is required.",
      setTownName
    );
  };

  const onCityNameChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      provider ? "" : "City name is required.",
      setCityName
    );
  };

  const onProvinceNameChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      provider ? "" : "Province name is required.",
      setProvinceName
    );
  };

  const onAreaCodeChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      provider ? "" : "Area code is required.",
      setAreaCode
    );
  };

  const onCanAddTradingAddress = (): boolean => {
    const error =
      !isEmpty(streetNumber?.error) ||
      !isEmpty(streetName?.error) ||
      !isEmpty(townName?.error) ||
      !isEmpty(cityName?.error) ||
      !isEmpty(provinceName?.error) ||
      !isEmpty(areaCode?.error);
    const missingFilled =
      isEmpty(streetNumber?.value) ||
      isEmpty(streetName?.value) ||
      isEmpty(townName?.value) ||
      isEmpty(cityName?.value) ||
      isEmpty(provinceName?.value) ||
      isEmpty(areaCode?.value);

    return !error && !missingFilled;
  };

  const onAddTradingAddress = async () => {
    if (!onCanAddTradingAddress()) {
      return;
    }

    setAddTradingAddressLoading(true);

    try {
      await addTradingAddress({
        streetNumber: streetNumber!.value,
        streetName: streetName!.value,
        town: townName!.value,
        city: cityName!.value,
        province: provinceName!.value,
        areaCode: areaCode!.value,
      }).unwrap();
      setAddTradingAddressLoading(false);

      toast({ message: ADD_PROVIDER_TRADING_ADDRESS_MESSAGE });
    } catch (error) {
      setAddTradingAddressLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong adding trading address",
        buttonDismiss: true,
      });
    }
  };

  const onUpdateTradingAddress = async () => {
    if (!provider?.addresses) return;

    setUpdateTradingAddressLoading(true);
    try {
      await updateTradingAddress({
        addressId: provider.addresses[0].id,
        streetNumber: streetNumber?.value,
        streetName: streetName?.value,
        town: townName?.value,
        city: cityName?.value,
        province: provinceName?.value,
        areaCode: areaCode?.value,
      }).unwrap();

      setUpdateTradingAddressLoading(false);
      toast({ message: UPDATE_PROVIDER_TRADING_ADDRESS_MESSAGE });
    } catch (error) {
      setUpdateTradingAddressLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong updating trading address",
        buttonDismiss: true,
      });
    }
  };

  const onRefetchTradingAddress = (
    event: CustomEvent<RefresherEventDetail>
  ) => {
    fetchProvider();
    event.detail.complete();
  };

  return {
    providerAddress: provider?.addresses?.[0],
    streetNumber,
    streetName,
    townName,
    cityName,
    provinceName,
    areaCode,
    addTradingAddressLoading,
    updateTradingAddressLoading,
    isKeyboardOpen,
    onStreetNumberChanged,
    onStreetNameChanged,
    onTownNameChanged,
    onCityNameChanged,
    onProvinceNameChanged,
    onAreaCodeChanged,
    onAddTradingAddress,
    onUpdateTradingAddress,
    onRefetchTradingAddress,
  };
};
