import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Button, Text, Input } from '../../common/index.js';
import { Icon } from '../../common/index.js';

const LoginForm = ({ navigation, style }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Validation removed per request

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = () => {
    // Navigate directly to MainStack (Home Screen) after login
    navigation.getParent()?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainStack' }],
      })
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Title */}
      <Text variant="headline" style={styles.title}>
        Let's Sign In
      </Text>
      
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
        style={styles.input}
      />
      

      {/* Password Input */}
      <Input
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        icon="padlock"
        secureTextEntry
        showPasswordToggle
        style={styles.input}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#21628A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  
  passwordOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  linkText: {
    fontSize: 14,
    color: '#21628A',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#DE3341',
    height: 50,
    borderRadius: 12,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginForm;
