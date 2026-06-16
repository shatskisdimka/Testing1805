import { NewsItem } from '../types';

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const fetchNews = async (): Promise<NewsItem[]> => {
  let response: Response;

  try {
    //тут крч если ошибку допустить то выйдет обрабработчик
    response = await fetch('https://jsonplaceholder.typicode.com/posts');
  } catch {
    throw new ApiError('Не удалось подключиться к серверу. Проверьте интернет-соединение.');
  }

  if (!response.ok) {
    throw new ApiError(`Сервер вернул ошибку ${response.status}`, response.status);
  }

  const data: NewsItem[] = await response.json();
  return data;
};
