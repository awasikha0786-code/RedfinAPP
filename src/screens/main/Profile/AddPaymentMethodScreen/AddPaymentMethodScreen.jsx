import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Button from '../../../../components/common/Button/Button';
import LinearGradient from 'react-native-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const AddPaymentMethodScreen = ({ navigation, route }) => {
  const listingId = route?.params?.listingId;

  const handleNext = () => {
    navigation.navigate('PaymentMethodDetails', { listingId });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../../../assets/icons/backArro.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.skipText}>skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleLineOne}>Add your</Text>
          <Text style={styles.titleLineTwo}>payment method</Text>
          <Text style={styles.subtitle}>
            You can edit this later on your account setting.
          </Text>
        </View>

        <View style={styles.cardWrapper}>
          <Image
            source={require('../../../../assets/images/Credit Card.png')}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.paymentScrollContent}
        >
          <TouchableOpacity style={[styles.paymentOptionWrapper, styles.paypalButton]} activeOpacity={0.85}>
            <LinearGradient colors={['#F5F8FF', '#EFF7F4']} style={styles.paymentOption}>
              <View style={styles.paymentOptionContent}>
                <Image
                  source={require('../../../../assets/icons/Paypal - Normal.png')}
                  style={styles.paymentIcon}
                  resizeMode="contain"
                />
                <Text style={styles.paymentLabel}>Paypal</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.paymentOptionWrapper, styles.mastercardButton]} activeOpacity={0.85}>
            <LinearGradient colors={['#F5F8FF', '#EFF7F4']} style={styles.paymentOption}>
              <View style={styles.paymentOptionContent}>
                <Image
                  source={require('../../../../assets/icons/Mastercard - Normal.png')}
                  style={styles.paymentIcon}
                  resizeMode="contain"
                />
                <Text style={styles.paymentLabel}>Mastercard</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.paymentOptionWrapper, styles.visaButton]} activeOpacity={0.85}>
            <LinearGradient colors={['#F5F8FF', '#EFF7F4']} style={styles.paymentOption}>
              <View style={styles.paymentOptionContent}>
                <Image
                  source={require('../../../../assets/icons/Visa - Normal.png')}
                  style={styles.paymentIcon}
                  resizeMode="contain"
                />
                <Text style={styles.paymentLabel}>Visa</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBase}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        <Button
          title="Next"
          onPress={handleNext}
          style={styles.nextButton}
          textStyle={styles.nextButtonText}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(24),
    paddingBottom: verticalScale(32),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(24),
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    tintColor: '#14233A',
  },
  skipButton: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(25),
    backgroundColor: '#F5F4F8',
  },
  skipText: {
    color: '#6C7380',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  titleContainer: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(24),
  },
  titleLineOne: {
    fontSize: moderateScale(32),
    fontWeight: '600',
    color: '#14233A',
    marginBottom: verticalScale(4),
  },
  titleLineTwo: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: '#1B516B',
  },
  subtitle: {
    width: Math.min(moderateScale(274), SCREEN_WIDTH - moderateScale(48)),
    marginTop: verticalScale(16),
    fontSize: 12,
    color: '#6C7380',
    lineHeight: 20,
    letterSpacing: 0.36,
  },
  cardWrapper: {
    alignItems: 'center',
    marginBottom: verticalScale(-140),
  },
  cardImage: {
    width: Math.min(360, SCREEN_WIDTH - moderateScale(32)),
    height: Math.min(verticalScale(220), SCREEN_WIDTH * 0.6),
  },
  paymentScrollContent: {
    paddingHorizontal: moderateScale(2),
    alignItems: 'center',
  },
  paymentOptionWrapper: {
    backgroundColor: '#F5F4F8',
    borderRadius: moderateScale(100),
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1B516B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  paymentOption: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  paypalButton: {
    width: Math.min(moderateScale(112), SCREEN_WIDTH * 0.32),
    height: verticalScale(50),
    marginRight: moderateScale(12),
  },
  mastercardButton: {
    width: Math.min(moderateScale(134), SCREEN_WIDTH * 0.36),
    height: verticalScale(50),
    marginRight: moderateScale(12),
  },
  visaButton: {
    width: Math.min(moderateScale(99), SCREEN_WIDTH * 0.28),
    height: verticalScale(50),
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: moderateScale(10),
  },
  paymentLabel: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#6C7380',
    includeFontPadding: false,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  progressBarBase: {
    width: Math.min(moderateScale(120), SCREEN_WIDTH * 0.4),
    height: verticalScale(4),
    borderRadius: verticalScale(2),
    backgroundColor: '#E3D9F6',
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#4DBB5A',
  },
  nextButton: {
    backgroundColor: '#E63946',
    borderRadius: moderateScale(24),
    paddingVertical: verticalScale(20),
    alignSelf: 'center',
    width: Math.min(moderateScale(276), SCREEN_WIDTH - moderateScale(48)),
  },
  nextButtonText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'none',
  },
});

export default AddPaymentMethodScreen;


