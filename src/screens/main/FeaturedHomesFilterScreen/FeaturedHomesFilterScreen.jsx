import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text as RNText, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from '../../../components/common';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';

const FeaturedHomesFilterScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState(['2']); // Track favorite IDs
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const topHomes = [
    {
      id: '1',
      title: 'Oakwood Meadows',
      location: 'Chicago, IL',
      rating: 4.9,
      price: 390,
      priceUnit: 'month',
      type: 'Villa',
      image: require('../../../assets/images/login_image1.png'),
    },
    {
      id: '2',
      title: 'Lakeview Condo',
      location: 'Chicago, IL',
      rating: 4.9,
      price: 290,
      priceUnit: 'month',
      type: 'Condo',
      image: require('../../../assets/images/login_image.png'),
    },
    {
      id: '3',
      title: 'Sunset Villa',
      location: 'Chicago, IL',
      rating: 4.8,
      price: 350,
      priceUnit: 'month',
      type: 'Villa',
      image: require('../../../assets/images/login_image2.png'),
    },
    {
      id: '4',
      title: 'Modern Heights',
      location: 'Chicago, IL',
      rating: 4.7,
      price: 280,
      priceUnit: 'month',
      type: 'Apartment',
      image: require('../../../assets/images/login_image3.png'),
    },
  ];

  const handleFavoritePress = (property) => {
    if (favorites.includes(property.id)) {
      setFavorites(favorites.filter(id => id !== property.id));
    } else {
      setFavorites([...favorites, property.id]);
    }
  };

  const handleCardPress = (property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const renderCard = (home) => (
    <TouchableOpacity 
      key={home.id} 
      style={styles.card}
      onPress={() => handleCardPress(home)}
      activeOpacity={0.9}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image 
          source={home.image} 
          style={styles.cardImage}
          resizeMode="cover"
        />
        {/* Heart Icon Overlay - Top Right */}
        <TouchableOpacity 
          style={styles.heartButton}
          activeOpacity={0.8}
          onPress={() => handleFavoritePress(home)}
        >
          <View style={[
            styles.heartIconContainer,
            favorites.includes(home.id) && styles.heartIconContainerActive
          ]}>
            <Image 
              source={require('../../../assets/icons/Heart.png')}
              style={styles.heartIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        {/* Price Tag Overlay - Bottom Left */}
        <View style={styles.priceTag}>
          <RNText style={styles.priceText}>$ {home.price}</RNText>
          <RNText style={styles.monthText}>/{home.priceUnit}</RNText>
        </View>
      </View>

      {/* Content Below Image */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <RNText style={styles.cardTitle}>{home.title}</RNText>

        {/* Rating and Location */}
        <View style={styles.detailsRow}>
          <RNText style={styles.starIcon}>⭐</RNText>
          <RNText style={styles.ratingText}>{home.rating}</RNText>
          <Image 
            source={require('../../../assets/icons/Location.png')}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <RNText style={styles.locationText}>{home.location}</RNText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Top Feature Image */}
        <View style={styles.topImageContainer}>
          <Image
            source={require('../../../assets/images/topFeature.png')}
            style={styles.topImage}
            resizeMode="cover"
          />
          {/* Back Button - Left Top */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()} 
            activeOpacity={0.8}
          >
            <Icon name="backArrow" size={moderateScale(18)} color="#1F2A44" />
          </TouchableOpacity>
          {/* Filter Button - Right Top */}
          <TouchableOpacity 
            style={styles.filterButton} 
            activeOpacity={0.8}
          >
            <Image
              source={require('../../../assets/icons/Seting.png')}
              style={styles.filterButtonIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.titleContainer}>
            <RNText style={styles.title}>Top Homes</RNText>
          </View>

          {/* Cards List - Horizontal Scroll */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
            style={styles.cardsScrollView}
          >
            {topHomes.map((home) => (
              <View key={home.id} style={styles.cardWrapper}>
                {renderCard(home)}
              </View>
            ))}
          </ScrollView>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Image
                source={require('../../../assets/icons/search.png')}
                style={styles.searchIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search in this category"
                placeholderTextColor="#9AA4B2"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
              <View style={styles.searchDivider} />
              <TouchableOpacity activeOpacity={0.7}>
                <Image
                  source={require('../../../assets/icons/mic.png')}
                  style={styles.micIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Estates Count and View Toggle */}
          <View style={styles.estatesRow}>
            <View style={styles.estatesTextWrapper}>
              <RNText style={styles.estatesText}>120</RNText>
              <RNText style={styles.homeText}> Home</RNText>
            </View>
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[styles.viewToggleIcon, viewMode === 'grid' && styles.viewToggleActive]}
                onPress={() => setViewMode('grid')}
                activeOpacity={0.9}
              >
                <Image
                  source={require('../../../assets/icons/Horizontal - Active.png')}
                  style={styles.viewToggleImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.viewToggleIcon, viewMode === 'list' && styles.viewToggleActive]}
                onPress={() => setViewMode('list')}
                activeOpacity={0.9}
              >
                <Image
                  source={require('../../../assets/icons/Vertical - Inactive.png')}
                  style={styles.viewToggleImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
  },
  topImageContainer: {
    width: scale(405),
    height: verticalScale(368),
    overflow: 'hidden',
    alignSelf: 'center',
    position: 'relative',
  },
  topImage: {
    width: scale(405),
    height: verticalScale(368),
    opacity: 1,
  },
  backButton: {
    position: 'absolute',
    top: scale(16),
    left: scale(16),
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F4F5FB',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButton: {
    position: 'absolute',
    top: scale(16),
    right: scale(16),
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F4F5FB',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonIcon: {
    width: scale(20),
    height: scale(20),
  },
  contentSection: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(32),
  },
  cardsScrollView: {
    marginTop: verticalScale(20),
  },
  cardsContainer: {
    paddingRight: scale(24),
    paddingBottom: verticalScale(10),
  },
  cardWrapper: {
    marginRight: scale(16),
  },
  card: {
    width: responsiveWidth(44),
    maxWidth: scale(200),
    borderRadius: moderateScale(25),
    opacity: 1,
  },
  imageContainer: {
    width: '100%',
    height: verticalScale(180),
    position: 'relative',
    borderRadius: moderateScale(25),
    overflow: 'hidden',
    marginBottom: verticalScale(12),
    backgroundColor: '#F3F4F6',
    elevation: moderateScale(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: verticalScale(12),
    right: moderateScale(12),
    zIndex: 10,
  },
  heartIconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#E63946',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconContainerActive: {
    backgroundColor: '#E63946',
  },
  heartIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: '#ffffff',
  },
  priceTag: {
    position: 'absolute',
    bottom: verticalScale(12),
    left: moderateScale(12),
    backgroundColor: 'rgba(33, 98, 138, 0.9)',
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(6),
    borderTopRightRadius: moderateScale(12),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: moderateScale(8),
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: '700',
    lineHeight: moderateScale(20),
  },
  monthText: {
    color: '#ffffff',
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginLeft: moderateScale(2),
    lineHeight: moderateScale(16),
  },
  contentContainer: {
    paddingHorizontal: moderateScale(4),
  },
  cardTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#14233A',
    marginBottom: verticalScale(6),
    fontFamily: 'Lato',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  starIcon: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(4),
  },
  ratingText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#14233A',
    marginRight: moderateScale(8),
    fontFamily: 'Lato',
  },
  locationIcon: {
    width: scale(12),
    height: scale(12),
    tintColor: '#6C7380',
    marginRight: moderateScale(4),
  },
  locationText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: '#6C7380',
    fontFamily: 'Lato',
  },
  titleContainer: {
    width: scale(95),
    height: verticalScale(22),
  },
  title: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#252B5C',
    opacity: 1,
    lineHeight: verticalScale(22),
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(14),
    color: '#8A92A6',
    lineHeight: verticalScale(20),
  },
  searchBarContainer: {
    marginTop: verticalScale(-8),
    alignItems: 'center',
  },
  searchBar: {
    width: scale(327),
    height: verticalScale(70),
    borderRadius: scale(20),
    backgroundColor: '#F5F4F8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#677294',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#1F2A44',
    marginLeft: scale(12),
    padding: 0,
  },
  searchDivider: {
    width: 1,
    height: verticalScale(28),
    backgroundColor: '#D9DEE6',
    marginHorizontal: scale(12),
  },
  micIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#677294',
  },
  estatesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  estatesTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estatesText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(18),
    letterSpacing: moderateScale(18 * 0.03),
    color: '#1F2A44',
    opacity: 1,
  },
  homeText: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(18),
    letterSpacing: moderateScale(18 * 0.03),
    color: '#1F2A44',
    opacity: 0.7,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F4F8',
    borderRadius: scale(24),
    padding: scale(6),
    gap: scale(6),
  },
  viewToggleIcon: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewToggleActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(18, 25, 56, 0.15)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  viewToggleImage: {
    width: scale(16),
    height: scale(16),
  },
});

export default FeaturedHomesFilterScreen;

