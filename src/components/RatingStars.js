import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RatingStars({
  value,
  ratingCount,
  size = 14,
  showCount = true,
  interactive = false,
  onChange,
}) {
  const stars = [];

  for (let i = 1; i <= 5; i += 1) {
    let iconName = 'star-outline';
    if (value >= i) {
      iconName = 'star';
    } else if (value >= i - 0.5) {
      iconName = 'star-half';
    }

    const star = (
      <Pressable
        key={i}
        disabled={!interactive}
        onPress={() => {
          if (interactive && onChange) {
            onChange(i);
          }
        }}
        style={styles.starPressable}
        hitSlop={8}
      >
        <Ionicons
          name={iconName}
          size={size}
          color="#FACC15"
          style={styles.starIcon}
        />
      </Pressable>
    );

    stars.push(star);
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>{stars}</View>
      {showCount && typeof ratingCount !== 'undefined' && (
        <Text style={styles.countText}>
          {value.toFixed(1)} ·{' '}
          {Intl.NumberFormat('en', { notation: 'compact' }).format(
            ratingCount,
          )}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starPressable: {
    marginRight: 2,
  },
  starIcon: {
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  countText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#64748B',
  },
});
