import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import games from '../data/game.json';
import GameCard from '../components/GameCard';
import GameHorizontalList from '../components/GameHorizontalList';

export default function CategoryResultScreen({ route, navigation }) {
  const { category } = route.params || {};

  const categoryGames = useMemo(
    () =>
      games.filter((g) =>
        g.categories?.includes(category),
      ),
    [category],
  );

  const recommendedGames = useMemo(
    () =>
      games.filter(
        (g) =>
          !g.categories?.includes(category) &&
          (g.featured || g.trending),
      ),
    [category],
  );

  const openDetail = (game) => {
    navigation.navigate('GameDetailFromSearch', { gameId: game.id });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {category} games
        </Text>
        <Text style={styles.subtitle}>
          {categoryGames.length} game in this category
        </Text>

        <FlatList
          data={categoryGames}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <GameCard
              game={item}
              compact
              onPress={() => openDetail(item)}
            />
          )}
          ListFooterComponent={
            recommendedGames.length > 0 ? (
              <View style={styles.footerSection}>
                <GameHorizontalList
                  title="Recommended for you"
                  data={recommendedGames}
                  onPressItem={openDetail}
                />
              </View>
            ) : null
          }
        />
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
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#7C3AED',
    marginTop: 4,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  footerSection: {
    marginTop: 18,
  },
});

