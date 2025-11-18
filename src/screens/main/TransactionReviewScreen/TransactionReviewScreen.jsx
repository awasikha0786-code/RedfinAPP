import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text as RNText, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../components/common/ScreenHeader/ScreenHeader';
import VoucherBottomSheet from '../../../components/common/buttomSheet/VoucherBottomSheet';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';
import { Icon } from '../../../components/common';

const TransactionReviewScreen = ({ navigation, route }) => {
  const property = route?.params?.property || {
    id: '1',
    title: 'Sky Dandelions',
    type: 'Apartment',
    location: 'Jakarta, Indonesia',
    image: require('../../../assets/images/login_image.png'),
    isFavorite: false,
  };

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [note, setNote] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [voucherSheetVisible, setVoucherSheetVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const paymentMethods = [
    {
      id: '1',
      type: 'mastercard',
      image: require('../../../assets/icons/Mastercard - Square.png'),
    },
    {
      id: '2',
      type: 'visa',
      image: require('../../../assets/icons/Visa - Square.png'),
    },
    {
      id: '3',
      type: 'mastercard',
      image: require('../../../assets/icons/Mastercard - Square.png'),
    },
  ];

  const handleNext = useCallback(() => {
    const selectedMethod = paymentMethods[selectedPaymentMethod];
    
    // Calculate period
    let period = '2 month'; // Default
    if (checkIn && checkOut) {
      // Simple calculation - you can enhance this with date parsing
      period = `${checkIn} - ${checkOut}`;
    }
    
    // Calculate discount based on voucher
    let discount = 0;
    if (selectedVoucher) {
      // Calculate 40% discount if voucher code contains "40" or similar logic
      const monthlyPayment = 220;
      const totalMonths = 2;
      const totalAmount = monthlyPayment * totalMonths;
      if (selectedVoucher.code.includes('40')) {
        discount = Math.round(totalAmount * 0.4);
      } else if (selectedVoucher.code.includes('20')) {
        discount = Math.round(totalAmount * 0.2);
      }
    }
    
    const transactionData = {
      period,
      monthlyPayment: 220,
      discount,
      selectedVoucher,
      selectedPaymentMethod: {
        ...selectedMethod,
        email: selectedMethod.type === 'paypal' ? '******an@email.com' : undefined,
        type: selectedMethod.type || 'mastercard',
      },
      checkIn,
      checkOut,
      note,
    };
    
    navigation.navigate('TransactionSummary', {
      property,
      transactionData,
    });
  }, [checkIn, checkOut, note, selectedPaymentMethod, selectedVoucher, paymentMethods, property, navigation]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader 
        onBackPress={() => navigation.goBack()}
        title="Transaction review"
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Property Card */}
        <View style={styles.propertyCard}>
          <View style={styles.propertyImageContainer}>
            <Image source={property.image} style={styles.propertyImage} resizeMode="cover" />
            <TouchableOpacity style={styles.heartButton} activeOpacity={0.8}>
              <View style={styles.heartCircle}>
                <Image
                  source={require('../../../assets/icons/Heart.png')}
                  style={styles.heartIcon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.propertyTypeTag}>
              <RNText style={styles.propertyTypeText}>{property.type}</RNText>
            </View>
          </View>
          <View style={styles.propertyContent}>
            <RNText style={styles.propertyTitle}>{property.title}</RNText>
            <RNText style={styles.propertyTypeLabel}>{property.type}</RNText>
            <View style={styles.locationRow}>
              <Icon name="location" size={moderateScale(14)} color="#72809D" />
              <RNText style={styles.locationText}>{property.location}</RNText>
            </View>
            <TouchableOpacity style={styles.rentButton} activeOpacity={0.8}>
              <RNText style={styles.rentButtonText}>Rent</RNText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Period Section */}
        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Period</RNText>
          <View style={styles.periodRow}>
            <View style={styles.dateInputContainer}>
              <Icon name="calendar" size={moderateScale(18)} color="#677294" />
              <TextInput
                style={styles.dateInput}
                placeholder="Check In"
                placeholderTextColor="#A1A5C1"
                value={checkIn}
                onChangeText={setCheckIn}
              />
            </View>
            <View style={styles.dateInputContainer}>
              <Icon name="calendar" size={moderateScale(18)} color="#677294" />
              <TextInput
                style={styles.dateInput}
                placeholder="Check Out"
                placeholderTextColor="#A1A5C1"
                value={checkOut}
                onChangeText={setCheckOut}
              />
            </View>
          </View>
        </View>

        {/* Note for Owner Section */}
        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Note for Owner</RNText>
          <View style={styles.noteInputContainer}>
            <Icon name="message" size={moderateScale(18)} color="#677294" />
            <TextInput
              style={styles.noteInput}
              placeholder="Write your note in here"
              placeholderTextColor="#A1A5C1"
              value={note}
              onChangeText={setNote}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Payment Method</RNText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paymentCardsContainer}
          >
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentCard,
                  index === selectedPaymentMethod && styles.paymentCardSelected
                ]}
                onPress={() => setSelectedPaymentMethod(index)}
                activeOpacity={0.9}
              >
                <Image
                  source={method.image}
                  style={styles.paymentCardImage}
                  resizeMode="cover"
                />
                <View style={styles.paymentCardCheckmark}>
                  {index === selectedPaymentMethod ? (
                    <View style={styles.checkmarkCircle}>
                      <RNText style={styles.checkmarkText}>✓</RNText>
                    </View>
                  ) : (
                    <View style={styles.checkmarkCircleEmpty} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Voucher Section */}
        {selectedVoucher ? (
          <View style={styles.voucherAppliedContainer}>
            <View style={styles.voucherAppliedHeader}>
              <RNText style={styles.voucherText}>Have a voucher?</RNText>
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => setVoucherSheetVisible(true)}
              >
                <RNText style={styles.voucherLink}>change voucher</RNText>
              </TouchableOpacity>
            </View>
            <View style={styles.voucherCard}>
              <View style={styles.voucherCodeButton}>
                <RNText style={styles.voucherCodeText}>{selectedVoucher.code}</RNText>
              </View>
              <View style={styles.voucherDetails}>
                <RNText style={styles.voucherTitle}>{selectedVoucher.title}</RNText>
                <RNText style={styles.voucherDescription}>{selectedVoucher.description}</RNText>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.voucherSection}>
            <RNText style={styles.voucherText}>Have a voucher?</RNText>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setVoucherSheetVisible(true)}
            >
              <RNText style={styles.voucherLink}>click in here</RNText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Voucher Bottom Sheet */}
      <VoucherBottomSheet
        visible={voucherSheetVisible}
        onClose={() => setVoucherSheetVisible(false)}
        onApplyVoucher={(voucher) => {
          console.log('Voucher applied:', voucher);
          setSelectedVoucher(voucher);
          setVoucherSheetVisible(false);
        }}
      />

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
          <RNText style={styles.nextButtonText}>Next</RNText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowButton} activeOpacity={0.8}>
          <View style={styles.arrowButtonCircle}>
            <Image
              source={require('../../../assets/icons/next_aero.png')}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: responsiveWidth(6),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(120),
  },
  propertyCard: {
    flexDirection: 'row',
    width: responsiveWidth(87),
    maxWidth: scale(327),
    height: verticalScale(156),
    borderRadius: scale(25),
    backgroundColor: '#F5F4F8',
    overflow: 'hidden',
    marginBottom: verticalScale(32),
    alignSelf: 'center',
  },
  propertyImageContainer: {
    width: scale(168),
    height: verticalScale(140),
    borderRadius: scale(18),
    overflow: 'hidden',
    position: 'relative',
    margin: scale(8),
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: scale(10),
    left: scale(10),
    zIndex: 10,
  },
  heartCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  heartIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: '#E84D71',
  },
  propertyTypeTag: {
    position: 'absolute',
    bottom: scale(10),
    left: scale(10),
    backgroundColor: '#1F2A44',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: scale(8),
  },
  propertyTypeText: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(12),
    color: '#FFFFFF',
  },
  propertyContent: {
    flex: 1,
    padding: scale(16),
    paddingTop: scale(4),
    justifyContent: 'flex-start',
  },
  propertyTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
    marginBottom: verticalScale(0),
  },
  propertyTypeLabel: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#72809D',
    marginBottom: verticalScale(2),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(2),
  },
  locationText: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(12),
    color: '#72809D',
    marginLeft: scale(6),
  },
  rentButton: {
    alignSelf: 'flex-end',
    width: scale(70),
    height: verticalScale(47),
    borderRadius: scale(25),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentButtonText: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: '#1F2A44',
  },
  section: {
    marginBottom: verticalScale(32),
  },
  sectionTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
    marginBottom: verticalScale(16),
  },
  periodRow: {
    flexDirection: 'row',
    gap: scale(12),
  },
  dateInputContainer: {
    width: scale(158.5),
    height: verticalScale(70),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    gap: scale(12),
  },
  dateInput: {
    flex: 1,
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#1F2A44',
    padding: 0,
  },
  noteInputContainer: {
    width: scale(327),
    height: verticalScale(70),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    gap: scale(12),
    alignSelf: 'center',
  },
  noteInput: {
    flex: 1,
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#1F2A44',
    padding: 0,
  },
  paymentCardsContainer: {
    gap: scale(12),
    paddingRight: responsiveWidth(6),
  },
  paymentCard: {
    width: scale(159),
    height: verticalScale(180),
    borderRadius: scale(25),
    position: 'relative',
    overflow: 'hidden',
  },
  paymentCardImage: {
    width: '100%',
    height: '100%',
  },
  paymentCardSelected: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  paymentCardCheckmark: {
    position: 'absolute',
    top: scale(16),
    left: scale(16),
  },
  checkmarkCircle: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: moderateScale(14),
    color: '#234F68',
    fontWeight: '700',
  },
  checkmarkCircleEmpty: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  voucherSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
    paddingHorizontal: responsiveWidth(6),
  },
  voucherAppliedContainer: {
    marginBottom: verticalScale(24),
    paddingHorizontal: responsiveWidth(6),
  },
  voucherAppliedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  voucherText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(18),
    letterSpacing: 0.03,
    color: '#252B5C',
  },
  voucherLink: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(10),
    lineHeight: verticalScale(9),
    letterSpacing: 0.03,
    textAlign: 'right',
    color: '#234F68',
  },
  voucherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: scale(20),
    padding: scale(16),
    gap: scale(12),
  },
  voucherCodeButton: {
    backgroundColor: '#234F68',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    minWidth: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  voucherCodeText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(14),
    color: '#FFFFFF',
  },
  voucherDetails: {
    flex: 1,
  },
  voucherTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(14),
    color: '#1F2A44',
    marginBottom: verticalScale(4),
  },
  voucherDescription: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(12),
    color: '#72809D',
  },
  bottomButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: verticalScale(24),
    paddingTop: verticalScale(12),
    backgroundColor: '#FFFFFF',
    shadowColor: '#10213A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -6 },
    elevation: 10,
    gap: scale(12),
  },
  nextButton: {
    width: scale(190),
    height: verticalScale(54),
    borderRadius: scale(10),
    backgroundColor: '#DE3341',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(16),
    color: '#FFFFFF',
  },
  arrowButton: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
  },
  arrowButtonCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ECEDF3',
    shadowColor: '#8BC83F',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  arrowIcon: {
    width: scale(15),
    height: scale(16),
    tintColor: '#1F2A44',
  },
});

export default TransactionReviewScreen;

