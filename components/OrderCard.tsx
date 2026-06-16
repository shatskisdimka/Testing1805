import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderItem } from '../types';
import { formatAmount } from '../utils/format';
import StatusBadge from './StatusBadge';

interface OrderCardProps {
  order: OrderItem;
}

const OrderCard = ({ order }: OrderCardProps): React.JSX.Element => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <Text style={styles.number}>№ {order.number}</Text>
      <StatusBadge status={order.status} />
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Дата:</Text>
      <Text style={styles.value}>{order.date}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Сумма:</Text>
      <Text style={styles.value}>{formatAmount(order.amount)}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Товаров:</Text>
      <Text style={styles.value}>{order.products} шт</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  number: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: { fontSize: 14, color: '#9B9B9B' },
  value: { fontSize: 14, color: '#1A1A1A', fontWeight: '500' },
});

export default React.memo(OrderCard);
