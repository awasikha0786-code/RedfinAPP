import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { HomeScreen, NewListingsAlertScreen, TopLocationsScreen, SearchResultsScreen, SearchResultFilterScreen, NotificationScreen, ChatScreen, MapScreen, LocationDetailScreen, FavoritesScreen, ProfileScreen, EditProfileScreen } from '../screens/main';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Using custom PNG icons from src/assets/icons

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Preload icon assets with static requires so Metro can bundle them
const ICONS = {
  Home: {
    active: require('../assets/icons/House - Active.png'),
    inactive: require('../assets/icons/House - Active.png'), // fallback to same if inactive not provided
  },
  Search: {
    active: require('../assets/icons/search.png'),
    inactive: require('../assets/icons/search.png'),
  },
  Favorites: {
    active: require('../assets/icons/Heart.png'),
    inactive: require('../assets/icons/Heart.png'),
  },
  Profile: {
    active: require('../assets/icons/Profile.png'),
    inactive: require('../assets/icons/Profile.png'),
  },
};

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#1B516B',
      tabBarInactiveTintColor: '#9AA4B2',
      tabBarStyle: { height: 56, paddingBottom: 6, backgroundColor: '#FFFFFF' },
      tabBarIcon: ({ color, focused }) => {
        const pack = ICONS[route.name];
        const source = focused ? pack.active : pack.inactive;
        return (
          <Image
            source={source}
            style={{ width: 24, height: 24, tintColor: color, opacity: focused ? 1 : 0.85 }}
            resizeMode="contain"
          />
        );
      },
    })}
    initialRouteName="Home"
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchResultsScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="NewListingsAlert" component={NewListingsAlertScreen} />
    <Stack.Screen name="TopLocations" component={TopLocationsScreen} />
    <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
    <Stack.Screen name="SearchResultFilter" component={SearchResultFilterScreen} />
    <Stack.Screen name="Map" component={MapScreen} />
    <Stack.Screen name="LocationDetail" component={LocationDetailScreen} />
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  </Stack.Navigator>
);

export default MainStack;
