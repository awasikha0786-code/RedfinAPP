import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { Text, Icon } from '../../../components/common';
import { OTPInput } from '../../../components/authentication';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

const OTPScreen = ({ navigation }) => {
  const email = 'jonathan@email.com'; // Default email, can be passed from navigation params later
  const initialSeconds = 30;
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const isFilled = useMemo(() => otp.every(c => c !== ''), [otp]);
  const codeString = useMemo(() => otp.join(''), [otp]);

  const timerText = useMemo(() => {
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const ss = String(secondsLeft % 60).padStart(2, '0');
    return `${mm}.${ss}`;
  }, [secondsLeft]);

  const handleVerify = () => {
    navigation.navigate('LoginForm');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleResend = () => {
    setSecondsLeft(initialSeconds);
    console.log('Resend OTP');
  };

  useEffect(() => {
    if (isFilled && !autoSubmitted) {
      setAutoSubmitted(true);
      handleVerify();
    }
  }, [isFilled, autoSubmitted]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <View style={styles.backButtonCircle}>
            <Icon name="backArrow" style={styles.backIcon} />
          </View>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>
            Enter the <Text style={styles.titleEmphasis}>code</Text>
          </Text>
          <Text style={styles.subtitle}>Enter the 4 digit code that we just sent to</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.otpContainer}>
          <OTPInput value={otp} onChange={setOtp} />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.timerPill}>
            <Icon name="timer" style={styles.timerIcon} />
            <Text style={styles.timerText}>{timerText}</Text>
          </View>

          <Text style={styles.resend}>
            Didn’t receive the OTP?{' '}
            <Text
              style={styles.resendLink}
              onPress={() => {
                if (secondsLeft === 0) {
                  handleResend();
                }
              }}
            >
              Resend OTP
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollView: { flex: 1 },
  contentContainer: { flexGrow: 1, paddingBottom: verticalScale(24) },
  backButton: { position: 'absolute', top: verticalScale(20), left: scale(20), zIndex: 1 },
  backButtonCircle: {
    width: scale(50), height: scale(50), borderRadius: scale(25), backgroundColor: '#F5F4F8',
    justifyContent: 'center', alignItems: 'center',
  },
  backIcon: { width: scale(20), height: scale(20), tintColor: '#333333' },
  header: { paddingHorizontal: scale(24), paddingTop: verticalScale(120), paddingBottom: verticalScale(24) },
  title: {
    fontFamily: 'Lato',
    fontSize: moderateScale(25),
    fontWeight: '500',
    color: '#252B5C',
    marginBottom: verticalScale(12),
    lineHeight: verticalScale(40),
    letterSpacing: 0.75,
    width: scale(173),
    height: verticalScale(40),
  },
  titleEmphasis: { 
    color: '#204D6C',
    fontWeight: '800',
    fontFamily: 'Lato',
  },
  subtitle: { fontSize: moderateScale(14), color: '#6C7380', marginBottom: verticalScale(8), marginTop: verticalScale(20) },
  email: { fontSize: moderateScale(14), color: '#162A46', fontWeight: '600', marginTop: verticalScale(12) },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: scale(24),
  },
  timerPill: {
    alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: scale(24), paddingVertical: verticalScale(14), borderRadius: scale(28), backgroundColor: '#F5F4F8',
  },
  timerIcon: { width: scale(18), height: scale(18), tintColor: '#1F265E', marginRight: scale(8) },
  timerText: { color: '#1F265E', fontWeight: '600' },
  resend: { textAlign: 'center', color: '#6C7380', marginTop: verticalScale(20), marginBottom: verticalScale(8) },
  resendLink: { color: '#1B516B', fontWeight: '700' },
  otpContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(20),
    marginTop: verticalScale(16),
  },
});

export default OTPScreen;


