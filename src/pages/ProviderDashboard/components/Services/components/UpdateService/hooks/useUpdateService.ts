import { SelectChangeEventDetail } from "@ionic/react";
import { AgGridReact } from "ag-grid-react";
import { RefObject, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  CategoryType,
  DurationUnitType,
} from "../../../../../../../api/graphql/api.schema";
import { useUpdateService as useUpdateServiceMutation } from "../../../../../../../api/hooks/mutations";
import { useFetchService } from "../../../../../../../api/hooks/queries";
import { routes } from "../../../../../../../route/routes";
import { SERVICE_CATEGORIES } from "../../../../../../../utils/constants";
import { UPDATE_SERVICE_MESSAGE } from "../../../../../../../utils/messages";
import { IInput, ISelectOption } from "../../../../../../../utils/types";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { formatCategoryLabel } from "../../../utils";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { useNativeElementsSizeInfo } from "../../../../../../../hooks";

export const useUpdateService = (gridRef: RefObject<AgGridReact<any>>) => {
  const [category, setCategory] = useState<IInput<CategoryType>>();
  const [name, setName] = useState<IInput<string>>();
  const [description, setDescription] = useState<IInput<string>>();
  const [price, setPrice] = useState<IInput<string>>();
  const [duration, setDuration] = useState<IInput<string>>();
  const [durationUnit, setDurationUnit] = useState<DurationUnitType>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const gridApi = gridRef.current?.api;
  const [updateServiceLoading, setUpdateServiceLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();
  const { isKeyboardOpen } = useNativeElementsSizeInfo();
  const { toast } = useCustomToast();
  const { fetchService, serviceError, serviceLoading, service } =
    useFetchService();
  const { updateService } = useUpdateServiceMutation();
  const history = useHistory();

  const categories: ISelectOption<CategoryType>[] = useMemo(() => {
    return SERVICE_CATEGORIES.filter(
      (serviceCategory) => serviceCategory !== service?.category
    ).map((serviceCategory) => {
      return {
        label: formatCategoryLabel(serviceCategory),
        value: serviceCategory,
      };
    });
  }, [service]);

  /**
   *
   * States checks
   *
   */
  if (serviceError) {
    toast({
      message: serviceError || "Something went wrong, updating service.",
      buttonDismiss: true,
    });
  }

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!id) {
      history.push(`/${routes.providerDashboard.services.use()}`);

      return;
    }

    setIsOpen(true);

    fetchService({ serviceId: Number(id) });

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [id, fetchService, history]);

  /**
   *
   * Handlers
   *
   */
  const onCategoryChange = (
    ev: CustomEvent<SelectChangeEventDetail<CategoryType>>
  ) => {
    const value = ev.detail.value;

    setCategory({ value });
  };

  const onNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setName({ value });
  };

  const onPriceChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setPrice({ value });
  };

  const onDurationChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setDuration({ value });
  };

  const onDescriptionChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setDescription({ value });
  };

  const onDurationUnitChange = (selectedDurationUnit: DurationUnitType) => {
    setDurationUnit(selectedDurationUnit);
  };

  const onUpdateService = async () => {
    setUpdateServiceLoading(true);

    try {
      await updateService({
        serviceId: Number(id),
        name: name?.value,
        description: description?.value,
        price: price?.value ? Number(price?.value) : undefined,
        duration: duration?.value ? Number(duration?.value) : undefined,
        durationUnit,
        category: category?.value,
        inHouse: false,
      }).unwrap();

      setUpdateServiceLoading(false);
      toast({ message: UPDATE_SERVICE_MESSAGE, onCloseModal });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setUpdateServiceLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong, updating service.",
        buttonDismiss: true,
      });
    }
  };

  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.services.use()}`);
  }

  return {
    name,
    description,
    price,
    duration,
    durationUnit,
    category,
    updateServiceLoading,
    service,
    serviceLoading,
    isOpen,
    categories,
    isKeyboardOpen,
    onNameChange,
    onPriceChange,
    onDescriptionChange,
    onDurationChange,
    onDurationUnitChange,
    onCategoryChange,
    onUpdateService,
    onCloseModal,
  };
};
