import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenHeader, Button, Icon } from '../../../../components/common';
import { launchImageLibrary } from 'react-native-image-picker';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const GRID_HORIZONTAL_PADDING = Math.max(24, SCREEN_WIDTH * 0.06);
const PHOTO_GAP = moderateScale(16);
const PHOTO_SIZE = (SCREEN_WIDTH - GRID_HORIZONTAL_PADDING * 2 - PHOTO_GAP * 2) / 3;
const MAX_PHOTOS = 6;

const mapInitialPhotos = (initial = []) =>
  initial
    .map((item, index) => {
      if (!item) {
        return null;
      }
      if (typeof item === 'string') {
        return { id: `initial-${index}`, uri: item };
      }
      if (item.uri) {
        return { id: item.id || `initial-${index}`, uri: item.uri };
      }
      if (item.source) {
        return { id: item.id || `initial-${index}`, source: item.source };
      }
      return null;
    })
    .filter(Boolean);

const AddListingPhotosScreen = ({ navigation, route }) => {
  const initialPhotos = useMemo(() => mapInitialPhotos(route?.params?.photos), [route?.params?.photos]);
  const [photos, setPhotos] = useState(initialPhotos);
  const canProceed = photos.length >= MAX_PHOTOS;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.85,
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          Alert.alert('Error selecting photo', response.errorMessage || 'Something went wrong while picking the photo.');
          return;
        }

        const asset = response.assets?.[0];
        if (asset?.uri) {
          const newPhoto = {
            id: `picked-${Date.now()}`,
            uri: asset.uri,
          };
          setPhotos((prev) => [...prev, newPhoto]);
        }
      }
    );
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleNext = () => {
    navigation.navigate('AddListingDetails', {
      ...route?.params,
      photos,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader onBackPress={handleBack} title="Add Listing" />

      <View style={styles.content}>
        <Text style={styles.heading}>
          Add <Text style={styles.headingAccent}>photos</Text> to your{'\n'}listing
        </Text>

        <View style={styles.photosGrid}>
          <View style={styles.photosRow}>
            {photos.slice(0, 3).map((photo, index) => {
              const imageSource = photo.source ? photo.source : { uri: photo.uri };

              return (
                <View key={photo.id || `${photo.uri}-${index}`} style={styles.photoWrapper}>
                  <Image source={imageSource} style={styles.photoImage} resizeMode="cover" />
                  <TouchableOpacity
                    style={styles.photoRemoveButton}
                    onPress={() => handleRemovePhoto(index)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.removeIconCircle}>
                      <Text style={styles.removeIconText}>×</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
            {photos.length < 3 && (
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={handleAddPhoto}
                activeOpacity={0.8}
              >
                <Text style={styles.addPhotoPlus}>+</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.photosRow}>
            {photos.slice(3).slice(0, 3).map((photo, index) => {
              const imageSource = photo.source ? photo.source : { uri: photo.uri };

              return (
                <View
                  key={photo.id || `${photo.uri}-${index + 3}`}
                  style={styles.photoWrapper}
                >
                  <Image source={imageSource} style={styles.photoImage} resizeMode="cover" />
                  <TouchableOpacity
                    style={styles.photoRemoveButton}
                    onPress={() => handleRemovePhoto(index + 3)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.removeIconCircle}>
                      <Text style={styles.removeIconText}>×</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}

            {photos.length >= 3 && photos.slice(3).length < 3 && (
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={handleAddPhoto}
                activeOpacity={0.8}
              >
                <Text style={styles.addPhotoPlus}>+</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Additional rows for photos beyond 6 */}
          {photos.length > 6 && (
            <>
              {Array.from({ length: Math.ceil((photos.length - 6) / 3) }).map((_, rowIndex) => {
                const startIndex = 6 + rowIndex * 3;
                const rowPhotos = photos.slice(startIndex, startIndex + 3);
                
                return (
                  <View key={`row-${rowIndex}`} style={styles.photosRow}>
                    {rowPhotos.map((photo, index) => {
                      const imageSource = photo.source ? photo.source : { uri: photo.uri };
                      const actualIndex = startIndex + index;

                      return (
                        <View
                          key={photo.id || `${photo.uri}-${actualIndex}`}
                          style={styles.photoWrapper}
                        >
                          <Image source={imageSource} style={styles.photoImage} resizeMode="cover" />
                          <TouchableOpacity
                            style={styles.photoRemoveButton}
                            onPress={() => handleRemovePhoto(actualIndex)}
                            activeOpacity={0.8}
                          >
                            <View style={styles.removeIconCircle}>
                              <Text style={styles.removeIconText}>×</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                    
                    {rowPhotos.length < 3 && (
                      <TouchableOpacity
                        style={styles.addPhotoButton}
                        onPress={handleAddPhoto}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.addPhotoPlus}>+</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </>
          )}
          
          {/* Show plus button in new row if last row is full */}
          {photos.length >= 6 && photos.length % 3 === 0 && (
            <View style={styles.photosRow}>
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={handleAddPhoto}
                activeOpacity={0.8}
              >
                <Text style={styles.addPhotoPlus}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {photos.length < MAX_PHOTOS && (
          <Text style={styles.helperText}>Upload at least 6 photos to continue.</Text>
        )}
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.floatingBackButton} onPress={handleBack} activeOpacity={0.85}>
          <LinearGradient
            colors={['#E9F8EF', '#FFFFFF']}
            style={styles.floatingBackGradient}
          >
            <Icon name="arrow" size={moderateScale(20)} color="#14233A" />
          </LinearGradient>
        </TouchableOpacity>

        <Button
          title="Next"
          onPress={handleNext}
          disabled={!canProceed}
          style={[styles.nextButton, !canProceed && styles.nextButtonDisabled]}
          textStyle={styles.nextButtonText}
          activeOpacity={0.9}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: GRID_HORIZONTAL_PADDING,
    paddingTop: verticalScale(24),
  },
  heading: {
    width: 234,
    height: 80,
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: 25,
    lineHeight: 40,
    letterSpacing: 25 * 0.03,
    color: '#252B5C',
    opacity: 1,
    marginBottom: verticalScale(24),
  },
  headingAccent: {
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: 25,
    lineHeight: 40,
    letterSpacing: 25 * 0.03,
    color: '#252B5C',
  },
  photosGrid: {
    rowGap: verticalScale(16),
    marginBottom: verticalScale(20),
  },
  photosRow: {
    flexDirection: 'row',
    columnGap: PHOTO_GAP,
  },
  photoWrapper: {
    width: PHOTO_SIZE,
    aspectRatio: 1,
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoRemoveButton: {
    position: 'absolute',
    top: moderateScale(6),
    right: moderateScale(6),
  },
  removeIconCircle: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(11),
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIconText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '700',
    lineHeight: moderateScale(18),
  },
  addPhotoButton: {
    width: 78,
    height: 78,
    borderRadius: moderateScale(20),
    backgroundColor: '#F5F4F8',
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButtonDisabled: {
    opacity: 0.5,
  },
  addPhotoPlus: {
    fontSize: moderateScale(32),
    color: '#17455C',
    fontWeight: '500',
    lineHeight: moderateScale(36),
  },
  addPhotoPlusDisabled: {
    color: '#9AA4B2',
  },
  helperText: {
    width: 271,
    height: 20,
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 12 * 0.03,
    textAlign: 'center',
    color: '#E35555',
    opacity: 1,
    alignSelf: 'center',
    marginTop: verticalScale(212),
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GRID_HORIZONTAL_PADDING,
    paddingBottom: Platform.select({ ios: verticalScale(24), android: verticalScale(18) }),
    paddingTop: verticalScale(12),
  },
  floatingBackButton: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    overflow: 'hidden',
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  floatingBackGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(32),
  },
  nextButton: {
    flex: 1,
    marginLeft: moderateScale(24),
    height: verticalScale(64),
    borderRadius: moderateScale(20),
    backgroundColor: '#E63946',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#F2A6AD',
  },
  nextButtonText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    textTransform: 'none',
  },
});

export default AddListingPhotosScreen;

