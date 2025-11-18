import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text as RNText,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Icon, Button, SkipButton } from '../../../../components/common';
import {
  scale,
  verticalScale,
  moderateScale,
  responsiveWidth,
} from '../../../../utils/layout';
import ConfirmationBottomSheet from '../../../../components/common/buttomSheet/ConfirmationBottomSheet';
import LinearGradient from 'react-native-linear-gradient';

const AccountInfoScreen = ({ navigation }) => {
  const [name, setName] = useState('Jonathan Anderson');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('jonathan@email.com');

  const [showSuccessSheet, setShowSuccessSheet] = useState(false);

  const handleBack = () => navigation.goBack();

  const handleSkip = () => handleComplete();

  const handleComplete = () => {
    setShowSuccessSheet(true);
  };

  const handleFinish = () => {
    setShowSuccessSheet(false);
    navigation.getParent()?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainStack' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(20) : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.8}>
              <View style={styles.backButtonCircle}>
                <Icon name="backArrow" size={moderateScale(18)} color="#1D3557" />
              </View>
            </TouchableOpacity>
            <SkipButton onPress={handleSkip} style={styles.skipButton} />
          </View>

          <View style={styles.contentWrapper}>
            <RNText style={styles.title}>
              Fill your <RNText style={styles.titleHighlight}>information</RNText>
            </RNText>
            <RNText style={styles.title}>below</RNText>
            <RNText style={styles.subtitle}>
              You can edit this later on your account setting.
            </RNText>

            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <Image
                  source={require('../../../../assets/icons/personVector.png')}
                  style={styles.avatarImage}
                />
              </View>
              <TouchableOpacity style={styles.avatarEditButton} activeOpacity={0.8}>
                <Image
                  source={require('../../../../assets/icons/Pencil.png')}
                  style={styles.avatarEditIcon}
                />
              </TouchableOpacity>
            </View>

        <View style={styles.inputContainer}>
          {!name && (
            <Icon name="user" size={moderateScale(18)} color="#1F2A44" style={styles.inputIconLeft} />
          )}
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor="#AEB5C0"
          />
          {!!name && (
            <Icon name="user" size={moderateScale(18)} color="#1F2A44" style={styles.inputIcon} />
          )}
        </View>

        <View style={[styles.inputContainer, styles.inputContainerLight]}>
          {!phone && (
            <Icon name="phone" size={moderateScale(18)} color="#7E879B" style={styles.inputIconLeft} />
          )}
          <TextInput
            style={[styles.input, styles.inputLight]}
            value={phone}
            onChangeText={setPhone}
            placeholder="mobile number"
            placeholderTextColor="#AEB5C0"
            keyboardType="phone-pad"
          />
          {!!phone && (
            <Icon name="phone" size={moderateScale(18)} color="#7E879B" style={styles.inputIcon} />
          )}
        </View>

            <View style={[styles.inputContainer, styles.inputContainerDark]}>
              <TextInput
                style={[styles.input, styles.inputDarkText]}
                value={email}
                onChangeText={setEmail}
                placeholder="email address"
                placeholderTextColor="#AEB5C0"
                keyboardType="email-address"
              />
              <Image
                source={require('../../../../assets/icons/E Mail.png')}
                style={styles.emailIcon}
              />
            </View>
          </View>

          <View style={styles.footerSpacer} />
        </ScrollView>

        <Button title="Finish" onPress={handleComplete} style={styles.nextButton} />
      </KeyboardAvoidingView>

      <ConfirmationBottomSheet
        visible={showSuccessSheet}
        onClose={() => setShowSuccessSheet(false)}
        onConfirm={handleFinish}
        showCancelButton={false}
        confirmText="Finish"
        title="Account"
        highlightText="successfully"
        subtitle="created"
        warningText="Lorem ipsum dolor sit amet, consectetur."
        messageAlign="center"
        containerStyle={styles.sheetContainer}
        sheetStyle={styles.sheetStyle}
        handleStyle={styles.sheetHandle}
        iconCircleStyle={styles.sheetIconCircle}
        messageTextStyle={styles.sheetMessage}
        highlightTextStyle={styles.sheetHighlight}
        warningTextStyle={styles.sheetSubtitle}
        confirmButtonStyle={styles.sheetButton}
        confirmButtonTextStyle={styles.sheetButtonText}
        renderIcon={() => (
          <View style={styles.successIconWrapper}>
            <LinearGradient
              colors={['rgba(139, 200, 63, 0.25)', 'rgba(35, 79, 104, 0.05)']}
              style={styles.successGlow}
            >
              <LinearGradient
                colors={['#234F68', '#8BC83F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.successIconInner}
              >
                <RNText style={styles.successCheck}>✓</RNText>
              </LinearGradient>
            </LinearGradient>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: verticalScale(16),
  },
  backButton: {
    paddingVertical: verticalScale(8),
    paddingRight: verticalScale(8),
  },
  backButtonCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(19, 35, 64, 0.12)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6,
  },
  skipButton: {
    backgroundColor: '#F5F4F8',
  },
  scrollContent: {
    flexGrow: 1, // Make ScrollView content fill available space
    paddingBottom: verticalScale(120),
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: responsiveWidth(7),
    paddingTop: verticalScale(40), // Increased padding to show title
  },
  title: {
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: moderateScale(26),
    lineHeight: moderateScale(34),
    color: '#1F2A44',
  },
  titleHighlight: {
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: moderateScale(26),
    color: '#1F4C6B',
  },
  subtitle: {
    marginTop: verticalScale(14),
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#727B92',
  },
  avatarWrapper: {
    marginTop: verticalScale(40),
    alignItems: 'center',
  },
  avatarCircle: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: '#F7F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(19, 35, 64, 0.06)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 3,
  },
  avatarImage: {
    width: scale(40),
    height: verticalScale(43),
    resizeMode: 'contain',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: verticalScale(0),
    right: scale(115),
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: '#1F4C6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(19, 35, 64, 0.18)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarEditIcon: {
    width: scale(12),
    height: scale(12),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    marginTop: verticalScale(24),
    borderRadius: verticalScale(18),
    backgroundColor: '#F8F8FB',
    height: verticalScale(60),
  },
  inputContainerLight: {
    backgroundColor: '#F8F8FB',
  },
  inputContainerDark: {
    backgroundColor: '#1F4C6B',
  },
  input: {
    flex: 1,
    fontFamily: 'Lato',
    fontSize: moderateScale(15),
    color: '#1F2A44',
  },
  inputLight: {
    color: '#1F2A44',
  },
  inputDarkText: {
    color: '#FFFFFF',
  },
  inputIcon: {
    marginLeft: scale(12),
  },
  inputIconLeft: {
    marginRight: scale(12),
  },
  emailIcon: {
    width: scale(22),
    height: verticalScale(16),
    resizeMode: 'contain',
    marginLeft: scale(12),
  },
  footerSpacer: {
    height: verticalScale(40),
  },
  nextButton: {
    width: scale(278),
    height: verticalScale(63),
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: verticalScale(24),
  },
  sheetContainer: {
    justifyContent: 'flex-end',
  },
  sheetStyle: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: responsiveWidth(8),
    paddingBottom: verticalScale(32),
    alignItems: 'center',
  },
  sheetHandle: {
    width: scale(64),
    height: verticalScale(4),
    backgroundColor: '#D9DEE6',
    borderRadius: verticalScale(2),
  },
  successIconWrapper: {
    width: scale(180),
    height: scale(180),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },
  successGlow: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(35, 79, 104, 0.25)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  successIconInner: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCheck: {
    fontSize: moderateScale(44),
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sheetMessage: {
    fontFamily: 'Lato',
    fontSize: moderateScale(24),
    fontWeight: '500',
    color: '#1F2A44',
  },
  sheetHighlight: {
    color: '#1F4C6B',
    fontWeight: '800',
  },
  sheetSubtitle: {
    marginTop: verticalScale(8),
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#9AA4B2',
    marginBottom: verticalScale(16),
  },
  sheetButton: {
    width: scale(278),
    height: verticalScale(63),
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: verticalScale(24),
    backgroundColor: '#DE3341',
  },
  sheetButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default AccountInfoScreen;
