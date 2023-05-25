import { ReactNode } from "react";
import { Comment } from "../../../../../../api/graphql/api.schema";

export interface IReviewProps {
  parentComment: Comment;
  parentId: number;
  getReplies: (parentId: number) => Comment[];
  children?: (args: IReviewProps) => ReactNode;
}
