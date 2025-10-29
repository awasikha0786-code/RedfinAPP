import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, Input } from '../../common/index.js';
import { Icon } from '../../common/index.js';

const LoginForm = ({ navigation, style }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validate = () => {
    const newErrors = { email: '', password: '' };
    const emailRegex = /^\S+@\S+\.[A-Za-z]{2,}$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleLogin = () => {
    if (!validate()) {
      return;
    }
    // Navigate to main stack after successful login
    navigation.navigate('MainStack');
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
        style={[styles.input, errors.email ? styles.inputError : null]}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      {/* Password Input */}
      <Input
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        icon="padlock"
        secureTextEntry
        showPasswordToggle
        style={[styles.input, errors.password ? styles.inputError : null]}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

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
  inputError: {
    borderColor: '#DE3341',
  },
  errorText: {
    color: '#DE3341',
    marginTop: -12,
    marginBottom: 12,
    fontSize: 12,
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
