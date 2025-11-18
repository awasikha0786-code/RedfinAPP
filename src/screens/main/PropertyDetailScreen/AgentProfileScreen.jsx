import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Icon } from '../../../components/common';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

const DEFAULT_AGENT = {
  name: 'Amanda Anderson',
  email: 'amanda.anderson@redfin.com',
  avatar: require('../../../assets/images/Avator_img.png'),
  rating: 4.9,
  reviews: 235,
  sold: 112,
  badge: '#1',
};

const LISTINGS = [
  {
    id: 'listing-1',
    title: 'Brookvale Estates',
    price: '$ 320,000',
    rating: 5,
    location: 'Chicago, IL',
    image: require('../../../assets/images/login_image.png'),
  },
  {
    id: 'listing-2',
    title: 'Overdale Condos',
    price: '$ 290,000',
    rating: 5,
    location: 'Chicago, IL',
    image: require('../../../assets/images/login_image1.png'),
  },
  {
    id: 'listing-3',
    title: 'Silvercrest Villa',
    price: '$ 310,000',
    rating: 4.8,
    location: 'Chicago, IL',
    image: require('../../../assets/images/login_image2.png'),
  },
  {
    id: 'listing-4',
    title: 'Elmwood House',
    price: '$ 305,000',
    rating: 4.9,
    location: 'Chicago, IL',
    image: require('../../../assets/images/login_image3.png'),
  },
];

const SOLD_LISTINGS = [
  {
    id: 'sold-1',
    title: 'Sunset Ridge',
    price: '$ 310,000',
    rating: 4.8,
    location: 'Chicago, IL',
    image: require('../../../assets/images/login_image2.png'),
  },
  {
    id: 'sold-2',
    title: 'Willow Heights',
    price: '$ 295,000',
    rating: 4.9,
    location: 'Chicago, IL',
    image: require('../../../assets/images/login_image3.png'),
  },
  {
    id: 'sold-3',
    title: 'Greenwood Estate',
    price: '$ 315,000',
    rating: 4.7,
    location: 'Chicago, IL',
    image: require('../../../assets/images/login_image.png'),
  },
];

const chunkListings = (data, columns = 2) => {
  const rows = [];
  for (let i = 0; i < data.length; i += columns) {
    rows.push(data.slice(i, i + columns));
  }
  return rows;
};

const AgentProfileScreen = ({ navigation, route }) => {
  const [activeSegment, setActiveSegment] = useState('Listings');
  const viewMode = 'grid';
  const agent = route?.params?.agent ? { ...DEFAULT_AGENT, ...route.params.agent } : DEFAULT_AGENT;

  const listings = activeSegment === 'Listings' ? LISTINGS : SOLD_LISTINGS;

  const listingRows = useMemo(
    () => chunkListings(listings, 2),
    [listings]
  );

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.circleButton} onPress={handleBack} activeOpacity={0.85}>
            <Icon name="backArrow" size={moderateScale(18)} color="#1F2A44" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.circleButton} activeOpacity={0.85}>
            <Image source={require('../../../assets/icons/Share.png')} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.agentName}>{agent.name}</Text>
          <Text style={styles.agentEmail}>{agent.email}</Text>
          <View style={styles.avatarContainer}>
            <Image source={agent.avatar} style={styles.avatar} />
            <View style={styles.rankPill}>
              <Text style={styles.rankPillText}>{agent.badge}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{agent.rating.toFixed(1)}</Text>
            <View style={styles.starRow}>
              {[...Array(5)].map((_, idx) => (
                <Image
                  key={idx}
                  source={require('../../../assets/icons/star.png')}
                  style={styles.statStar}
                />
              ))}
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{agent.reviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{agent.sold}</Text>
            <Text style={styles.statLabel}>Home Sold</Text>
          </View>
        </View>

        <View style={styles.segmentControl}>
          <TouchableOpacity
            style={[styles.segmentTab, activeSegment === 'Listings' && styles.segmentActive]}
            onPress={() => setActiveSegment('Listings')}
            activeOpacity={0.9}
          >
            <Text
              style={
                activeSegment === 'Listings' ? styles.segmentTextActive : styles.segmentText
              }
            >
              Listings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentTab, activeSegment === 'Sold' && styles.segmentActive]}
            onPress={() => setActiveSegment('Sold')}
            activeOpacity={0.9}
          >
            <Text style={activeSegment === 'Sold' ? styles.segmentTextActive : styles.segmentText}>
              Sold
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listingHeader}>
          <Text style={styles.listingTitle}>
            {activeSegment === 'Listings' ? '140 Active Listings' : '98 Sold Homes'}
          </Text>
          <View style={styles.viewSwitch}>
            <TouchableOpacity
              style={[
                styles.viewSwitchIcon,
                viewMode === 'grid' ? styles.viewSwitchActive : styles.viewSwitchInactive,
              ]}
              onPress={() => {}}
              activeOpacity={0.9}
            >
              <Image
                source={
                  viewMode === 'grid'
                    ? require('../../../assets/icons/Horizontal - Active.png')
                    : require('../../../assets/icons/Horizontal - Active.png')
                }
                style={styles.viewSwitchImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewSwitchIcon,
                viewMode === 'list' ? styles.viewSwitchActive : styles.viewSwitchInactive,
              ]}
              onPress={() => {}}
              activeOpacity={0.9}
            >
              <Image
                source={
                  viewMode === 'list'
                    ? require('../../../assets/icons/Vertical - Inactive.png')
                    : require('../../../assets/icons/Vertical - Inactive.png')
                }
                style={styles.viewSwitchImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {listingRows.map((row, idx) => (
          <View
            key={`row-${idx}`}
            style={[
              styles.listingRow,
              viewMode === 'list' && styles.listingRowList,
            ]}
          >
            {row.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.listingCard,
                  viewMode === 'list' && styles.listingCardFullWidth,
                ]}
              >
                <Image source={item.image} style={styles.listingImage} />
                <TouchableOpacity style={styles.listingHeart} activeOpacity={0.8}>
                  <View style={styles.listingHeartCircle}>
                    <Image
                      source={require('../../../assets/icons/Heart.png')}
                      style={styles.listingHeartIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.priceTag}>
                  <Text style={styles.priceTagText}>{item.price}</Text>
                </View>
                <Text style={styles.listingName}>{item.title}</Text>
                <View style={styles.listingMeta}>
                  <Image
                    source={require('../../../assets/icons/star.png')}
                    style={styles.metaIcon}
                  />
                  <Text style={styles.metaText}>{item.rating}</Text>
                  <Icon name="location" size={moderateScale(12)} color="#72809D" style={styles.metaLocationIcon} />
                  <Text style={styles.metaText}>{item.location}</Text>
                </View>
              </View>
            ))}
            {viewMode === 'grid' && row.length === 1 && (
              <View style={styles.listingCardPlaceholder} />
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.chatButton} activeOpacity={0.9}>
          <Text style={styles.chatButtonText}>Start Chat</Text>
        </TouchableOpacity>
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
    paddingBottom: verticalScale(32),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  circleButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F4F5FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Lato',
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1F2A44',
  },
  shareIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#1F2A44',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  agentName: {
    fontFamily: 'Lato',
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#1B2541',
  },
  agentEmail: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(14),
    color: '#6E7587',
    marginTop: verticalScale(4),
  },
  avatarContainer: {
    marginTop: verticalScale(16),
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F4C6B',
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
  },
  rankPill: {
    position: 'absolute',
    bottom: verticalScale(4),
    right: scale(6),
    backgroundColor: '#A8E063',
    borderRadius: scale(12),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
  },
  rankPillText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#1F2A44',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },
  statCard: {
    flex: 1,
    height: verticalScale(80),
    borderRadius: scale(24),
    backgroundColor: '#F7F8FC',
    marginHorizontal: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(8),
  },
  statValue: {
    fontFamily: 'Lato',
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#1F2A44',
  },
  statLabel: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(12),
    color: '#6E7587',
    marginTop: verticalScale(4),
  },
  starRow: {
    flexDirection: 'row',
    marginTop: verticalScale(4),
  },
  statStar: {
    width: scale(14),
    height: scale(14),
    tintColor: '#F6C645',
    marginHorizontal: scale(1),
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F8',
    borderRadius: scale(30),
    padding: scale(6),
    marginBottom: verticalScale(24),
  },
  segmentTab: {
    flex: 1,
    height: verticalScale(44),
    borderRadius: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(26, 58, 95, 0.12)',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  segmentTextActive: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#1F2A44',
  },
  segmentText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#8A92A6',
  },
  listingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  listingTitle: {
    fontFamily: 'Lato',
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#1B2541',
  },
  listingTitleHighlight: {
    color: '#1B2541',
  },
  viewSwitch: {
    flexDirection: 'row',
    backgroundColor: '#F5F4F8',
    borderRadius: scale(24),
    padding: scale(6),
    columnGap: scale(6),
  },
  viewSwitchIcon: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSwitchActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(26, 58, 95, 0.12)',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  viewSwitchInactive: {
    backgroundColor: 'transparent',
  },
  viewSwitchImage: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
  },
  listingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  listingRowList: {
    flexDirection: 'column',
    rowGap: verticalScale(16),
  },
  listingCard: {
    width: scale(150),
    borderRadius: scale(28),
    backgroundColor: '#F5F4F8',
    paddingBottom: verticalScale(14),
    shadowColor: 'rgba(26, 58, 95, 0.08)',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  listingCardPlaceholder: {
    width: scale(150),
  },
  listingCardFullWidth: {
    width: '100%',
  },
  listingImage: {
    width: '100%',
    height: verticalScale(160),
    borderTopLeftRadius: scale(28),
    borderTopRightRadius: scale(28),
  },
  listingHeart: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
  },
  listingHeartCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listingHeartIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: '#E84D71',
    resizeMode: 'contain',
  },
  priceTag: {
    position: 'absolute',
    bottom: verticalScale(105),
    right: scale(8),
    backgroundColor: 'rgba(31, 44, 92, 0.9)',
    borderRadius: scale(16),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
  },
  priceTagText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listingName: {
    marginTop: verticalScale(12),
    paddingHorizontal: scale(16),
    fontFamily: 'Lato',
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1B2541',
  },
  listingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(6),
    columnGap: scale(6),
  },
  metaIcon: {
    width: scale(12),
    height: scale(12),
    resizeMode: 'contain',
  },
  metaText: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(12),
    color: '#72809D',
  },
  metaLocationIcon: {
    marginLeft: scale(4),
  },
  chatButton: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(40),
    backgroundColor: '#DE3341',
    borderRadius: scale(18),
    height: verticalScale(63),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButtonText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AgentProfileScreen;

