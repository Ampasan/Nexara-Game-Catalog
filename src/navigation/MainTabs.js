import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_BAR_BG = '#FFFFFF';
const TAB_ACTIVE = '#2563EB';
const TAB_INACTIVE = '#94A3B8';

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: TAB_ACTIVE,
        tabBarInactiveTintColor: TAB_INACTIVE,
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: TAB_BAR_BG,
          borderTopColor: '#E2E8F0',
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'HomeTab') iconName = 'home-outline';
          else if (route.name === 'SearchTab') iconName = 'search-outline';
          else if (route.name === 'ProfileTab') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          unmountOnBlur: true,
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('HomeTab', { screen: 'Home' });
          },
        })}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          title: 'Search',
          unmountOnBlur: true,
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('SearchTab', { screen: 'Search' });
          },
        })}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}
