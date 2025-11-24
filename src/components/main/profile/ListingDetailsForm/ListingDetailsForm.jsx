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
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenHeader, Button } from '../../../../components/common';
import Input from '../../../../components/common/Input/Input';
import ConfirmationBottomSheet from '../../../../components/common/buttomSheet/ConfirmationBottomSheet';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const FEATURE_KEYS = ['bedroom', 'bathroom', 'balcony'];
const ROOM_OPTIONS = [2, 4, 6, 8];
const FACILITY_OPTIONS = [
  ['Parking Lot', 'Pet Allowed'],
  ['Garden', 'Gym', 'Park'],
  ['Home theatre', "Kid's Friendly"],
];

const defaultInitialValues = {
  sellPrice: '180000',
  rentPrice: '315',
  rentInterval: 'monthly',
  features: { bedroom: 3, bathroom: 2, balcony: 2 },
  totalRooms: 8,
  facilities: ['Parking Lot', 'Pet Allowed', 'Garden'],
};

const ListingDetailsForm = ({
  headerTitle = 'Add Listing',
  mode = 'add',
  initialValues = {},
  listingSummary,
  ctaLabel = 'Finish',
  secondaryActionLabel = 'Add More',
  successConfig,
  errorConfig,
  onBack = () => {},
  onSubmit = () => {},
  onSuccessSecondary = () => {},
  onSuccessConfirm = () => {},
  onErrorPrimary = () => {},
}) => {
  const memoizedInitial = useMemo(() => {
    return {
      ...defaultInitialValues,
      ...initialValues,
      features: { ...defaultInitialValues.features, ...(initialValues.features || {}) },
      facilities: initialValues.facilities || defaultInitialValues.facilities,
    };
  }, [initialValues]);

  const [sellPrice, setSellPrice] = useState(memoizedInitial.sellPrice);
  const [rentPrice, setRentPrice] = useState(memoizedInitial.rentPrice);
  const [rentInterval, setRentInterval] = useState(memoizedInitial.rentInterval);
  const [features, setFeatures] = useState(memoizedInitial.features);
  const [totalRooms, setTotalRooms] = useState(memoizedInitial.totalRooms);
  const [facilities, setFacilities] = useState(memoizedInitial.facilities);
  const [successSheetVisible, setSuccessSheetVisible] = useState(false);
  const [errorSheetVisible, setErrorSheetVisible] = useState(false);

  const hasSuccessSheet = !!successConfig;
  const hasErrorSheet = !!errorConfig;

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

  const handleSubmit = () => {
    const payload = {
      sellPrice,
      rentPrice,
      rentInterval,
      features,
      totalRooms,
      facilities,
      mode,
    };
    onSubmit(payload);
  };

  const handlePrimaryPress = () => {
    const hasSellPrice = !!sellPrice?.toString().trim();
    const hasRentPrice = !!rentPrice?.toString().trim();

    if (!hasSellPrice || !hasRentPrice) {
      if (hasErrorSheet) {
        setErrorSheetVisible(true);
      } else {
        onErrorPrimary();
      }
      return;
    }

    handleSubmit();

    if (hasSuccessSheet) {
      setSuccessSheetVisible(true);
    } else {
      onSuccessConfirm();
    }
  };

  const handleSuccessCancel = () => {
    setSuccessSheetVisible(false);
    onSuccessSecondary();
  };

  const handleSuccessConfirm = () => {
    setSuccessSheetVisible(false);
    onSuccessConfirm();
  };

  const handleErrorPrimary = () => {
    setErrorSheetVisible(false);
    onErrorPrimary();
  };

  const renderSuccessIcon = () => (
    <View style={styles.successIconWrapper}>
      <LinearGradient
        colors={['rgba(36, 92, 88, 0.2)', 'rgba(123, 207, 76, 0.12)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.successIconOuter}
      >
        <LinearGradient
          colors={['#1E6F6B', '#7BD74B']}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.successIconInner}
        >
          <Text style={styles.successIconCheck}>✓</Text>
        </LinearGradient>
      </LinearGradient>
    </View>
  );

  const renderErrorIcon = () => (
    <View style={styles.errorIconWrapper}>
      <LinearGradient
        colors={['rgba(16, 64, 102, 0.18)', 'rgba(16, 64, 102, 0.05)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.errorIconOuter}
      >
        <LinearGradient
          colors={['#2C4F69', '#4B6F8C']}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.errorIconInner}
        >
          <Text style={styles.errorIconMark}>!</Text>
        </LinearGradient>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader onBackPress={onBack} title={headerTitle} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {listingSummary && (
          <View style={styles.summaryCard}>
            <Image
              source={listingSummary.image}
              style={styles.summaryImage}
              resizeMode="cover"
            />
            <View style={styles.summaryContent}>
              <View style={styles.summaryLabelRow}>
                <Text style={styles.summaryLabel}>{listingSummary.type || 'House'}</Text>
                {listingSummary.rating && (
                  <Text style={styles.summaryRating}>⭐ {listingSummary.rating}</Text>
                )}
              </View>
              <Text style={styles.summaryTitle} numberOfLines={1}>
                {listingSummary.title}
              </Text>
              {listingSummary.location && (
                <Text style={styles.summaryLocation} numberOfLines={2}>
                  {listingSummary.location}
                </Text>
              )}
            </View>
          </View>
        )}

        <Text style={styles.heading}>
          <Text style={styles.headingAccent}>
            {mode === 'edit' ? 'Update your' : 'Almost finish,'}
          </Text>{' '}
          {mode === 'edit' ? 'listing details' : 'complete\nthe listing'}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sell Price</Text>
          <View style={styles.inputWrapper}>
            <Input
              value={sellPrice}
              onChangeText={setSellPrice}
              placeholder="$ 0"
              keyboardType="numeric"
              style={styles.input}
              inputStyle={[styles.inputText, styles.inputWithSuffixPadding]}
            />
            <Text style={styles.inputSuffix}>$</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rent Price</Text>
          <View style={styles.inputWrapper}>
            <Input
              value={rentPrice}
              onChangeText={setRentPrice}
              placeholder="$ 0 /month"
              keyboardType="numeric"
              style={styles.input}
              inputStyle={[styles.inputText, styles.inputWithSuffixPadding]}
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.roomsRow}
          >
            {ROOM_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.roomPill, totalRooms === option && styles.roomPillActive]}
                onPress={() => setTotalRooms(option)}
                activeOpacity={0.8}
              >
                <View style={styles.roomPillContent}>
                  <Image source={require('../../../../assets/icons/Text.png')} style={styles.roomIcon} />
                  <Text style={[styles.roomPillText, totalRooms === option && styles.roomPillTextActive]}>
                    {option === 2 ? '< 4' : option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, styles.facilitiesSection]}>
          <Text style={styles.sectionTitle}>Environment / Facilities</Text>
          <View style={styles.facilitiesGrid}>
            {FACILITY_OPTIONS.map((row) => (
              <View key={row.join('-')} style={styles.facilitiesRow}>
                {row.map((facility) => {
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
            ))}
          </View>
        </View>

        <View style={styles.sectionSpacer} />
        <View style={styles.finishRow}>
          <Button
            title={ctaLabel}
            onPress={handlePrimaryPress}
            style={[styles.finishButton, mode === 'edit' && styles.updateButton]}
            textStyle={styles.finishButtonText}
            activeOpacity={0.9}
          />
          <TouchableOpacity
            style={styles.floatingNextButton}
            onPress={handlePrimaryPress}
            activeOpacity={0.85}
          >
            <LinearGradient colors={['#F5FFED', '#FFFFFF']} style={styles.floatingNextGradient}>
              <Text style={styles.floatingNextIcon}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {hasSuccessSheet && (
        <ConfirmationBottomSheet
          visible={successSheetVisible}
          onClose={() => setSuccessSheetVisible(false)}
          onCancel={handleSuccessCancel}
          onConfirm={handleSuccessConfirm}
          title={successConfig.title}
          highlightText={successConfig.highlightText}
          subtitle={successConfig.subtitle || ''}
          warningText={successConfig.warningText || ''}
          cancelText={successConfig.cancelText || secondaryActionLabel}
          confirmText={successConfig.confirmText || ctaLabel}
          containerStyle={styles.successSheetContainer}
          sheetStyle={styles.successSheet}
          handleStyle={styles.successHandle}
          messageTextStyle={styles.successMessage}
          highlightTextStyle={styles.successMessageHighlight}
          warningTextStyle={styles.successWarning}
          buttonContainerStyle={styles.successButtonContainer}
          cancelButtonStyle={styles.successCancelButton}
          cancelButtonTextStyle={styles.successCancelText}
          confirmButtonStyle={styles.successConfirmButton}
          confirmButtonTextStyle={styles.successConfirmText}
          messageAlign={successConfig.messageAlign || 'center'}
          renderIcon={renderSuccessIcon}
          showConfirmButton={successConfig.showConfirmButton !== false}
        />
      )}

      {hasErrorSheet && (
        <ConfirmationBottomSheet
          visible={errorSheetVisible}
          onClose={() => setErrorSheetVisible(false)}
          onCancel={handleErrorPrimary}
          showConfirmButton={false}
          title={errorConfig.title}
          highlightText={errorConfig.highlightText}
          subtitle={errorConfig.subtitle || ''}
          warningText={errorConfig.warningText}
          cancelText={errorConfig.cancelText || 'Back'}
          containerStyle={styles.errorSheetContainer}
          sheetStyle={styles.errorSheet}
          handleStyle={styles.errorHandle}
          messageTextStyle={styles.errorMessage}
          highlightTextStyle={styles.errorMessageHighlight}
          warningTextStyle={styles.errorWarning}
          buttonContainerStyle={styles.errorButtonContainer}
          cancelButtonStyle={styles.errorPrimaryButton}
          cancelButtonTextStyle={styles.errorPrimaryText}
          messageAlign={errorConfig.messageAlign || 'center'}
          renderIcon={renderErrorIcon}
        />
      )}
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
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    borderRadius: moderateScale(24),
    backgroundColor: '#F5F7FB',
    marginBottom: verticalScale(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.05 : 0,
    shadowRadius: 6,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  summaryImage: {
    width: moderateScale(90),
    height: moderateScale(90),
    borderRadius: moderateScale(18),
    marginRight: moderateScale(16),
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(4),
  },
  summaryLabel: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1B516B',
    backgroundColor: '#E3EEF5',
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
  },
  summaryRating: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#14233A',
  },
  summaryTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#14233A',
    marginBottom: verticalScale(4),
  },
  summaryLocation: {
    fontSize: moderateScale(13),
    color: '#6C7380',
    lineHeight: moderateScale(18),
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
    width: scale(327),
    height: verticalScale(70),
    borderRadius: moderateScale(25),
    marginBottom: verticalScale(12),
    backgroundColor: '#F5F7FB',
    borderWidth: 0,
    paddingHorizontal: moderateScale(20),
    alignSelf: 'center',
  },
  inputWrapper: {
    width: scale(327),
    alignSelf: 'center',
    position: 'relative',
  },
  inputWithSuffixPadding: {
    paddingRight: moderateScale(40),
  },
  inputSuffix: {
    position: 'absolute',
    right: moderateScale(20),
    top: '50%',
    transform: [{ translateY: -verticalScale(8) }],
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#14233A',
  },
  inputText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#14233A',
  },
  intervalToggle: {
    flexDirection: 'row',
    columnGap: moderateScale(10),
    marginTop: verticalScale(8),
  },
  intervalButton: {
    width: scale(89),
    height: verticalScale(47),
    borderRadius: moderateScale(20),
    backgroundColor: '#EEF2F6',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: scale(327),
    height: verticalScale(70),
    borderRadius: moderateScale(25),
    paddingHorizontal: moderateScale(24),
    alignSelf: 'center',
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
    columnGap: moderateScale(10),
  },
  roomPill: {
    width: scale(94),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(25),
    backgroundColor: '#EEF2F6',
  },
  roomPillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(8),
  },
  roomIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    resizeMode: 'contain',
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
    rowGap: verticalScale(10),
  },
  facilitiesRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: moderateScale(10),
  },
  facilityPill: {
    width: scale(102),
    height: verticalScale(47),
    borderRadius: moderateScale(20),
    backgroundColor: '#EEF2F6',
    justifyContent: 'center',
    alignItems: 'center',
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
  finishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(16),
    marginBottom: verticalScale(40),
    justifyContent: 'center',
  },
  finishButton: {
    width: scale(190),
    height: verticalScale(54),
    borderRadius: moderateScale(10),
    backgroundColor: '#E63946',
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: '#21628A',
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
  successSheetContainer: {
    justifyContent: 'flex-end',
  },
  successSheet: {
    width: scale(375),
    maxWidth: '100%',
    height: verticalScale(467),
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    paddingHorizontal: moderateScale(24),
    paddingTop: verticalScale(24),
    alignItems: 'center',
  },
  successHandle: {
    marginBottom: verticalScale(16),
    backgroundColor: '#D1D6DE',
  },
  successIconWrapper: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconOuter: {
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconInner: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconCheck: {
    fontSize: moderateScale(42),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  successMessage: {
    fontSize: moderateScale(22),
    color: '#14233A',
    fontWeight: '600',
  },
  successMessageHighlight: {
    color: '#17455C',
    fontWeight: '700',
  },
  successWarning: {
    fontSize: moderateScale(14),
    color: '#6C7380',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(32),
    textAlign: 'center',
  },
  successButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    columnGap: moderateScale(10),
    justifyContent: 'center',
  },
  successCancelButton: {
    width: scale(158.5),
    height: verticalScale(69),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#E0E6EF',
    paddingVertical: verticalScale(22),
    paddingHorizontal: moderateScale(19),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCancelText: {
    color: '#17455C',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  successConfirmButton: {
    width: scale(158.5),
    height: verticalScale(69),
    backgroundColor: '#E63946',
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(22),
    paddingHorizontal: moderateScale(19),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successConfirmText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  errorSheetContainer: {
    justifyContent: 'flex-end',
  },
  errorSheet: {
    width: scale(375),
    maxWidth: '100%',
    height: verticalScale(467),
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    paddingHorizontal: moderateScale(24),
    paddingTop: verticalScale(24),
    alignItems: 'center',
  },
  errorHandle: {
    marginBottom: verticalScale(16),
    backgroundColor: '#D1D6DE',
  },
  errorIconWrapper: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIconOuter: {
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIconInner: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIconMark: {
    fontSize: moderateScale(42),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  errorMessage: {
    fontSize: moderateScale(22),
    color: '#14233A',
    fontWeight: '600',
  },
  errorMessageHighlight: {
    color: '#17455C',
    fontWeight: '700',
  },
  errorWarning: {
    fontSize: moderateScale(14),
    color: '#6C7380',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(32),
    textAlign: 'center',
  },
  errorButtonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  errorPrimaryButton: {
    width: 180,
    height: 69,
    borderRadius: 10,
    backgroundColor: '#E63946',
    opacity: 1,
    paddingTop: 25,
    paddingRight: 19,
    paddingBottom: 25,
    paddingLeft: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorPrimaryText: {
    width: 114,
    height: 25,
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
    opacity: 1,
    textAlign: 'center',
  },
});

export default ListingDetailsForm;


