import { User } from "../../../../api/graphql/api.schema";

export interface IAccountInfoProps {
  user: User;
}

export interface IPhoto {
  filepath: string;
  webviewPath?: string;
}
