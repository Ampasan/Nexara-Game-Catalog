import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

const NexaraTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F7FA',
    card: '#FFFFFF',
    primary: '#2563EB',
    text: '#0F172A',
    border: '#E2E8F0',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={NexaraTheme}>
        <StatusBar style="dark" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
