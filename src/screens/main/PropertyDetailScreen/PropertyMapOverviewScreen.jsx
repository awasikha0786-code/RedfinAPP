import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import PropertyMapView from '../../../components/common/PropertyMapView/PropertyMapView';
import { PropertyMapStatPill } from '../../../components/main/propertyDetail';
import { moderateScale, scale, verticalScale } from '../../../utils/layout';

const DEFAULT_PROPERTY = {
  title: 'Sky Dandelions Apartment',
  location: 'Jakarta, Indonesia',
  address: 'St. Cikoko Timur, Kec. Pancoran, Jakarta Selatan, Indonesia 12770',
  image: require('../../../assets/images/login_image.png'),
};

const DEFAULT_FACILITY_SUMMARY = {
  hospitals: 1,
  gasStations: 2,
  schools: 1,
};

const BASE_COORDINATE = {
  latitude: -6.2607,
  longitude: 106.7816,
};

const createFallbackProperties = (property, nearby = []) => {
  const combined = [
    {
      id: 'property-base',
      title: property.title,
      location: property.location,
      latitude: property.latitude ?? BASE_COORDINATE.latitude,
      longitude: property.longitude ?? BASE_COORDINATE.longitude,
      image: property.image,
    },
    ...nearby,
  ];

  return combined.map((item, index) => {
    const latitude = item.latitude ?? BASE_COORDINATE.latitude + 0.01 * Math.sin(index * 1.5);
    const longitude = item.longitude ?? BASE_COORDINATE.longitude + 0.01 * Math.cos(index * 1.5);

    return {
      ...item,
      latitude,
      longitude,
      id: item.id || `map-property-${index}`,
      image: item.image || property.image,
    };
  });
};

const createFacilityPills = (summary) => {
  const parsed = summary || DEFAULT_FACILITY_SUMMARY;
  return [
    { id: 'hospitals', label: `${parsed.hospitals ?? 0} Hospital` },
    { id: 'gasStations', label: `${parsed.gasStations ?? 0} Gas stations` },
    { id: 'schools', label: `${parsed.schools ?? 0} Schools` },
  ];
};

const PropertyMapOverviewScreen = ({ navigation, route }) => {
  const property = route?.params?.property || DEFAULT_PROPERTY;
  const nearby = route?.params?.nearby || [];
  const facilitySummary = route?.params?.facilitySummary || property.nearbySummary || DEFAULT_FACILITY_SUMMARY;

  const facilityPills = useMemo(() => createFacilityPills(facilitySummary), [facilitySummary]);
  const mapProperties = useMemo(
    () => createFallbackProperties(property, nearby),
    [property, nearby]
  );

  const [activeFacility, setActiveFacility] = useState(facilityPills[0]?.id || null);

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.mapLayer}>
          <PropertyMapView
            properties={mapProperties}
            showNearbyButton={false}
            showPropertyCards={false}
            containerStyle={styles.mapWrapper}
            mapStyle={styles.map}
          />
          <View pointerEvents="none" style={styles.circleOverlay} />
        </View>

        <View style={styles.backButtonWrapper}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.85}>
            <Image
              source={require('../../../assets/icons/backArro.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.overlayContent}>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pillsContent}
            >
              {facilityPills.map((pill) => (
                <PropertyMapStatPill
                  key={pill.id}
                  label={pill.label}
                  active={activeFacility === pill.id}
                  onPress={() => setActiveFacility(pill.id)}
                  style={styles.pill}
                />
              ))}
            </ScrollView>
          </View>

          <View>
            <View style={styles.locationSelectorWrapper}>
              <TouchableOpacity style={styles.locationSelector} activeOpacity={0.85}>
                <Image
                  source={require('../../../assets/icons/Location.png')}
                  style={styles.locationSelectorIcon}
                  resizeMode="contain"
                />
                <Text style={styles.locationSelectorText}>{property.location || 'Jakarta, Indonesia'}</Text>
                <Image
                  source={require('../../../assets/icons/arrow-down.png')}
                  style={styles.locationSelectorCaret}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.locateMeButton} activeOpacity={0.85}>
                <Image
                  source={require('../../../assets/icons/Center Location.png')}
                  style={styles.locateMeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.locationDetailCard}>
              <View style={styles.locationDetailHeader}>
                <Text style={styles.locationDetailTitle}>Location detail</Text>
              </View>
              <View style={styles.locationDetailBody}>
                <View style={styles.locationDetailIconWrapper}>
                  <Image
                    source={require('../../../assets/icons/Location.png')}
                    style={styles.locationDetailIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.locationDetailAddress}>{property.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  mapLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  mapWrapper: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  circleOverlay: {
    position: 'absolute',
    width: '90%',
    aspectRatio: 1,
    borderRadius: scale(300),
    borderWidth: 2,
    borderColor: 'rgba(220, 0, 0, 0.6)',
    alignSelf: 'center',
    top: '10%',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: verticalScale(16),
    left: moderateScale(16),
    zIndex: 10,
  },
  backButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10213A',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  backIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    tintColor: '#1F2F4A',
  },
  overlayContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: verticalScale(80),
    paddingHorizontal: moderateScale(16),
    paddingBottom: verticalScale(24),
  },
  pillsContent: {
    columnGap: moderateScale(12),
  },
  pill: {
    minWidth: scale(120),
  },
  locationSelectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    width: moderateScale(163),
    height: verticalScale(50),
    backgroundColor: '#F5F4F8',
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: '#E4E6EC',
    paddingHorizontal: moderateScale(14),
    justifyContent: 'center',
    columnGap: moderateScale(6),
    marginRight: moderateScale(12),
  },
  locationSelectorIcon: {
    width: scale(16),
    height: scale(16),
    tintColor: '#1F4D70',
  },
  locationSelectorText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#1F2F4A',
  },
  locationSelectorCaret: {
    width: scale(12),
    height: scale(12),
    tintColor: '#7A88A0',
  },
  locateMeButton: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: '#4A6FA1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F1F2F',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  locateMeIcon: {
    width: scale(22),
    height: scale(22),
  },
  locationDetailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: moderateScale(32),
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(24),
    shadowColor: '#10213A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  locationDetailHeader: {
    marginBottom: verticalScale(16),
  },
  locationDetailTitle: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#14233A',
  },
  locationDetailBody: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(16),
  },
  locationDetailIconWrapper: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    backgroundColor: '#F1F3FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDetailIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: '#1F4D70',
  },
  locationDetailAddress: {
    flex: 1,
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#3A4A66',
    lineHeight: moderateScale(20),
  },
});

export default PropertyMapOverviewScreen;
