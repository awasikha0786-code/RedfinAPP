import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const AlertCard = ({ code, description, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Image 
            source={require('../../../assets/icons/newls.png')} 
            style={styles.icon} 
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.code}>{code}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E63946',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  textContainer: {
    flex: 1,
  },
  code: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14233A',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6C7380',
    lineHeight: 20,
  },
});

export default AlertCard;

