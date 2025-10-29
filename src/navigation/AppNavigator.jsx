import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="AuthStack"
      >
        {/* Keep both stacks registered so we can navigate between them */}
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        <RootStack.Screen name="MainStack" component={MainStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
