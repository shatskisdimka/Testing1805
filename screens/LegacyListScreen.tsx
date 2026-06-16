import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { ApiError, fetchNews } from '../utils/api';
import { NewsItem } from '../types';

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
      <ScrollView style={styles.list}>
        {data.map((item: NewsItem) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  center: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  list: { flex: 1 },
  card: { backgroundColor: '#fff', padding: 16, marginBottom: 12, borderRadius: 8 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  cardBody: { fontSize: 14, color: '#555' },
  errorText: { fontSize: 16, color: '#c0392b', textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#2d5cf6', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default LegacyListScreen;
