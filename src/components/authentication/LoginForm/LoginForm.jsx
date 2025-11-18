import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, Input, Icon } from '../../common/index.js';
import { scale, verticalScale } from '../../../utils/layout';

const LoginForm = ({ navigation, style }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);

  const handleLogin = () => {
    navigation.navigate('AddLocation');
  };

  return (
    <View style={[styles.container, style]}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Let’s </Text>
        <Text style={styles.titleHighlight}>Sign In</Text>
      </View>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Access your saved homes and searches.
      </Text>

      {/* Email Input */}
      <Input
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        icon="envelope"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.authInput}
      />
      
      {/* Password Input */}
      <Input
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
       icon="padlock"
        secureTextEntry
        style={styles.authInput}
      />
      
      {/* Password Options */}
      <View style={styles.passwordOptions}>
        <TouchableOpacity onPress={() => console.log('Forgot password')}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Show password')}>
          <Text style={styles.linkText}>Show password</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <Button
        title="Login"
        onPress={handleLogin}
        style={styles.loginButton}
        textStyle={styles.loginButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    gap: scale(2), // words ke darmiyan chhota space
  },
  title: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: scale(25),
    lineHeight: verticalScale(40),
    color: '#1F2A44',
  },
  titleHighlight: {
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: scale(25),
    lineHeight: verticalScale(40),
    color: '#1F4C6B',
  },
  subtitle: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: verticalScale(20),
    letterSpacing: 0.03 * 12,
    color: '#666666',
    marginBottom: verticalScale(32),
   // alignSelf: 'center',
    maxWidth: scale(327), // screen me fit
    //textAlign: 'center',
    flexWrap: 'wrap',
  },
  authInput: {
    width: scale(327),
    height: verticalScale(70),
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: verticalScale(16),
  },
  passwordOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },
  linkText: {
    fontSize: scale(14),
    color: '#21628A',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#DE3341',
    width: scale(278),
    height: verticalScale(63),
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: verticalScale(20),
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: scale(16),
    fontWeight: '600',
  },
});

export default LoginForm;
