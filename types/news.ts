export interface NewsItem {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type NewsResponse = NewsItem[];
