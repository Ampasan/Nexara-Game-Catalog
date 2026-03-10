import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function TrailerPlayer({ youtubeId }) {
  if (!youtubeId) return null;

  const cleanId = youtubeId.split('&')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trailer</Text>
      <View style={styles.playerWrapper}>
        <YoutubePlayer
          height={210}
          play={false}
          videoId={cleanId}
          webViewStyle={styles.webView}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  playerWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
  },
  webView: {
    opacity: 0.98,
  },
});
