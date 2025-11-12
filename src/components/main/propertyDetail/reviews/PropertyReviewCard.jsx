import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../../utils/layout';
import PropertyReviewMediaThumbnails from './PropertyReviewMediaThumbnails';

const STAR_TOTAL = 5;

const PropertyReviewCard = ({ review, style, onMediaPress }) => {
  const {
    avatar,
    name,
    rating = 0,
    comment,
    date,
    media = [],
  } = review || {};

  const safeRating = Math.max(0, Math.min(rating, STAR_TOTAL));

  return (
    <View style={[styles.container, style]}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.starsRow}>
            {[...Array(STAR_TOTAL)].map((_, index) => (
              <Text
                key={index}
                style={index < safeRating ? styles.starFilled : styles.starEmpty}
              >
                ★
              </Text>
            ))}
          </View>
        </View>
        {comment ? <Text style={styles.comment}>{comment}</Text> : null}
        <PropertyReviewMediaThumbnails
          media={media}
          onPress={(index, sources) => onMediaPress?.(index, review, sources)}
        />
        {date ? <Text style={styles.date}>{date}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: moderateScale(25),
    backgroundColor: '#F1F3FB',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(16),
    width: '100%',
    maxWidth: scale(327),
    minHeight: verticalScale(128),
    alignSelf: 'center',
    columnGap: moderateScale(10),
  },
  avatar: {
    width: scale(54),
    height: scale(54),
    borderRadius: scale(27),
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2F4A',
  },
  starsRow: {
    flexDirection: 'row',
    columnGap: moderateScale(4),
  },
  starFilled: {
    fontSize: moderateScale(14),
    color: '#F5C451',
  },
  starEmpty: {
    fontSize: moderateScale(14),
    color: '#C9D2E0',
  },
  comment: {
    fontSize: moderateScale(13),
    fontWeight: '400',
    color: '#4E5F78',
    lineHeight: moderateScale(18),
    marginBottom: verticalScale(10),
  },
  date: {
    fontSize: moderateScale(11),
    fontWeight: '500',
    color: '#8B94A6',
  },
});

export default PropertyReviewCard;

