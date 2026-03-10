import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import RatingStars from './RatingStars';

export default function GameCard({ game, onPress, compact = false }) {
  if (!game) return null;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, compact && styles.compactCard]}
      android_ripple={{ color: '#E5E7EB' }}
    >
      <Image source={{ uri: game.icon }} style={styles.icon} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {game.title}
        </Text>
        <Text numberOfLines={1} style={styles.developer}>
          {game.developer}
        </Text>
        <View style={styles.metaRow}>
          <RatingStars
            value={game.rating}
            ratingCount={game.ratingCount}
            size={12}
            showCount={false}
          />
          <Text style={styles.genreText} numberOfLines={1}>
            {game.genre}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    width: 260,
  },
  compactCard: {
    width: 360,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#E0EAFF',
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  developer: {
    fontSize: 12,
    color: '#6B21A8',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  genreText: {
    marginLeft: 8,
    fontSize: 11,
    color: '#4F46E5',
  },
});
