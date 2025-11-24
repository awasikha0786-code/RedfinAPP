import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, Input, Icon } from '../../../components/common';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

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
        contentContainerStyle={styles.scrollContent}
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
  scrollContent: {
    paddingBottom: verticalScale(40),
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(20),
    left: scale(20),
    zIndex: 1,
  },
  backButtonCircle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
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
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(150),
    paddingBottom: verticalScale(48),
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: '700',
    color: '#21628A',
    marginBottom: verticalScale(20),
    textAlign: 'left',
    lineHeight: moderateScale(38),
    paddingTop: 4,
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: '#666666',
    lineHeight: verticalScale(22),
    letterSpacing: 0.3,
    textAlign: 'left',
  },
  formContainer: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(12),
  },
  input: {
    marginBottom: verticalScale(20),
  },
  
  actionLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(32),
    paddingHorizontal: 4,
  },
  linkText: {
    fontSize: moderateScale(14),
    color: '#21628A',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#DE3341',
    height: verticalScale(56),
    borderRadius: scale(12),
    marginBottom: verticalScale(24),
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default RegisterScreen;
