import { SelectChangeEventDetail } from "@ionic/react";
import { AgGridReact } from "ag-grid-react";
import { isEmpty } from "lodash";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import {
  CategoryType,
  DurationUnitType,
} from "../../../../../../../api/graphql/api.schema";
import { useAddService as useCreateServiceMutation } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { SERVICE_CATEGORIES } from "../../../../../../../utils/constants";
import { CREATE_SERVICE_MESSAGE } from "../../../../../../../utils/messages";
import { IInput, ISelectOption } from "../../../../../../../utils/types";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { formatCategoryLabel } from "../../../utils";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { useNativeElementsSizeInfo } from "../../../../../../../hooks";

export const useCreateService = (gridRef: RefObject<AgGridReact<any>>) => {
  const [category, setCategory] = useState<IInput<CategoryType>>();
  const [name, setName] = useState<IInput<string>>();
  const [description, setDescription] = useState<IInput<string>>();
  const [price, setPrice] = useState<IInput<string>>();
  const [duration, setDuration] = useState<IInput<string>>();
  const [durationUnit, setDurationUnit] = useState<DurationUnitType>(
    DurationUnitType.Min
  );
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const history = useHistory();
  const gridApi = gridRef.current?.api;
  const [createServiceLoading, setCreateServiceLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { toast } = useCustomToast();

  const { isKeyboardOpen } = useNativeElementsSizeInfo();

  const { createService } = useCreateServiceMutation();

  const categories: ISelectOption<CategoryType>[] = useMemo(() => {
    return SERVICE_CATEGORIES.map((serviceCategory) => {
      return {
        label: formatCategoryLabel(serviceCategory),
        value: serviceCategory,
      };
    });
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.services.use()}`);
  }, [history, setIsOpen]);

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    setIsOpen(true);

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [history]);

  /**
   *
   * Handlers
   *
   */
  const onInputCheckUpdate = (
    value: string,
    error: string,
    setValue: Dispatch<SetStateAction<IInput<any> | undefined>>
  ) => {
    if (!value) {
      setValue({ value, error });
    } else {
      setValue({ value, error: "" });
    }
  };

  const onCategoryChange = (
    ev: CustomEvent<SelectChangeEventDetail<CategoryType>>
  ) => {
    const value = ev.detail.value as CategoryType;

    onInputCheckUpdate(value, "Category is required.", setCategory);
  };

  const onNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Name is required.", setName);
  };

  const onPriceChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Price is required.", setPrice);
  };

  const onDurationChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Duration is required.", setDuration);
  };

  const onDescriptionChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Description is required.", setDescription);
  };

  const onDurationUnitChange = (selectedDurationUnit: DurationUnitType) => {
    setDurationUnit(selectedDurationUnit);
  };

  const onCanCreateService = (): boolean => {
    const error =
      !isEmpty(category?.error) ||
      !isEmpty(name?.error) ||
      !isEmpty(price?.error) ||
      !isEmpty(description?.error) ||
      !isEmpty(duration?.error);
    const missingFilled =
      isEmpty(category?.value) ||
      isEmpty(name?.value) ||
      isEmpty(price?.value) ||
      isEmpty(description?.value) ||
      isEmpty(duration?.value);

    return !error && !missingFilled;
  };

  const onCreateService = async () => {
    if (!onCanCreateService()) {
      return;
    }

    setCreateServiceLoading(true);

    try {
      await createService({
        category: category!.value,
        name: name!.value,
        description: description!.value,
        price: Number(price!.value),
        duration: Number(duration!.value),
        durationUnit,
        inHouse: false,
      }).unwrap();

      setCreateServiceLoading(false);

      toast({ message: CREATE_SERVICE_MESSAGE, onCloseModal });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setCreateServiceLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong creating service.",
        buttonDismiss: true,
      });
    }
  };

  return {
    name,
    description,
    price,
    duration,
    durationUnit,
    category,
    createServiceLoading,
    isOpen,
    categories,
    isKeyboardOpen,
    onNameChange,
    onPriceChange,
    onDescriptionChange,
    onDurationChange,
    onDurationUnitChange,
    onCategoryChange,
    onCreateService,
    onCloseModal,
    onCanCreateService,
  };
};
