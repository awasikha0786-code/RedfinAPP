import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenHeader, Button, Icon } from '../../../../components/common';
import PropertyMapView from '../../../../components/common/PropertyMapView/PropertyMapView';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const DEFAULT_ADDRESS = 'Jl. Cisangku, Citarum, Kec. Bandung Wetan,\nKota Bandung, Jawa Barat 40115';

const AddListingLocationScreen = ({ navigation, route }) => {
  const listingData = route?.params || {};
  const mapProperties = [
    {
      id: 'location-pin',
      title: listingData.listingName || 'Listing Location',
      location: listingData.address || 'Jl. Cisangku, Citarum',
      latitude: listingData.latitude || -6.9025,
      longitude: listingData.longitude || 107.6191,
      image: require('../../../../assets/images/home.png'),
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectOnMap = () => {
    console.log('Select on the map pressed');
    // TODO: integrate with map picker when available
  };

  const handleNext = () => {
    navigation.navigate('AddListingPhotos', listingData);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader onBackPress={handleBack} title="Add Listing" />

      <View style={styles.content}>
        <Text style={styles.heading}>
          Where is the <Text style={styles.headingAccent}>location?</Text>
        </Text>

        <View style={styles.addressRow}>
          <LinearGradient
            colors={['#F4F7FF', '#EAF2FF']}
            style={styles.addressIconCircle}
          >
            <Icon name="location" size={moderateScale(20)} color="#17455C" />
          </LinearGradient>
          <Text style={styles.addressText}>
            {listingData.address || DEFAULT_ADDRESS}
          </Text>
        </View>

        <View style={styles.locationCard}>
          <PropertyMapView
            properties={mapProperties}
            showNearbyButton={false}
            showPropertyCards={false}
            containerStyle={styles.mapViewContainer}
            mapStyle={styles.mapView}
          />

          <TouchableOpacity
            onPress={handleSelectOnMap}
            activeOpacity={0.7}
            style={styles.mapOverlay}
          >
            <Text style={styles.locationFooterText}>Select on the map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.floatingBackButton} onPress={handleBack} activeOpacity={0.85}>
          <LinearGradient
            colors={['#E9F8EF', '#FFFFFF']}
            style={styles.floatingBackGradient}
          >
            <Icon name="arrow" size={moderateScale(20)} color="#14233A" />
          </LinearGradient>
        </TouchableOpacity>

        <Button
          title="Next"
          onPress={handleNext}
          style={styles.nextButton}
          textStyle={styles.nextButtonText}
          activeOpacity={0.9}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: Math.max(24, SCREEN_WIDTH * 0.06),
    paddingTop: verticalScale(24),
  },
  heading: {
    fontSize: moderateScale(26),
    fontWeight: '600',
    color: '#14233A',
    marginBottom: verticalScale(32),
  },
  headingAccent: {
    color: '#17455C',
    fontWeight: '700',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  addressIconCircle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(14),
  },
  addressText: {
    flex: 1,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(20),
    color: '#3B4F6C',
    letterSpacing: 0.36,
  },
  locationCard: {
    width: Math.min(moderateScale(327), SCREEN_WIDTH - moderateScale(48)),
    height: verticalScale(356),
    borderRadius: moderateScale(25),
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: verticalScale(24),
    shadowColor: '#1B516B',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 18 },
    shadowRadius: 36,
    elevation: 8,
    backgroundColor: '#FFFFFF',
  },
  mapViewContainer: {
    flex: 1,
    backgroundColor: '#E3EBF9',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: verticalScale(18),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  locationFooterText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#182C5B',
    textAlign: 'center',
    textTransform: 'none',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Math.max(24, SCREEN_WIDTH * 0.06),
    paddingBottom: Platform.select({ ios: verticalScale(24), android: verticalScale(18) }),
    paddingTop: verticalScale(12),
    backgroundColor: 'transparent',
  },
  floatingBackButton: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    overflow: 'hidden',
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  floatingBackGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(32),
  },
  nextButton: {
    flex: 1,
    marginLeft: moderateScale(24),
    height: verticalScale(64),
    borderRadius: moderateScale(20),
    backgroundColor: '#E63946',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    textTransform: 'none',
    color: '#FFFFFF',
  },
});

export default AddListingLocationScreen;


