import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import games from '../data/game.json';
import RatingStars from '../components/RatingStars';
import ButtonGame from '../components/ButtonGame';
import TrailerPlayer from '../components/TrailerPlayer';
import ScreenshotGallery from '../components/ScreenshotGallery';
import GameHorizontalList from '../components/GameHorizontalList';

export default function SearchResultScreen({ route, navigation }) {
  const { gameId } = route.params || {};

  const game = useMemo(
    () => games.find((g) => g.id === String(gameId)),
    [gameId],
  );

  const [installed, setInstalled] = useState(false);

  const similarGames = useMemo(() => {
    if (!game) return [];
    return games.filter(
      (g) =>
        g.id !== game.id &&
        g.categories?.some((c) => game.categories?.includes(c)),
    );
  }, [game]);

  if (!game) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.missingContainer}>
          <Text style={styles.missingText}>
            Game not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const shortDescription =
    game.description.length > 120
      ? `${game.description.slice(0, 120)}…`
      : game.description;

  const openDetail = (item) => {
    navigation.navigate('GameDetailFromSearch', { gameId: item.id });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Image source={{ uri: game.icon }} style={styles.icon} />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{game.title}</Text>
            <Text style={styles.developer}>
              {game.developer}
            </Text>
            <View style={styles.metaRow}>
              <RatingStars
                value={game.rating}
                ratingCount={game.ratingCount}
                size={14}
              />
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <ButtonGame
            label={installed ? 'Uninstall' : 'Install'}
            variant={installed ? 'secondary' : 'primary'}
            onPress={() => setInstalled((prev) => !prev)}
            style={styles.actionButton}
          />
          <ButtonGame
            label="Details"
            variant="secondary"
            onPress={() => navigation.navigate('GameDetailFromSearch', { gameId })}
            style={[styles.actionButton, styles.lastActionButton]}
          />
        </View>

        <Text style={styles.shortDescription}>
          {shortDescription}
        </Text>

        <TrailerPlayer youtubeId={game.trailerYoutubeId} />

        <ScreenshotGallery screenshots={game.screenshots} />

        {similarGames.length > 0 && (
          <View style={styles.section}>
            <GameHorizontalList
              title="Recommended for you"
              data={similarGames}
              onPressItem={openDetail}
            />
          </View>
        )}
      </ScrollView>
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
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    marginRight: 8,
  },
  lastActionButton: {
    marginRight: 0,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#E0EAFF',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4F46E5',
  },
  developer: {
    fontSize: 13,
    color: '#7C3AED',
    marginTop: 4,
  },
  metaRow: {
    marginTop: 6,
  },
  shortDescription: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
  },
  section: {
    marginTop: 20,
  },
  missingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

