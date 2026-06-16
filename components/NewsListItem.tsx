import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NewsItem } from '../types';

interface NewsListItemProps {
  item: NewsItem;
}

const NewsListItem = ({ item }: NewsListItemProps): React.JSX.Element => {
  // console.log('render NewsListItem', item.id);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody}>{item.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 16, marginBottom: 12, borderRadius: 8 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  cardBody: { fontSize: 14, color: '#555' },
});

export default React.memo(NewsListItem);
