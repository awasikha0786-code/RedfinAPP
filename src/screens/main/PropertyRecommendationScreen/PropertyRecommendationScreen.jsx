import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text as RNText, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Button } from '../../../components/common';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';

const PropertyRecommendationScreen = ({ route, navigation }) => {
  const property = route.params?.property;
  const [viewMode, setViewMode] = useState('grid');

  const homes = [
    {
      id: 'primary',
      title: 'Willow Garden Home',
      location: 'Chicago, IL',
      rating: 4.7,
      price: '$370,000',
      image: property.image,
    },
    {
      id: 'secondary',
      title: 'Willow Garden Home',
      location: 'Chicago, IL',
      rating: 4.7,
      price: '$370,000',
      image: require('../../../assets/images/login_image1.png'),
    },
  ];

  if (!property) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <LinearGradient colors={['#F5F7FA', '#EEF1F4']} style={styles.backButtonCircle}>
              <Icon name="backArrow" size={moderateScale(18)} color="#1F2A44" />
            </LinearGradient>
          </TouchableOpacity>

          <LinearGradient
            colors={['#F5F7FA', '#EEF1F4']}
            style={styles.filterButton}
          >
            <Image
              source={require('../../../assets/icons/Seting.png')}
              style={styles.filterButtonIcon}
              resizeMode="contain"
            />
          </LinearGradient>
        </View>

        <View style={styles.heroTextWrapper}>
          <RNText style={styles.heroTitle}>{property.location?.split(',')[0] || 'Chicago'}</RNText>
          <RNText style={styles.heroSubtitle}>Recommended homes</RNText>
        </View>

        <View style={styles.searchBar}>
          <RNText style={styles.searchText}>{property.location}</RNText>
          <Icon name="search" size={moderateScale(18)} color="#1F2A44" />
        </View>

        <View style={styles.foundRow}>
          <RNText style={styles.foundText}>
            Found <RNText style={styles.foundHighlight}>128 homes</RNText>
          </RNText>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewToggleIcon, styles.viewToggleActive]}
              onPress={() => setViewMode('grid')}
              activeOpacity={0.9}
            >
              <Image
                source={require('../../../assets/icons/Horizontal - Active.png')}
                style={styles.viewToggleImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewToggleIcon,
                viewMode === 'list' ? styles.viewToggleActive : styles.viewToggleInactive,
              ]}
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

        <View style={styles.filtersRow}>
          <LinearGradient colors={['#E3F5D8', '#F1F8E4']} style={styles.filterChip}>
            <View style={styles.filterIcon}>
              <RNText style={styles.filterIconText}>×</RNText>
            </View>
            <RNText style={styles.filterText}>House</RNText>
          </LinearGradient>

          <LinearGradient colors={['#E3F5D8', '#F1F8E4']} style={styles.filterChip}>
            <View style={styles.filterIcon}>
              <RNText style={styles.filterIconText}>×</RNText>
            </View>
            <RNText style={styles.filterText}>$250k - $450k</RNText>
          </LinearGradient>
        </View>

        <View style={[styles.cardGrid, viewMode === 'list' && styles.cardGridList]}>
          {homes.map((home) => (
            <View key={home.id} style={[styles.card, viewMode === 'list' && styles.cardList]}>
              <View
                style={[
                  styles.cardImageWrapper,
                  viewMode === 'list' && styles.cardImageWrapperList,
                ]}
              >
                <Image source={home.image} style={styles.cardImage} />
                <TouchableOpacity style={styles.cardHeart} activeOpacity={0.8}>
                  <View style={styles.cardHeartCircle}>
                    <Image
                      source={require('../../../assets/icons/Heart.png')}
                      style={styles.cardHeartIcon}
                    />
                  </View>
                </TouchableOpacity>
                <LinearGradient colors={['#1F4C6B', '#153449']} style={styles.cardBadge}>
                  <RNText style={styles.cardBadgeText}>House</RNText>
                </LinearGradient>
              </View>

              <View style={[styles.cardInfo, viewMode === 'list' && styles.cardInfoList]}>
                <RNText style={styles.cardTitle}>{home.title}</RNText>
                <View style={styles.infoRow}>
                  <Image
                    source={require('../../../assets/icons/star.png')}
                    style={styles.ratingStar}
                  />
                  <RNText style={styles.infoText}>
                    {home.rating}  •  {home.location}
                  </RNText>
                </View>
                <RNText style={styles.price}>{home.price}</RNText>
              </View>
            </View>
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
    paddingHorizontal: responsiveWidth(6),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(120),
    gap: verticalScale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  backButton: {},
  backButtonCircle: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    flex: 1,
    marginHorizontal: scale(16),
  },
  title: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(26),
    color: '#1F2A44',
  },
  subtitle: {
    marginTop: verticalScale(4),
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#8A92A6',
  },
  filterButton: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextWrapper: {
    marginBottom: verticalScale(20),
  },
  heroTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(25),
    color: '#252B5C',
    lineHeight: verticalScale(40),
    letterSpacing: 0.75,
    width: scale(271),
    height: verticalScale(40),
  },
  heroSubtitle: {
    fontFamily: 'Lato',
    fontSize: moderateScale(16),
    color: '#8A92A6',
    marginTop: verticalScale(4),
  },
  searchBar: {
    width: scale(327),
    height: verticalScale(70),
    borderRadius: 20,
    backgroundColor: '#F5F4F8',
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  searchText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(16),
    color: '#1F2A44',
  },
  foundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foundText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(20),
    color: '#1F2A44',
  },
  foundHighlight: {
    fontWeight: '700',
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
  viewToggleInactive: {
    backgroundColor: 'transparent',
  },
  viewToggleImage: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
  },
  viewToggleActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(18, 25, 56, 0.15)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: scale(12),
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: verticalScale(24),
    gap: scale(10),
  },
  filterIcon: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: '#DE3341',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#1F2A44',
  },
  card: {
    width: scale(160),
    height: verticalScale(206),
    borderRadius: scale(25),
    backgroundColor: '#F5F4F8',
    padding: scale(12),
    gap: verticalScale(10),
    shadowColor: 'rgba(31, 44, 92, 0.1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 12,
    alignItems: 'center',
  },
  cardList: {
    flexDirection: 'row',
    width: '100%',
    height: verticalScale(150),
    alignItems: 'center',
    gap: scale(16),
  },
  cardImageWrapper: {
    width: scale(96),
    height: verticalScale(95),
    borderRadius: scale(25),
    overflow: 'hidden',
    alignSelf: 'center',
    borderWidth: scale(3),
    borderColor: '#FFFFFF',
    position: 'relative',
  },
  cardImageWrapperList: {
    width: scale(130),
    height: verticalScale(120),
    alignSelf: 'flex-start',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardHeart: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
  },
  cardHeartCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeartIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: '#E84D71',
    resizeMode: 'contain',
  },
  cardBadge: {
    position: 'absolute',
    bottom: scale(10),
    left: scale(10),
    borderRadius: scale(14),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
  },
  cardBadgeText: {
    color: '#FFFFFF',
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
  },
  cardInfo: {
    flex: 1,
    paddingLeft: 0,
    gap: verticalScale(6),
    alignItems: 'center',
  },
  cardInfoList: {
    alignItems: 'flex-start',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: verticalScale(16),
  },
  cardGridList: {
    flexDirection: 'column',
    rowGap: verticalScale(16),
  },
  cardTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  infoText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(13),
    color: '#72809D',
  },
  price: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(22),
    color: '#1F2A44',
  },
  ratingStar: {
    width: scale(7),
    height: scale(7),
    marginRight: scale(4),
    resizeMode: 'contain',
  },
});

export default PropertyRecommendationScreen;


