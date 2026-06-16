export type OrderStatus = 'Выполнен' | 'В обработке' | 'Отменён';

export interface OrderItem {
  id: number;
  number: number;
  amount: number;
  products: number;
  status: OrderStatus;
  date: string;
}
