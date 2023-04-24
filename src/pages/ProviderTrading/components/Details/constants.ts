import { DayType } from "../../../../api/graphql/api.schema";

export const MAP_CONFIG = {
  zoom: 5,
  center: {
    lat: -28.4792625,
    lng: 24.6727135,
  },
};

export const DAYS = [
  DayType.Mon,
  DayType.Tue,
  DayType.Wed,
  DayType.Thr,
  DayType.Fri,
  DayType.Sat,
  DayType.Sun,
];
