import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import GameCard from './GameCard';

export default function GameHorizontalList({ title, data, onPressItem, listKey }) {
  if (!data || data.length === 0) return null;

  const pages = useMemo(() => {
    const chunkSize = 3;
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        key={listKey}
        horizontal
        data={pages}
        keyExtractor={(_, index) => `page-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: page }) => (
          <View style={styles.page}>
            {page.map((game) => (
              <View key={game.id} style={styles.rowItem}>
                <GameCard
                  game={game}
                  compact
                  onPress={() => onPressItem && onPressItem(game)}
                />
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
  },
  listContent: {
    paddingVertical: 4,
  },
  page: {
    width: Dimensions.get('window').width - 32,
  },
  rowItem: {
    marginBottom: 8,
  },
});
