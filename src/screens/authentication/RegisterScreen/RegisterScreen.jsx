import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, Input, Icon } from '../../../components/common';

const RegisterScreen = ({ navigation, style }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  // Validation removed per request

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // validate removed

  const handleRegister = () => {
    // Directly navigate to OTP screen without validation
    navigation.navigate('OTP');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <View style={styles.backButtonCircle}>
            <Icon name="backArrow" style={styles.backIcon} />
          </View>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            Start saving homes and searches in one place
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Full Name Input */}
          <Input
            placeholder="Full name"
            value={formData.fullName}
            onChangeText={(value) => handleInputChange('fullName', value)}
            icon="user"
            style={styles.input}
          />
          

          {/* Email Input */}
          <Input
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            icon="envelope"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          

          {/* Password Input */}
          <Input
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            icon="padlock"
            secureTextEntry
            showPasswordToggle
            style={styles.input}
          />
          

          {/* Action Links */}
          <View style={styles.actionLinks}>
            <TouchableOpacity onPress={() => console.log('Terms pressed')}>
              <Text style={styles.linkText}>Terms of service</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Show password')}>
              <Text style={styles.linkText}>Show password</Text>
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <Button
            title="Register"
            onPress={handleRegister}
            style={styles.registerButton}
            textStyle={styles.registerButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#333333',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#21628A',
    marginBottom: 12,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
    textAlign: 'left',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
  
  actionLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#21628A',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#DE3341',
    height: 56,
    borderRadius: 12,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RegisterScreen;
