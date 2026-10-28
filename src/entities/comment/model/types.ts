export interface Comment {
  id: string;
  /** Внешний ключ на пост: комментарии хранятся отдельной коллекцией, а не вложенным массивом в посте */
  postId: string;
  text: string;
  createdAt: string;
}
