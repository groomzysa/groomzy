import { SelectChangeEventDetail } from "@ionic/react";
import { isEmpty } from "lodash";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TimePickerValue } from "react-time-picker";
import {
  DayType,
  OperatingTimesQueryResults,
} from "../../../../../../../api/graphql/api.schema";
import { useAddOperatingTime } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { RootState } from "../../../../../../../store/store";
import { ADD_OPERATING_TIME_MESSAGE } from "../../../../../../../utils/messages";
import { IInput } from "../../../../../../../utils/types";
import { DAYS } from "../../../constants";
import { useSuccessControl } from "../../../../../../../hooks/useSuccessControl";
import { AgGridReact } from "ag-grid-react";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useCreateTradingTime = (gridRef: RefObject<AgGridReact<any>>) => {
  const {
    api: { queries },
  } = useSelector<RootState, Pick<RootState, "api">>((state) => state);
  const [day, setDay] = useState<IInput<DayType>>();
  const [opens, setOpens] = useState<IInput<TimePickerValue>>();
  const [closes, setCloses] = useState<IInput<TimePickerValue>>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const gridApi = gridRef.current?.api;
  const [addOperatingTimeLoading, setAddOperatingTimeLoading] = useState(false);

  /**
   *
   * Custom hooks
   *
   */
  const { successControl } = useSuccessControl();

  const { addOperatingTime } = useAddOperatingTime();

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

  const onCanCreateOperatingTime = (): boolean => {
    const error =
      !isEmpty(day?.error) || !isEmpty(opens?.error) || !isEmpty(closes?.error);
    const missingFilled =
      isEmpty(day?.value) || isEmpty(opens?.value) || isEmpty(closes?.value);

    return !error && !missingFilled;
  };

  const onCreateOperatingTime = async () => {
    if (!onCanCreateOperatingTime()) {
      return;
    }

    setAddOperatingTimeLoading(true);
    try {
      await addOperatingTime({
        day: day!.value,
        opens: `${opens!.value} hrz`,
        closes: `${closes!.value} hrz`,
      }).unwrap();

      setAddOperatingTimeLoading(false);

      successControl(ADD_OPERATING_TIME_MESSAGE, onCloseModal);
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setAddOperatingTimeLoading(false);
      successControl(
        getErrorMessage(error as ErrorResponse) ||
          "Something went wrong adding operating time."
      );
    }
  };

  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.tradingTimes.use()}`);
  }

  return {
    day,
    opens,
    closes,
    isOpen,
    dayOptions,
    createOperatingTimeLoading: addOperatingTimeLoading,
    onDayChange,
    onOpensChange,
    onClosesChange,
    onCloseModal,
    onCreateOperatingTime,
    onCanCreateOperatingTime,
  };
};
