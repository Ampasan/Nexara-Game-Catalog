import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import games from '../data/game.json';
import GameCard from '../components/GameCard';

export default function SearchResultsListScreen({ route, navigation }) {
  const initialQuery = (route.params?.query || '').trim();
  const [query, setQuery] = useState(initialQuery);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredGames = useMemo(() => {
    if (!normalizedQuery.length) return [];
    return games.filter((g) =>
      g.title.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const openResultDetail = (game) => {
    navigation.navigate('SearchResult', { gameId: game.id });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Search games</Text>
        <View style={styles.searchBox}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by game name"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            autoFocus
            returnKeyType="search"
          />
        </View>

        {filteredGames.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No games found</Text>
            <Text style={styles.emptySubtitle}>
              Try a different keyword or check your spelling.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredGames}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => (
              <GameCard
                game={item}
                compact
                onPress={() => openResultDetail(item)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 8,
  },
  searchBox: {
    borderRadius: 999,
    backgroundColor: '#E0EAFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  input: {
    fontSize: 14,
    color: '#0F172A',
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});

