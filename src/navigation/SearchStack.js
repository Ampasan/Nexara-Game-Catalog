import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import GameDetailScreen from '../screens/GameDetailScreen';
import CategoryResultScreen from '../screens/CategoryResultScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchResultsListScreen from '../screens/SearchResultsListScreen';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'left',
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameDetailFromSearch"
        component={GameDetailScreen}
        options={{ title: 'Game details' }}
      />
      <Stack.Screen
        name="CategoryResult"
        component={CategoryResultScreen}
        options={{ title: 'Category' }}
      />
      <Stack.Screen
        name="SearchResultsList"
        component={SearchResultsListScreen}
        options={{ title: 'Search results' }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{ title: 'Search result' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
