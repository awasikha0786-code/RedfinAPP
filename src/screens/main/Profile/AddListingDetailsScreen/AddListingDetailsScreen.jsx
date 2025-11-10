import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenHeader, Button, Icon } from '../../../../components/common';
import Input from '../../../../components/common/Input/Input';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const FEATURE_KEYS = ['bedroom', 'bathroom', 'balcony'];
const ROOM_OPTIONS = [2, 4, 6, 8];
const FACILITY_OPTIONS = [
  'Parking Lot',
  'Pet Allowed',
  'Garden',
  'Gym',
  'Park',
  'Home theatre',
  "Kid's Friendly",
];

const AddListingDetailsScreen = ({ navigation, route }) => {
  const initialState = useMemo(
    () => ({
      sellPrice: route?.params?.sellPrice || '180000',
      rentPrice: route?.params?.rentPrice || '315',
      rentInterval: route?.params?.rentInterval || 'monthly',
      features: route?.params?.features || { bedroom: 3, bathroom: 2, balcony: 2 },
      totalRooms: route?.params?.totalRooms || 8,
      facilities: route?.params?.facilities || ['Parking Lot', 'Pet Allowed', 'Garden'],
    }),
    [route?.params]
  );

  const [sellPrice, setSellPrice] = useState(initialState.sellPrice);
  const [rentPrice, setRentPrice] = useState(initialState.rentPrice);
  const [rentInterval, setRentInterval] = useState(initialState.rentInterval);
  const [features, setFeatures] = useState(initialState.features);
  const [totalRooms, setTotalRooms] = useState(initialState.totalRooms);
  const [facilities, setFacilities] = useState(initialState.facilities);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFeatureChange = (key, delta) => {
    setFeatures((prev) => {
      const nextValue = Math.max(0, (prev[key] || 0) + delta);
      return { ...prev, [key]: nextValue };
    });
  };

  const toggleFacility = (item) => {
    setFacilities((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  const handleFinish = () => {
    navigation.navigate('AddPaymentMethod', {
      ...route?.params,
      sellPrice,
      rentPrice,
      rentInterval,
      features,
      totalRooms,
      facilities,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader onBackPress={handleBack} title="Add Listing" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          <Text style={styles.headingAccent}>Almost finish,</Text>{'\n'}complete the listing
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sell Price</Text>
          <Input
            value={sellPrice}
            onChangeText={setSellPrice}
            placeholder="$ 0"
            keyboardType="numeric"
            style={styles.input}
            inputStyle={styles.inputText}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rent Price</Text>
          <Input
            value={rentPrice}
            onChangeText={setRentPrice}
            placeholder="$ 0 /month"
            keyboardType="numeric"
            style={styles.input}
            inputStyle={styles.inputText}
          />

          <View style={styles.intervalToggle}>
            <TouchableOpacity
              style={[
                styles.intervalButton,
                rentInterval === 'monthly' && styles.intervalButtonActive,
              ]}
              onPress={() => setRentInterval('monthly')}
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Features</Text>
          {FEATURE_KEYS.map((key) => (
            <View key={key} style={styles.featureRow}>
              <Text style={styles.featureLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Rooms</Text>
          <View style={styles.roomsRow}>
            {ROOM_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.roomPill, totalRooms === option && styles.roomPillActive]}
                onPress={() => setTotalRooms(option)}
                activeOpacity={0.8}
              >
                <Text style={[styles.roomPillText, totalRooms === option && styles.roomPillTextActive]}>
                  {option === 2 ? '< 4' : option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.facilitiesSection]}>
          <Text style={styles.sectionTitle}>Environment / Facilities</Text>
          <View style={styles.facilitiesGrid}>
            {FACILITY_OPTIONS.map((facility) => {
              const selected = facilities.includes(facility);
              return (
                <TouchableOpacity
                  key={facility}
                  style={[styles.facilityPill, selected && styles.facilityPillActive]}
                  onPress={() => toggleFacility(facility)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.facilityPillText, selected && styles.facilityPillTextActive]}>
                    {facility}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionSpacer} />
        <View style={styles.finishRow}>
          <Button
            title="Finish"
            onPress={handleFinish}
            style={styles.finishButton}
            textStyle={styles.finishButtonText}
            activeOpacity={0.9}
          />
          <TouchableOpacity style={styles.floatingNextButton} onPress={handleFinish} activeOpacity={0.85}>
            <LinearGradient
              colors={['#F5FFED', '#FFFFFF']}
              style={styles.floatingNextGradient}
            >
              <Text style={styles.floatingNextIcon}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Math.max(24, SCREEN_WIDTH * 0.06),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(24),
  },
  heading: {
    fontSize: moderateScale(28),
    fontWeight: '600',
    color: '#14233A',
    marginBottom: verticalScale(24),
    lineHeight: moderateScale(34),
  },
  headingAccent: {
    color: '#17455C',
    fontWeight: '700',
  },
  section: {
    marginBottom: verticalScale(28),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#14233A',
    marginBottom: verticalScale(12),
  },
  input: {
    height: verticalScale(64),
    borderRadius: moderateScale(22),
    marginBottom: verticalScale(12),
    backgroundColor: '#F5F7FB',
    borderWidth: 0,
    paddingHorizontal: moderateScale(20),
  },
  inputText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#14233A',
  },
  intervalToggle: {
    flexDirection: 'row',
    columnGap: moderateScale(12),
    marginTop: verticalScale(8),
  },
  intervalButton: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(22),
    backgroundColor: '#EEF2F6',
  },
  intervalButtonActive: {
    backgroundColor: '#0D4A5B',
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
    marginBottom: verticalScale(12),
    backgroundColor: '#F7F8FB',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(14),
  },
  featureLabel: {
    fontSize: moderateScale(14),
    color: '#14233A',
    fontWeight: '500',
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
  },
  roomPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(24),
    backgroundColor: '#EEF2F6',
  },
  roomPillActive: {
    backgroundColor: '#0D4A5B',
  },
  roomPillText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#6C7380',
  },
  roomPillTextActive: {
    color: '#FFFFFF',
  },
  facilitiesSection: {
    marginBottom: verticalScale(80),
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(12),
  },
  facilityPill: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(24),
    backgroundColor: '#EEF2F6',
  },
  facilityPillActive: {
    backgroundColor: '#0D4A5B',
  },
  facilityPillText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#3B4F6C',
  },
  facilityPillTextActive: {
    color: '#FFFFFF',
  },
  sectionSpacer: {
    height: verticalScale(32),
  },
  bottomBar: {
    display: 'none',
  },
  finishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(16),
    marginBottom: verticalScale(40),
  },
  finishButton: {
    flex: 1,
    height: verticalScale(64),
    borderRadius: moderateScale(20),
    backgroundColor: '#E63946',
    justifyContent: 'center',
  },
  finishButtonText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    textTransform: 'none',
    color: '#FFFFFF',
  },
  floatingNextButton: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    overflow: 'hidden',
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  floatingNextGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(28),
  },
  floatingNextIcon: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#14233A',
  },
});

export default AddListingDetailsScreen;
