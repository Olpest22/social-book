export interface Post {
  id: string;
  text: string;
  /** ISO-строка: в Redux храним только сериализуемые значения */
  createdAt: string;
}
