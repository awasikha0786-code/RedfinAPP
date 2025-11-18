import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text as RNText } from 'react-native';
import { Button } from '../../../components/common/Button';
import { Text } from '../../../components/common/Text';
import { ProductTourHeader } from '../../../components/common/ProductTourHeader';
import { PropertyImage } from '../../../components/common/PropertyImage';
import { BUTTON_SIZES, COLORS } from '../../../constants/index';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';

interface ProductTour3ScreenProps {
  navigation: any;
}

const ProductTour3Screen: React.FC<ProductTour3ScreenProps> = ({ navigation }) => {
  const handleNextPress = () => navigation.navigate('LoginForm');
  const handleSkipPress = () => navigation.navigate('MainStack');
  const handleBackPress = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <ProductTourHeader onSkipPress={handleSkipPress} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textContainer}>
          <RNText style={styles.title}>
            <RNText style={styles.titleMuted}>{'Find the '}</RNText>
            <RNText style={styles.titleHighlight}>{'perfect home'}</RNText>
            <RNText style={styles.titleMuted}>{'\nfor your future'}</RNText>
          </RNText>

          <Text variant="body" style={styles.description}>
            {`Discover homes tailored to your needs\nwith expert local guidance.`}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <PropertyImage
            source={require('../../../assets/images/image2.png')}
            style={styles.propertyImage}
            overlayColor="#000000"
            overlayOpacity={0.1}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.progressBar} />
            <View style={styles.controlsRow}>
              <TouchableOpacity
                style={styles.backArrowContainer}
                onPress={handleBackPress}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../../../assets/icons/arrow.png')}
                  style={styles.backArrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Button
                title="Next"
                onPress={handleNextPress}
                style={styles.nextButton}
                textStyle={styles.nextButtonText}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { flex: 1 },
  scrollContent: {
    paddingBottom: verticalScale(32),
  },
  textContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(32), // thoda upar spacing
    paddingBottom: verticalScale(20),
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: 16,
    width: '100%', // ✅ full width responsive
    textAlign: 'left',
  },
  titleMuted: {
    color: '#252B5C',
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: moderateScale(25),
    lineHeight: verticalScale(40),
    letterSpacing: 0.03 * 25,
  },
  titleHighlight: {
    color: '#204D6C',
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: moderateScale(25),
    lineHeight: verticalScale(40),
    letterSpacing: 0.03 * 25,
  },
  description: {
    width: responsiveWidth(85), // ✅ responsive width
    color: '#53587A',
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(12),
    lineHeight: verticalScale(20),
    letterSpacing: 0.03 * 12,
    textAlign: 'left',
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: scale(20),
    marginBottom: verticalScale(24),
    position: 'relative',
    minHeight: verticalScale(560),
  },
  propertyImage: { width: '100%', height: verticalScale(560), borderRadius: scale(32) },
  buttonContainer: {
    position: 'absolute',
    bottom: verticalScale(24),
    left: scale(20),
    right: scale(20),
    alignItems: 'center',
  },
  progressBar: {
    width: scale(120),
    height: verticalScale(6),
    borderRadius: scale(3),
    backgroundColor: '#E6E6E6',
    marginBottom: verticalScale(16),
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(15),
  },
  backArrowContainer: {
    width: scale(54),
    height: scale(54),
    padding: scale(25),
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8BC83D',
    shadowOffset: { width: 0, height: verticalScale(25) },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 20,
  },
  backArrowIcon: { width: scale(16), height: scale(15.56) },
  nextButton: {
    width: scale(BUTTON_SIZES.large.width),
    height: verticalScale(BUTTON_SIZES.large.height),
    borderRadius: scale(10),
    backgroundColor: COLORS.primary,
  },
  nextButtonText: {
    textTransform: 'none',
  },
});

export default ProductTour3Screen;

