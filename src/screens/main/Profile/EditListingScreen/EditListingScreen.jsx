import React, { useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  ScreenHeader,
  Input,
  Button,
  SelectablePill,
  Icon,
} from '../../../../components/common';
import PropertyMapView from '../../../../components/common/PropertyMapView/PropertyMapView';
import ConfirmationBottomSheet from '../../../../components/common/buttomSheet/ConfirmationBottomSheet';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const FALLBACK_IMAGE = require('../../../../assets/images/login_image.png');
const HEART_ICON = require('../../../../assets/icons/Heart.png');
const LOCATION_ICON = require('../../../../assets/icons/Location.png');
const MAX_PHOTOS = 6;
const LISTING_TYPES = ['Rent', 'Sell'];
const PROPERTY_CATEGORIES = ['House', 'Apartment', 'Hotel', 'Villa', 'Cottage'];
const FEATURE_KEYS = ['bedroom', 'bathroom', 'balcony'];
const ROOM_OPTIONS = ['< 4', 4, 6, 8];
const FACILITY_OPTIONS = [
  ['Parking Lot', 'Pet Allowed'],
  ['Garden', 'Gym', 'Park'],
  ['Home theatre', "Kid's Friendly"],
];

const formatPriceValue = (value) => {
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
};

const mapInitialPhotos = (initial = []) =>
  initial
    .map((item, index) => {
      if (!item) {
        return null;
      }
      if (typeof item === 'string') {
        return { id: `initial-${index}`, uri: item };
      }
      if (item.uri) {
        return { id: item.id || `initial-${index}`, uri: item.uri };
      }
      if (item.source) {
        return { id: item.id || `initial-${index}`, source: item.source };
      }
      if (item.image) {
        return { id: item.id || `initial-${index}`, source: item.image };
      }
      return null;
    })
    .filter(Boolean);

const deriveFacilities = (incomingFacilities) => {
  if (Array.isArray(incomingFacilities) && incomingFacilities.length) {
    return incomingFacilities;
  }
  return ['Parking Lot', 'Pet Allowed', 'Garden'];
};

const EditListingScreen = ({ navigation, route }) => {
  const listing = route?.params?.listing || {};
  const onUpdate = route?.params?.onUpdate;
  const latestValuesRef = useRef({});

  const [listingTitle, setListingTitle] = useState(
    listing.title || listing.name || 'Schoolview House'
  );
  const [listingType, setListingType] = useState(
    listing.listingType || listing.type || LISTING_TYPES[0]
  );
  const [propertyCategory, setPropertyCategory] = useState(
    listing.propertyCategory || PROPERTY_CATEGORIES[0]
  );
  const [address, setAddress] = useState(
    listing.address ||
      listing.location ||
      'Jl. Gerungsari, Bulusan, Kec. Tembalang, Kota Semarang, Jawa Tengah 50277'
  );

  const initialPhotos = useMemo(
    () =>
      mapInitialPhotos(
        listing.photos ||
          (listing.image ? [listing.image] : [require('../../../../assets/images/login_image.png')])
      ),
    [listing.photos, listing.image]
  );
  const [photos, setPhotos] = useState(initialPhotos);

  const [sellPrice, setSellPrice] = useState(formatPriceValue(listing.sellPrice || 150000));
  const [rentPrice, setRentPrice] = useState(
    formatPriceValue(
      listing.rentPrice !== undefined ? listing.rentPrice : listing.price || 320
    )
  );
  const derivedRentInterval = listing.rentInterval
    ? listing.rentInterval
    : listing.priceUnit === 'year'
    ? 'yearly'
    : 'monthly';
  const [rentInterval, setRentInterval] = useState(derivedRentInterval);

  const [features, setFeatures] = useState(() => ({
    bedroom: listing.features?.bedroom ?? listing.bedroom ?? 2,
    bathroom: listing.features?.bathroom ?? listing.bathroom ?? 2,
    balcony: listing.features?.balcony ?? listing.balcony ?? 1,
  }));

  const [totalRooms, setTotalRooms] = useState(listing.totalRooms ?? 6);
  const [facilities, setFacilities] = useState(deriveFacilities(listing.facilities));
  const [successSheetVisible, setSuccessSheetVisible] = useState(false);
  const [errorSheetVisible, setErrorSheetVisible] = useState(false);

  const heroImageSource = useMemo(() => {
    if (photos[0]?.source) {
      return photos[0].source;
    }
    if (photos[0]?.uri) {
      return { uri: photos[0].uri };
    }
    if (listing.image) {
      return listing.image;
    }
    return FALLBACK_IMAGE;
  }, [photos, listing.image]);

  const mapProperties = useMemo(() => {
    const latitude = listing.latitude ?? -6.982;
    const longitude = listing.longitude ?? 110.409;
    return [
      {
        id: 'edit-location-pin',
        title: listingTitle,
        location: address,
        latitude,
        longitude,
        image: heroImageSource,
      },
    ];
  }, [listing.latitude, listing.longitude, listingTitle, address, heroImageSource]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleToggleFacility = (item) => {
    setFacilities((prev) =>
      prev.includes(item) ? prev.filter((facility) => facility !== item) : [...prev, item]
    );
  };

  const handleFeatureChange = (key, delta) => {
    setFeatures((prev) => {
      const nextValue = Math.max(0, (prev[key] || 0) + delta);
      return { ...prev, [key]: nextValue };
    });
  };

  const handleAddPhoto = () => {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert('Limit reached', `You can upload up to ${MAX_PHOTOS} photos.`);
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.85,
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          Alert.alert(
            'Error selecting photo',
            response.errorMessage || 'Something went wrong while picking the photo.'
          );
          return;
        }

        const asset = response.assets?.[0];
        if (asset?.uri) {
          const newPhoto = {
            id: `picked-${Date.now()}`,
            uri: asset.uri,
          };
          setPhotos((prev) => [...prev, newPhoto]);
        }
      }
    );
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const collectPayload = () => {
    const sanitizedRooms = typeof totalRooms === 'string' ? 4 : totalRooms;
    return {
      ...listing,
      title: listingTitle,
      listingType,
      propertyCategory,
      address,
      photos,
      sellPrice,
      rentPrice,
      rentInterval,
      features,
      totalRooms: sanitizedRooms,
      facilities,
      latitude: listing.latitude,
      longitude: listing.longitude,
    };
  };

  const handleUpdatePress = () => {
    const hasSellPrice = !!sellPrice?.toString().trim();
    const hasRentPrice = !!rentPrice?.toString().trim();

    if (!hasSellPrice || !hasRentPrice) {
      setErrorSheetVisible(true);
      return;
    }

    latestValuesRef.current = collectPayload();
    setSuccessSheetVisible(true);
  };

  const handleSuccessStay = () => {
    setSuccessSheetVisible(false);
  };

  const handleSuccessConfirm = () => {
    setSuccessSheetVisible(false);
    const payload = latestValuesRef.current || collectPayload();
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate(payload);
    }
    navigation.goBack();
  };

  const findNavigatorWithRoute = (nav, routeName) => {
    let current = nav;
    while (current) {
      const state = current.getState ? current.getState() : null;
      if (state?.routeNames?.includes(routeName)) {
        return current;
      }
      current = current.getParent ? current.getParent() : null;
    }
    return nav;
  };

  const handleOpenPropertyDetail = () => {

    const gallerySources = photos.map((item) =>
      item?.source ? item.source : item?.uri ? { uri: item.uri } : null
    ).filter(Boolean);

    const propertyPayload = {
      id: listing.id || `listing-${listingTitle}`,
      title: listingTitle,
      price: sellPrice,
      priceUnit: rentInterval === 'yearly' ? 'year' : 'month',
      rating: listing.rating || 4.9,
      type: listing.listingType || listingType,
      location: listing.location || address,
      address,
      distance: '2.5 km from your location',
      image: heroImageSource,
      gallery: gallerySources,
      features: [
        { label: `${features.bedroom || 0} Bedroom` },
        { label: `${features.bathroom || 0} Bathroom` },
        { label: totalRooms ? `${totalRooms} Rooms` : undefined, emphasis: true },
      ].filter((item) => item.label),
    };

    const routeParams = {
      property: propertyPayload,
      agent: {
        name: 'Anderson',
        role: 'Real Estate Agent',
        avatar: require('../../../../assets/images/Avator_img.png'),
      },
    };

    const targetNav = findNavigatorWithRoute(navigation, 'PropertyDetail');
    if (targetNav?.navigate) {
      targetNav.navigate('PropertyDetail', routeParams);
    }
  };

  const renderSuccessIcon = () => (
    <View style={styles.successIconWrapper}>
      <LinearGradient
        colors={['rgba(82, 174, 128, 0.25)', 'rgba(82, 174, 128, 0.06)']}
        style={styles.successIconOuter}
      >
        <LinearGradient
          colors={['#2B8A58', '#7BD74B']}
          style={styles.successIconInner}
        >
          <Text style={styles.successIconCheck}>✓</Text>
        </LinearGradient>
      </LinearGradient>
    </View>
  );

  const handleErrorReview = () => {
    setErrorSheetVisible(false);
  };

  const renderPhotoCell = (photo, index) => {
    const source = photo?.source ? photo.source : { uri: photo.uri };
    return (
      <View key={photo.id || `${photo.uri}-${index}`} style={styles.photoWrapper}>
        <Image source={source} style={styles.photoImage} resizeMode="cover" />
        <TouchableOpacity
          style={styles.photoRemoveButton}
          onPress={() => handleRemovePhoto(index)}
          activeOpacity={0.8}
        >
          <View style={styles.removeIconCircle}>
            <Text style={styles.removeIconText}>×</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader onBackPress={handleBack} title="Edit Listing" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.summaryContainer} activeOpacity={0.9} onPress={handleOpenPropertyDetail}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryImageWrapper}>
              <Image
                source={heroImageSource}
                style={styles.summaryImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.summaryFavoriteButton} activeOpacity={0.85}>
                <Image source={HEART_ICON} style={styles.summaryFavoriteIcon} resizeMode="contain" />
              </TouchableOpacity>
              <View style={styles.summaryLabel}>
                <Text style={styles.summaryLabelText}>{propertyCategory}</Text>
              </View>
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle} numberOfLines={2}>
                {listingTitle}
              </Text>
              <View style={styles.summaryRatingRow}>
                <Text style={styles.summaryRatingIcon}>⭐</Text>
                <Text style={styles.summaryRatingText}>
                  {listing.rating ? listing.rating.toFixed(1) : '4.9'}
                </Text>
              </View>
              <View style={styles.summaryLocationRow}>
                <Image source={LOCATION_ICON} style={styles.summaryLocationIcon} resizeMode="contain" />
                <Text style={styles.summaryLocationText} numberOfLines={1}>
                  {address}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionHeading}>Listing Title</Text>
        <Input
          value={listingTitle}
          onChangeText={setListingTitle}
          placeholder="Listing title"
          icon="home"
          style={styles.input}
          inputStyle={styles.inputText}
        />

        <Text style={styles.sectionHeading}>Listing type</Text>
        <View style={styles.pillsRow}>
          {LISTING_TYPES.map((type, index) => (
            <SelectablePill
              key={type}
              label={type}
              selected={listingType === type}
              onPress={() => setListingType(type)}
              style={[
                styles.pillWrapper,
                index !== LISTING_TYPES.length - 1 && styles.pillWrapperSpacing,
              ]}
              contentStyle={styles.pillContent}
              selectedStyle={styles.pillSelected}
              selectedTextStyle={styles.pillSelectedText}
              textStyle={styles.pillLabel}
            />
          ))}
        </View>

        <Text style={styles.sectionHeading}>Property category</Text>
        <View style={styles.pillsGrid}>
          <View style={styles.pillsRow}>
            {PROPERTY_CATEGORIES.slice(0, 2).map((category, index) => (
              <SelectablePill
                key={category}
                label={category}
                selected={propertyCategory === category}
                onPress={() => setPropertyCategory(category)}
                style={[
                  styles.categoryPillWrapper,
                  index !== 1 && styles.categoryPillSpacing,
                ]}
                contentStyle={styles.categoryPillContent}
                selectedStyle={styles.categoryPillSelected}
                selectedTextStyle={styles.categoryPillSelectedText}
                textStyle={styles.categoryPillLabel}
              />
            ))}
          </View>
          <View style={[styles.pillsRow, styles.pillsRowSpacing]}>
            {PROPERTY_CATEGORIES.slice(2).map((category, index) => (
              <SelectablePill
                key={category}
                label={category}
                selected={propertyCategory === category}
                onPress={() => setPropertyCategory(category)}
                style={[
                  styles.categoryPillWrapper,
                  index !== PROPERTY_CATEGORIES.slice(2).length - 1 && styles.categoryPillSpacing,
                ]}
                contentStyle={styles.categoryPillContent}
                selectedStyle={styles.categoryPillSelected}
                selectedTextStyle={styles.categoryPillSelectedText}
                textStyle={styles.categoryPillLabel}
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionHeading}>Location</Text>
        <TouchableOpacity
          style={styles.addressRow}
          activeOpacity={0.85}
          onPress={() => setAddress(address)}
        >
          <LinearGradient colors={['#F4F7FF', '#EAF2FF']} style={styles.addressIconCircle}>
            <Icon name="location" size={moderateScale(20)} color="#17455C" />
          </LinearGradient>
          <Text style={styles.addressText}>{address}</Text>
        </TouchableOpacity>

        <View style={styles.locationCard}>
          <PropertyMapView
            properties={mapProperties}
            showNearbyButton={false}
            showPropertyCards={false}
            containerStyle={styles.mapContainer}
            mapStyle={styles.mapStyle}
          />
          <TouchableOpacity style={styles.locationOverlay} activeOpacity={0.85}>
            <Text style={styles.locationOverlayText}>Select on the map</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>Listing Photos</Text>
        <View style={styles.photosGrid}>
          <View style={styles.photosRow}>
            {photos.slice(0, 3).map((photo, index) => renderPhotoCell(photo, index))}
            {photos.length < 3 && photos.length < MAX_PHOTOS && (
              <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto} activeOpacity={0.85}>
                <Text style={styles.addPhotoPlus}>+</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.photosRow}>
            {photos.slice(3).map((photo, index) => renderPhotoCell(photo, index + 3))}
            {photos.length >= 3 && photos.length < MAX_PHOTOS && (
              <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto} activeOpacity={0.85}>
                <Text style={styles.addPhotoPlus}>+</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.sectionHeading}>Sell Price</Text>
        <View style={styles.priceInputWrapper}>
          <Input
            value={sellPrice}
            onChangeText={setSellPrice}
            placeholder="$ 0"
            keyboardType="numeric"
            style={[styles.input, styles.priceInput]}
            inputStyle={[styles.inputText, styles.inputWithSuffix]}
          />
          <Text style={styles.inputSuffix}>$</Text>
        </View>

        <Text style={styles.sectionHeading}>Rent Price</Text>
        <View style={styles.priceInputWrapper}>
          <Input
            value={rentPrice}
            onChangeText={setRentPrice}
            placeholder="$ 0 /month"
            keyboardType="numeric"
            style={[styles.input, styles.priceInput]}
            inputStyle={[styles.inputText, styles.inputWithSuffix]}
          />
          <Text style={styles.inputSuffix}>$</Text>
        </View>

        <View style={styles.intervalToggle}>
          <TouchableOpacity
            style={[
              styles.intervalButton,
              rentInterval === 'monthly' && styles.intervalButtonActive,
            ]}
            onPress={() => setRentInterval('monthly')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.intervalButtonText,
                rentInterval === 'monthly' && styles.intervalButtonTextActive,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.intervalButton,
              rentInterval === 'yearly' && styles.intervalButtonActive,
            ]}
            onPress={() => setRentInterval('yearly')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.intervalButtonText,
                rentInterval === 'yearly' && styles.intervalButtonTextActive,
              ]}
            >
              Yearly
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>Property Features</Text>
        {FEATURE_KEYS.map((key) => (
          <View key={key} style={styles.featureRow}>
            <Text style={styles.featureLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <View style={styles.featureCounter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => handleFeatureChange(key, -1)}
                activeOpacity={0.8}
              >
                <Text style={styles.counterButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{features[key]}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => handleFeatureChange(key, 1)}
                activeOpacity={0.8}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={styles.sectionHeading}>Total Rooms</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.roomsRow}
        >
          {ROOM_OPTIONS.map((option) => {
            const selected =
              (typeof option === 'string' && totalRooms === 4) || totalRooms === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.roomPill, selected && styles.roomPillActive]}
                onPress={() =>
                  setTotalRooms(typeof option === 'string' ? 4 : option)
                }
                activeOpacity={0.85}
              >
                <View style={styles.roomPillContent}>
                  <Image
                    source={require('../../../../assets/icons/Text.png')}
                    style={styles.roomIcon}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.roomPillText,
                      selected && styles.roomPillTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionHeading}>Environment / Facilities</Text>
        <View style={styles.facilitiesGrid}>
          {FACILITY_OPTIONS.map((row) => (
            <View key={row.join('-')} style={styles.facilitiesRow}>
              {row.map((facility) => {
                const selected = facilities.includes(facility);
                return (
                  <TouchableOpacity
                    key={facility}
                    style={[
                      styles.facilityPill,
                      selected && styles.facilityPillActive,
                    ]}
                    onPress={() => handleToggleFacility(facility)}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[
                        styles.facilityPillText,
                        selected && styles.facilityPillTextActive,
                      ]}
                    >
                      {facility}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          title="Update"
          onPress={handleUpdatePress}
          style={styles.updateButton}
          textStyle={styles.updateButtonText}
          activeOpacity={0.9}
        />
      </View>

      <ConfirmationBottomSheet
        visible={successSheetVisible}
        onClose={handleSuccessStay}
        onConfirm={handleSuccessConfirm}
        showCancelButton={false}
        title="Your listing just"
        highlightText="successfully updated"
        subtitle=""
        warningText="Lorem ipsum dolor sit amet, consectetur."
        confirmText="Close"
        messageAlign="center"
        containerStyle={styles.successSheetContainer}
        sheetStyle={styles.successSheet}
        handleStyle={styles.successHandle}
        messageTextStyle={styles.successMessage}
        highlightTextStyle={styles.successHighlight}
        warningTextStyle={styles.successWarning}
        buttonContainerStyle={styles.successButtonContainer}
        confirmButtonStyle={styles.successConfirmButton}
        confirmButtonTextStyle={styles.successConfirmText}
        renderIcon={renderSuccessIcon}
      />

      <ConfirmationBottomSheet
        visible={errorSheetVisible}
        onClose={handleErrorReview}
        onCancel={handleErrorReview}
        showConfirmButton={false}
        title="Please check the"
        highlightText="details"
        warningText="Some required fields are missing. Update the form and try again."
        cancelText="Review Again"
        messageAlign="center"
      />
    </SafeAreaView>
  );
};

const PHOTO_GAP = moderateScale(16);
const GRID_HORIZONTAL_PADDING = Math.max(24, SCREEN_WIDTH * 0.06);
const PHOTO_SIZE = (SCREEN_WIDTH - GRID_HORIZONTAL_PADDING * 2 - PHOTO_GAP * 2) / 3;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: GRID_HORIZONTAL_PADDING,
    paddingBottom: verticalScale(120),
    paddingTop: verticalScale(24),
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(18),
    borderRadius: moderateScale(28),
    backgroundColor: '#FFFFFF',
    marginBottom: verticalScale(28),
    shadowColor: '#21334A',
    shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: Platform.OS === 'android' ? 6 : 0,
  },
  summaryContainer: {
    position: 'relative',
    marginBottom: verticalScale(8),
  },
  summaryImageWrapper: {
    width: moderateScale(160),
    height: moderateScale(110),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    position: 'relative',
    marginRight: moderateScale(16),
  },
  summaryImage: {
    width: '100%',
    height: '100%',
  },
  summaryContent: {
    flex: 1,
  },
  summaryFavoriteButton: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: '#FFFFFFCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryFavoriteIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#E63946',
  },
  summaryLabel: {
    position: 'absolute',
    bottom: moderateScale(12),
    left: moderateScale(14),
    backgroundColor: '#1B516B',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(4),
  },
  summaryLabelText: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  summaryRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(6),
  },
  summaryRatingIcon: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(6),
  },
  summaryRatingText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#14233A',
  },
  summaryTitle: {
    fontSize: moderateScale(19),
    fontWeight: '700',
    color: '#14233A',
    marginBottom: verticalScale(4),
  },
  summaryLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(2),
  },
  summaryLocationIcon: {
    width: moderateScale(12),
    height: moderateScale(12),
    tintColor: '#6C7380',
    marginRight: moderateScale(6),
  },
  summaryLocationText: {
    fontSize: moderateScale(12),
    color: '#6C7380',
    flex: 1,
  },
  sectionHeading: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#14233A',
    marginBottom: verticalScale(12),
    marginTop: verticalScale(20),
  },
  input: {
    backgroundColor: '#F6F7FB',
    borderColor: '#F6F7FB',
    borderRadius: moderateScale(22),
    paddingVertical: verticalScale(18),
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(12),
  },
  inputText: {
    fontSize: moderateScale(16),
    color: '#14233A',
    fontWeight: '600',
  },
  priceInputWrapper: {
    position: 'relative',
    marginBottom: verticalScale(12),
  },
  priceInput: {
    marginBottom: 0,
  },
  inputWithSuffix: {
    paddingRight: moderateScale(36),
  },
  inputSuffix: {
    position: 'absolute',
    right: moderateScale(20),
    top: verticalScale(18),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#14233A',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  pillWrapper: {
    minWidth: moderateScale(71),
  },
  pillWrapperSpacing: {
    marginRight: moderateScale(10),
  },
  pillContent: {
    minWidth: moderateScale(71),
    height: moderateScale(47),
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(24),
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  pillSelected: {
    backgroundColor: '#17455C',
  },
  pillLabel: {
    fontSize: moderateScale(16),
    color: '#27496D',
    fontWeight: '600',
  },
  pillSelectedText: {
    color: '#FFFFFF',
  },
  pillsGrid: {
    flexDirection: 'column',
  },
  pillsRowSpacing: {
    marginTop: verticalScale(12),
  },
  categoryPillWrapper: {
    minWidth: moderateScale(78),
  },
  categoryPillSpacing: {
    marginRight: moderateScale(10),
  },
  categoryPillContent: {
    minWidth: moderateScale(78),
    height: moderateScale(47),
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(24),
    justifyContent: 'center',
    backgroundColor: '#F5F7FB',
  },
  categoryPillSelected: {
    backgroundColor: '#17455C',
  },
  categoryPillLabel: {
    fontSize: moderateScale(15),
    color: '#27496D',
    fontWeight: '600',
  },
  categoryPillSelectedText: {
    color: '#FFFFFF',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  addressIconCircle: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  addressText: {
    flex: 1,
    color: '#3B4F6C',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(20),
  },
  locationCard: {
    width: '100%',
    height: verticalScale(240),
    borderRadius: moderateScale(25),
    overflow: 'hidden',
    marginBottom: verticalScale(12),
    shadowColor: '#1B516B',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 18 },
    shadowRadius: 36,
    elevation: 8,
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#E3EBF9',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  locationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: verticalScale(18),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  locationOverlayText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#182C5B',
  },
  photosGrid: {
    marginBottom: verticalScale(12),
  },
  photosRow: {
    flexDirection: 'row',
    columnGap: PHOTO_GAP,
    marginBottom: PHOTO_GAP,
  },
  photoWrapper: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: moderateScale(18),
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoRemoveButton: {
    position: 'absolute',
    top: moderateScale(8),
    right: moderateScale(8),
  },
  removeIconCircle: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: '#F56C6C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIconText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  addPhotoButton: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: moderateScale(18),
    backgroundColor: '#F5F7FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoPlus: {
    fontSize: moderateScale(32),
    color: '#17455C',
    fontWeight: '600',
  },
  intervalToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(12),
    marginTop: verticalScale(10),
  },
  intervalButton: {
    flex: 1,
    height: verticalScale(47),
    borderRadius: moderateScale(18),
    backgroundColor: '#EEF2F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  intervalButtonActive: {
    backgroundColor: '#17455C',
  },
  intervalButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#6C7380',
  },
  intervalButtonTextActive: {
    color: '#FFFFFF',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F8FB',
    paddingHorizontal: moderateScale(24),
    height: verticalScale(68),
    borderRadius: moderateScale(24),
    marginBottom: verticalScale(12),
  },
  featureLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#14233A',
    textTransform: 'capitalize',
  },
  featureCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(14),
  },
  counterButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#E2E8F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#27496D',
  },
  counterValue: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#14233A',
  },
  roomsRow: {
    flexDirection: 'row',
    columnGap: moderateScale(12),
    marginBottom: verticalScale(12),
  },
  roomPill: {
    width: scale(94),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: '#EEF2F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomPillActive: {
    backgroundColor: '#17455C',
  },
  roomPillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(8),
  },
  roomIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
  },
  roomPillText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#6C7380',
  },
  roomPillTextActive: {
    color: '#FFFFFF',
  },
  facilitiesGrid: {
    rowGap: verticalScale(10),
    marginBottom: verticalScale(120),
  },
  facilitiesRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: moderateScale(10),
  },
  facilityPill: {
    minWidth: scale(100),
    height: verticalScale(45),
    borderRadius: moderateScale(20),
    backgroundColor: '#EEF2F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  facilityPillActive: {
    backgroundColor: '#17455C',
  },
  facilityPillText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#3B4F6C',
  },
  facilityPillTextActive: {
    color: '#FFFFFF',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.select({ ios: verticalScale(24), android: verticalScale(18) }),
    paddingHorizontal: GRID_HORIZONTAL_PADDING,
  },
  updateButton: {
    height: verticalScale(56),
    borderRadius: moderateScale(18),
    backgroundColor: '#E63946',
    justifyContent: 'center',
  },
  updateButtonText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  successSheetContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  successSheet: {
    width: '100%',
    maxWidth: scale(360),
    alignSelf: 'center',
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    paddingHorizontal: moderateScale(24),
    paddingBottom: verticalScale(32),
  },
  successHandle: {
    backgroundColor: '#C2C9D2',
    marginBottom: verticalScale(24),
  },
  successMessage: {
    fontSize: moderateScale(20),
    fontWeight: '500',
    color: '#14233A',
  },
  successHighlight: {
    color: '#0E5675',
    fontWeight: '700',
  },
  successWarning: {
    fontSize: moderateScale(13),
    color: '#9AA4B2',
    marginBottom: verticalScale(28),
  },
  successButtonContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  successConfirmButton: {
    width: '100%',
    backgroundColor: '#E63946',
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(18),
    borderWidth: 0,
  },
  successConfirmText: {
    color: '#FFFFFF',
    fontSize: moderateScale(17),
    fontWeight: '700',
  },
  successIconWrapper: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconOuter: {
    width: moderateScale(128),
    height: moderateScale(128),
    borderRadius: moderateScale(64),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconInner: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconCheck: {
    fontSize: moderateScale(36),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default EditListingScreen;
