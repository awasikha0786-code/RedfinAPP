import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../components/common/ScreenHeader/ScreenHeader';
import AlertCard from '../../../components/common/AlertCard/AlertCard';
import { Button, Text } from '../../../components/common';

const NewListingsAlertScreen = ({ navigation, route }) => {
  // Get image source from navigation params or use default
  const imageSource = route?.params?.imageSource || require('../../../assets/images/login_image.png');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = () => {
    console.log('Share');
  };

  const handleExploreMore = () => {
    console.log('Explore more');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScreenHeader onBackPress={handleBack} onSharePress={handleShare} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Card */}
        <View style={styles.heroContainer}>
          <Image 
            source={imageSource}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {/* New Listings Alert Text Overlay */}
          <Text style={styles.imageOverlayText}>New Listings{'\n'}Alert</Text>
          {/* Subtitle text below New Listings Alert */}
          <Text style={styles.imageSubtitleText}>See new homes hitting {'\n'}the market in your area.</Text>
          {/* Button at left bottom of image */}
          <TouchableOpacity 
            style={styles.imageBottomButton}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <Image 
              source={require('../../../assets/icons/arrow.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text variant="headline" style={styles.title}>
            New{' '}
            <Text variant="headline" color="#21628A">
              Home Listings
            </Text>
            {' '}are coming soon!
          </Text>

          {/* Date */}
          <View style={styles.dateContainer}>
            <Image 
              source={require('../../../assets/icons/Timer.png')} 
              style={styles.calendarIcon} 
            />
            <Text variant="body" style={styles.dateText}>October 27, 2022</Text>
          </View>

          {/* Alert Card */}
          <AlertCard 
            code="NEWLS40"
            description="Use this alert to get early access to new listings"
          />

          {/* Description */}
          <Text variant="body" style={styles.description}>
            Redfin gives you access to new listings the moment they go live in your area, 
            so you can act faster than other buyers and stay ahead of the market. 
            Sign up for listing alerts and never miss a home that matches what you're searching for.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Explore more"
          onPress={handleExploreMore}
          style={styles.exploreButton}
          textStyle={styles.exploreButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  heroContainer: {
    width: '100%',
    position: 'relative',
    height: 350,
  },
  heroImage: {
    width: 296,
    height: 197.33,
    borderRadius: 25,
    opacity: 1,
    position: 'absolute',
    top: 106.33,
    left: 38,
  },
  imageOverlayText: {
    position: 'absolute',
    top: 126.33,
    left: 58,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    zIndex: 10,
  },
  imageSubtitleText: {
    position: 'absolute',
    top: 175, // Below the "New Listings Alert" text
    left: 58,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    zIndex: 10,
  },
  imageBottomButton: {
    position: 'absolute',
    width: 101.96,
    height: 61.39,
    left: 38,
    top: 245, // Slightly moved down
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: '#21628A',
    opacity: 1,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
    transform: [{ rotate: '180deg' }], // Rotate to point right if arrow points left
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#14233A',
    marginBottom: 16,
    lineHeight: 36,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarIcon: {
    width: 16,
    height: 16,
    tintColor: '#21628A',
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6C7380',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6C7380',
    lineHeight: 24,
    marginTop: 8,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  exploreButton: {
    backgroundColor: '#E63946',
    height: 56,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'none',
  },
});

export default NewListingsAlertScreen;

