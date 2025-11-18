import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text as RNText, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../components/common/ScreenHeader/ScreenHeader';
import PaymentMethodBottomSheet from '../../../components/common/buttomSheet/PaymentMethodBottomSheet';
import TransactionSuccessBottomSheet from '../../../components/common/buttomSheet/TransactionSuccessBottomSheet';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';
import { Icon } from '../../../components/common';

const TransactionSummaryScreen = ({ navigation, route }) => {
  const property = route?.params?.property || {
    id: '1',
    title: 'Sky Dandelions',
    type: 'Apartment',
    location: 'Jakarta, Indonesia',
    image: require('../../../assets/images/login_image.png'),
    isFavorite: false,
  };

  const initialTransactionData = route?.params?.transactionData || {
    period: '2 month',
    monthlyPayment: 220,
    discount: 0,
    selectedVoucher: null,
    selectedPaymentMethod: {
      type: 'mastercard',
      email: undefined,
    },
    checkIn: '',
    checkOut: '',
    note: '',
  };

  const [transactionData, setTransactionData] = useState(initialTransactionData);
  const [paymentMethodSheetVisible, setPaymentMethodSheetVisible] = useState(false);
  const [successSheetVisible, setSuccessSheetVisible] = useState(false);
  
  const selectedPaymentMethod = transactionData.selectedPaymentMethod;
  const total = transactionData.monthlyPayment * 2 - transactionData.discount;

  const getPaymentMethodIcon = () => {
    if (selectedPaymentMethod?.type === 'paypal') {
      return require('../../../assets/icons/Paypal - Normal.png');
    } else if (selectedPaymentMethod?.type === 'visa') {
      return require('../../../assets/icons/Visa - Square.png');
    } else {
      return require('../../../assets/icons/Mastercard - Square.png');
    }
  };

  const getPaymentMethodDisplay = () => {
    if (selectedPaymentMethod?.type === 'paypal' && selectedPaymentMethod?.email) {
      return `******${selectedPaymentMethod.email.slice(-10)}`;
    }
    return selectedPaymentMethod?.type || 'Mastercard';
  };

  const handlePayRent = () => {
    // Handle payment logic
    console.log('Pay rent pressed', { property, transactionData, total });
    setSuccessSheetVisible(true);
  };

  const handleContinueExploring = () => {
    setSuccessSheetVisible(false);
    // Navigate to home or explore screen
    navigation.navigate('Tabs', { screen: 'Home' });
  };

  const handleSelectPaymentMethod = (method) => {
    setTransactionData({
      ...transactionData,
      selectedPaymentMethod: {
        type: method.type,
        email: undefined,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader 
        onBackPress={() => navigation.goBack()}
        title="Transaction summary"
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
            <View style={styles.locationRow}>
              <Icon name="location" size={moderateScale(14)} color="#72809D" />
              <RNText style={styles.locationText}>{property.location}</RNText>
            </View>
            <TouchableOpacity style={styles.rentButton} activeOpacity={0.8}>
              <RNText style={styles.rentButtonText}>Rent</RNText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Detail Section */}
        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Payment Detail</RNText>
          <View style={styles.paymentDetailCard}>
            <View style={styles.paymentDetailRow}>
              <RNText style={styles.paymentDetailLabel}>Period time</RNText>
              <RNText style={styles.paymentDetailValue}>{transactionData.period}</RNText>
            </View>
            <View style={styles.paymentDetailRow}>
              <RNText style={styles.paymentDetailLabel}>Monthly payment</RNText>
              <RNText style={styles.paymentDetailValue}>${transactionData.monthlyPayment}</RNText>
            </View>
            <View style={styles.paymentDetailRow}>
              <RNText style={styles.paymentDetailLabel}>Discount</RNText>
              {transactionData.discount > 0 ? (
                <RNText style={styles.paymentDetailDiscount}>-${transactionData.discount}</RNText>
              ) : (
                <RNText style={styles.paymentDetailValue}>$0</RNText>
              )}
            </View>
            <View style={styles.paymentDetailDivider} />
            <View style={styles.paymentDetailTotalRow}>
              <RNText style={styles.paymentDetailTotalLabel}>Total</RNText>
              <RNText style={styles.paymentDetailTotalValue}>$ {total}</RNText>
            </View>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <View style={styles.paymentMethodHeader}>
            <RNText style={styles.sectionTitle}>Payment Method</RNText>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setPaymentMethodSheetVisible(true)}
            >
              <RNText style={styles.changeLink}>change</RNText>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentMethodInput}>
            <Image
              source={getPaymentMethodIcon()}
              style={styles.paymentMethodIcon}
              resizeMode="contain"
            />
            <RNText style={styles.paymentMethodText}>{getPaymentMethodDisplay()}</RNText>
          </View>
        </View>
      </ScrollView>

      {/* Payment Method Bottom Sheet */}
      <PaymentMethodBottomSheet
        visible={paymentMethodSheetVisible}
        onClose={() => setPaymentMethodSheetVisible(false)}
        onSelectPaymentMethod={handleSelectPaymentMethod}
        selectedMethod={selectedPaymentMethod}
      />

      {/* Transaction Success Bottom Sheet */}
      <TransactionSuccessBottomSheet
        visible={successSheetVisible}
        onClose={() => setSuccessSheetVisible(false)}
        onContinue={handleContinueExploring}
      />

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.payRentButton} onPress={handlePayRent} activeOpacity={0.8}>
          <RNText style={styles.payRentButtonText}>Pay rent</RNText>
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
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
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
    marginBottom: verticalScale(8),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
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
    borderWidth: 1,
    borderColor: '#ECEDF3',
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
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  changeLink: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(12),
    color: '#72809D',
  },
  paymentDetailCard: {
    width: scale(327),
    height: verticalScale(193),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(25),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ECEDF3',
    opacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    elevation: moderateScale(2),
  },
  paymentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  paymentDetailLabel: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#72809D',
  },
  paymentDetailValue: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#1F2A44',
  },
  paymentDetailDiscount: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#DE3341',
  },
  paymentDetailDivider: {
    height: verticalScale(1),
    backgroundColor: '#ECEDF3',
    marginVertical: verticalScale(12),
  },
  paymentDetailTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: scale(12),
    borderBottomRightRadius: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    marginTop: verticalScale(-12),
    marginHorizontal: scale(-20),
  },
  paymentDetailTotalLabel: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
  },
  paymentDetailTotalValue: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
  },
  paymentMethodInput: {
    width: scale(327),
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: '#ECEDF3',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    gap: scale(12),
    alignSelf: 'center',
    opacity: 1,
  },
  paymentMethodIcon: {
    width: scale(24),
    height: scale(24),
  },
  paymentMethodText: {
    flex: 1,
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#1F2A44',
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
    shadowRadius: moderateScale(16),
    shadowOffset: { width: 0, height: verticalScale(-6) },
    elevation: moderateScale(10),
    gap: scale(12),
  },
  payRentButton: {
    width: scale(190),
    height: verticalScale(54),
    borderRadius: scale(10),
    backgroundColor: '#DE3341',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payRentButtonText: {
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
    shadowRadius: moderateScale(8),
    shadowOffset: { width: 0, height: verticalScale(4) },
    elevation: moderateScale(4),
  },
  arrowIcon: {
    width: scale(15),
    height: scale(16),
    tintColor: '#1F2A44',
  },
});

export default TransactionSummaryScreen;

