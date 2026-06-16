import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  'Выполнен': '#34C759',
  'В обработке': '#FF9F0A',
  'Отменён': '#FF3B30',
};

const StatusBadge = ({ status }: StatusBadgeProps): React.JSX.Element => (
  <View style={[styles.badge, { backgroundColor: STATUS_COLORS[status] }]}>
    <Text style={styles.text}>{status}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  text: { color: '#fff', fontSize: 12, fontWeight: '600' },
});

export default React.memo(StatusBadge);
