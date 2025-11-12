import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PropertyFeaturePills = ({ features = [] }) => {
  if (!features.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {features.map((item) => (
        <View key={item.label} style={[styles.pill, item.emphasis && styles.pillEmphasis]}>
          <Text style={[styles.label, item.emphasis && styles.labelEmphasis]}>
            {item.emoji ? `${item.emoji} ` : ''}
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14233A',
  },
  pillEmphasis: {
    backgroundColor: '#21628A',
  },
  labelEmphasis: {
    color: '#FFFFFF',
  },
});

export default PropertyFeaturePills;


