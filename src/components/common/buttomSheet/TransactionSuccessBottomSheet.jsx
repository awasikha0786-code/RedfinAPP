import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmationBottomSheet from './ConfirmationBottomSheet';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

const TransactionSuccessBottomSheet = ({ visible, onClose, onContinue }) => {
  const renderSuccessIcon = () => (
    <View style={styles.successIconWrapper}>
      {/* Background Glow Effect */}
      <View style={styles.backgroundGlow} />
      
      {/* Gradient Tick Button */}
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.successIconOuter}
      >
        <View style={styles.successIconInner}>
          <Text style={styles.successIconCheck}>✓</Text>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <ConfirmationBottomSheet
      visible={visible}
      onClose={onClose}
      onConfirm={onContinue}
      showCancelButton={false}
      title="Your transaction is"
      highlightText=""
      subtitle="success"
      warningText="Lorem ipsum dolor sit amet, consectetur."
      confirmText="Continue Exploring"
      messageAlign="center"
      containerStyle={styles.container}
      sheetStyle={styles.sheet}
      handleStyle={styles.handle}
      messageTextStyle={styles.messageText}
      highlightTextStyle={styles.highlightText}
      warningTextStyle={styles.warningText}
      buttonContainerStyle={styles.buttonContainer}
      confirmButtonStyle={styles.confirmButton}
      confirmButtonTextStyle={styles.confirmButtonText}
      renderIcon={renderSuccessIcon}
      showConfirmButton={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    padding: scale(20),
    paddingTop: verticalScale(20),
    alignItems: 'center',
  },
  handle: {
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: '#1F2A44',
    borderRadius: scale(2),
    alignSelf: 'center',
    marginBottom: verticalScale(59),
  },
  successIconWrapper: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundGlow: {
    width: scale(142),
    height: scale(142),
    borderRadius: scale(71),
    backgroundColor: '#4CAF50',
    opacity: 0.2,
    position: 'absolute',
    top: scale(-36),
    left: scale(-36),
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: moderateScale(30),
    elevation: 0,
  },
  successIconOuter: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(20),
    elevation: moderateScale(8),
  },
  successIconInner: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconCheck: {
    fontSize: moderateScale(36),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  messageText: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: '#1F2A44',
    textAlign: 'center',
  },
  highlightText: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#0E5675',
  },
  warningText: {
    fontSize: moderateScale(14),
    color: '#72809D',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(32),
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  confirmButton: {
    width: scale(276),
    height: verticalScale(70),
    backgroundColor: '#DE3341',
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});

export default TransactionSuccessBottomSheet;

