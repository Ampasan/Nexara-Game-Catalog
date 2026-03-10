import React, { useCallback, useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import GameHorizontalList from '../components/GameHorizontalList';
import CategoryCard from '../components/CategoryCard';
import games from '../data/game.json';

const CATEGORY_CONFIG = [
  { key: 'Action', icon: '👊' },
  { key: 'RPG', icon: '⚔️' },
  { key: 'Strategy', icon: '♟️' },
  { key: 'Music', icon: '🎵' },
  { key: 'Arcade', icon: '🕹️' },
  { key: 'Casual', icon: '🧩' },
];

const RECOMMENDED_GAMES = games.filter((g) => g.featured || g.trending);

export default function SearchScreen({ navigation }) {
  const scrollRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: false });
      }
    }, []),
  );
  const openSearchResult = (game) => {
    navigation.navigate('GameDetailFromSearch', { gameId: game.id });
  };

  const openCategory = (categoryKey) => {
    navigation.navigate('CategoryResult', { category: categoryKey });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Search games</Text>
            <Text style={styles.subtitle}>
              Discover games across Nexara
            </Text>
          </View>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: 'https://avatars.githubusercontent.com/u/183993776?v=4',
              }}
              style={styles.avatarImage}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open profile"
              style={styles.avatarTouchableOverlay}
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </View>

        <Pressable
          style={styles.searchBox}
          onPress={() => navigation.navigate('SearchResultsList', { query: '' })}
        >
          <Text style={styles.searchPlaceholder}>Search by game name</Text>
        </Pressable>

        <ScrollView
          ref={scrollRef}
          style={styles.scrollArea}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse by category</Text>
            <View style={styles.categoryGrid}>
              {CATEGORY_CONFIG.map((cat) => (
                <CategoryCard
                  key={cat.key}
                  label={cat.key}
                  icon={cat.icon}
                  onPress={() => openCategory(cat.key)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <GameHorizontalList
              title="Recommended for you"
              data={RECOMMENDED_GAMES}
              onPressItem={openSearchResult}
            />
          </View>
        </ScrollView>
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
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4F46E5',
    marginTop: 20,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#7C3AED',
  },
  avatarWrapper: {
    width: 36,
    height: 36,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#E0EAFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarTouchableOverlay: {
    position: 'absolute',
    inset: 0,
  },
  searchBox: {
    borderRadius: 999,
    backgroundColor: '#E0EAFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#94A3B8',
  },
  scrollArea: {
    flex: 1,
    marginTop: 4,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 4,
  },
  resultLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 6,
  },
});
