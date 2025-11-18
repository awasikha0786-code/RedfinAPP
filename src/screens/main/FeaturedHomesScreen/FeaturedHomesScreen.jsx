import React, { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text as RNText, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Icon } from '../../../components/common';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

const FeaturedHomesScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const allFeaturedHomes = [
    {
      id: '1',
      title: 'Lakeview Condo',
      location: 'Chicago, IL',
      rating: 4.9,
      price: '$290/month',
      image: require('../../../assets/images/login_image.png'),
      isFavorite: false,
    },
    {
      id: '2',
      title: 'Oakwood Meadows',
      location: 'Chicago, IL',
      rating: 4.9,
      price: '$320/night',
      image: require('../../../assets/images/login_image1.png'),
      isFavorite: true,
    },
    {
      id: '3',
      title: 'Sunset Villa',
      location: 'Chicago, IL',
      rating: 4.8,
      price: '$350/month',
      image: require('../../../assets/images/login_image2.png'),
      isFavorite: false,
    },
    {
      id: '4',
      title: 'Modern Heights',
      location: 'Chicago, IL',
      rating: 4.7,
      price: '$280/month',
      image: require('../../../assets/images/login_image3.png'),
      isFavorite: false,
    },
  ];

  const featuredHomes = useMemo(() => {
    if (!searchQuery.trim()) {
      return allFeaturedHomes;
    }
    const query = searchQuery.toLowerCase();
    return allFeaturedHomes.filter(
      (home) =>
        home.title.toLowerCase().includes(query) ||
        home.location.toLowerCase().includes(query) ||
        home.price.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Icon name="backArrow" size={moderateScale(18)} color="#1F2A44" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.filterButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FeaturedHomesFilter')}
          >
            <Image
              source={require('../../../assets/icons/Seting.png')}
              style={styles.filterButtonIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.featuredImagesSection}>
          <View style={styles.mainImageContainer}>
            <Image
              source={require('../../../assets/images/login_image.png')}
              style={styles.mainImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.sideImagesContainer}>
            <View style={styles.sideImageWrapper}>
              <Image
                source={require('../../../assets/images/login_image1.png')}
                style={styles.sideImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.sideImageWrapper}>
              <Image
                source={require('../../../assets/images/login_image2.png')}
                style={styles.sideImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        <View style={styles.titleSection}>
          <RNText style={styles.title}>Featured Homes</RNText>
          <RNText style={styles.subtitle}>Our recommended homes curated just for you.</RNText>
        </View>

        <View style={styles.searchBar}>
          <Icon name="search" size={moderateScale(18)} color="#677294" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search featured homes"
            placeholderTextColor="#A1A5C1"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          <TouchableOpacity activeOpacity={0.7}>
            <Icon name="mic" size={moderateScale(18)} color="#677294" />
          </TouchableOpacity>
        </View>

        <View style={styles.estatesRow}>
          <RNText style={styles.estatesText}>{featuredHomes.length} estates</RNText>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewToggleIcon, viewMode === 'grid' && styles.viewToggleActive]}
              onPress={() => setViewMode('grid')}
              activeOpacity={0.9}
            >
              <Image
                source={require('../../../assets/icons/Horizontal - Active.png')}
                style={styles.viewToggleImage}
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
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardsGrid}>
          {featuredHomes.map((home) => (
            <TouchableOpacity
              key={home.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('PropertyDetail', { property: home })}
            >
              <View style={styles.cardImageContainer}>
                <Image source={home.image} style={styles.cardImage} resizeMode="cover" />
                <TouchableOpacity style={styles.cardHeart} activeOpacity={0.8}>
                  <View style={styles.cardHeartCircle}>
                    <Image
                      source={require('../../../assets/icons/Heart.png')}
                      style={styles.cardHeartIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.priceTag}>
                  <RNText style={styles.priceTagText}>{home.price}</RNText>
                </View>
              </View>
              <View style={styles.cardContent}>
                <RNText style={styles.cardTitle}>{home.title}</RNText>
                <View style={styles.cardMeta}>
                  <Image source={require('../../../assets/icons/star.png')} style={styles.starIcon} />
                  <RNText style={styles.cardRating}>{home.rating}</RNText>
                  <Icon name="location" size={moderateScale(12)} color="#72809D" />
                  <RNText style={styles.cardLocation}>{home.location}</RNText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(32),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  backButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F4F5FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F4F5FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonIcon: {
    width: scale(20),
    height: scale(20),
  },
  titleSection: {
    marginBottom: verticalScale(24),
  },
  title: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(28),
    color: '#1F2A44',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(14),
    color: '#8A92A6',
    lineHeight: verticalScale(20),
  },
  featuredImagesSection: {
    flexDirection: 'row',
    marginBottom: verticalScale(24),
    gap: scale(12),
  },
  mainImageContainer: {
    flex: 1,
    height: verticalScale(200),
    borderRadius: scale(20),
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  sideImagesContainer: {
    flex: 0.5,
    gap: scale(12),
  },
  sideImageWrapper: {
    flex: 1,
    borderRadius: scale(20),
    overflow: 'hidden',
  },
  sideImage: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    width: scale(327),
    height: verticalScale(70),
    borderRadius: scale(20),
    backgroundColor: '#F5F4F8',
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#1F2A44',
    marginLeft: scale(12),
    padding: 0,
  },
  estatesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  estatesText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(22),
    color: '#1F2A44',
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
    resizeMode: 'contain',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: verticalScale(16),
  },
  card: {
    width: scale(150),
    borderRadius: scale(25),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: 'rgba(31, 44, 92, 0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardImageContainer: {
    width: '100%',
    height: verticalScale(160),
    position: 'relative',
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardHeart: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    zIndex: 10,
  },
  cardHeartCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeartIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: '#E84D71',
    resizeMode: 'contain',
  },
  priceTag: {
    position: 'absolute',
    bottom: scale(10),
    right: scale(10),
    backgroundColor: 'rgba(31, 44, 92, 0.9)',
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
  },
  priceTagText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(11),
    color: '#FFFFFF',
  },
  cardContent: {
    padding: scale(12),
    paddingTop: verticalScale(10),
  },
  cardTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(16),
    color: '#1F2A44',
    marginBottom: verticalScale(6),
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  starIcon: {
    width: scale(12),
    height: scale(12),
    resizeMode: 'contain',
  },
  cardRating: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(12),
    color: '#72809D',
  },
  cardLocation: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(12),
    color: '#72809D',
  },
});

export default FeaturedHomesScreen;

