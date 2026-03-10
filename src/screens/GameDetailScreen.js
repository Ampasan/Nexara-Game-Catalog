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

export default function GameDetailScreen({ route, navigation }) {
  const { gameId } = route.params || {};

  const game = useMemo(
    () => games.find((g) => g.id === String(gameId)),
    [gameId],
  );

  const [installed, setInstalled] = useState(false);
  const [userRating, setUserRating] = useState(game?.rating || 0);

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
          <Text style={styles.missingText}>Game not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const effectiveRating = userRating || game.rating;

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
            <Text style={styles.developer}>{game.developer}</Text>
            <View style={styles.metaRow}>
              <RatingStars
                value={effectiveRating}
                ratingCount={game.ratingCount}
                size={14}
              />
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          {installed ? (
            <>
              <ButtonGame
                label="Play"
                variant="primary"
                onPress={() => {}}
                style={styles.actionButton}
              />
              <ButtonGame
                label="Uninstall"
                variant="secondary"
                onPress={() => setInstalled(false)}
                style={styles.actionButton}
              />
            </>
          ) : (
            <>
              <ButtonGame
                label="Install"
                variant="primary"
                onPress={() => setInstalled(true)}
                style={styles.actionButton}
              />
              <ButtonGame
                label="Cancel"
                variant="secondary"
                onPress={() => navigation.goBack()}
                style={styles.actionButton}
              />
            </>
          )}
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoTile}>
            <Text style={styles.infoLabel}>Genre</Text>
            <Text style={styles.infoValue}>{game.genre}</Text>
          </View>
          <View style={styles.infoTile}>
            <Text style={styles.infoLabel}>Download size</Text>
            <Text style={styles.infoValue}>{game.size}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this game</Text>
          <Text style={styles.description}>{game.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your rating</Text>
          <RatingStars
            value={userRating}
            size={22}
            showCount={false}
            interactive
            onChange={setUserRating}
          />
          <Text style={styles.userRatingHint}>
            Tap the stars to rate this game.
          </Text>
        </View>

        <TrailerPlayer youtubeId={game.trailerYoutubeId} />

        <ScreenshotGallery screenshots={game.screenshots} />

        {similarGames.length > 0 && (
          <View style={styles.section}>
            <GameHorizontalList
              title="You might also like"
              data={similarGames}
              onPressItem={(item) =>
                navigation.push(route.name, { gameId: item.id })
              }
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
    marginBottom: 16,
  },
  icon: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: '#E0EAFF',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 14,
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
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginRight: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoTile: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 12,
    marginRight: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: '#6B21A8',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
  },
  userRatingHint: {
    marginTop: 6,
    fontSize: 11,
    color: '#6B7280',
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
