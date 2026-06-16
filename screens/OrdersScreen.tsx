import React, { useCallback } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet, ListRenderItem } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { OrderItem } from '../types';
import { mockOrders } from '../utils/mockOrders';
import OrderCard from '../components/OrderCard';

const OrdersScreen = (): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  const renderItem: ListRenderItem<OrderItem> = useCallback(
    ({ item }) => <OrderCard order={item} />,
    []
  );

  const keyExtractor = useCallback((item: OrderItem) => String(item.id), []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Заказы</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#E8F0FE" />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск по номеру заказа..."
            placeholderTextColor="#E8F0FE"
          />
        </View>
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={mockOrders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Мои заказы</Text>}
      />

      <View style={styles.footer}>
        <Pressable style={styles.refreshButton}>
          <Ionicons name="refresh" size={18} color="#4A90E2" />
          <Text style={styles.refreshButtonText}>Обновить</Text>
        </Pressable>
        <Pressable style={styles.newOrderButton}>
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.newOrderButtonText}>Новый заказ</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#fff' },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  sectionTitle: { fontSize: 17, fontWeight: '600', color: '#1A1A1A', marginBottom: 12 },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  refreshButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    height: 46,
  },
  refreshButtonText: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  newOrderButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    height: 46,
  },
  newOrderButtonText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});

export default OrdersScreen;
