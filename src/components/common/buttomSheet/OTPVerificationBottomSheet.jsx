import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Modal, Pressable, Text as RNText } from 'react-native';
import { OTPInput } from '../../authentication';
import { Button, Text, Icon } from '../index';

const OTPVerificationBottomSheet = ({ 
  visible, 
  onClose, 
  onVerify,
  phoneNumber = '+92 •••• ••9123', // Masked phone number
  initialSeconds = 30,
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (visible) {
      setOtp(['', '', '', '']);
      setSecondsLeft(initialSeconds);
    }
  }, [visible, initialSeconds]);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setSecondsLeft(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [visible]);

  const isFilled = useMemo(() => otp.every(c => c !== ''), [otp]);

  const timerText = useMemo(() => {
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const ss = String(secondsLeft % 60).padStart(2, '0');
    return `${mm}.${ss}`;
  }, [secondsLeft]);

  const handleVerify = () => {
    if (isFilled && onVerify) {
      onVerify(otp.join(''));
    }
  };

  const handleResend = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(initialSeconds);
      setOtp(['', '', '', '']);
      // Call resend OTP API here
      console.log('Resend OTP');
    }
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
              
              {/* Title */}
              <Text style={styles.title}>Verify your identity</Text>
              
              {/* Instructions */}
              <Text style={styles.instruction}>
                Enter the 4-digit code sent to {phoneNumber}
              </Text>

              {/* OTP Input */}
              <View style={styles.otpContainer}>
                <OTPInput 
                  value={otp} 
                  onChange={setOtp}
                  activeColor="#14233A"
                  inactiveBg="#F5F4F8"
                />
              </View>

              {/* Timer */}
              <View style={styles.timerContainer}>
                <View style={styles.timerPill}>
                  <Icon name="timer" style={styles.timerIcon} />
                  <Text style={styles.timerText}>{timerText}</Text>
                </View>
              </View>

              {/* Resend OTP */}
              <View style={styles.resendContainer}>
                <RNText style={styles.resendText}>
                  Didn't receive the OTP?{' '}
                  <RNText
                    style={[
                      styles.resendLink,
                      secondsLeft > 0 && styles.resendLinkDisabled
                    ]}
                    onPress={handleResend}
                  >
                    Resend OTP
                  </RNText>
                </RNText>
              </View>

              {/* Verify Button */}
              <View style={styles.buttonContainer}>
                <Button
                  title="Verify"
                  onPress={handleVerify}
                  disabled={!isFilled}
                  style={styles.verifyButton}
                  textStyle={styles.verifyButtonText}
                />
              </View>
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
    maxHeight: '75%',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 12,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#9AA4B2',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14233A',
    textAlign: 'center',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 14,
    color: '#6C7380',
    textAlign: 'center',
    marginBottom: 24,
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F5F4F8',
  },
  timerIcon: {
    width: 18,
    height: 18,
    tintColor: '#14233A',
    marginRight: 8,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14233A',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    fontSize: 14,
    color: '#6C7380',
    textAlign: 'center',
  },
  resendLink: {
    color: '#14233A',
    fontWeight: '700',
  },
  resendLinkDisabled: {
    color: '#9AA4B2',
    opacity: 0.5,
  },
  buttonContainer: {
    marginBottom: 8,
  },
  verifyButton: {
    backgroundColor: '#DE3341',
    borderRadius: 12,
    paddingVertical: 16,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'none',
  },
});

export default OTPVerificationBottomSheet;

