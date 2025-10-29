import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button } from '../../../components/common/Button';
import { Text } from '../../../components/common/Text';
import { ProductTourHeader } from '../../../components/common/ProductTourHeader';
import { PropertyImage } from '../../../components/common/PropertyImage';
import { BUTTON_SIZES } from '../../../constants/index';

interface ProductTour3ScreenProps {
  navigation: any; // TODO: Add proper navigation type
}

const ProductTour3Screen: React.FC<ProductTour3ScreenProps> = ({ navigation }) => {
  const handleNextPress = () => {
    navigation.navigate('LoginForm');
  };

  const handleSkipPress = () => {
    navigation.navigate('MainStack');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* Header with Logo and Skip Button */}
      <ProductTourHeader onSkipPress={handleSkipPress} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View style={styles.textContainer}>
          <View style={styles.headlineContainer}>
            <Text variant="headline" style={styles.headline}>
              Find the{' '}
            </Text>
            <Text variant="headline" color="#1F5C7E" style={styles.highlightText}>
              perfect home
            </Text>
          </View>

          <View style={styles.subtitleContainer}>
            <Text variant="headline" style={styles.subtitle}>
              for your future
            </Text>
          </View>

          <Text variant="body" style={styles.description}>
            Discover homes tailored to your needs{'\n'}with expert local guidance.
          </Text>
        </View>

        {/* Property Image Card */}
        <View style={styles.imageContainer}>
          <PropertyImage
            source={require('../../../assets/images/image2.png')}
            style={styles.propertyImage}
            overlayColor="#000000"
            overlayOpacity={0.1}
          />

          {/* Bottom controls */}
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
              />
            </View>
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
  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headlineContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  headline: {
    color: '#000000',
    textAlign: 'left',
  },
  highlightText: {
    color: '#1F5C7E',
  },
  subtitleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  subtitle: {
    color: '#000000',
    textAlign: 'left',
  },
  description: {
    color: '#666666',
    lineHeight: 22,
    textAlign: 'left',
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
    minHeight: 500,
  },
  propertyImage: {
    width: '100%',
    height: 500,
    borderRadius: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  progressBar: {
    width: 120,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E6E6E6',
    marginBottom: 16,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  backArrowContainer: {
    width: 54,
    height: 54,
    backgroundColor: '#ffffff',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backArrowIcon: {
    width: 24,
    height: 24,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
  nextButton: {
    width: BUTTON_SIZES.large.width,
    height: BUTTON_SIZES.large.height,
  },
});

export default ProductTour3Screen;
