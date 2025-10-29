import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from '../../../components/common/Button';
import { Text } from '../../../components/common/Text';
import { ProductTourHeader } from '../../../components/common/ProductTourHeader';
import { PropertyImage } from '../../../components/common/PropertyImage';
import { COLORS, BUTTON_SIZES } from '../../../constants/index';

interface ProductTour2ScreenProps {
  navigation: any; // TODO: Add proper navigation type
}

const ProductTour2Screen: React.FC<ProductTour2ScreenProps> = ({ navigation }) => {
  const handleNextPress = () => {
    navigation.navigate('ProductTour3');
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
          <Text variant="headline" style={styles.headline}>
            Sell your home faster
          </Text>
          
          <View style={styles.subtitleContainer}>
            <Text variant="headline" style={styles.subtitle}>
              with{' '}
            </Text>
            <Text variant="headline" color="#21628A" style={styles.highlightText}>
              Redfin agents
            </Text>
          </View>
          
          <Text variant="body" style={styles.description}>
            List with Redfin and reach more buyers{'\n'}while saving on fees.
          </Text>
        </View>
        
        {/* Property Image Card */}
        <View style={styles.imageContainer}>
          <PropertyImage
            source={require('../../../assets/images/image1.png')}
            style={styles.propertyImage}
            overlayColor="#000000"
            overlayOpacity={0.1}
          />
          
          {/* Next Button Overlay */}
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
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
  headline: {
    marginBottom: 8,
    color: '#000000',
    textAlign: 'left',
  },
  subtitleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
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
  buttonWrapper: {
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

export default ProductTour2Screen;
