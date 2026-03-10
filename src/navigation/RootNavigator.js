import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import GameDetailScreen from '../screens/GameDetailScreen';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen
        name="GameDetail"
        component={GameDetailScreen}
        options={{
          headerShown: true,
          title: 'Game details',
        }}
      />
    </RootStack.Navigator>
  );
}
