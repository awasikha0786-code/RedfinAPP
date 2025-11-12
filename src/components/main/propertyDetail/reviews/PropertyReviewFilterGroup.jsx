import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../../utils/layout';

const PropertyReviewFilterGroup = ({ options, value, onChange }) => {
  const handlePress = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  const items = Array.isArray(options)
    ? options
    : [
        { label: 'All', value: null },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
      ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {items.map((item) => {
        const active = value === item.value;
        return (
          <TouchableOpacity
            key={item.value ?? 'all'}
            style={[styles.pill, active && styles.pillActive]}
            activeOpacity={0.85}
            onPress={() => handlePress(item.value)}
          >
            <Text style={[styles.icon, active && styles.iconActive]}>★</Text>
            <Text style={[styles.label, active && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(4),
    columnGap: moderateScale(10),
    alignItems: 'center',
    paddingBottom: verticalScale(4),
  },
  pill: {
    width: scale(86),
    height: verticalScale(50),
    borderRadius: moderateScale(20),
    backgroundColor: '#F1F3FB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: moderateScale(10),
  },
  pillActive: {
    backgroundColor: '#1F4D70',
  },
  icon: {
    fontSize: moderateScale(18),
    color: '#F5C451',
  },
  iconActive: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2F4A',
  },
  labelActive: {
    color: '#FFFFFF',
  },
});

export default PropertyReviewFilterGroup;

