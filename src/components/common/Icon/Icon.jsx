import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icon = ({ name, style, size = 24, color = '#21628A' }) => {
  const getIconSource = () => {
    switch (name) {
      case 'envelope':
        return require('../../../assets/icons/Email.png');
      case 'padlock':
        return require('../../../assets/icons/Lock.png');
      case 'user':
        return require('../../../assets/icons/name.png');
      case 'eye':
        return require('../../../assets/icons/arrow.png'); // Using arrow as eye
      case 'eye-off':
        return require('../../../assets/icons/arrow.png'); // Using arrow as eye-off
      case 'google':
        return require('../../../assets/icons/google.png');
      case 'facebook':
        return require('../../../assets/icons/facebook.png');
      case 'arrow':
        return require('../../../assets/icons/arrow.png');
      case 'backArrow':
        return require('../../../assets/icons/backArro.png');
      case 'timer':
        return require('../../../assets/icons/Timer.png');
      case 'splash':
        return require('../../../assets/icons/splash_icon.png');
      case 'phone':
        return require('../../../assets/icons/Call.png');
      default:
        return require('../../../assets/icons/arrow.png');
    }
  };

  return (
    <Image
      source={getIconSource()}
      style={[
        styles.icon,
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default Icon;
