import { isEmpty } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";
import { IInput } from "../../../../../utils/types";
import {
  useAddAccountAddress,
  useUpdateAccountAddress,
} from "../../../../../api/hooks/mutations";
import {
  ADD_PROVIDER_TRADING_ADDRESS_MESSAGE,
  UPDATE_PROVIDER_TRADING_ADDRESS_MESSAGE,
} from "../../../../../utils/messages";
import { useNativeElementsSizeInfo } from "../../../../../hooks";
import { User } from "../../../../../api/graphql/api.schema";
import { useCustomToast } from "../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { RefresherEventDetail } from "@ionic/react";
import { useFetchUser } from "../../../../../api/hooks/queries";

export const useAccountAddress = (user: User) => {
  const [streetNumber, setStreetNumber] = useState<IInput<string>>();
  const [streetName, setStreetName] = useState<IInput<string>>();
  const [townName, setTownName] = useState<IInput<string>>();
  const [cityName, setCityName] = useState<IInput<string>>();
  const [provinceName, setProvinceName] = useState<IInput<string>>();
  const [areaCode, setAreaCode] = useState<IInput<string>>();
  let addAccountAddressLoading = false;
  let updateAccountAddressLoading = false;

  /**
   *
   * Hooks
   *
   */
  const { toast } = useCustomToast();

  const { isKeyboardOpen } = useNativeElementsSizeInfo();

  const { fetchUser } = useFetchUser();

  const { addAccountAddress } = useAddAccountAddress();

  const { updateAccountAddress } = useUpdateAccountAddress();

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
      user?.address ? "" : "Street number is required.",
      setStreetNumber
    );
  };

  const onStreetNameChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      user?.address ? "" : "Street name is required.",
      setStreetName
    );
  };

  const onTownNameChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      user?.address ? "" : "Town / Suburb name is required.",
      setTownName
    );
  };

  const onCityNameChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      user?.address ? "" : "City name is required.",
      setCityName
    );
  };

  const onProvinceNameChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      user?.address ? "" : "Province name is required.",
      setProvinceName
    );
  };

  const onAreaCodeChanged = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(
      value,
      user?.address ? "" : "Area code is required.",
      setAreaCode
    );
  };

  const onCanAddAccountAddress = (): boolean => {
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

  const onAddAccountAddress = async () => {
    if (!onCanAddAccountAddress()) {
      return;
    }

    addAccountAddressLoading = true;

    try {
      await addAccountAddress({
        streetNumber: streetNumber!.value,
        streetName: streetName!.value,
        town: townName!.value,
        city: cityName!.value,
        province: provinceName!.value,
        areaCode: areaCode!.value,
      }).unwrap();

      addAccountAddressLoading = false;
      toast({ message: ADD_PROVIDER_TRADING_ADDRESS_MESSAGE });
    } catch (error) {
      addAccountAddressLoading = false;
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong adding address",
        buttonDismiss: true,
      });
    }
  };

  const onUpdateAccountAddress = async () => {
    if (!user?.address) return;
    updateAccountAddressLoading = true;
    try {
      await updateAccountAddress({
        addressId: user.address.id,
        streetNumber: streetNumber?.value,
        streetName: streetName?.value,
        town: townName?.value,
        city: cityName?.value,
        province: provinceName?.value,
        areaCode: areaCode?.value,
      }).unwrap();

      updateAccountAddressLoading = false;
      addAccountAddressLoading = false;
      toast({ message: UPDATE_PROVIDER_TRADING_ADDRESS_MESSAGE });
    } catch (error) {
      updateAccountAddressLoading = false;
      addAccountAddressLoading = false;
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong updating address",
        buttonDismiss: true,
      });
    }
  };

  const onRefetchAccountAddress = (
    event: CustomEvent<RefresherEventDetail>
  ) => {
    fetchUser();
    event.detail.complete();
  };

  return {
    userAddress: user?.address,
    streetNumber,
    streetName,
    townName,
    cityName,
    provinceName,
    areaCode,
    addAccountAddressLoading,
    updateAccountAddressLoading,
    isKeyboardOpen,
    onStreetNumberChanged,
    onStreetNameChanged,
    onTownNameChanged,
    onCityNameChanged,
    onProvinceNameChanged,
    onAreaCodeChanged,
    onAddAccountAddress,
    onUpdateAccountAddress,
    onRefetchAccountAddress,
  };
};
