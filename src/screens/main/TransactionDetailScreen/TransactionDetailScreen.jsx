import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text as RNText, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from '../../../components/common';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';

const DEFAULT_TRANSACTION = {
  property: {
    title: 'Sky Dandelions',
    type: 'Apartment',
    location: 'Jakarta, Indonesia',
    image: require('../../../assets/images/login_image.png'),
    isFavorite: false,
  },
  checkIn: '11/28/2021',
  checkOut: '01/28/2022',
  ownerName: 'Anderson',
  transactionType: 'Rent',
  periodTime: '2 month',
  monthlyPayment: '$ 220',
  discount: '-$ 88',
  total: '$ 31,250',
  paymentMethod: {
    type: 'PayPal',
    email: '...an@email.com',
    icon: require('../../../assets/icons/Paypal - Normal.png'),
  },
};

const TransactionDetailScreen = ({ navigation, route }) => {
  const transaction = route?.params?.transaction || DEFAULT_TRANSACTION;

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.8}>
            <Icon name="backArrow" size={moderateScale(18)} color="#1F2A44" />
          </TouchableOpacity>
          <RNText style={styles.headerTitle}>Transaction Detail</RNText>
          <View style={styles.emptySpace} />
        </View>

        {/* Property Information Card */}
        <View style={styles.propertyCard}>
          <View style={styles.propertyImageContainer}>
            <Image source={transaction.property.image} style={styles.propertyImage} resizeMode="cover" />
            <TouchableOpacity style={styles.heartButton} activeOpacity={0.8}>
              <View style={styles.heartCircle}>
                <Image
                  source={require('../../../assets/icons/Heart.png')}
                  style={styles.heartIcon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.propertyTypeTag}>
              <RNText style={styles.propertyTypeText}>{transaction.property.type}</RNText>
            </View>
          </View>
          <View style={styles.propertyInfo}>
            <RNText style={styles.propertyTitle}>{transaction.property.title}</RNText>
            <RNText style={styles.propertyType}>{transaction.property.type}</RNText>
            <View style={styles.locationRow}>
              <Icon name="location" size={moderateScale(14)} color="#72809D" />
              <RNText style={styles.locationText}>{transaction.property.location}</RNText>
            </View>
            <TouchableOpacity style={styles.rentButton}>
              <RNText style={styles.rentButtonText}>{transaction.transactionType}</RNText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction Detail Section */}
        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Transaction Detail</RNText>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <RNText style={styles.detailLabel}>Check in</RNText>
              <RNText style={styles.detailValue}>{transaction.checkIn}</RNText>
            </View>
            <View style={styles.detailRow}>
              <RNText style={styles.detailLabel}>Check out</RNText>
              <RNText style={styles.detailValue}>{transaction.checkOut}</RNText>
            </View>
            <View style={styles.detailRow}>
              <RNText style={styles.detailLabel}>Owner name</RNText>
              <RNText style={styles.detailValue}>{transaction.ownerName}</RNText>
            </View>
            <View style={styles.detailRow}>
              <RNText style={styles.detailLabel}>Transaction type</RNText>
              <RNText style={styles.detailValue}>{transaction.transactionType}</RNText>
            </View>
          </View>
        </View>

        {/* Payment Detail Section */}
        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Payment Detail</RNText>
          <View style={styles.detailCard}>
            <View style={styles.paymentTopSection}>
              <View style={styles.detailRow}>
                <RNText style={styles.detailLabel}>Period time</RNText>
                <RNText style={styles.detailValue}>{transaction.periodTime}</RNText>
              </View>
              <View style={styles.detailRow}>
                <RNText style={styles.detailLabel}>Monthly payment</RNText>
                <RNText style={styles.detailValue}>{transaction.monthlyPayment}</RNText>
              </View>
              <View style={styles.detailRow}>
                <RNText style={styles.detailLabel}>Discount</RNText>
                <RNText style={[styles.detailValue, styles.discountValue]}>
                  {transaction.discount}
                </RNText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <RNText style={styles.totalLabel}>Total</RNText>
                <RNText style={styles.totalValue}>{transaction.total}</RNText>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Payment Method</RNText>
          <View style={styles.paymentMethodCard}>
            {transaction.paymentMethod.icon && (
              <Image source={transaction.paymentMethod.icon} style={styles.paymentIcon} />
            )}
            {!transaction.paymentMethod.icon && (
              <View style={styles.paymentIconPlaceholder}>
                <RNText style={styles.paymentIconText}>{transaction.paymentMethod.type.charAt(0)}</RNText>
              </View>
            )}
            <RNText style={styles.paymentEmail}>{transaction.paymentMethod.email}</RNText>
          </View>
        </View>

        {/* Review Prompt Section */}
        <View style={styles.section}>
          <RNText style={styles.reviewTitle}>Love the estate?</RNText>
          <TouchableOpacity
            style={styles.reviewButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AddReview', { transaction })}
          >
            <RNText style={styles.reviewButtonText}>Click here to add review</RNText>
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
  content: {
    paddingHorizontal: responsiveWidth(6),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(32),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },
  backButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F4F5FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
  },
  emptySpace: {
    width: scale(48),
  },
  propertyCard: {
    flexDirection: 'row',
    width: responsiveWidth(87),
    maxWidth: scale(327),
    height: verticalScale(156),
    backgroundColor: '#F5F4F8',
    borderRadius: scale(20),
    padding: scale(12),
    marginBottom: verticalScale(24),
    alignSelf: 'center',
  },
  propertyImageContainer: {
    width: scale(140),
    height: verticalScale(140),
    borderRadius: scale(16),
    overflow: 'hidden',
    position: 'relative',
    marginRight: scale(16),
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
    resizeMode: 'contain',
  },
  propertyTypeTag: {
    position: 'absolute',
    bottom: scale(10),
    left: scale(10),
    backgroundColor: 'rgba(31, 44, 92, 0.9)',
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
  },
  propertyTypeText: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(11),
    color: '#FFFFFF',
  },
  propertyInfo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  propertyTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
    marginBottom: verticalScale(4),
  },
  propertyType: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#72809D',
    marginBottom: verticalScale(8),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
    gap: scale(6),
  },
  locationText: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(12),
    color: '#72809D',
  },
  rentButton: {
    width: scale(70),
    height: verticalScale(47),
    borderRadius: scale(25),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  rentButtonText: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(12),
    color: '#1F2A44',
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
    marginBottom: verticalScale(12),
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: '#ECEDF3',
    padding: scale(16),
    width: responsiveWidth(87),
    maxWidth: scale(327),
    alignSelf: 'center',
  },
  paymentMethodCard: {
    width: responsiveWidth(87),
    maxWidth: scale(327),
    height: verticalScale(50),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: '#ECEDF3',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  paymentTopSection: {
    backgroundColor: '#FFFFFF',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  detailLabel: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#72809D',
  },
  detailValue: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#1F2A44',
    fontWeight: '600',
  },
  discountValue: {
    color: '#E63946',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: verticalScale(12),
  },
  totalSection: {
    backgroundColor: '#F5F4F8',
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    padding: scale(16),
    marginTop: verticalScale(-12),
    marginHorizontal: scale(-16),
    marginBottom: scale(-16),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'Lato',
    fontSize: moderateScale(16),
    color: '#1F2A44',
    fontWeight: '600',
  },
  totalValue: {
    fontFamily: 'Lato',
    fontSize: moderateScale(20),
    color: '#1F2A44',
    fontWeight: '700',
  },
  paymentIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  paymentIconPlaceholder: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(6),
    backgroundColor: '#1B516B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(12),
    color: '#FFFFFF',
  },
  paymentEmail: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#72809D',
    flex: 1,
  },
  reviewTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(18),
    color: '#1F2A44',
    marginBottom: verticalScale(16),
  },
  reviewButton: {
    width: scale(276),
    height: verticalScale(70),
    borderRadius: scale(10),
    backgroundColor: '#DE3341',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  reviewButtonText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: moderateScale(16),
    color: '#FFFFFF',
  },
});

export default TransactionDetailScreen;

