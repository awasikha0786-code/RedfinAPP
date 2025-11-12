import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const PropertyInfoSection = ({ title, actionLabel, onActionPress, children, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {actionLabel ? (
          <TouchableOpacity onPress={onActionPress} activeOpacity={0.8}>
            <Text style={styles.actionText}>{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#14233A',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#21628A',
  },
});

export default PropertyInfoSection;


