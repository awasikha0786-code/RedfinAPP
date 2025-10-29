import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { COLORS, FONT_SIZES } from '../../../constants/index';

export interface TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: 'headline' | 'subtitle' | 'body' | 'caption';
  color?: string;
}

const Text: React.FC<TextProps> = ({ 
  children, 
  style, 
  variant = 'body',
  color 
}) => {
  return (
    <RNText style={[styles[variant], color && { color }, style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  headline: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: FONT_SIZES.xxl,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: COLORS.text,
  },
  subtitle: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: FONT_SIZES.lg,
    lineHeight: 22,
    letterSpacing: -0.3,
    color: COLORS.text,
  },
  body: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: FONT_SIZES.md,
    lineHeight: 20,
    letterSpacing: 0,
    color: COLORS.text,
  },
  caption: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: FONT_SIZES.sm,
    lineHeight: 18,
    letterSpacing: 0,
    color: COLORS.text,
  },
});

export default Text;
