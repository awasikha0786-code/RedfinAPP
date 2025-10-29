// Common types for the application
export interface ScreenProps {
  navigation?: any; // Will be properly typed when navigation is implemented
}

// Button related types
export interface ButtonVariant {
  primary: string;
  secondary: string;
  danger: string;
}

// Theme types for future theming system
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}
