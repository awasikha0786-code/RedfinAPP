import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, FONT_SIZES } from '../../../constants/index';

export interface SkipButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  text?: string;
}

const SkipButton: React.FC<SkipButtonProps> = ({
  onPress,
  style,
  text = 'skip'
}) => {
  return (
    <TouchableOpacity
      style={[styles.skipButton, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.skipButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  skipButton: {
    width: 86,
    height: 38,
    backgroundColor: '#F5F4F8',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    shadowColor: '#10213A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  skipButtonText: {
    color: '#1F4C6B',
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    textTransform: 'lowercase',
    textAlign: 'center',
  },
});

export default SkipButton;
