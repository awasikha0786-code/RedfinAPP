import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { Button, Text, Icon } from '../../../components/common';
import { OTPInput } from '../../../components/authentication';

const OTPScreen = ({ navigation }) => {
  const email = 'jonathan@email.com'; // Default email, can be passed from navigation params later
  const initialSeconds = 30;
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

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
    // Navigate to MainStack (Home Screen) after OTP verification
    // Get root navigator to navigate between AuthStack and MainStack
    navigation.getParent()?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainStack' }],
      })
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleResend = () => {
    setSecondsLeft(initialSeconds);
    console.log('Resend OTP');
  };

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

          <Button
            title="Verify"
            onPress={handleVerify}
            style={styles.verifyButton}
            textStyle={styles.verifyButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollView: { flex: 1 },
  contentContainer: { flexGrow: 1, paddingBottom: 16 },
  backButton: { position: 'absolute', top: 20, left: 20, zIndex: 1 },
  backButtonCircle: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#F5F4F8',
    justifyContent: 'center', alignItems: 'center',
  },
  backIcon: { width: 20, height: 20, tintColor: '#333333' },
  header: { paddingHorizontal: 24, paddingTop: 120, paddingBottom: 24 },
  title: { 
    fontFamily: 'Lato',
    fontSize: 25, 
    fontWeight: '700', 
    color: '#14233A', 
    marginBottom: 12,
    lineHeight: 40,
    letterSpacing: 0.75, // 3% of 25px
  },
  titleEmphasis: { 
    color: '#21628A',
    fontWeight: '800',
    fontFamily: 'Lato',
  },
  subtitle: { fontSize: 16, color: '#6C7380', marginBottom: 8, marginTop: 20 },
  email: { fontSize: 16, color: '#162A46', fontWeight: '600', marginTop: 12 },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  timerPill: {
    alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 24, paddingVertical: 14, borderRadius: 28, backgroundColor: '#F5F4F8',
  },
  timerIcon: { width: 18, height: 18, tintColor: '#1F265E', marginRight: 8 },
  timerText: { color: '#1F265E', fontWeight: '600' },
  resend: { textAlign: 'center', color: '#6C7380', marginTop: 20, marginBottom: 24 },
  resendLink: { color: '#1B516B', fontWeight: '700' },
  otpContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 16,
  },
  verifyButton: { backgroundColor: '#DE3341', height: 56, borderRadius: 12, marginHorizontal: 24, marginTop: 12, marginBottom: 32 },
  verifyButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '600' },
});

export default OTPScreen;


