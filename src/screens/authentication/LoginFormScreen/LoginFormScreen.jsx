import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { LoginTopBar, LoginForm, SocialLoginButtons } from '../../../components/authentication';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

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
      
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
          <View style={styles.registerTextContainer}>
            <Text style={styles.registerText}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(32),
  },
  loginForm: {
    paddingTop: verticalScale(20),
  },
  socialButtons: {
    paddingTop: verticalScale(8),
  },
  registerContainer: {
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(20),
  },
  registerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  registerText: {
    fontSize: moderateScale(14),
    color: '#666666',
  },
  registerLink: {
    fontSize: moderateScale(14),
    color: '#21628A',
    fontWeight: '600',
  },
});

export default LoginFormScreen;
