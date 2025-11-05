import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../components/common/ScreenHeader/ScreenHeader';
import Input from '../../../components/common/Input/Input';
import SocialLinkButton from '../../../components/common/SocialLinkButton/SocialLinkButton';
import Button from '../../../components/common/Button/Button';
import OTPVerificationBottomSheet from '../../../components/common/buttomSheet/OTPVerificationBottomSheet';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const EditProfileScreen = ({ navigation, route }) => {
  // Get user data from route params or use default
  const userData = route?.params?.userData || {
    name: 'Mathew Adam',
    phone: '+62 112-3288-9111',
    email: 'Mathew@email.com',
    profileImage: require('../../../assets/images/Avator_img.png'),
    googleLinked: true,
    facebookLinked: false,
  };

  const [formData, setFormData] = useState({
    name: userData.name,
    phone: userData.phone,
    email: userData.email,
  });

  const [socialLinks, setSocialLinks] = useState({
    google: userData.googleLinked || false,
    facebook: userData.facebookLinked || false,
  });

  const [showOTPSheet, setShowOTPSheet] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkPress = (provider) => {
    // If unlinking, directly toggle
    if (socialLinks[provider]) {
      setSocialLinks((prev) => ({
        ...prev,
        [provider]: false,
      }));
    } else {
      // If linking, show OTP verification
      setSelectedProvider(provider);
      setShowOTPSheet(true);
    }
  };

  const handleOTPVerify = (otpCode) => {
    console.log(`Verifying OTP for ${selectedProvider}:`, otpCode);
    // API call to verify OTP and link account
    // On success:
    if (selectedProvider) {
      setSocialLinks((prev) => ({
        ...prev,
        [selectedProvider]: true,
      }));
    }
    setShowOTPSheet(false);
    setSelectedProvider(null);
  };

  const handleChooseLocation = () => {
    console.log('Choose location pressed');
    // Navigate to location selection screen if needed
  };

  const handleSave = () => {
    console.log('Save profile:', formData);
    // Handle save logic here
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScreenHeader onBackPress={handleBack} title="Edit Profile" />

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture Section */}
        <View style={styles.profileImageContainer}>
          <Image 
            source={userData.profileImage} 
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Input Fields Section */}
        <View style={styles.inputsSection}>
          <Input
            placeholder="Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            icon="user"
            style={styles.input}
          />
          <Input
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            icon="phone"
            style={styles.input}
            keyboardType="phone-pad"
          />
          <Input
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            icon="envelope"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Social Media Linking Section */}
        <View style={styles.socialSection}>
          <SocialLinkButton
            provider="google"
            isLinked={socialLinks.google}
            onPress={() => handleSocialLinkPress('google')}
          />
          <SocialLinkButton
            provider="facebook"
            isLinked={socialLinks.facebook}
            onPress={() => handleSocialLinkPress('facebook')}
          />
        </View>

        {/* Choose Location Button */}
        <View style={styles.locationButtonContainer}>
          <Button
            title="Choose location"
            onPress={handleChooseLocation}
            style={styles.locationButton}
            textStyle={styles.locationButtonText}
          />
        </View>
      </ScrollView>

      {/* OTP Verification Bottom Sheet */}
      <OTPVerificationBottomSheet
        visible={showOTPSheet}
        onClose={() => {
          setShowOTPSheet(false);
          setSelectedProvider(null);
        }}
        onVerify={handleOTPVerify}
        phoneNumber={formData.phone || '+92 •••• ••9123'}
        initialSeconds={21}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(24),
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(32),
  },
  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: Platform.OS === 'ios' ? 4 : 3,
    borderColor: '#FFFFFF',
  },
  inputsSection: {
    marginBottom: verticalScale(24),
  },
  input: {
    marginBottom: verticalScale(16),
  },
  socialSection: {
    flexDirection: 'row',
    marginBottom: verticalScale(32),
  },
  locationButtonContainer: {
    marginBottom: verticalScale(24),
  },
  locationButton: {
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(20),
  },
  locationButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    textTransform: 'none', // Override lowercase from Button component
  },
});

export default EditProfileScreen;

