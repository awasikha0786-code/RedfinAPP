import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scaleSize = (size: number): number => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const scaleVerticalSize = (size: number): number => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Scale size horizontally based on the current screen width.
 */
export const scale = (size: number): number => Math.round(PixelRatio.roundToNearestPixel(scaleSize(size)));

/**
 * Scale size vertically based on the current screen height.
 */
export const verticalScale = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel(scaleVerticalSize(size)));

/**
 * Moderately scale size to avoid aggressive scaling on larger screens.
 */
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

/**
 * Get percentage based width.
 */
export const responsiveWidth = (percentage: number): number =>
  Math.round((SCREEN_WIDTH * percentage) / 100);

/**
 * Get percentage based height.
 */
export const responsiveHeight = (percentage: number): number =>
  Math.round((SCREEN_HEIGHT * percentage) / 100);

