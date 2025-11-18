import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import {
  PropertyHeroCard,
  PropertyAgentCard,
  PropertyFeaturePills,
  PropertyInfoSection,
  PropertyReviewCard,
} from '../../../components/main/propertyDetail';
import HomeListingCard from '../../../components/common/HomeListingCard/HomeListingCard';
import LocationDistanceSheet from '../../../components/main/propertyDetail/LocationDistanceSheet';

const RENT_OPTIONS = ['Rent', 'Buy'];

const DEFAULT_PROPERTY = {
  id: 'property-default',
  title: 'Wings Tower',
  price: 220,
  priceUnit: 'month',
  rating: 4.9,
  type: 'Apartment',
  location: 'Jakarta, Indonesia',
  address: 'Jl. Cikoko Timur, Kec. Pancoran, Jakarta Selatan, Indonesia 12770',
  distance: '2.5 km from your location',
  image: require('../../../assets/images/login_image.png'),
  gallery: [
    require('../../../assets/images/login_image1.png'),
    require('../../../assets/images/login_image2.png'),
    require('../../../assets/images/login_image3.png'),
  ],
  features: [
    { label: '2 Bedroom' },
    { label: '1 Bathroom' },
    { label: '120 m²', emphasis: true },
  ],
  nearbySummary: {
    schools: 5,
    hospitals: 2,
    colleges: 3,
    gasStations: 4,
  },
};

const FACILITY_STATS = [
  { key: 'schools', label: 'Schools' },
  { key: 'hospitals', label: 'Hospitals' },
  { key: 'colleges', label: 'Colleges' },
  { key: 'gasStations', label: 'Gas Stations' },
];

const DEFAULT_AGENT = {
  name: 'Anderson',
  role: 'Real Estate Agent',
  avatar: require('../../../assets/images/Avator_img.png'),
};

const DEFAULT_REVIEWS = [
  {
    id: 'review-1',
    name: 'Kurt Mullins',
    avatar: require('../../../assets/images/Avator_img.png'),
    rating: 5,
    date: '8 days ago',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'review-2',
    name: 'Samuel Ella',
    avatar: require('../../../assets/images/login_image3.png'),
    rating: 4,
    date: '10 mins ago',
    comment:
      'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    media: [
      require('../../../assets/images/login_image1.png'),
      require('../../../assets/images/login_image2.png'),
      require('../../../assets/images/login_image3.png'),
    ],
  },
  {
    id: 'review-3',
    name: 'Kay Swanson',
    avatar: require('../../../assets/images/Avator_img.png'),
    rating: 4,
    date: '6 days ago',
    comment:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
];

const DEFAULT_NEARBY = [
  {
    id: 'nearby-1',
    title: 'Skyline Residence',
    image: require('../../../assets/images/login_image1.png'),
    rating: 4.8,
    location: 'Jakarta, Indonesia',
    price: 250,
    priceUnit: 'month',
    type: 'Apartment',
  },
  {
    id: 'nearby-2',
    title: 'Aurora Heights',
    image: require('../../../assets/images/login_image2.png'),
    rating: 4.7,
    location: 'Jakarta, Indonesia',
    price: 235,
    priceUnit: 'month',
    type: 'House',
  },
];

const PropertyDetailScreen = ({ navigation, route }) => {
  const property = useMemo(
    () => ({
      ...DEFAULT_PROPERTY,
      ...(route?.params?.property || {}),
    }),
    [route?.params?.property]
  );

  const agent = route?.params?.agent || DEFAULT_AGENT;
  const reviews = route?.params?.reviews || DEFAULT_REVIEWS;
  const nearby = route?.params?.nearby || DEFAULT_NEARBY;

  const [selectedPurchaseType, setSelectedPurchaseType] = useState(RENT_OPTIONS[0]);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleShare = () => {
    console.log('share pressed');
  };

  const handleFavorite = () => {
    console.log('favorite toggle');
  };

  const handleGallery = () => {
    console.log('open gallery');
  };

  const handleVirtualTourPress = () => {
    const params = {
      property: property,
    };

    if (Array.isArray(property?.virtualTourScenes) && property.virtualTourScenes.length > 0) {
      params.tourScenes = property.virtualTourScenes;
    }

    navigation.navigate('PropertyVirtualTour', params);
  };

  const featureItems = useMemo(() => {
    const raw = property.features || [];
    return raw.map((item) => {
      let emoji = '🏠';
      const labelLower = item.label?.toLowerCase?.() || '';
      if (labelLower.includes('bed')) {
        emoji = '🛏';
      } else if (labelLower.includes('bath')) {
        emoji = '🛁';
      } else if (labelLower.includes('water')) {
        emoji = '💧';
      } else if (labelLower.includes('room')) {
        emoji = '🛋';
      } else if (labelLower.includes('m²') || labelLower.includes('area')) {
        emoji = '📐';
      }
      return { ...item, emoji };
    });
  }, [property.features]);

  const handleViewAllReviews = () => {
    navigation.navigate('PropertyReviews', {
      property,
      reviews,
    });
  };

  const [distanceSheetVisible, setDistanceSheetVisible] = useState(false);

  const handleOpenDistanceSheet = () => {
    setDistanceSheetVisible(true);
  };

  const handleCloseDistanceSheet = () => {
    setDistanceSheetVisible(false);
  };

  const locationDistances =
    route?.params?.locationDistances ||
    property.locationDistances || [
      {
        id: 'distance-1',
        distance: '2.5 km',
        suffix: 'from Srengseng, Kembangan',
        description: 'West Jakarta City, Jakarta 11630',
      },
      {
        id: 'distance-2',
        distance: '18.2 km',
        suffix: 'from Petompon',
        description: 'Kota Semarang, Jawa Tengah 50232',
      },
    ];

  const renderNearbyCard = (item) => (
    <TouchableOpacity key={item.id} style={styles.nearbyCard} activeOpacity={0.9}>
      <Image source={item.image} style={styles.nearbyImage} />
      <View style={styles.nearbyHeartBadge}>
        <Image
          source={require('../../../assets/icons/Heart.png')}
          style={styles.nearbyHeartIcon}
        />
      </View>
    </TouchableOpacity>
  );

  const handleViewFullMap = () => {
    navigation.navigate('PropertyMapOverview', {
      property,
      nearby,
      facilitySummary: property.nearbySummary,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <PropertyHeroCard
            image={property.image}
            title={property.title}
            rating={property.rating?.toFixed ? property.rating.toFixed(1) : property.rating}
            type={property.type}
            price={`$ ${
              typeof property.price === 'number'
                ? property.price.toLocaleString()
                : property.price
            }`}
            priceUnit={property.priceUnit ? `per ${property.priceUnit}` : undefined}
            location={property.location}
            gallery={property.gallery}
            purchaseOptions={RENT_OPTIONS}
            activePurchaseOption={selectedPurchaseType}
            onPurchaseOptionPress={setSelectedPurchaseType}
            onBack={handleBack}
            onFavoriteToggle={handleFavorite}
            onShare={handleShare}
            onViewGallery={handleGallery}
            onVirtualTourPress={handleVirtualTourPress}
            isFavorite={false}
          />
        </View>

        <PropertyFeaturePills features={featureItems} />

        <PropertyAgentCard agent={agent} onPress={() => navigation.navigate('TopAgents')} />

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionLabel}>Location & Public Facilities</Text>
        </View>
        <View style={styles.locationRowInline}>
          <TouchableOpacity style={styles.locationIconButton} activeOpacity={0.85}>
            <Image
              source={require('../../../assets/icons/Location.png')}
              style={styles.locationIconButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.locationInlineText}>
            St. Cikoko Timur, Kec. Pancoran, Jakarta{'\n'}Selatan, Indonesia 12770
          </Text>
        </View>
        <TouchableOpacity style={styles.distancePill} activeOpacity={0.85} onPress={handleOpenDistanceSheet}>
          <View style={styles.distanceIconWrapper}>
            <Image
              source={require('../../../assets/icons/Location.png')}
              style={styles.distanceIcon}
            />
          </View>
          <Text style={styles.distanceText}>
            <Text style={styles.distanceValue}>{property.distance || '2.5 km'}</Text>{' '}
            from your location
          </Text>
          <TouchableOpacity
            style={styles.distanceCaretButton}
            activeOpacity={0.85}
            onPress={handleOpenDistanceSheet}
          >
            <Image
              source={require('../../../assets/icons/arrow-down.png')}
              style={styles.distanceCaret}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.facilityRow}
        >
          {FACILITY_STATS.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.facilityCard,
                index === FACILITY_STATS.length - 1 && styles.facilityCardLast,
              ]}
              activeOpacity={0.85}
            >
              <Text style={styles.facilityCount}>
                {property.nearbySummary?.[item.key] ?? '--'}
              </Text>
              <Text style={styles.facilityLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.mapPreviewCard}>
          <View style={styles.mapIllustration}>
            <View style={styles.mapWaterShape} />
            <View style={[styles.mapRoad, styles.mapRoadHorizontal]} />
            <View style={[styles.mapRoad, styles.mapRoadVertical]} />
            <View style={styles.mapRoadDiagonal} />
            <View style={styles.mapRouteLine} />
            <View style={[styles.mapPin, styles.mapPinStart]}>
              <Image source={agent.avatar} style={styles.mapPinImage} />
            </View>
            <View style={[styles.mapPin, styles.mapPinEnd]}>
              <Image source={property.image} style={styles.mapPinImage} />
            </View>
          </View>
          <TouchableOpacity style={styles.mapPreviewFooter} activeOpacity={0.85} onPress={handleViewFullMap}>
            <Text style={styles.mapPreviewFooterText}>View all on map</Text>
          </TouchableOpacity>
        </View>

        <PropertyInfoSection title="Cost of Living" actionLabel="view details">
          <View style={styles.costCard}>
            <Text style={styles.costValue}>
              $ 830<Text style={styles.costUnit}>/month</Text>
            </Text>
            <Text style={styles.costCaption}>
              *From average citizen spend around this location
            </Text>
          </View>
        </PropertyInfoSection>

        <PropertyInfoSection title="Reviews" actionLabel="view details">
          <View style={styles.reviewSummary}>
            <View style={styles.reviewBadge}>
              <Text style={styles.reviewBadgeStar}>★</Text>
            </View>
            <View style={styles.reviewSummaryCenter}>
              <View style={styles.reviewSummaryStarsRow}>
                {[...Array(5)].map((_, idx) => (
                  <Text key={idx} style={styles.reviewSummaryStar}>
                    ★
                  </Text>
                ))}
                <Text style={styles.reviewSummaryRating}>4.9</Text>
              </View>
              <Text style={styles.reviewSummaryCaption}>From 172 reviewers</Text>
            </View>
            <View style={styles.reviewAvatars}>
              {[0, 1, 2].map((index) => (
                <Image
                  key={index}
                  source={require('../../../assets/images/Avator_img.png')}
                  style={[styles.reviewStackAvatar, { left: index * 18 }]}
                />
              ))}
            </View>
          </View>
          {reviews.map((review) => (
            <PropertyReviewCard key={review.id} review={review} style={styles.reviewCard} />
          ))}
          <TouchableOpacity
            style={styles.viewAllReviewsButton}
            activeOpacity={0.85}
            onPress={handleViewAllReviews}
          >
            <Text style={styles.viewAllReviewsText}>View all reviews</Text>
          </TouchableOpacity>
        </PropertyInfoSection>

        <PropertyInfoSection title="Nearby From this Location">
          <View style={styles.nearbyGrid}>{nearby.map(renderNearbyCard)}</View>
        </PropertyInfoSection>
      </ScrollView>
      <View style={styles.bottomActionBar}>
        <TouchableOpacity 
          style={styles.buyButton} 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('TransactionReview', { property })}
        >
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <LocationDistanceSheet
        visible={distanceSheetVisible}
        onClose={handleCloseDistanceSheet}
        distances={locationDistances}
        onEdit={() => {
          handleCloseDistanceSheet();
          navigation.navigate('LocationDetail', { property });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  heroSection: {
    marginHorizontal: -24,
    marginBottom: 24,
  },
  costCard: {
    width: 327,
    height: 85,
    borderRadius: 25,
    backgroundColor: '#F7F8FB',
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  costValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#14233A',
    marginBottom: 6,
  },
  costUnit: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C7380',
  },
  costCaption: {
    width: 215,
    height: 11,
    fontFamily: 'Raleway',
    fontSize: 9,
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#6C7380',
    lineHeight: 9,
    letterSpacing: 0.27,
    marginTop: 6,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#14233A',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 24,
  },
  locationIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F2F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginRight: 16,
  },
  locationIconButtonImage: {
    width: 20,
    height: 20,
    tintColor: '#21628A',
  },
  locationRowInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationInlineText: {
    width: 232,
    height: 40,
    fontFamily: 'Raleway',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#6C7380',
    lineHeight: 20,
    letterSpacing: 0.36,
  },
  distancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(226, 231, 240, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: -12,
    marginBottom: 20,
    shadowColor: '#1C2A43',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  distanceIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3EFF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceIcon: {
    width: 14,
    height: 14,
    tintColor: '#1F4D70',
  },
  distanceText: {
    flex: 1,
    marginHorizontal: 14,
    fontFamily: 'Raleway',
    fontSize: 13,
    fontWeight: '400',
    color: '#6C7380',
  },
  distanceValue: {
    fontWeight: '700',
    color: '#1F2F4A',
  },
  distanceCaret: {
    width: 12,
    height: 12,
    tintColor: '#8356F4',
  },
  distanceCaretButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
    paddingRight: 24,
  },
  facilityCard: {
    flexDirection: 'row',
    width: 100,
    height: 47,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(33, 98, 138, 0.14)',
    backgroundColor: 'rgba(33, 98, 138, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  facilityCardLast: {
    marginRight: 0,
  },
  facilityCount: {
    fontFamily: 'Raleway',
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2F4A',
    marginRight: 6,
  },
  facilityLabel: {
    marginTop: 4,
    fontFamily: 'Raleway',
    fontSize: 12,
    fontWeight: '500',
    color: '#5E7085',
  },
  mapPreviewCard: {
    width: 327,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 32,
    shadowColor: '#10213A',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  mapIllustration: {
    height: 190,
    backgroundColor: '#EAF0F8',
    position: 'relative',
  },
  mapWaterShape: {
    position: 'absolute',
    width: '55%',
    height: '60%',
    backgroundColor: '#CBE6FF',
    top: '12%',
    left: '8%',
    borderRadius: 80,
    transform: [{ rotate: '-8deg' }],
  },
  mapRoad: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  mapRoadHorizontal: {
    top: '35%',
    left: '4%',
    right: '6%',
    height: 28,
  },
  mapRoadVertical: {
    top: '10%',
    bottom: '18%',
    left: '58%',
    width: 28,
  },
  mapRoadDiagonal: {
    position: 'absolute',
    width: '70%',
    height: 20,
    backgroundColor: '#FFFFFF',
    top: '54%',
    left: '14%',
    borderRadius: 16,
    transform: [{ rotate: '-18deg' }],
  },
  mapRouteLine: {
    position: 'absolute',
    height: 4,
    width: '68%',
    backgroundColor: '#1F4D70',
    top: '55%',
    left: '18%',
    borderRadius: 6,
    transform: [{ rotate: '-16deg' }],
  },
  mapPin: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: '#1F4D70',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPinStart: {
    top: '12%',
    left: '20%',
  },
  mapPinEnd: {
    bottom: '8%',
    right: '18%',
  },
  mapPinImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  mapPreviewFooter: {
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  mapPreviewFooterText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2F4A',
  },
  sectionTabs: {
    flexDirection: 'row',
    gap: 12,
  },
  sectionTabsContent: {
    flexDirection: 'row',
    columnGap: 12,
    paddingHorizontal: 4,
  },
  sectionTab: {
    width: 146,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'rgba(230, 237, 246, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A3A5F',
  },
  sectionWithoutTitle: {
    paddingTop: 0,
  },
  reviewSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F6E8C',
    width: 327,
    height: 85,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 24,
    alignSelf: 'center',
  },
  reviewBadge: {
    width: 62,
    height: 62,
    borderRadius: 24,
    backgroundColor: 'rgba(20, 35, 58, 0.28)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reviewBadgeStar: {
    fontSize: 30,
    color: '#F5C451',
  },
  reviewSummaryCenter: {
    flex: 1,
  },
  reviewSummaryStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    marginBottom: 6,
  },
  reviewSummaryStar: {
    fontSize: 16,
    color: '#F5C451',
  },
  reviewSummaryRating: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFF',
    marginLeft: 8,
  },
  reviewSummaryCaption: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(248, 250, 255, 0.7)',
  },
  reviewAvatars: {
    flexDirection: 'row',
    width: 88,
    height: 36,
    marginLeft: 12,
  },
  reviewStackAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#F8FAFF',
    position: 'absolute',
  },
  reviewCard: {
    width: '100%',
    maxWidth: 327,
    alignSelf: 'center',
  },
  viewAllReviewsButton: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E1E5EF',
  },
  viewAllReviewsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#21628A',
  },
  nearbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  nearbyCard: {
    width: 152,
    height: 152,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F1F3FB',
    marginBottom: 16,
    position: 'relative',
  },
  nearbyImage: {
    width: '100%',
    height: '100%',
  },
  nearbyHeartBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyHeartIcon: {
    width: 16,
    height: 16,
    tintColor: '#E63946',
  },
  bottomActionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#10213A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -6 },
    elevation: 10,
  },
  buyButton: {
    width: '100%',
    height: 56,
    borderRadius: 18,
    backgroundColor: '#E63946',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    fontFamily: 'Raleway',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PropertyDetailScreen;


