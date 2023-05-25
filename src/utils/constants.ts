import { CategoryType } from "../api/graphql/api.schema";
import { routes } from "../route/routes";

export const SERVICE_CATEGORIES = [
  CategoryType.Barber,
  CategoryType.Hairdresser,
  CategoryType.MakeupArtist,
  CategoryType.NailTechnician,
  CategoryType.Spa,
];

export const VALID_URL_PATH_NAMES = [
  `/${routes.about.base.get()}`,
  `/${routes.contacts.base.get()}`,
  `/${routes.account.base.get()}`,
  `/${routes.providerDashboard.base.get()}`,
];
