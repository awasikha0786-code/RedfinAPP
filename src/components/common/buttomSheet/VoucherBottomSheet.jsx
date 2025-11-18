import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, ScrollView, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';
import Icon from '../Icon/Icon';

const VoucherBottomSheet = ({ visible, onClose, onApplyVoucher }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const availableVouchers = [
    {
      id: '1',
      code: 'HLWN40',
      title: 'Halloween sale',
      description: 'Get 40% off on all reservations',
    },
    {
      id: '2',
      code: 'HGJC20',
      title: 'Holiday Special',
      description: 'Get 20% off on all reservations',
    },
  ];

  const handleApplyVoucher = () => {
    if (selectedVoucher && onApplyVoucher) {
      onApplyVoucher(selectedVoucher);
    } else if (voucherCode && onApplyVoucher) {
      // If manually entered code, create a basic voucher object
      const manualVoucher = {
        id: 'manual',
        code: voucherCode,
        title: 'Custom Voucher',
        description: 'Applied voucher code',
      };
      onApplyVoucher(manualVoucher);
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

              {/* Add Voucher Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Add Voucher</Text>
                <View style={styles.voucherInputContainer}>
                  <View style={styles.voucherIconContainer}>
                    <Image
                      source={require('../../../assets/icons/newls.png')}
                      style={styles.inputIconImage}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.voucherInput}
                    placeholder="Type your voucher"
                    placeholderTextColor="#A1A5C1"
                    value={voucherCode}
                    onChangeText={setVoucherCode}
                  />
                </View>
              </View>

              {/* Your Available vouchers Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Available vouchers</Text>
                <ScrollView 
                  style={styles.vouchersList}
                  showsVerticalScrollIndicator={false}
                >
                  {availableVouchers.map((voucher) => (
                    <TouchableOpacity
                      key={voucher.id}
                      style={[
                        styles.voucherCard,
                        selectedVoucher?.id === voucher.id && styles.voucherCardSelected
                      ]}
                      onPress={() => {
                        setSelectedVoucher(voucher);
                        setVoucherCode('');
                      }}
                      activeOpacity={0.8}
                    >
                      <View style={styles.voucherIconBox}>
                        <Image
                          source={require('../../../assets/icons/newls.png')}
                          style={styles.voucherIconImage}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.voucherContent}>
                        <Text style={styles.voucherCode}>{voucher.code}</Text>
                        <Text style={styles.voucherDescription}>{voucher.description}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Apply Voucher Button */}
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyVoucher} activeOpacity={0.8}>
                <Text style={styles.applyButtonText}>Apply Voucher</Text>
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
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontFamily: 'Lato',
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: verticalScale(16),
  },
  voucherInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(327),
    height: verticalScale(70),
    backgroundColor: '#F5F4F8',
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    gap: scale(12),
  },
  voucherIconContainer: {
    width: scale(24),
    height: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIconImage: {
    width: scale(20),
    height: scale(20),
    tintColor: '#000000',
  },
  voucherInput: {
    flex: 1,
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#1F2A44',
    padding: 0,
  },
  vouchersList: {
    maxHeight: verticalScale(200),
  },
  voucherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: scale(20),
    padding: scale(16),
    marginBottom: verticalScale(12),
  },
  voucherCardSelected: {
    borderWidth: 2,
    borderColor: '#234F68',
  },
  voucherIconBox: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(12),
    backgroundColor: '#234F68',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  voucherIconImage: {
    width: scale(24),
    height: scale(24),
    tintColor: '#FFFFFF',
  },
  voucherContent: {
    flex: 1,
  },
  voucherCode: {
    fontFamily: 'Lato',
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: verticalScale(4),
  },
  voucherDescription: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: '#72809D',
  },
  applyButton: {
    width: scale(276),
    height: verticalScale(70),
    backgroundColor: '#DE3341',
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
    alignSelf: 'center',
  },
  applyButtonText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default VoucherBottomSheet;

