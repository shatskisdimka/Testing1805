import { create } from 'zustand';
import { OrderItem } from '../types';
import { mockOrders } from '../utils/mockOrders';

interface OrdersState {
  orders: OrderItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refresh: () => void;
  addOrder: () => void;
}

const createNewOrder = (orders: OrderItem[]): OrderItem => {
  const lastNumber = orders.reduce((max, order) => Math.max(max, order.number), 0);
  return {
    id: Date.now(),
    number: lastNumber + 1,
    amount: 1500,
    products: 2,
    status: 'В обработке',
    date: new Date().toLocaleDateString('ru-RU'),
  };
};

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: mockOrders,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  refresh: () => set({ orders: mockOrders, searchQuery: '' }),
  addOrder: () => {
    const { orders } = get();
    set({ orders: [createNewOrder(orders), ...orders] });
  },
}));
