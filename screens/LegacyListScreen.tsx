import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable, ListRenderItem } from 'react-native';
import { ApiError, fetchNews } from '../utils/api';
import { NewsItem } from '../types';
import NewsListItem from '../components/NewsListItem';

const LegacyListScreen = (): React.JSX.Element => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchNews()
      .then((res) => setData(res))
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : 'Неизвестная ошибка загрузки новостей');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const renderItem: ListRenderItem<NewsItem> = useCallback(
    ({ item }) => <NewsListItem item={item} />,
    []
  );

  const keyExtractor = useCallback((item: NewsItem) => String(item.id), []);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={loadNews}>
          <Text style={styles.retryButtonText}>Повторить</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новости</Text>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  center: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  list: { flex: 1 },
  errorText: { fontSize: 16, color: '#c0392b', textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#2d5cf6', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default LegacyListScreen;
