import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../../utils/layout';

const PropertyMapStatPill = ({ label, active, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.containerActive, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: scale(120),
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(24),
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10213A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  containerActive: {
    backgroundColor: '#1F4D70',
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#1F2F4A',
  },
  labelActive: {
    color: '#FFFFFF',
  },
});

export default PropertyMapStatPill;
