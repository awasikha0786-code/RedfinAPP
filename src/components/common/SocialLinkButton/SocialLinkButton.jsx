import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_WIDTH = Math.min(158.5, SCREEN_WIDTH / 2 - 32);
const BUTTON_HEIGHT = Math.min(70, SCREEN_WIDTH * 0.22);

const SocialLinkButton = ({ 
  provider, // 'google' or 'facebook'
  isLinked, // true if already linked
  onPress,
  style,
}) => {
  const getIconSource = () => {
    if (provider === 'google') {
      return require('../../../assets/icons/google.png');
    } else if (provider === 'facebook') {
      return require('../../../assets/icons/facebook.png');
    }
    return null;
  };

  const getButtonStyle = () => {
    if (provider === 'google' && isLinked) {
      return styles.buttonLinked; // Teal for linked Google
    }
    return styles.buttonUnlinked; // Gray for unlinked
  };

  const getTextStyle = () => {
    if (provider === 'google' && isLinked) {
      return styles.textLinked; // White text for linked
    }
    return styles.textUnlinked; // Dark blue text for unlinked
  };

  const getButtonText = () => {
    return isLinked ? 'Unlink' : 'Link';
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={getIconSource()}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={getTextStyle()}>{getButtonText()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonLinked: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#21628A', // Teal color for linked Google
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonUnlinked: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F4F8', // Light gray for unlinked
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  textLinked: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  textUnlinked: {
    fontSize: 16,
    fontWeight: '600',
    color: '#14233A', // Dark blue
  },
});

export default SocialLinkButton;

