import React, { useMemo, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text as RNText } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions, useRoute } from '@react-navigation/native';
import { Button, Icon, SkipButton } from '../../../../components/common';
import PropertyMapView from '../../../../components/common/PropertyMapView/PropertyMapView';
import {
  scale,
  verticalScale,
  moderateScale,
  responsiveWidth,
} from '../../../../utils/layout';

const DEFAULT_COORDINATE = {
  latitude: 43.7696,
  longitude: 11.2558,
};

const AddLocationScreen = ({ navigation }) => {
  const route = useRoute();
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setSelectedLocation(route.params.selectedLocation);
      navigation.setParams?.({ selectedLocation: undefined });
    }
  }, [route.params?.selectedLocation, navigation]);

  const mapProperties = useMemo(() => {
    const coordinate = selectedLocation?.coordinate ?? DEFAULT_COORDINATE;
    const title = selectedLocation?.title ?? 'Selected location';
    const address = selectedLocation?.address ?? 'Set your preferred location';

    return [
      {
        id: 'featured-location',
        title,
        location: address,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        image: require('../../../../assets/images/home.png'),
      },
    ];
  }, [selectedLocation]);

  const handleComplete = () => {
    navigation.navigate('SelectRealEstateType');
  };

  const handleBack = () => navigation.goBack();
  const handleSkip = () => handleComplete();
  const handleNext = () => handleComplete();
  const handleSelectOnMap = () => navigation.navigate('ChooseLocation');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.headerWrapper}>
        <SkipButton onPress={handleSkip} style={styles.skipButton} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <View style={styles.backButtonCircle}>
            <Icon name="backArrow" size={moderateScale(18)} color="#1D3557" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textContainer}>
          <RNText style={styles.title}>
            Add your <RNText style={styles.titleHighlight}>location</RNText>
          </RNText>
          <RNText style={styles.subtitle}>
            You can edit this later on your account setting.
          </RNText>
        </View>

        <View style={styles.mapCard}>
          <View style={styles.mapWrapper}>
            <PropertyMapView
              properties={mapProperties}
              onPropertyPress={() => {}}
              onNearbyPress={() => {}}
              showNearbyButton={false}
              showPropertyCards={false}
              containerStyle={styles.mapContainer}
              mapStyle={styles.map}
            />

            <LinearGradient
              colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.5)']}
              style={styles.mapFooter}
            >
              <TouchableOpacity
                style={styles.mapFooterButton}
                activeOpacity={0.8}
                onPress={handleSelectOnMap}
              >
                <RNText style={styles.mapFooterText}>select on map</RNText>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        <TouchableOpacity style={styles.locationDetailCard} activeOpacity={0.8}>
          <View style={styles.locationIconWrapper}>
            <Icon name="location" size={moderateScale(16)} color="#204D6C" />
          </View>
          <View style={styles.locationDetailTextWrapper}>
            {selectedLocation ? (
              <>
                <RNText style={styles.locationDetailSubtitle}>{selectedLocation.title}</RNText>
                <RNText style={styles.locationDetailAddress}>{selectedLocation.address}</RNText>
              </>
            ) : (
              <RNText style={styles.locationHint}>Location detail</RNText>
            )}
          </View>
          <Icon
            name="right"
            size={scale(20)}
            style={styles.locationDetailArrow}
            color="#A7A7B7"
          />
        </TouchableOpacity>

        <View style={styles.progressWrapper}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <Button
          title="Next"
          onPress={handleNext}
          style={styles.NextButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerWrapper: {
    position: 'relative',
    paddingTop: verticalScale(36),
    paddingBottom: verticalScale(12),
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(24),
    left: scale(24),
    zIndex: 10,
  },
  skipButton: {
    position: 'absolute',
    top: verticalScale(31),
    right: scale(24),
    width: scale(86),
    height: verticalScale(38),
    borderRadius: 100,
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonCircle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(19, 35, 64, 0.12)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: responsiveWidth(7),
    paddingBottom: verticalScale(32),
  },
  textContainer: {
    width: '100%',
    marginTop: verticalScale(56),
    marginBottom: verticalScale(24),
  },
  title: {
    fontFamily: 'Lato',
    fontWeight: '500',

    fontSize: 25,
    lineHeight: 32,
    color: '#14233A',
    flexWrap: 'wrap',
  },
  titleHighlight: {
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: 25,
    lineHeight: 32,
    color: '#204D6C',
    height: 32,
  },
  subtitle: {
    marginTop: verticalScale(8),
    fontFamily: 'DM Sans',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#53587A',
    flexWrap: 'wrap',
  },
  mapCard: {
    borderRadius: moderateScale(26),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: verticalScale(24),
    shadowColor: 'rgba(20, 35, 58, 0.15)',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.18,
    shadowRadius: 32,
    elevation: 12,
  },
  mapWrapper: {
    width: '100%',
    height: verticalScale(320),
  },
  mapContainer: {
    height: verticalScale(320),
    borderRadius: moderateScale(26),
    overflow: 'hidden',
  },
  map: {
    borderRadius: moderateScale(26),
  },
  mapFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: verticalScale(-0),
    width: '100%',
    height: verticalScale(50),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapFooterButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,

  },
  mapFooterText: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(14),
    letterSpacing: 0.02 * moderateScale(14),
    color: '#1F4C6B',
    textTransform: 'none',
  },
  locationDetailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F4F8',
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(16),
    paddingHorizontal: verticalScale(18),
    marginBottom: verticalScale(24),
  },
  locationIconWrapper: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#E5EFFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: verticalScale(12),
  },
  locationDetailTextWrapper: {
    flex: 1,
  },
  locationHint: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.03 * 12,
    color: '#A1A5C1',
  },
  locationDetailSubtitle: {
    marginTop: verticalScale(4),
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(13),
    color: '#1F4C6B',
  },
  locationDetailAddress: {
    marginTop: verticalScale(2),
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(12),
    color: '#677294',
  },
  locationDetailArrow: {
  },
  progressWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(68),
    marginBottom: verticalScale(16),
  },
  progressTrack: {
    width: scale(212),
    height: verticalScale(4),
    borderRadius: verticalScale(2),
    backgroundColor: '#E6E0FF',
    overflow: 'hidden',
  },
  progressFill: {
    width: scale(90),
    height: '100%',
    backgroundColor: '#1F4C6B',
  },
  NextButton: {
    width: scale(278),
    height: verticalScale(63),
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(12),
  },
});

export default AddLocationScreen;


