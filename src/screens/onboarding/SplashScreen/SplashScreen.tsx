import React from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../components/common/Button';
import { COLORS, BUTTON_SIZES } from '../../../constants/index';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';

interface SplashScreenProps {
  navigation: any; // TODO: Add proper navigation type
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const handleBeginPress = () => {
    navigation.navigate('ProductTour1');
  };

  const logoWidth = Math.max(scale(150), Math.min(width * 0.52, scale(220)));
  const logoHeight = logoWidth * 0.2;
  const poweredByFontSize = Math.max(moderateScale(14), Math.min(18, width * 0.045));
  const poweredByLetterSpacing = -(poweredByFontSize * 0.03);
  const poweredByMarginTop = Math.max(verticalScale(3), Math.min(verticalScale(12), height * 0.01));
  const buttonWidth = Math.max(scale(BUTTON_SIZES.large.width), Math.min(responsiveWidth(70), scale(260)));
  const buttonHeight = Math.max(verticalScale(BUTTON_SIZES.large.height), Math.min(verticalScale(64), verticalScale(68)));
  const beginButtonFontSize = Math.max(moderateScale(16), Math.min(18, width * 0.042));
  const versionFontSize = Math.max(moderateScale(11), Math.min(14, width * 0.03));
  const contentHorizontalPadding = Math.max(scale(20), responsiveWidth(8));

  return (
    <View style={styles.splashContainer}>
      <ImageBackground
        source={require('../../../../android/app/src/main/res/drawable/splash_image.png')}
        style={StyleSheet.absoluteFillObject as any}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(33, 98, 138, 0)', 'rgba(33, 98, 138, 0.75)', '#1F4C6B']}
          locations={[0.05, 0.55, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      <View
        style={[
          styles.contentWrapper,
          {
            paddingTop: insets.top + verticalScale(56),
            paddingBottom: Math.max(verticalScale(24), insets.bottom + verticalScale(16)),
            paddingHorizontal: contentHorizontalPadding,
          },
        ]}
      >
        <View style={styles.logoBlock}>
          <Image
            source={require('../../../assets/icons/splash_icon.png')}
            style={[styles.logo, { width: logoWidth, height: logoHeight }]}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.poweredByText,
              {
                fontSize: poweredByFontSize,
                letterSpacing: poweredByLetterSpacing,
                marginTop: poweredByMarginTop,
              },
            ]}
          >
            Powered by Rocket
          </Text>
        </View>

        <View style={styles.buttonBlock}>
          <Button
            title="let's begin"
            onPress={handleBeginPress}
            style={[
              styles.beginButton,
              {
                width: buttonWidth,
                height: buttonHeight,
                borderRadius: scale(18),
              },
            ]}
            textStyle={[
              styles.beginButtonText,
              {
                fontSize: beginButtonFontSize,
              },
            ]}
          />
          <Text style={[styles.versionText, { fontSize: versionFontSize }]}>Version 2.1.9</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  logoBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: scale(196),
    height: scale(39),
  },
  buttonBlock: {
    width: '100%',
    alignItems: 'center',
  },
  beginButton: {
    width: BUTTON_SIZES.large.width,
    height: BUTTON_SIZES.large.height,
    borderRadius: scale(18),
    backgroundColor: '#DE3341',
  },
  beginButtonText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 16,
  },
  poweredByText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#ffffff',
    marginLeft: scale(12),
  },
  versionText: {
    marginTop: 24,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.65)',
    letterSpacing: 1,
  },
});

export default SplashScreen;
