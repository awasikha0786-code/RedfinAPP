import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#21628A', // Teal color for linked Google
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  buttonUnlinked: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F4F8', // Light gray for unlinked
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  textLinked: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  textUnlinked: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14233A', // Dark blue
  },
});

export default SocialLinkButton;

