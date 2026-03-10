import React, { useMemo, useState, useCallback, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import GameHorizontalList from '../components/GameHorizontalList';
import RatingStars from '../components/RatingStars';
import ButtonGame from '../components/ButtonGame';
import games from '../data/game.json';

export default function HomeScreen({ navigation }) {
  const featuredGames = games.filter((g) => g.featured);
  const trendingGames = games.filter((g) => g.trending);
  const newReleaseGames = games.filter((g) => g.newRelease);

  const [installed, setInstalled] = useState({});

  const bannerGames = useMemo(
    () =>
      games.filter((g) =>
        ['1', '9', '8'].includes(String(g.id)),
      ),
    [],
  );

  const scrollRef = useRef(null);
  const bannerScrollRef = useRef(null);
  const [resetKey, setResetKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: false });
      }
      if (bannerScrollRef.current) {
        bannerScrollRef.current.scrollTo({ x: 0, animated: false });
      }
      setResetKey((prev) => prev + 1);
    }, []),
  );

  const toggleInstall = (id) => {
    setInstalled((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openDetail = (game) => {
    navigation.navigate('GameDetailFromHome', { gameId: game.id });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.appTitle}>Nexara</Text>
            <Text style={styles.subtitle}>
              Your Game Discovery Hub
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

        <ScrollView
          ref={bannerScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannerRow}
        >
          {bannerGames.map((game) => {
            const bannerImage = game.banner || game.screenshots?.[0];
            const shortDescription =
              game.description.length > 90
                ? `${game.description.slice(0, 90)}…`
                : game.description;
            const isInstalled = installed[game.id];

            return (
              <View key={game.id} style={styles.bannerCard}>
                {bannerImage && (
                  <ImageBackground
                    source={{ uri: bannerImage }}
                    style={styles.bannerImage}
                    imageStyle={styles.bannerImageInner}
                  >
                    <View style={styles.bannerOverlay} />
                  </ImageBackground>
                )}
                <View style={styles.bannerContent}>
                  <View style={styles.bannerTopRow}>
                    <Image
                      source={{ uri: game.icon }}
                      style={styles.bannerIcon}
                    />
                    <View style={styles.bannerTextWrapper}>
                      <Text
                        style={styles.bannerTitle}
                        numberOfLines={1}
                      >
                        {game.title}
                      </Text>
                      <Text
                        style={styles.bannerDeveloper}
                        numberOfLines={1}
                      >
                        {game.developer}
                      </Text>
                      <RatingStars
                        value={game.rating}
                        ratingCount={game.ratingCount}
                        size={13}
                        showCount={false}
                      />
                    </View>
                  </View>
                  <Text
                    style={styles.bannerDescription}
                    numberOfLines={2}
                  >
                    {shortDescription}
                  </Text>
                  <View style={styles.bannerButtonsRow}>
                    <ButtonGame
                      label={isInstalled ? 'Uninstall' : 'Install'}
                      variant={isInstalled ? 'secondary' : 'primary'}
                      onPress={() => toggleInstall(game.id)}
                      style={styles.bannerButton}
                    />
                    <ButtonGame
                      label="Details"
                      variant="secondary"
                      onPress={() =>
                        navigation.navigate('GameDetailFromHome', {
                          gameId: game.id,
                        })
                      }
                      style={styles.bannerButton}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <GameHorizontalList
          listKey={`featured-${resetKey}`}
          title="Featured games"
          data={featuredGames}
          onPressItem={openDetail}
        />
        <GameHorizontalList
          listKey={`trending-${resetKey}`}
          title="Trending now"
          data={trendingGames}
          onPressItem={openDetail}
        />
        <GameHorizontalList
          listKey={`new-${resetKey}`}
          title="New releases"
          data={newReleaseGames}
          onPressItem={openDetail}
        />
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
    paddingBottom: 24,
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#4F46E5',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#7C3AED',
  },
  avatarWrapper: {
    width: 40,
    height: 40,
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
  bannerRow: {
    paddingVertical: 4,
  },
  bannerCard: {
    width: 320,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  bannerImage: {
    width: '100%',
    height: 140,
  },
  bannerImageInner: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(79, 70, 229, 0.18)',
  },
  bannerContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  bannerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bannerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#E0EAFF',
  },
  bannerTextWrapper: {
    marginLeft: 10,
    flex: 1,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  bannerDeveloper: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 2,
  },
  bannerDescription: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  bannerButtonsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  bannerButton: {
    flex: 1,
    marginRight: 6,
  },
});
