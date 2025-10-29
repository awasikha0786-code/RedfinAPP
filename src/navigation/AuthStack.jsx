import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen, ProductTour1Screen, ProductTour2Screen, ProductTour3Screen } from '../screens/onboarding';
import { LoginFormScreen, RegisterScreen, OTPScreen } from '../screens/authentication';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="ProductTour1" component={ProductTour1Screen} />
      <Stack.Screen name="ProductTour2" component={ProductTour2Screen} />
      <Stack.Screen name="ProductTour3" component={ProductTour3Screen} />
      <Stack.Screen name="LoginForm" component={LoginFormScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
