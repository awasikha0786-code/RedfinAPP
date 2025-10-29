import React from 'react';
import { View, StyleSheet, ScrollView, Text as RNText } from 'react-native';
import { Button } from '../../../components/common/Button';
import { Text } from '../../../components/common/Text';
import { ProductTourHeader } from '../../../components/common/ProductTourHeader';
import { PropertyImage } from '../../../components/common/PropertyImage';
import { COLORS, BUTTON_SIZES } from '../../../constants/index';

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
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View style={styles.textContainer}>
          <Text variant="headline" style={styles.headline}>
            Find the right home
          </Text>
          
          <View style={styles.subtitleContainer}>
            <Text variant="headline" style={styles.subtitle}>
              at the 
            </Text>
            <Text variant="headline" color="#21628A" style={styles.highlightText}>
              good price
            </Text>
          </View>
          
          <Text variant="body" style={styles.description}>
            Browse real homes for sale in your area{'\n'}with trusted experts.
          </Text>
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
            <Button
              title="Next"
              onPress={handleNextPress}
              style={styles.nextButton}
            />
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
    position: 'relative',
  },
  headline: {
    width: 238,
    height: 80,
    marginTop: 10, // 124 - 10 (paddingTop)
    marginLeft: 4, // 24 - 20 (paddingHorizontal)
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    marginBottom: 8,
    color: '#000000',
    textAlign: 'left',
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
    bottom: 40,
    left: 20,
    right: 20,
  },
  nextButton: {
    width: BUTTON_SIZES.large.width,
    height: BUTTON_SIZES.large.height,
    alignSelf: 'center',
  },
});

export default ProductTour1Screen;
