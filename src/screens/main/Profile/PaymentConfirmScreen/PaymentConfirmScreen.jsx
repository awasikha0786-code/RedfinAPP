import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {View,StyleSheet,Text,TouchableOpacity,Image,Dimensions,ScrollView,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../../components/common/Button/Button';
import Input from '../../../../components/common/Input/Input';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const PaymentConfigScreen = ({ navigation, route }) => {
  const {
    selectedMethod: initialMethod = 'Mastercard',
    cardHolderName: initialName = 'Jonathan Anderson',
    cardNumber: initialCardNumber = '1222 3443 9881 1222',
    expiryDate: initialExpiryDate = '11/05/2023',
    cvv: initialCvv = '778',
    listingId,
  } = route?.params || {};

  const [selectedMethod, setSelectedMethod] = useState(initialMethod);
  const [cardHolderName, setCardHolderName] = useState(initialName);
  const [cardNumber, setCardNumber] = useState(initialCardNumber);
  const [expiryDate, setExpiryDate] = useState(initialExpiryDate);
  const [cvv, setCvv] = useState(initialCvv);

  const PAYMENT_METHODS = [
    {
      id: 'Paypal',
      label: 'Paypal',
      icon: require('../../../../assets/icons/Paypal - Normal.png'),
    },
    {
      id: 'Mastercard',
      label: 'Mastercard',
      icon: require('../../../../assets/icons/Mastercard - Normal.png'),
    },
    {
      id: 'Visa',
      label: 'Visa',
      icon: require('../../../../assets/icons/Visa - Normal.png'),
    },
  ];

  const handleMethodPress = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handleConfirm = () => {
    if (listingId) {
      navigation.navigate('Tabs', {
        screen: 'Profile',
        params: { featuredListingId: listingId },
      });
    } else {
      navigation.popToTop();
    }
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
            onPress={() => navigation.popToTop()}
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

        <Image
          source={require('../../../../assets/images/Credit Card.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.paymentMethodsRow}
        >
          {PAYMENT_METHODS.map((method, index) => {
            const isSelected = selectedMethod === method.id;
            const isLast = index === PAYMENT_METHODS.length - 1;
            return (
              <TouchableOpacity
                key={method.id}
                style={[styles.methodButton, isSelected && styles.methodButtonSelected, isLast && styles.methodButtonLast]}
                onPress={() => handleMethodPress(method.id)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={isSelected ? ['#1B516B', '#21628A'] : ['#F5F8FF', '#EFF7F4']}
                  style={[styles.methodGradient, isSelected && styles.methodGradientSelected]}
                >
                  <Image
                    source={method.icon}
                    style={[styles.methodIcon, isSelected && styles.methodIconSelected]}
                    resizeMode="contain"
                  />
                  <Text style={[styles.methodLabel, isSelected && styles.methodLabelSelected]}>
                    {method.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.formContainer}>
          <Input
            placeholder="Card holder name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
            icon="user"
            style={styles.input}
            inputStyle={styles.inputText}
            placeholderTextColor="#9AA4B2"
          />
          <Input
            placeholder="Card number"
            value={cardNumber}
            onChangeText={setCardNumber}
            icon="card"
            style={styles.input}
            inputStyle={styles.inputText}
            keyboardType="number-pad"
            placeholderTextColor="#9AA4B2"
          />
          <View style={styles.formRow}>
            <Input
              placeholder="Expiry date"
              value={expiryDate}
              onChangeText={setExpiryDate}
              icon="calendar"
              style={[styles.input, styles.halfInput]}
              inputStyle={styles.inputText}
              placeholderTextColor="#9AA4B2"
            />
            <Input
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              icon="card"
              style={[styles.input, styles.halfInput]}
              inputStyle={styles.inputText}
              keyboardType="number-pad"
              maxLength={4}
              placeholderTextColor="#9AA4B2"
            />
          </View>
        </View>

        <Button
          title="Confirm"
          onPress={handleConfirm}
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
    paddingBottom: verticalScale(40),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  backButton: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
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
  cardImage: {
    width: Math.min(360, SCREEN_WIDTH - moderateScale(32)),
    height: Math.min(verticalScale(220), SCREEN_WIDTH * 0.6),
    marginBottom: verticalScale(28),
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: moderateScale(2),
    marginBottom: verticalScale(32),
  },
  methodButton: {
    width: Math.min(moderateScale(134), SCREEN_WIDTH * 0.36),
    height: verticalScale(50),
    borderRadius: moderateScale(100),
    marginRight: moderateScale(12),
  },
  methodButtonLast: {
    marginRight: 0,
  },
  methodButtonSelected: {
    shadowColor: '#1B516B',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  methodGradient: {
    flex: 1,
    borderRadius: moderateScale(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(25),
  },
  methodGradientSelected: {
    borderRadius: moderateScale(100),
  },
  methodIcon: {
    width: moderateScale(26),
    height: moderateScale(26),
    marginRight: moderateScale(10),
  },
  methodIconSelected: {
    tintColor: '#FFFFFF',
  },
  methodLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#6C7380',
  },
  methodLabelSelected: {
    color: '#FFFFFF',
  },
  formContainer: {
    marginBottom: verticalScale(32),
  },
  input: {
    backgroundColor: '#F5F5FA',
    borderRadius: moderateScale(24),
    paddingVertical: verticalScale(18),
    paddingHorizontal: moderateScale(22),
    borderWidth: 0,
    width: '100%',
    marginBottom: verticalScale(16),
  },
  formRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  halfInput: {
    width: '48%',
  },
  inputText: {
    fontSize: moderateScale(16),
    color: '#14233A',
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

export default PaymentConfigScreen;


