import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

const PaymentMethodBottomSheet = ({ visible, onClose, onSelectPaymentMethod, selectedMethod }) => {
  const [localSelectedMethod, setLocalSelectedMethod] = useState(selectedMethod?.type || 'mastercard');

  const paymentMethods = [
    {
      id: '1',
      type: 'mastercard',
      cardNumber: '1222',
      balance: 31250,
      cardImage: require('../../../assets/icons/Mastercard - Square.png'),
    },
    {
      id: '2',
      type: 'visa',
      cardNumber: '1542',
      balance: 54200,
      cardImage: require('../../../assets/icons/Visa - Square.png'),
    },
    {
      id: '3',
      type: 'mastercard',
      cardNumber: '1888',
      balance: 28500,
      cardImage: require('../../../assets/icons/Mastercard - Square.png'),
    },
  ];

  const handleSelect = (method) => {
    setLocalSelectedMethod(method.type);
  };

  const handleConfirm = () => {
    const selected = paymentMethods.find(m => m.type === localSelectedMethod);
    if (selected && onSelectPaymentMethod) {
      onSelectPaymentMethod({
        type: selected.type,
        cardNumber: selected.cardNumber,
        balance: selected.balance,
      });
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheet}>
              <View style={styles.handleIndicator} />

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Change Payment</Text>
              </View>

              {/* Payment Method Cards */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
                style={styles.cardsScrollView}
              >
                {paymentMethods.map((method) => {
                  const isSelected = localSelectedMethod === method.type;
                  
                  return (
                    <TouchableOpacity
                      key={method.id}
                      style={styles.cardWrapper}
                      onPress={() => handleSelect(method)}
                      activeOpacity={0.9}
                    >
                      <View style={styles.card}>
                        <Image
                          source={method.cardImage}
                          style={styles.cardBackgroundImage}
                          resizeMode="cover"
                        />
                        <View style={styles.cardOverlay}>
                          {/* Checkmark Indicator */}
                          <View style={styles.checkmarkContainer}>
                            {isSelected ? (
                              <View style={styles.checkmarkCircleSelected}>
                                <Text style={styles.checkmarkText}>✓</Text>
                              </View>
                            ) : (
                              <View style={styles.checkmarkCircle}>
                                <View style={styles.checkmarkCircleInner} />
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Select Payment Button */}
              <TouchableOpacity style={styles.selectButton} onPress={handleConfirm} activeOpacity={0.8}>
                <Text style={styles.selectButtonText}>Select Payment</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '90%',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    padding: scale(20),
    paddingTop: verticalScale(12),
  },
  handleIndicator: {
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: '#9AA4B2',
    borderRadius: scale(2),
    alignSelf: 'center',
    marginBottom: verticalScale(20),
  },
  header: {
    marginBottom: verticalScale(24),
  },
  title: {
    fontFamily: 'Lato',
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1F2A44',
    textAlign: 'center',
  },
  cardsScrollView: {
    marginBottom: verticalScale(24),
  },
  cardsContainer: {
    paddingRight: scale(20),
  },
  cardWrapper: {
    marginRight: scale(16),
  },
  card: {
    width: scale(159),
    height: verticalScale(180),
    borderRadius: scale(25),
    position: 'relative',
    overflow: 'hidden',
    opacity: 1,
  },
  cardBackgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardOverlay: {
    flex: 1,
    padding: scale(20),
    position: 'relative',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: scale(16),
    left: scale(16),
    zIndex: 10,
  },
  checkmarkCircleSelected: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#1F2A44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  checkmarkCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkCircleInner: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(60),
    marginBottom: verticalScale(20),
  },
  cardDots: {
    fontFamily: 'Lato',
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: scale(2),
    marginRight: scale(8),
  },
  cardNumber: {
    fontFamily: 'Lato',
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  balanceContainer: {
    marginTop: verticalScale(20),
  },
  balanceLabel: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: verticalScale(4),
  },
  balanceAmount: {
    fontFamily: 'Lato',
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  selectButton: {
    width: scale(276),
    height: verticalScale(70),
    backgroundColor: '#DE3341',
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
    alignSelf: 'center',
  },
  selectButtonText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PaymentMethodBottomSheet;

