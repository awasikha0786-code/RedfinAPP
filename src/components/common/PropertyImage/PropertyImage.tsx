import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';

export interface PropertyImageProps {
  source: any;
  style?: ViewStyle;
  overlayColor?: string;
  overlayOpacity?: number;
}

const PropertyImage: React.FC<PropertyImageProps> = ({
  source,
  style,
  overlayColor = '#000000',
  overlayOpacity = 0.2
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image 
        source={source} 
        style={styles.image}
        resizeMode="cover"
      />
      <View 
        style={[
          styles.overlay, 
          { 
            backgroundColor: overlayColor,
            opacity: overlayOpacity 
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default PropertyImage;
