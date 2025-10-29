import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { LoginTopBar, LoginForm, SocialLoginButtons } from '../../../components/authentication/index.js';

const LoginFormScreen = ({ navigation }) => {
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleGoogleLogin = () => {
    navigation.navigate('MainStack');
  };

  const handleFacebookLogin = () => {
    navigation.navigate('MainStack');
  };

  return (
    <View style={styles.container}>
      {/* Header with Illustration */}
      <LoginTopBar />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Login Form */}
        <LoginForm
          navigation={navigation}
          style={styles.loginForm}
        />
        
        {/* Social Login Buttons */}
        <SocialLoginButtons
          onGooglePress={handleGoogleLogin}
          onFacebookPress={handleFacebookLogin}
          style={styles.socialButtons}
        />
        
        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  loginForm: {
    paddingTop: 20,
  },
  socialButtons: {
    paddingTop: 0,
  },
  registerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  registerLink: {
    fontSize: 14,
    color: '#21628A',
    fontWeight: '600',
  },
});

export default LoginFormScreen;
