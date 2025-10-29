import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { SkipButton } from '../SkipButton';

export interface ProductTourHeaderProps {
  onSkipPress: () => void;
  style?: ViewStyle;
}

const ProductTourHeader: React.FC<ProductTourHeaderProps> = ({
  onSkipPress,
  style
}) => {
  return (
    <View style={[styles.header, style]}>
      {/* Redfin Logo */}
      <Image 
        source={require('../../../assets/icons/splash_icon.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Skip Button */}
      <SkipButton 
        onPress={onSkipPress}
        style={styles.skipButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    paddingTop: 50,
    paddingBottom: 20,
    paddingRight: 20,
  },
  logo: {
    width: 96,
    height: 19,
    position: 'absolute',
    top: 46,
    left: 24,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    zIndex: 2,
  },
  skipButton: {
    position: 'absolute',
    top: 37,
    left: 265,
    width: 86,
    height: 38,
    borderRadius: 100,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
});

export default ProductTourHeader;
