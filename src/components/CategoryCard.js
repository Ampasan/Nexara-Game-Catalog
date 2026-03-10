import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CATEGORY_COLORS = {
  Action: { card: '#FEF3C7', pill: '#F97316', text: '#7C2D12' },
  RPG: { card: '#E0E7FF', pill: '#4F46E5', text: '#1E1B4B' },
  Strategy: { card: '#CCFBF1', pill: '#06B6D4', text: '#065F46' },
  Music: { card: '#FCE7F3', pill: '#DB2777', text: '#831843' },
  Arcade: { card: '#FFEDD5', pill: '#FB923C', text: '#7C2D12' },
  Casual: { card: '#DCFCE7', pill: '#22C55E', text: '#14532D' },
  default: { card: '#FFFFFF', pill: '#EEF2FF', text: '#0F172A' },
};

export default function CategoryCard({ label, icon, onPress }) {
  const palette = CATEGORY_COLORS[label] || CATEGORY_COLORS.default;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: palette.card },
        pressed && { opacity: 0.9, transform: [{ scale: 0.97 }] },
      ]}
      android_ripple={{ color: '#E5E7EB' }}
    >
      <View style={[styles.iconWrapper, { backgroundColor: palette.pill }]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={[styles.label, { color: palette.text }]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 18,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
});

