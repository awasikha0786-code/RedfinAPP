import React from 'react';
import { View, StyleSheet, ScrollView, Text as RNText } from 'react-native';
import { Button } from '../../../components/common/Button';
import { Text } from '../../../components/common/Text';
import { ProductTourHeader } from '../../../components/common/ProductTourHeader';
import { PropertyImage } from '../../../components/common/PropertyImage';
import { COLORS, BUTTON_SIZES } from '../../../constants/index';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';

interface ProductTour1ScreenProps {
  navigation: any; // TODO: Add proper navigation type
}

const ProductTour1Screen: React.FC<ProductTour1ScreenProps> = ({ navigation }) => {
  const handleNextPress = () => {
    navigation.navigate('ProductTour2');
  };

  const handleSkipPress = () => {
    navigation.navigate('MainStack');
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo and Skip Button */}
      <ProductTourHeader onSkipPress={handleSkipPress} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View style={styles.textContainer}>
          <RNText style={styles.headline}>
            <RNText style={styles.headlineMuted}>{'Find the right home\nat the '}</RNText>
            <RNText style={styles.headlineHighlight}>{'good price'}</RNText>
          </RNText>
          <RNText style={styles.subHeadline}>
            <RNText style={styles.subHeadlineText}>Browse real homes for sale in your area with trusted experts.</RNText>
           
          </RNText>
        </View>
        
        {/* Property Image Card */}
        <View style={styles.imageContainer}>
          <PropertyImage
            source={require('../../../assets/images/image.png')}
            style={styles.propertyImage}
            overlayColor="#000000"
            overlayOpacity={0.1}
          />
          
          {/* Next Button Overlay */}
          <View style={styles.buttonContainer}>
            <Button title="Next" onPress={handleNextPress} style={styles.nextButton} textStyle={styles.nextButtonText} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(32),
  },
  textContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(20),
    position: 'relative',
  },
  headline: {
    width: responsiveWidth(70),
    marginTop: verticalScale(10),
    marginLeft: scale(4),
    opacity: 1,
    color: '#252B5C',
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: moderateScale(25),
    lineHeight: verticalScale(40),
    letterSpacing: 0.03 * 25,
  },
  headlineMuted: {
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: moderateScale(25),
    lineHeight: verticalScale(40),
    letterSpacing: 0.03 * 25,
    color: '#000000',
  },
  headlineHighlight: {
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: 25,
    lineHeight: 40,
    letterSpacing: 0.03 * 25,
    color: '#204D6C',
  },
  subHeadline: {
    marginTop: verticalScale(16),
    marginLeft: scale(4),
    width: responsiveWidth(72),
    lineHeight: verticalScale(20),
    letterSpacing: 0.36,
  },
  subHeadlineText: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(12),
    color: '#546273',
  },
  subtitleContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    alignItems: 'center',
    marginTop:-45,
  },
  subtitle: {
    color: '#000000',
    textAlign: 'left',
    marginRight: 8,
  },
  highlightText: {
    color: '#21628A',
  },
  description: {
    color: '#666666',
    lineHeight: 22,
    textAlign: 'left',
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: scale(20),
    marginBottom: verticalScale(24),
    position: 'relative',
    minHeight: verticalScale(560),
  },
  propertyImage: {
    width: '100%',
    height: verticalScale(560),
    borderRadius: scale(32),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: verticalScale(40),
    left: scale(20),
    right: scale(20),
  },
  nextButton: {
    width: scale(BUTTON_SIZES.large.width),
    height: verticalScale(BUTTON_SIZES.large.height),
    alignSelf: 'center',
    borderRadius: scale(10),
    backgroundColor: COLORS.primary,
  },
  nextButtonText: {
    textTransform: 'none',
  },
});

export default ProductTour1Screen;
