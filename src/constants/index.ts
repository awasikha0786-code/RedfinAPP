// Application constants

export const COLORS = {
  primary: '#DE3341',
  secondary: '#21628A',
  background: '#ffffff',
  text: '#000000',
  overlay: '#21628ACC',
  white: '#ffffff',
  black: '#000000',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
} as const;

export const BUTTON_SIZES = {
  small: {
    width: 120,
    height: 40,
  },
  medium: {
    width: 150,
    height: 48,
  },
  large: {
    width: 190,
    height: 54,
  },
} as const;
