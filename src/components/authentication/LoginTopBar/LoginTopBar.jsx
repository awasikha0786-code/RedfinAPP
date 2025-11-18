import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const LoginTopBar = () => {
  return (
    <View style={styles.container}>
      {/* Header Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/images/loginTopBar.png')}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>
      
      {/* Navigation Bar - Removed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  illustrationContainer: {
    height: 140,
    backgroundColor: '#ffffff',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  // Navigation styles removed
});

export default LoginTopBar;
