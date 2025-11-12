import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { moderateScale, responsiveWidth, scale, verticalScale } from '../../../../utils/layout';

const PropertyReviewSummaryCard = ({ property }) => {
  if (!property) {
    return null;
  }

  const {
    image,
    title,
    rating,
    type,
    location,
  } = property;

  const formattedRating =
    typeof rating === 'number' ? rating.toFixed(1) : rating || '--';

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <View style={styles.favoriteBadge}>
          <Image
            source={require('../../../../assets/icons/Heart.png')}
            style={styles.favoriteIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{type || 'Apartment'}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.metaStar}>★</Text>
          <Text style={styles.ratingValue}>{formattedRating}</Text>
        </View>
        <View style={styles.locationRow}>
          <Image
            source={require('../../../../assets/icons/Location.png')}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text style={styles.locationText} numberOfLines={1}>
            {location || 'Jakarta, Indonesia'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90),
    maxWidth: 360,
    flexDirection: 'row',
    borderRadius: moderateScale(26),
    backgroundColor: '#F5F4F8',
    padding: moderateScale(16),
    alignSelf: 'center',
    columnGap: moderateScale(16),
    marginBottom: verticalScale(24),
  },
  imageWrapper: {
    width: scale(140),
    height: scale(110),
    borderRadius: moderateScale(22),
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteBadge: {
    position: 'absolute',
    top: moderateScale(12),
    left: moderateScale(12),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    width: scale(16),
    height: scale(16),
    tintColor: '#E63946',
  },
  typeBadge: {
    position: 'absolute',
    bottom: moderateScale(12),
    left: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(16),
    backgroundColor: 'rgba(31, 77, 112, 0.85)',
  },
  typeBadgeText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#14233A',
    marginBottom: verticalScale(12),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(8),
    marginBottom: verticalScale(10),
  },
  metaStar: {
    fontSize: moderateScale(16),
    color: '#F5C451',
  },
  ratingValue: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2F4A',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(6),
  },
  locationIcon: {
    width: scale(14),
    height: scale(14),
    tintColor: '#1F4D70',
  },
  locationText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#1F2F4A',
    flexShrink: 1,
  },
});

export default PropertyReviewSummaryCard;

