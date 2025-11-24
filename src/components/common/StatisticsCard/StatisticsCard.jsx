import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const StatisticsCard = ({ value, label }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    minWidth: 102.33,
    minHeight: 76,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#F5F4F8',
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#14233A',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#14233A',
    marginTop: 4,
  },
});

export default StatisticsCard;

