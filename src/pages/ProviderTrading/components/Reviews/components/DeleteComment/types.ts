export interface IDeleteCommentProps {
  commentId: number;
  onIsDeleteOpen: (commentId: number, show: boolean) => void;
}
