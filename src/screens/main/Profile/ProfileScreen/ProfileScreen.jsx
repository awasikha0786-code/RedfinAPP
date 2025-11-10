import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../../../../components/common/ProfileHeader/ProfileHeader';
import StatisticsCard from '../../../../components/common/StatisticsCard/StatisticsCard';
import TabSelector from '../../../../components/main/notification/TabSelector/TabSelector';
import TransactionPropertyCard from '../../../../components/common/TransactionPropertyCard/TransactionPropertyCard';
import ConfirmationBottomSheet from '../../../../components/common/buttomSheet/ConfirmationBottomSheet';
import { useFavorites } from '../../../../context/FavoritesContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const ProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Transaction');
  const [featureSheetVisible, setFeatureSheetVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [featuredListingIds, setFeaturedListingIds] = useState([]);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  // Sample user data
  const userData = {
    name: 'Mathew Adam',
    email: 'mathew@email.com',
    profileImage: require('../../../../assets/images/Avator_img.png'),
    stats: {
      listings: 30,
      sold: 12,
      reviews: 28,
    },
  };

  // Sample transaction properties
  const transactions = [
    {
      id: 1,
      title: 'Wings Tower',
      type: 'Rent',
      date: 'November 21, 2021',
      image: require('../../../../assets/images/login_image.png'),
    },
    {
      id: 2,
      title: 'Bridgeland Modern House',
      type: 'Rent',
      date: 'Desember 17, 2021',
      image: require('../../../../assets/images/login_image1.png'),
    },
  ];

  // Sample listings data
  const listings = [
    {
      id: 1,
      title: 'Fairview Apartment',
      rating: 4.9,
      location: 'Jakarta, Indonesia',
      price: 370,
      priceUnit: 'month',
      image: require('../../../../assets/images/login_image.png'),
    },
    {
      id: 2,
      title: 'Shoolview House',
      rating: 4.8,
      location: 'Jakarta, Indonesia',
      price: 320,
      priceUnit: 'month',
      image: require('../../../../assets/images/login_image1.png'),
    },
    {
      id: 3,
      title: 'Wings Tower',
      rating: 4.9,
      location: 'Chicago, IL',
      price: 220,
      priceUnit: 'month',
      image: require('../../../../assets/images/login_image.png'),
    },
    {
      id: 4,
      title: 'Mill Sper House',
      rating: 4.8,
      location: 'Chicago, IL',
      price: 271,
      priceUnit: 'month',
      image: require('../../../../assets/images/login_image1.png'),
    },
  ];

  // Sample sold properties
  const sold = [
    {
      id: 1,
      title: 'Bungalow House',
      type: 'Sold',
      date: 'November 15, 2021',
      image: require('../../../../assets/images/login_image2.png'),
    },
    {
      id: 2,
      title: 'Sky Dandelions',
      type: 'Sold',
      date: 'October 10, 2021',
      image: require('../../../../assets/images/login_image3.png'),
    },
  ];

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'Listings':
        return listings;
      case 'Sold':
        return sold;
      default:
        return transactions;
    }
  };

  // Get title text based on active tab
  const getTitleText = () => {
    const count = getCurrentData().length;
    switch (activeTab) {
      case 'Listings':
        return `${userData.stats.listings} listings`;
      case 'Sold':
        return `${count} sold`;
      default:
        return `${count} transactions`;
    }
  };

  const handleSettingsPress = () => {
    console.log('Settings pressed');
    // Navigate to settings screen if needed
  };

  const handleEditProfile = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('EditProfile', { userData });
    } else {
      navigation.navigate('EditProfile', { userData });
    }
  };

  const handlePropertyPress = (property) => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('LocationDetail', { property });
    } else {
      navigation.navigate('LocationDetail', { property });
    }
  };

  const handleListingPress = (listing) => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('LocationDetail', { property: listing });
    } else {
      navigation.navigate('LocationDetail', { property: listing });
    }
  };

  const handleAddListing = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('AddListing');
    } else {
      navigation.navigate('AddListing');
    }
  };

  const openFeatureListingSheet = (listing, e) => {
    e.stopPropagation();
    setSelectedListing(listing);
    setFeatureSheetVisible(true);
  };

  const navigateToEditListing = (listing) => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('LocationDetail', { property: listing, editMode: true });
    } else {
      navigation.navigate('LocationDetail', { property: listing, editMode: true });
    }
  };

  const handleFeatureContinue = () => {
    const listingId = selectedListing?.id;
    const params = listingId ? { listingId } : undefined;
    setFeatureSheetVisible(false);
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('AddPaymentMethod', params);
    } else {
      navigation.navigate('AddPaymentMethod', params);
    }
    setSelectedListing(null);
  };

  const handleFeatureCancel = () => {
    setFeatureSheetVisible(false);
    setSelectedListing(null);
  };

  const handleFavoritePress = (property) => {
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  useEffect(() => {
    const featuredId = route?.params?.featuredListingId;
    if (featuredId) {
      setFeaturedListingIds((prev) => (prev.includes(featuredId) ? prev : [...prev, featuredId]));
      navigation.setParams({ featuredListingId: undefined });
    }
  }, [route?.params?.featuredListingId, navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ProfileHeader onSettingsPress={handleSettingsPress} />
      
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={userData.profileImage} 
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editButton}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <View style={styles.editIconContainer}>
                <Image
                  source={require('../../../../assets/icons/Pencil.png')}
                  style={styles.editIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{userData.name}</Text>
          <TouchableOpacity>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </TouchableOpacity>
        </View>

        {/* Statistics Section */}
        <View style={styles.statisticsSection}>
          <StatisticsCard value={userData.stats.listings} label="Listings" />
          <StatisticsCard value={userData.stats.sold} label="Sold" />
          <StatisticsCard value={userData.stats.reviews} label="Reviews" />
        </View>

        {/* Tab Selector */}
        <View style={styles.tabSection}>
          <TabSelector
            tabs={['Transaction', 'Listings', 'Sold']}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </View>

        {/* Content Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>
              {getTitleText()}
            </Text>
            <View style={styles.headerIconsContainer}>
              {/* Plus Icon Button - Only show in Listings tab */}
              {activeTab === 'Listings' && (
                <TouchableOpacity 
                  style={styles.plusIconButton}
                  onPress={handleAddListing}
                  activeOpacity={0.8}
                >
                  <View style={styles.plusIconContainer}>
                    <Text style={styles.plusIconText}>+</Text>
                  </View>
                </TouchableOpacity>
              )}
              {/* Grid Icon Button */}
              <View style={styles.gridIconButton}>
                <View style={styles.gridIconContainer}>
                  <Image
                    source={require('../../../../assets/icons/grid_.png')}
                    style={styles.gridIcon}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Property Cards Grid */}
          <View style={styles.propertiesGrid}>
            {activeTab === 'Listings' ? (
              // Use vertical listing cards for Listings tab
              getCurrentData().map((listing) => (
                <TouchableOpacity
                  key={listing.id}
                  style={styles.listingCardWrapper}
                  onPress={() => handleListingPress(listing)}
                  activeOpacity={0.9}
                >
                  <View style={styles.listingCard}>
                    <View style={styles.listingImageContainer}>
                      <Image 
                        source={listing.image} 
                        style={styles.listingCardImage}
                        resizeMode="cover"
                      />
                      {featuredListingIds.includes(listing.id) && (
                        <View style={styles.featureBadge}>
                          <Text style={styles.featureBadgeText}>Featured</Text>
                        </View>
                      )}
                      {/* Edit Icon - Top Left */}
                      <TouchableOpacity 
                        style={styles.editIconButton}
                        onPress={(e) => openFeatureListingSheet(listing, e)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.editIconContainerSmall}>
                          <Image
                            source={require('../../../../assets/icons/Pencil.png')}
                            style={styles.editIconSmall}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                      {/* Heart Icon - Top Right */}
                      <TouchableOpacity 
                        style={styles.heartButtonListing}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleFavoritePress(listing);
                        }}
                        activeOpacity={0.8}
                      >
                        <View style={[styles.heartIconContainerListing, isFavorite(listing.id) && styles.heartIconContainerActive]}>
                          <Image 
                            source={require('../../../../assets/icons/Heart.png')}
                            style={styles.heartIconListing}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                      {/* Price Tag - Bottom Center (Button Style) */}
                      {listing.price && (
                        <TouchableOpacity 
                          style={styles.priceTagListing}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.priceTextListing}>$ {listing.price}</Text>
                          <Text style={styles.monthTextListing}>/{listing.priceUnit || 'month'}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {/* Content Below Image */}
                    <View style={styles.listingContentContainer}>
                      <Text style={styles.listingCardTitle} numberOfLines={1}>{listing.title}</Text>
                      <View style={styles.listingDetailsRow}>
                        <Text style={styles.starIconListing}>⭐</Text>
                        <Text style={styles.ratingTextListing}>{listing.rating}</Text>
                        <Image 
                          source={require('../../../../assets/icons/Location.png')}
                          style={styles.locationIconListing}
                          resizeMode="contain"
                        />
                        <Text style={styles.locationTextListing} numberOfLines={1}>{listing.location}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              // Use TransactionPropertyCard for Transaction and Sold tabs
              getCurrentData().map((property) => (
                <TransactionPropertyCard
                  key={property.id}
                  property={property}
                  onPress={() => handlePropertyPress(property)}
                  onFavoritePress={() => handleFavoritePress(property)}
                  isFavorite={isFavorite(property.id)}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <ConfirmationBottomSheet
        visible={featureSheetVisible}
        onClose={handleFeatureCancel}
        onCancel={handleFeatureCancel}
        onConfirm={handleFeatureContinue}
        showIcon={false}
        title="Feature this"
        highlightText="Listing?"
        subtitle=""
        warningText="Boost your property to the top of search results."
        cancelText="Cancel"
        confirmText="Continue"
        messageAlign="center"
        containerStyle={styles.featureSheetContainer}
        sheetStyle={styles.featureSheet}
        warningTextStyle={styles.featureWarningText}
        cancelButtonStyle={styles.featureCancelButton}
        cancelButtonTextStyle={styles.featureCancelButtonText}
        confirmButtonStyle={styles.featureConfirmButton}
        confirmButtonTextStyle={styles.featureConfirmButtonText}
        buttonContainerStyle={styles.featureButtonContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: verticalScale(24),
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(24),
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: verticalScale(16),
  },
  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: Platform.OS === 'ios' ? 4 : 3,
    borderColor: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: moderateScale(5),
    right: moderateScale(5),
    zIndex: 2,
  },
  editIconContainer: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: '#21628A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Platform.OS === 'ios' ? 3 : 2,
    borderColor: '#FFFFFF',
  },
  editIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
  },
  userName: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#14233A',
    marginBottom: verticalScale(8),
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    textAlign: 'center',
  },
  userEmail: {
    fontSize: moderateScale(14),
    color: '#21628A',
    textDecorationLine: 'underline',
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    textAlign: 'center',
  },
  statisticsSection: {
    flexDirection: 'row',
    paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.053),
    marginBottom: verticalScale(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabSection: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(24),
  },
  transactionsSection: {
    paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.053),
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  transactionsTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#14233A',
    flex: 1,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    marginRight: moderateScale(5),
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  plusIconButton: {
    zIndex: 1,
  },
  plusIconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: '#21628A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconText: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: moderateScale(28),
  },
  gridIconButton: {
    zIndex: 1,
  },
  gridIconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#14233A',
  },
  propertiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: moderateScale(10),
  },
  listingCardWrapper: {
    width: SCREEN_WIDTH < 375 ? '48%' : (SCREEN_WIDTH * 0.48) < 160 ? '48%' : '48%',
    maxWidth: moderateScale(160),
    marginBottom: verticalScale(16),
  },
  listingCard: {
    width: '100%',
    aspectRatio: 160 / 232,
    maxWidth: moderateScale(160),
    borderRadius: moderateScale(25),
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listingImageContainer: {
    width: '100%',
    height: '75%',
    position: 'relative',
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  listingCardImage: {
    width: '100%',
    height: '100%',
  },
  editIconButton: {
    position: 'absolute',
    top: moderateScale(52),
    right: moderateScale(12),
    zIndex: 10,
  },
  editIconContainerSmall: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#E63946',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconSmall: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#FFFFFF',
  },
  heartButtonListing: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(12),
    zIndex: 10,
  },
  heartIconContainerListing: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  heartIconContainerActive: {
    backgroundColor: '#E63946',
    borderColor: '#E63946',
  },
  heartIconListing: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#FFFFFF',
  },
  featureSheetContainer: {
    alignItems: 'center',
  },
  featureSheet: {
    width: Math.min(SCREEN_WIDTH, 375),
    height: verticalScale(313),
    opacity: 1,
  },
  featureButtonContainer: {
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
  featureCancelButton: {
    backgroundColor: '#F5F4F8',
    borderColor: 'transparent',
    width: moderateScale(158.5),
    height: verticalScale(69),
    borderRadius: moderateScale(10),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    paddingLeft: moderateScale(19),
    paddingRight: moderateScale(19),
  },
  featureCancelButtonText: {
    color: '#14233A',
    fontWeight: '600',
    lineHeight: moderateScale(22),
    includeFontPadding: false,
  },
  featureConfirmButton: {
    backgroundColor: '#E63946',
    borderColor: '#E63946',
    width: moderateScale(158.5),
    height: verticalScale(69),
    borderRadius: moderateScale(10),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    paddingLeft: moderateScale(19),
    paddingRight: moderateScale(19),
  },
  featureConfirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: moderateScale(22),
    includeFontPadding: false,
  },
  featureWarningText: {
    color: '#6C7380',
    fontSize: moderateScale(14),
  },
  featureBadge: {
    position: 'absolute',
    top: moderateScale(12),
    left: moderateScale(12),
    backgroundColor: '#F7C948',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(16),
    zIndex: 15,
  },
  featureBadgeText: {
    color: '#14233A',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  priceTagListing: {
    position: 'absolute',
    bottom: moderateScale(12),
    right: moderateScale(12),
    width: moderateScale(70),
    height: moderateScale(24),
    borderRadius: moderateScale(8),
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    backgroundColor: 'rgba(33, 98, 138, 0.9)',
    paddingHorizontal: moderateScale(6),
    paddingVertical: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(2),
  },
  priceTextListing: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '700',
    lineHeight: moderateScale(24),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  monthTextListing: {
    color: '#FFFFFF',
    fontSize: moderateScale(9),
    fontWeight: '500',
    lineHeight: moderateScale(24),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  listingContentContainer: {
    width: '100%',
    height: '25%',
    backgroundColor: '#FFFFFF',
    padding: moderateScale(12),
    borderBottomLeftRadius: moderateScale(25),
    borderBottomRightRadius: moderateScale(25),
    justifyContent: 'center',
  },
  listingCardTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#14233A',
    marginBottom: verticalScale(6),
  },
  listingDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  starIconListing: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(4),
  },
  ratingTextListing: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#14233A',
    marginRight: moderateScale(8),
  },
  locationIconListing: {
    width: moderateScale(12),
    height: moderateScale(12),
    tintColor: '#6C7380',
    marginRight: moderateScale(4),
  },
  locationTextListing: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: '#6C7380',
    flex: 1,
  },
});

export default ProfileScreen;


