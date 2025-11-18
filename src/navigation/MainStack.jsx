import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import { HomeScreen, NewListingsAlertScreen, TopLocationsScreen, SearchResultsScreen, SearchResultFilterScreen, NotificationScreen, ChatScreen, MapScreen, LocationDetailScreen, DrawMapScreen, FavoritesScreen, PropertyDetailScreen, PropertyReviewsScreen, PropertyReviewMediaScreen, PropertyMapOverviewScreen, PropertyVirtualTourScreen, ProfileScreen, EditProfileScreen, EditListingScreen, AddPaymentMethodScreen, PaymentMethodDetailsScreen, PaymentConfigScreen, AddListingScreen, AddListingLocationScreen, AddListingPhotosScreen, AddListingDetailsScreen, PropertyRecommendationScreen, TopAgentsScreen, AgentProfileScreen, FeaturedHomesScreen, FeaturedHomesFilterScreen, TransactionDetailScreen, TransactionReviewScreen, TransactionSummaryScreen, AddReviewScreen } from '../screens/main';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Using custom PNG icons from src/assets/icons

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Preload icon assets with static requires so Metro can bundle them
const ICONS = {
  Home: {
    active: require('../assets/icons/Home.png'),
    inactive: require('../assets/icons/Home.png'),
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

const TabIcon = ({ source, color, focused }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Image
      source={source}
      style={{ width: 24, height: 24, tintColor: color, opacity: focused ? 1 : 0.85 }}
      resizeMode="contain"
    />
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 4,
        backgroundColor: focused ? color : 'transparent',
      }}
    />
  </View>
);

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
        return <TabIcon source={source} color={color} focused={focused} />;
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
    <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
    <Stack.Screen name="PropertyReviews" component={PropertyReviewsScreen} />
    <Stack.Screen name="PropertyReviewMedia" component={PropertyReviewMediaScreen} />
    <Stack.Screen name="PropertyMapOverview" component={PropertyMapOverviewScreen} />
    <Stack.Screen name="PropertyVirtualTour" component={PropertyVirtualTourScreen} />
    <Stack.Screen name="PropertyRecommendation" component={PropertyRecommendationScreen} />
    <Stack.Screen name="FeaturedHomes" component={FeaturedHomesScreen} />
    <Stack.Screen name="FeaturedHomesFilter" component={FeaturedHomesFilterScreen} />
    <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
    <Stack.Screen name="TransactionReview" component={TransactionReviewScreen} />
    <Stack.Screen name="TransactionSummary" component={TransactionSummaryScreen} />
    <Stack.Screen name="AddReview" component={AddReviewScreen} />
    <Stack.Screen name="TopAgents" component={TopAgentsScreen} />
    <Stack.Screen name="AgentProfile" component={AgentProfileScreen} />
    <Stack.Screen name="DrawMap" component={DrawMapScreen} />
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="AddListing" component={AddListingScreen} />
    <Stack.Screen name="AddListingLocation" component={AddListingLocationScreen} />
    <Stack.Screen name="AddListingPhotos" component={AddListingPhotosScreen} />
    <Stack.Screen name="AddListingDetails" component={AddListingDetailsScreen} />
    <Stack.Screen name="EditListing" component={EditListingScreen} />
    <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
    <Stack.Screen name="PaymentMethodDetails" component={PaymentMethodDetailsScreen} />
    <Stack.Screen name="PaymentConfig" component={PaymentConfigScreen} />
  </Stack.Navigator>
);

export default MainStack;
