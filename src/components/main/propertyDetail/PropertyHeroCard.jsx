import React from 'react';
import {View,
StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';

const HEART_ICON = require('../../../assets/icons/Heart.png');
const SHARE_ICON = require('../../../assets/icons/Share.png');
const BACK_ICON = require('../../../assets/icons/backArro.png');
const LOCATION_ICON = require('../../../assets/icons/Location.png');
const TIMER_ICON = require('../../../assets/icons/360.png');

const ensureSource = (src) => {
  if (!src) {
    return require('../../../assets/images/login_image.png');
  }
  if (typeof src === 'string') {
    return { uri: src };
  }
  return src;
};

const DEFAULT_OPTIONS = ['Rent', 'Buy'];

const PropertyHeroCard = ({
  image,
  title,
  rating,
  type,
  price,
  priceUnit = 'per month',
  location,
  gallery = [],
  purchaseOptions = DEFAULT_OPTIONS,
  activePurchaseOption = 'Rent',
  onBack,
  onFavoriteToggle,
  onShare,
  onViewGallery,
  onPurchaseOptionPress,
  onVirtualTourPress,
  isFavorite = false,
}) => {
  const heroImage = ensureSource(image);
  const thumbs = gallery.slice(0, 3);
  const remaining = Math.max(gallery.length - thumbs.length, 0);

  return (
    <View style={styles.container}>
      <View style={styles.heroImageWrapper}>
        <ImageBackground
          source={heroImage}
          style={styles.image}
          imageStyle={styles.imageBorder}
        >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.circle} onPress={onBack} activeOpacity={0.85}>
            <Image source={BACK_ICON} style={styles.headerIcon} />
          </TouchableOpacity>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.circle} onPress={onShare} activeOpacity={0.85}>
              <Image source={SHARE_ICON} style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circle, styles.favoriteCircle]}
              onPress={onFavoriteToggle}
              activeOpacity={0.85}
            >
              <Image
                source={HEART_ICON}
                style={[styles.headerIcon, isFavorite ? styles.favoriteIconActive : styles.favoriteIcon]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {thumbs.length > 0 && (
          <TouchableOpacity style={styles.galleryStack} onPress={onViewGallery} activeOpacity={0.85}>
            {thumbs.map((thumb, index) => (
              <View key={index} style={styles.galleryItem}>
                <Image source={ensureSource(thumb)} style={styles.galleryThumb} />
                {index === thumbs.length - 1 && remaining > 0 && (
                  <View style={styles.galleryMore}>
                    <Text style={styles.galleryMoreText}>+{remaining}</Text>
                  </View>
                )}
              </View>
            ))}
          </TouchableOpacity>
        )}

        <View style={styles.infoRow}>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingStar}>⭐</Text>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
            <View style={styles.typePill}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
        </View>
        </ImageBackground>
      </View>

      <View style={styles.metaSection}>
        <View style={styles.metaLeft}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationRow}>
            <Image source={LOCATION_ICON} style={styles.locationIcon} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>
        <View style={styles.metaRight}>
          <Text style={styles.priceValue}>{price}</Text>
          <Text style={styles.priceUnit}>{priceUnit}</Text>
        </View>
      </View>

      <View style={styles.purchaseRow}>
        {purchaseOptions.map((option) => {
          const active = option === activePurchaseOption;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.purchasePill, active && styles.purchasePillActive]}
              onPress={() => onPurchaseOptionPress?.(option)}
              activeOpacity={0.85}
            >
              <Text style={[styles.purchaseLabel, active && styles.purchaseLabelActive]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.tourButton} onPress={onVirtualTourPress} activeOpacity={0.85}>
          <Image source={TIMER_ICON} style={styles.tourIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 48,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#10213A1A',
        shadowOpacity: 0.2,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 12 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  heroImageWrapper: {
    marginHorizontal: -30,
    marginRight: -57,
   // borderTopLeftRadius: 48,
    //borderTopRightRadius: 48,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 420,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  imageBorder: {
    borderRadius: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFFEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 12,
    marginRight: 28,
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: '#14233A',
  },
  favoriteCircle: {
    backgroundColor: '#FFFFFF',
  },
  favoriteIcon: {
    tintColor: '#9AA4B2',
  },
  favoriteIconActive: {
    tintColor: '#E63946',
  },
  galleryStack: {
    position: 'absolute',
    right: 50,
    bottom: 24,
    gap: 12,
  },
  galleryItem: {
    width: 66,
    height: 66,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  galleryThumb: {
    width: '100%',
    height: '100%',
  },
  galleryMore: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(33, 98, 138, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryMoreText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#14233A',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  ratingStar: {
    color: '#F7C948',
    fontSize: 14,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  typePill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  typeText: {
    color: '#14233A',
    fontWeight: '600',
  },
  metaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  metaLeft: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#14233A',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: '#6C7380',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C7380',
  },
  metaRight: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#14233A',
  },
  priceUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6C7380',
    marginTop: 4,
  },
  purchaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 18,
  },
  purchasePill: {
    flex: 1,
    height: 48,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7FB',
  },
  purchasePillActive: {
    backgroundColor: '#E63946',
  },
  purchaseLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C7380',
  },
  purchaseLabelActive: {
    color: '#FFFFFF',
  },
  tourButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#10213A',
        shadowOpacity: 0.16,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },
  tourIcon: {
    width: 22,
    height: 22,
    tintColor: '#14233A',
  },
});

export default PropertyHeroCard;

