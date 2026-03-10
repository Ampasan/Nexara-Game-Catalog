import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function ButtonGame({
  label,
  onPress,
  variant = 'primary',
  style,
}) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        style,
      ]}
      android_ripple={{ color: isPrimary ? '#4F46E5' : '#E5E7EB' }}
    >
      <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#6366F1',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C4B5FD',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  labelPrimary: {
    color: '#FFFFFF',
  },
  labelSecondary: {
    color: '#4F46E5',
  },
});
