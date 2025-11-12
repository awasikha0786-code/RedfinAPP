import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../../utils/layout';

const PropertyReviewMediaThumbnails = ({ media, onPress }) => {
  if (!Array.isArray(media) || media.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {media.slice(0, 3).map((source, index) => (
        <TouchableOpacity
          key={index}
          style={styles.thumbnailWrapper}
          activeOpacity={0.85}
          onPress={() => onPress?.(index, media)}
        >
          <Image source={source} style={styles.thumbnailImage} resizeMode="cover" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: moderateScale(12),
    marginBottom: verticalScale(12),
  },
  thumbnailWrapper: {
    width: scale(62),
    height: scale(62),
    borderRadius: moderateScale(18),
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});

export default PropertyReviewMediaThumbnails;

