import { Service } from "../../../../../api/graphql/api.schema";

export interface IServiceRow extends Service {
  priceText: string;
  durationText: string;
}
