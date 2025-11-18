import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon } from '../../../../components/common';
import PropertyMapView from '../../../../components/common/PropertyMapView/PropertyMapView';
import {
  scale,
  verticalScale,
  moderateScale,
  responsiveWidth,
} from '../../../../utils/layout';

const ChooseLocationScreen = ({ navigation }) => {
  const mapProperties = useMemo(
    () => [
      {
        id: 'primary-location',
        title: 'Jl. Bambu II',
        location: 'Srengseng, Jakarta 11630',
        latitude: -6.2024,
        longitude: 106.7715,
        image: require('../../../../assets/images/home.png'),
      },
    ],
    []
  );

  const handleBack = () => navigation.goBack();

  const handleConfirm = () => {
    const selected = {
      coordinate: {
        latitude: mapProperties[0].latitude,
        longitude: mapProperties[0].longitude,
      },
      title: 'Srengseng, Kembangan',
      address: 'West Jakarta City, Jakarta 11630',
    };

    navigation.navigate({
      name: 'AddLocation',
      params: { selectedLocation: selected },
      merge: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.mapContainer}>
        <PropertyMapView
          properties={mapProperties}
          onPropertyPress={() => {}}
          onNearbyPress={() => {}}
          showNearbyButton={false}
          showPropertyCards={false}
          containerStyle={styles.mapView}
          mapStyle={styles.map}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <View style={styles.backButtonCircle}>
            <Icon name="backArrow" size={moderateScale(18)} color="#1F4C6B" />
          </View>
        </TouchableOpacity>

        <LinearGradient
          colors={['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.searchBar}
        >
          <Icon name="search" size={moderateScale(18)} color="#677294" />
          <RNText style={styles.searchPlaceholder}>Find location</RNText>
          <Icon name="mic" size={moderateScale(18)} color="#677294" />
        </LinearGradient>

        <TouchableOpacity style={styles.centerLocationButton} activeOpacity={0.8}>
          <Icon name="Center Location" size={moderateScale(22)} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.locationCard}>
          <RNText style={styles.locationTitle}>Location detail</RNText>
          <View style={styles.locationCardContent}>
            <View style={styles.locationIconWrapper}>
              <Icon name="location" size={moderateScale(18)} color="#1F4C6B" />
            </View>
            <View style={styles.locationTextWrapper}>
              <RNText style={styles.locationAddressTitle}>
                Srengseng, Kembangan
              </RNText>
              <RNText style={styles.locationAddressSubtitle}>
                West Jakarta City, Jakarta 11630
              </RNText>
            </View>
          </View>
        </View>

        <Button
          title="Choose your location"
          onPress={handleConfirm}
          style={styles.confirmButton}
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
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapView: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(16),
    left: responsiveWidth(5),
    zIndex: 30,
  },
  backButtonCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(19, 35, 64, 0.12)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  searchBar: {
    position: 'absolute',
    top: verticalScale(100),
    left: responsiveWidth(6),
    right: responsiveWidth(6),
    height: verticalScale(70),
    borderRadius: verticalScale(35),
    paddingHorizontal: scale(22),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(18),
    shadowColor: 'rgba(19, 35, 64, 0.14)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 20,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#677294',
  },
  centerLocationButton: {
    position: 'absolute',
    bottom: verticalScale(240),
    right: responsiveWidth(7),
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: '#1F4C6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(19, 35, 64, 0.18)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  locationCard: {
    position: 'absolute',
    width: scale(327),
    height: verticalScale(133),
    //borderRadius: 25,
    left: responsiveWidth(6),
    bottom: verticalScale(90),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: verticalScale(20),
    paddingHorizontal: verticalScale(20),
    shadowColor: 'rgba(19, 35, 64, 0.12)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  locationTitle: {
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: moderateScale(18),
    color: '#1F2A44',
    marginBottom: verticalScale(12),
  },
  locationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(16),
  },
  locationIconWrapper: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#EAF1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationTextWrapper: {
    flex: 1,
  },
  locationAddressTitle: {
    fontFamily: 'Lato',
   // fontWeight: '600',
  //  fontSize: moderateScale(16),
    color: '#1F2A44',
  },
  locationAddressSubtitle: {
    marginTop: verticalScale(4),
    fontFamily: 'Lato',
    fontSize: moderateScale(13),
    color: '#677294',
  },
  confirmButton: {
    position: 'absolute',
    width: scale(278),
    height: verticalScale(63),
    borderRadius: 10,
    alignSelf: 'center',
    bottom: verticalScale(12),
  },
});

export default ChooseLocationScreen;


