import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from '../../../components/common/Button';
import { COLORS, BUTTON_SIZES } from '../../../constants/index';

interface SplashScreenProps {
  navigation: any; // TODO: Add proper navigation type
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const handleBeginPress = () => {
    navigation.navigate('ProductTour1');
  };

  return (
    <View style={styles.splashContainer}>
      {/* Background Image */}
      <Image 
        source={require('../../../../android/app/src/main/res/drawable/splash_image.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Overlay */}
      <View style={styles.overlay} />
      
      {/* Splash Icon */}
      <Image 
        source={require('../../../assets/icons/splash_icon.png')} 
        style={styles.splashIcon}
        resizeMode="contain"
      />
      
      {/* Powered by Rocket Text */}
      <Text style={styles.poweredByText}>Powered by Rocket</Text>
      
      {/* Lets Begin Button */}
      <Button
        title="lets begin"
        onPress={handleBeginPress}
        style={styles.beginButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay, // Using constants
  },
  splashIcon: {
    width: 196,
    height: 39,
    position: 'absolute',
    top: 375,
    left: 86,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    zIndex: 2,
  },
  poweredByText: {
    fontFamily: 'System',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 18, // 100% of font size
    letterSpacing: -0.54, // -3% of font size (18 * -0.03)
    textAlign: 'center',
    color: '#ffffff',
    position: 'absolute',
    top: 410, // Positioned below the splash icon
    left: 55,
    right: 0,
    zIndex: 2,
  },
  beginButton: {
    width: BUTTON_SIZES.large.width,
    height: BUTTON_SIZES.large.height,
    position: 'absolute',
    top: 640,
    left: 92,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    zIndex: 2,
  },
});

export default SplashScreen;
