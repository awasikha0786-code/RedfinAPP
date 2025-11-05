import React from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../components/common/Button';
import { COLORS, BUTTON_SIZES } from '../../../constants/index';

interface SplashScreenProps {
  navigation: any; // TODO: Add proper navigation type
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const handleBeginPress = () => {
    navigation.navigate('ProductTour1');
  };

  // Logo scales relative to screen width with a sane min/max
  const logoWidth = Math.max(160, Math.min(width * 0.6, 280));
  const logoHeight = logoWidth * 0.2; // maintain typical wide logo aspect

  return (
    <View style={styles.splashContainer}>
      <ImageBackground
        source={require('../../../../android/app/src/main/res/drawable/splash_image.png')}
        style={StyleSheet.absoluteFillObject as any}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { backgroundColor: COLORS.overlay }]} />
      </ImageBackground>

      {/* Centered logo + caption */}
      <View style={styles.centerBlock}>
        <Image
          source={require('../../../assets/icons/splash_icon.png')}
          style={{ width: logoWidth, height: logoHeight }}
          resizeMode="contain"
        />
        <Text style={styles.poweredByText}>Powered by Rocket</Text>
      </View>

      {/* Bottom button with safe-area padding */}
      <View style={[styles.bottomBlock, { paddingBottom: Math.max(16, insets.bottom + 16) }]}>
        <Button
          title="lets begin"
          onPress={handleBeginPress}
          style={{ width: BUTTON_SIZES.large.width, height: BUTTON_SIZES.large.height }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bottomBlock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  poweredByText: {
    fontFamily: 'System',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.54,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 8,
  },
});

export default SplashScreen;
