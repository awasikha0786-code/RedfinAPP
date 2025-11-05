import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const FilterButton = ({ label, isActive = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive && styles.activeButton
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.buttonText,
        isActive && styles.activeButtonText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 62,
    height: 47,
    borderRadius: 20,
    backgroundColor: '#F5F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    paddingHorizontal: 12,
  },
  activeButton: {
    backgroundColor: '#21628A',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#14233A',
  },
  activeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default FilterButton;

