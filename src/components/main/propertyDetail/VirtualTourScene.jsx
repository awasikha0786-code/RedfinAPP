import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

const BACK_ICON = require('../../../assets/icons/backArro.png');
const HEART_ICON = require('../../../assets/icons/Heart.png');
const MESSAGE_ICON = require('../../../assets/icons/message.png');
const ARROW_ICON = require('../../../assets/icons/arrow.png');

const DEFAULT_SCENE_IMAGE = require('../../../assets/images/image1.png');
const DEFAULT_PROPERTY_IMAGE = require('../../../assets/images/login_image.png');

const ensureSource = (source, fallback) => {
  if (!source) {
    return fallback;
  }
  if (typeof source === 'string') {
    return { uri: source };
  }
  return source;
};

const VirtualTourScene = ({
  safeInsets = { top: 0, bottom: 0 },
  image,
  hotspots = [],
  activeSpot = {
    title: 'Jati dining table',
    subtitle: '2 people capacity',
  },
  roomLabel = 'Living Room',
  propertyInfo = {
    title: 'Sky Dandelions Apartment',
    type: 'Apartment',
    rating: 4.9,
    location: 'Jakarta, Indonesia',
    image: DEFAULT_PROPERTY_IMAGE,
    isFavorite: false,
  },
  onBack,
  onPrev,
  onNext,
  onChat,
  onToggleFavorite,
  onHotspotPress,
}) => {
  const { top = 0, bottom = 0 } = safeInsets || {};
  const sceneImage = ensureSource(image, DEFAULT_SCENE_IMAGE);
  const propertyImage = ensureSource(propertyInfo?.image, DEFAULT_PROPERTY_IMAGE);
  const ratingValue =
    typeof propertyInfo?.rating === 'number'
      ? propertyInfo.rating.toFixed(1)
      : propertyInfo?.rating || '4.9';

  return (
    <View style={styles.container}>
      <ImageBackground
        source={sceneImage}
        style={styles.sceneImage}
        imageStyle={styles.sceneImageInner}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={[styles.backButton, { top: top + 16 }]}
          onPress={onBack}
          activeOpacity={0.85}
        >
          <Image source={BACK_ICON} style={styles.backIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.navButtonLeft]}
          onPress={onPrev}
          activeOpacity={0.85}
        >
          <Image source={ARROW_ICON} style={styles.navIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.navButtonRight]}
          onPress={onNext}
          activeOpacity={0.85}
        >
          <Image source={ARROW_ICON} style={[styles.navIcon, styles.navIconRight]} />
        </TouchableOpacity>

        {hotspots.map((spot) => (
          <TouchableOpacity
            key={spot.id}
            style={[
              styles.hotspot,
              spot.top != null && { top: `${spot.top}%` },
              spot.left != null && { left: `${spot.left}%` },
              spot.right != null && { right: `${spot.right}%` },
              spot.bottom != null && { bottom: `${spot.bottom}%` },
            ]}
            onPress={() => onHotspotPress?.(spot)}
            activeOpacity={0.85}
          >
            <View style={styles.hotspotInner} />
          </TouchableOpacity>
        ))}

        <View style={styles.callout}>
          <View style={styles.calloutDot} />
          <View style={styles.calloutTextWrapper}>
            <Text style={styles.calloutTitle}>{activeSpot?.title}</Text>
            <Text style={styles.calloutSubtitle}>{activeSpot?.subtitle}</Text>
          </View>
        </View>

        <View style={[styles.roomActionRow, { bottom: bottom + 170 }]}>
          <View style={styles.roomChip}>
            <Text style={styles.roomChipText}>{roomLabel}</Text>
          </View>
          <TouchableOpacity style={styles.roomChatButton} onPress={onChat} activeOpacity={0.85}>
            <Image source={MESSAGE_ICON} style={styles.roomChatIcon} />
          </TouchableOpacity>
        </View>

        <View style={[styles.infoCard, { bottom: bottom + 24 }]}>
          <View style={styles.infoImageWrapper}>
            <Image source={propertyImage} style={styles.infoImage} />
            <TouchableOpacity
              style={styles.infoHeart}
              onPress={onToggleFavorite}
              activeOpacity={0.85}
            >
              <Image
                source={HEART_ICON}
                style={[
                  styles.infoHeartIcon,
                  propertyInfo?.isFavorite && styles.infoHeartIconActive,
                ]}
              />
            </TouchableOpacity>
            <View style={styles.infoTypeTag}>
              <Text style={styles.infoTypeTagText}>{propertyInfo?.type || 'Apartment'}</Text>
            </View>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle} numberOfLines={1}>
              {propertyInfo?.title || 'Property Name'}
            </Text>
            <Text style={styles.infoRating}>★ {ratingValue}</Text>
            <View style={styles.infoLocationRow}>
              <Image
                source={require('../../../assets/icons/Location.png')}
                style={styles.infoLocationIcon}
              />
              <Text style={styles.infoLocationText} numberOfLines={1}>
                {propertyInfo?.location || 'Jakarta, Indonesia'}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sceneImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  sceneImageInner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.96)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: '#13233D',
  },
  roomActionRow: {
    position: 'absolute',
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    position: 'absolute',
    width: 46,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(19, 35, 61, 0.28)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonLeft: {
    left: 16,
    top: '45%',
  },
  navButtonRight: {
    right: 16,
    top: '45%',
  },
  navIcon: {
    width: 22,
    height: 22,
    tintColor: '#F8FAFF',
  },
  navIconRight: {
    transform: [{ scaleX: -1 }],
  },
  hotspot: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotspotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F1595C',
  },
  callout: {
    position: 'absolute',
    left: '24%',
    right: '24%',
    top: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  calloutDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E63946',
    marginRight: 12,
  },
  calloutTextWrapper: {
    flex: 1,
  },
  calloutTitle: {
    fontFamily: 'Raleway',
    fontSize: 16,
    fontWeight: '700',
    color: '#13233D',
    marginBottom: 4,
  },
  calloutSubtitle: {
    fontFamily: 'Raleway',
    fontSize: 13,
    fontWeight: '500',
    color: '#4A5C76',
  },
  roomChip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(28,52,82,0.8)',
  },
  roomChipText: {
    fontFamily: 'Raleway',
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFF',
  },
  roomChatButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomChatIcon: {
    width: 22,
    height: 22,
    tintColor: '#1C2C4A',
  },
  infoCard: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.96)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#10213A',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  infoImageWrapper: {
    width: 118,
    height: 90,
    borderRadius: 22,
    overflow: 'hidden',
    marginRight: 16,
  },
  infoImage: {
    width: '100%',
    height: '100%',
  },
  infoHeart: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10213A',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  infoHeartIcon: {
    width: 16,
    height: 16,
    tintColor: '#D1D5DB',
  },
  infoHeartIconActive: {
    tintColor: '#E63946',
  },
  infoContent: {
    flex: 1,
  },
  infoTypeTag: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(28, 52, 82, 0.85)',
  },
  infoTypeTagText: {
    fontFamily: 'Raleway',
    fontSize: 11,
    fontWeight: '600',
    color: '#F8FAFF',
  },
  infoTitle: {
    fontFamily: 'Raleway',
    fontSize: 17,
    fontWeight: '700',
    color: '#13233D',
    marginBottom: 4,
  },
  infoMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoRating: {
    fontFamily: 'Raleway',
    fontSize: 14,
    fontWeight: '700',
    color: '#F4C76C',
    marginBottom: 6,
  },
  infoLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLocationIcon: {
    width: 12,
    height: 12,
    tintColor: '#6B7A92',
    marginRight: 6,
  },
  infoLocationText: {
    fontFamily: 'Raleway',
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7A92',
    maxWidth: 160,
  },
});

export default VirtualTourScene;


