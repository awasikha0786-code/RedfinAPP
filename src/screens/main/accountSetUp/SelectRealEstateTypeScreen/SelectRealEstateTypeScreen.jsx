import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
  FlatList,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Icon, Button, SkipButton } from '../../../../components/common';
import {
  scale,
  verticalScale,
  moderateScale,
  responsiveWidth,
} from '../../../../utils/layout';

const PROPERTY_GROUPS = [
  ['Apartment', 'Condo'],
  ['Single-Family Home', 'Townhouse'],
  ['Villa', 'Studio', 'Duplex'],
  ['Farmhouse', 'Cottage'],
];

const SelectRealEstateTypeScreen = ({ navigation }) => {
  const [selectedTypes, setSelectedTypes] = useState(['Apartment', 'Villa']);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleBack = () => navigation.goBack();
  const handleSkip = () => handleComplete();
  const handleComplete = () => {
    navigation.navigate('AccountInfo');
  };

  const renderGroupedRow = ({ item }) => (
    <View style={styles.typeRow}>
      {item.map((type) => {
        const isSelected = selectedTypes.includes(type);
        return (
          <TouchableOpacity
            key={type}
            style={[styles.typePill, isSelected && styles.typePillSelected]}
            onPress={() => toggleType(type)}
            activeOpacity={0.85}
          >
            <RNText
              style={[
                styles.typePillText,
                isSelected && styles.typePillTextSelected,
              ]}
            >
              {type}
            </RNText>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <View style={styles.backButtonCircle}>
            <Icon name="backArrow" size={moderateScale(18)} color="#1D3557" />
          </View>
        </TouchableOpacity>
        <SkipButton onPress={handleSkip} style={styles.skipButton} />
      </View>

      {/* Content */}
      <View style={styles.contentWrapper}>
        <RNText style={styles.title}>Select your preferable</RNText>
        <RNText style={styles.titleHighlight}>real estate type</RNText>

        <RNText style={styles.subtitle}>
          You can edit this later on your account setting.
        </RNText>

        <FlatList
          data={PROPERTY_GROUPS}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderGroupedRow}
          contentContainerStyle={styles.typeList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Next Button */}
      <Button
        title="Next"
        onPress={handleComplete}
        style={styles.nextButton}
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
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
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
  contentWrapper: {
    flex: 1,
    paddingHorizontal: responsiveWidth(7),
    paddingTop: verticalScale(24),
  },
  title: {
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: moderateScale(25),
    lineHeight: verticalScale(36),
    color: '#1F2A44',
  },
  titleHighlight: {
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: moderateScale(25),
    color: '#1F4C6B',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    marginTop: verticalScale(10),
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#727B92',
  },
  typeList: {
    marginTop: verticalScale(28),
    paddingBottom: verticalScale(24),
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // 👈 Left aligned fix
    flexWrap: 'wrap',
    marginBottom: verticalScale(14),
  },
  typePill: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(22),
    borderRadius: verticalScale(24),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9DEEB',
    marginRight: scale(10),
    shadowColor: 'rgba(19, 35, 64, 0.06)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  typePillSelected: {
    backgroundColor: '#E43F4B',
    borderColor: '#E43F4B',
    shadowColor: 'rgba(228, 63, 75, 0.35)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  typePillText: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: '#1F2A44',
  },
  typePillTextSelected: {
    color: '#FFFFFF',
  },
  nextButton: {
    marginHorizontal: responsiveWidth(7),
    marginBottom: verticalScale(24),
    height: verticalScale(60),
    borderRadius: verticalScale(18),
  },
});

export default SelectRealEstateTypeScreen;
