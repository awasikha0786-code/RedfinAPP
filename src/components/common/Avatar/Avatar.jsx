import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

const Avatar = ({ source, onPress, style, label }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, style]}
    >
      {source ? (
        <Image 
          source={source} 
          style={styles.image} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.fallback}> 
          <Text style={styles.fallbackText}>{label ? label.charAt(0) : ''}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#EEF2F7',
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  fallback: {
    backgroundColor: '#EEF2F7',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  fallbackText: {
    color: '#1B516B',
    fontWeight: '700',
    fontSize: 24,
  },
});

export default Avatar;
