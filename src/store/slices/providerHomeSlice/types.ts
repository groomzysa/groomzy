import { GridApi } from "ag-grid-community";
import {
  DayType,
  OperatingTime,
  Service,
  Social,
} from "../../../api/graphql/api.schema";
import { ISelectOption } from "../../../utils/types";

/**
 *
 * States
 *
 */

export interface IProviderHomeSliceState {
  dayOptions: ISelectOption<DayType>[];
  socialOptions: ISelectOption<string>[];
  operatingTime?: OperatingTime;
  service?: Service;
  social?: Social;
  isOpen?: boolean;
}

/**
 *
 * Actions
 *
 */

export interface ISetDayOptionsAction {
  type: string;
  payload: {
    dayOptions: ISelectOption<DayType>[];
  };
}

export interface ISetSocialOptionsAction {
  type: string;
  payload: {
    socialOptions: ISelectOption<string>[];
  };
}

export interface ISetOperatingTimeAction {
  type: string;
  payload: {
    operatingTime?: OperatingTime;
  };
}

export interface ISetServiceAction {
  type: string;
  payload: {
    service?: Service;
  };
}

export interface ISetSocialAction {
  type: string;
  payload: {
    social?: Social;
  };
}

export interface ISetIsOpenAction {
  type: string;
  payload: {
    isOpen?: boolean;
  };
}
