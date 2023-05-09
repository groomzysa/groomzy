import { SelectChangeEventDetail } from "@ionic/react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { TimePickerValue } from "react-time-picker";
import {
  DayType,
  OperatingTimesQueryResults,
} from "../../../../../../../api/graphql/api.schema";
import { useUpdateOperatingTime } from "../../../../../../../api/hooks/mutations";
import { useFetchOperatingTime } from "../../../../../../../api/hooks/queries";
import { routes } from "../../../../../../../route/routes";
import { RootState } from "../../../../../../../store/store";
import { UPDATE_OPERATING_TIME_MESSAGE } from "../../../../../../../utils/messages";
import { IInput } from "../../../../../../../utils/types";
import { DAYS } from "../../../constants";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { AgGridReact } from "ag-grid-react";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useUpdateTradingTime = (gridRef: RefObject<AgGridReact<any>>) => {
  const {
    api: { queries },
  } = useSelector<RootState, Pick<RootState, "api">>((state) => state);
  const [day, setDay] = useState<IInput<DayType>>();
  const [opens, setOpens] = useState<IInput<TimePickerValue>>();
  const [closes, setCloses] = useState<IInput<TimePickerValue>>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const gridApi = gridRef.current?.api;
  const [updateOperatingTimeLoading, setUpdateOperatingTimeLoading] =
    useState(false);

  /**
   *
   * Custom hooks
   *
   */
  const { id } = useParams<{ id: string }>();
  const { autoDisimissToast } = useCustomToast();

  const { updateOperatingTime } = useUpdateOperatingTime();

  const { operatingTime, fetchOperatingTime, operatingTimeLoading } =
    useFetchOperatingTime();

  const cachedOperatingTimes = useMemo(() => {
    const operatingTimes = queries?.operatingTimes?.data as {
      operatingTimes: OperatingTimesQueryResults;
    };

    return operatingTimes;
  }, [queries]);

  const dayOptions = useMemo(() => {
    return DAYS.filter(
      (day) => !cachedOperatingTimes?.operatingTimes.days.includes(day.value)
    );
  }, [cachedOperatingTimes]);

  const history = useHistory();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!id) {
      history.push(`/${routes.providerDashboard.tradingTimes.use()}`);

      return;
    }

    setIsOpen(true);

    fetchOperatingTime({ operatingTimeId: Number(id) });

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [history, fetchOperatingTime, id]);

  /**
   *
   * Handlers
   *
   */
  const onInputTimeCheckUpdate = (
    value: TimePickerValue,
    error: string,
    setValue: Dispatch<SetStateAction<IInput<TimePickerValue> | undefined>>
  ) => {
    if (!value) {
      setValue({ value, error });
    } else {
      setValue({ value, error: "" });
    }
  };

  const onDayChange = (ev: CustomEvent<SelectChangeEventDetail<DayType>>) => {
    const value = ev.detail.value;

    if (!value) {
      setDay({ value, error: "Day is required" });
    } else {
      setDay({ value, error: "" });
    }
  };

  const onOpensChange = (value: TimePickerValue) => {
    onInputTimeCheckUpdate(value, "Opening time is required.", setOpens);
  };

  const onClosesChange = (value: TimePickerValue) => {
    onInputTimeCheckUpdate(value, "Closing time is required.", setCloses);
  };

  const onUpdateOperatingTime = async () => {
    if (!id) {
      return;
    }

    setUpdateOperatingTimeLoading(true);

    try {
      await updateOperatingTime({
        operatingTimeId: Number(id),
        day: day?.value,
        opens: opens?.value ? `${opens?.value} hrz` : undefined,
        closes: closes?.value ? `${closes?.value} hrz` : undefined,
      }).unwrap();
      setUpdateOperatingTimeLoading(false);

      autoDisimissToast({
        message: UPDATE_OPERATING_TIME_MESSAGE,
        onCloseModal,
      });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setUpdateOperatingTimeLoading(false);

      autoDisimissToast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong updateing operating time.",
        buttonDismiss: true,
      });
    }
  };

  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.tradingTimes.use()}`);
  }

  return {
    operatingTime,
    operatingTimeLoading,
    day,
    opens,
    closes,
    isOpen,
    dayOptions,
    updateOperatingTimeLoading,
    onDayChange,
    onOpensChange,
    onClosesChange,
    onCloseModal,
    onUpdateOperatingTime,
  };
};
