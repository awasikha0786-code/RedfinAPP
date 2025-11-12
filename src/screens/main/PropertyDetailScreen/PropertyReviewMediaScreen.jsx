import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../utils/layout';

const PropertyReviewMediaScreen = ({ navigation, route }) => {
  const review = route?.params?.review;
  const media = Array.isArray(route?.params?.media) ? route.params.media : review?.media || [];
  const initialIndex = route?.params?.initialIndex ?? 0;

  const [currentIndex, setCurrentIndex] = useState(
    Math.min(Math.max(initialIndex, 0), media.length - 1)
  );

  const currentImage = useMemo(() => media[currentIndex], [media, currentIndex]);

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  const showPrev = currentIndex > 0;
  const showNext = currentIndex < media.length - 1;

  const handlePrev = () => {
    if (showPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (showNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.backButtonWrapper}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.85}
          onPress={handleBack}
        >
          <Image
            source={require('../../../assets/icons/backArro.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={currentImage} style={styles.image} resizeMode="cover" />

          {showPrev && (
            <TouchableOpacity style={[styles.navButton, styles.navButtonLeft]} onPress={handlePrev}>
              <Text style={styles.navButtonIcon}>{'≪'}</Text>
            </TouchableOpacity>
          )}

          {showNext && (
            <TouchableOpacity style={[styles.navButton, styles.navButtonRight]} onPress={handleNext}>
              <Text style={styles.navButtonIcon}>{'≫'}</Text>
            </TouchableOpacity>
          )}

          <View style={styles.authorBadge}>
            <Image source={review?.avatar} style={styles.authorAvatar} resizeMode="cover" />
            <View style={styles.authorContent}>
              <Text style={styles.authorName}>{review?.name}</Text>
              <View style={styles.authorStars}>
                {[...Array(5)].map((_, index) => (
                  <Text
                    key={index}
                    style={index < (review?.rating ?? 0) ? styles.starFilled : styles.starEmpty}
                  >
                    ★
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.thumbnailRailVertical}>
            {media.map((source, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.thumbnailItem,
                  currentIndex === index && styles.thumbnailItemActive,
                ]}
                onPress={() => setCurrentIndex(index)}
                activeOpacity={0.85}
              >
                <Image source={source} style={styles.thumbnailImage} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  backButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    elevation: 3,
    shadowColor: '#1F2F4A',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  backButtonWrapper: {
    position: 'absolute',
    top: verticalScale(12),
    left: moderateScale(12),
    zIndex: 3,
  },
  backIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#1F2F4A',
  },
  imageWrapper: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  navButton: {
    position: 'absolute',
    width: moderateScale(40),
    height: moderateScale(83),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10213A',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  navButtonLeft: {
    top: '50%',
    left: 0,
    transform: [{ translateY: -moderateScale(41.5) }],
    borderTopRightRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  navButtonRight: {
    top: '50%',
    right: 0,
    transform: [{ translateY: -moderateScale(41.5) }],
    borderTopLeftRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
  },
  navButtonIcon: {
    fontSize: moderateScale(20),
    color: '#1F2F4A',
  },
  authorBadge: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: moderateScale(20),
    width: moderateScale(162),
    height: verticalScale(70),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: moderateScale(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(14),
  },
  authorAvatar: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
  },
  authorContent: {
    width: moderateScale(132),
    height: verticalScale(50),
    justifyContent: 'space-between',
  },
  authorName: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2F4A',
  },
  authorStars: {
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
  thumbnailRailVertical: {
    position: 'absolute',
    right: moderateScale(18),
    bottom: verticalScale(12),
    alignItems: 'center',
  },
  thumbnailItem: {
    width: scale(74),
    height: scale(74),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    opacity: 0.65,
    marginBottom: moderateScale(12),
  },
  thumbnailItemActive: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#1F4D70',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});

export default PropertyReviewMediaScreen;

