import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { ScreenHeader, Icon } from '../../../components/common';
import ConfirmationBottomSheet from '../../../components/common/buttomSheet/ConfirmationBottomSheet';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const STAR_TOTAL = 5;

const MAX_PHOTOS = 5;

const AddReviewScreen = ({ navigation, route }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [successSheetVisible, setSuccessSheetVisible] = useState(false);

  // Ensure navigation and route are available
  if (!navigation) {
    console.error('AddReviewScreen: navigation prop is missing');
  }
  if (!route) {
    console.error('AddReviewScreen: route prop is missing');
  }

  const handleBack = () => {
    try {
      if (navigation?.canGoBack && navigation.canGoBack()) {
        navigation.goBack();
      } else if (navigation?.goBack) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error navigating back:', error);
    }
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  const handleAddPhoto = () => {
    try {
      if (photos.length >= MAX_PHOTOS) {
        Alert.alert('Limit reached', `You can upload up to ${MAX_PHOTOS} photos.`);
        return;
      }

      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: MAX_PHOTOS - photos.length,
          quality: 0.85,
        },
        (response) => {
          try {
            if (response.didCancel) {
              return;
            }
            if (response.errorCode) {
              Alert.alert('Error', response.errorMessage || 'Something went wrong while picking the photo.');
              return;
            }

            if (response.assets && response.assets.length > 0) {
              const newPhotos = response.assets.map((asset, index) => ({
                id: `photo-${Date.now()}-${index}`,
                uri: asset.uri,
              }));
              setPhotos((prev) => [...prev, ...newPhotos].slice(0, MAX_PHOTOS));
            }
          } catch (error) {
            console.error('Error processing image picker response:', error);
            Alert.alert('Error', 'Failed to process selected images.');
          }
        }
      );
    } catch (error) {
      console.error('Error launching image library:', error);
      Alert.alert('Error', 'Failed to open image picker.');
    }
  };

  const handleRemovePhoto = (photoId) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting.');
      return;
    }

    // TODO: Implement submit logic - save review to backend
    const reviewData = {
      rating,
      reviewText: reviewText.trim(),
      photos,
      transactionId: route?.params?.transaction?.id,
    };

    console.log('Submitting review:', reviewData);

    // Show success bottom sheet
    setSuccessSheetVisible(true);
  };

  const handleSuccessContinue = () => {
    try {
      setSuccessSheetVisible(false);
      // Navigate back to previous screen
      if (navigation?.canGoBack && navigation.canGoBack()) {
        navigation.goBack();
      } else if (navigation?.goBack) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error navigating back after success:', error);
    }
  };

  const renderSuccessIcon = () => (
    <View style={styles.successIconWrapper}>
      <LinearGradient
        colors={['rgba(35, 79, 104, 0.2)', 'rgba(139, 200, 63, 0.15)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.successIconOuter}
      >
        <LinearGradient
          colors={['#234F68', '#7BCF4C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successIconInner}
        >
          <Text style={styles.successIconCheck}>✓</Text>
        </LinearGradient>
      </LinearGradient>
    </View>
  );

  const formattedRating = rating > 0 ? rating.toFixed(1) : '0.0';

  // Safety check: ensure navigation is available before rendering
  if (!navigation) {
    console.error('AddReviewScreen: navigation prop is required but missing');
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader onBackPress={handleBack} title="Add Review" />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Question Section */}
        <View style={styles.questionSection}>
          <View style={styles.questionTextContainer}>
            <Text style={styles.questionText}>
              Hi, how was your{' '}
              <Text style={styles.questionHighlight}>overall{'\n'}experience?</Text>
            </Text>
          </View>
          <Text style={styles.subtitleText}>lorem ipsum dolor sit amet</Text>
        </View>

        {/* Star Rating Section */}
        <View style={styles.ratingSection}>
          <View style={styles.starsContainer}>
            {[...Array(STAR_TOTAL)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleStarPress(index)}
                activeOpacity={0.7}
                style={styles.starButton}
              >
                <Image
                  source={require('../../../assets/icons/Vecto_starr.png')}
                  style={[
                    styles.starIcon,
                    index < rating ? styles.starIconFilled : styles.starIconEmpty,
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingValue}>{formattedRating}</Text>
        </View>

        {/* Review Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.textInputContainer}>
            <View style={styles.inputIconContainer}>
              <Icon name="message" size={moderateScale(20)} color="#A1A5C1" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Write your experience in here (optional)"
              placeholderTextColor="#A1A5C1"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Photos Grid */}
          <View style={styles.photosContainer}>
            {photos.map((photo) => (
              <View key={photo.id} style={styles.photoItem}>
                <Image source={{ uri: photo.uri }} style={styles.photoImage} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => handleRemovePhoto(photo.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.removePhotoIcon}>
                    <Text style={styles.removePhotoText}>×</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            {photos.length < MAX_PHOTOS && (
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={handleAddPhoto}
                activeOpacity={0.8}
              >
                <View style={styles.addPhotoIconContainer}>
                  <Text style={styles.addPhotoIcon}>+</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.9}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Success Bottom Sheet */}
      <ConfirmationBottomSheet
        visible={successSheetVisible}
        onClose={() => setSuccessSheetVisible(false)}
        onConfirm={handleSuccessContinue}
        title="Successfully submitted"
        highlightText="your review"
        subtitle=""
        warningText="Lorem ipsum dolor sit amet, consectetur."
        cancelText=""
        confirmText="Continue Exploring"
        showCancelButton={false}
        showConfirmButton={true}
        containerStyle={styles.successSheetContainer}
        sheetStyle={styles.successSheet}
        handleStyle={styles.successHandle}
        messageTextStyle={styles.successMessage}
        highlightTextStyle={styles.successMessageHighlight}
        warningTextStyle={styles.successWarning}
        buttonContainerStyle={styles.successButtonContainer}
        confirmButtonStyle={styles.successConfirmButton}
        confirmButtonTextStyle={styles.successConfirmText}
        messageAlign="center"
        messageContainerStyle={styles.successMessageContainer}
        renderIcon={renderSuccessIcon}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(100),
  },
  questionSection: {
    marginBottom: verticalScale(24),
  },
  questionTextContainer: {
    width: scale(288),
    height: verticalScale(80),
    marginBottom: verticalScale(8),
  },
  questionText: {
    fontSize: moderateScale(25),
    fontWeight: '500',
    fontFamily: 'Lato',
    color: '#252B5C',
    lineHeight: moderateScale(40),
    letterSpacing: 0.03,
  },
  questionHighlight: {
    fontWeight: '800',
    fontFamily: 'Lato',
    color: '#252B5C',
    fontSize: moderateScale(25),
    lineHeight: moderateScale(40),
    letterSpacing: 0.03,
  },
  subtitleText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: '#A1A5C1',
    lineHeight: moderateScale(20),
    letterSpacing: 0.03,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(32),
    gap: scale(16),
  },
  starsContainer: {
    flexDirection: 'row',
    gap: scale(8),
  },
  starButton: {
    padding: scale(4),
  },
  starIcon: {
    width: scale(32),
    height: scale(32),
  },
  starIconFilled: {
    opacity: 1,
  },
  starIconEmpty: {
    opacity: 0.3,
  },
  ratingValue: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#14233A',
  },
  inputSection: {
    marginBottom: verticalScale(24),
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    minHeight: verticalScale(150),
    marginBottom: verticalScale(16),
  },
  inputIconContainer: {
    marginRight: scale(12),
    alignSelf: 'flex-start',
    paddingTop: verticalScale(2),
  },
  textInput: {
    flex: 1,
    fontSize: moderateScale(12),
    fontFamily: 'Lato',
    fontWeight: '400',
    color: '#14233A',
    lineHeight: moderateScale(12),
    letterSpacing: 0.03,
    minHeight: verticalScale(120),
    paddingTop: 0,
    paddingBottom: 0,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
    marginTop: verticalScale(8),
    justifyContent: 'flex-start',
  },
  photoItem: {
    width: (SCREEN_WIDTH - scale(48) - scale(12)) / 2,
    height: (SCREEN_WIDTH - scale(48) - scale(12)) / 2,
    borderRadius: scale(15),
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: scale(4),
    right: scale(4),
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: '#14233A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoIcon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: moderateScale(14),
  },
  addPhotoButton: {
    width: scale(78),
    height: scale(78),
    borderRadius: scale(15),
    backgroundColor: '#F5F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoIconContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoIcon: {
    fontSize: moderateScale(32),
    fontWeight: '400',
    color: '#14233A',
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(24),
    paddingTop: verticalScale(16),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECEDF3',
    alignItems: 'center',
  },
  submitButton: {
    width: scale(276),
    height: verticalScale(70),
    borderRadius: scale(10),
    backgroundColor: '#DE3341',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successSheetContainer: {
    justifyContent: 'flex-end',
  },
  successSheet: {
    width: '100%',
    maxWidth: scale(375),
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    paddingHorizontal: moderateScale(24),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(32),
    alignItems: 'center',
  },
  successHandle: {
    width: scale(40),
    height: scale(4),
    backgroundColor: '#D1D6DE',
    borderRadius: scale(2),
    marginBottom: verticalScale(16),
  },
  successIconWrapper: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconOuter: {
    width: scale(140),
    height: scale(140),
    borderRadius: scale(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconInner: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#234F68',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successIconCheck: {
    fontSize: moderateScale(42),
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  successMessageContainer: {
    width: scale(269),
    height: verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
  },
  successMessage: {
    fontFamily: 'Lato',
    fontSize: moderateScale(25),
    fontWeight: '800',
    color: '#252B5C',
    textAlign: 'center',
    lineHeight: moderateScale(40),
    letterSpacing: 0.03,
  },
  successMessageHighlight: {
    fontFamily: 'Lato',
    fontSize: moderateScale(25),
    fontWeight: '500',
    color: '#252B5C',
    textAlign: 'center',
    lineHeight: moderateScale(40),
    letterSpacing: 0.03,
  },
  successWarning: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: '#A1A5C1',
    textAlign: 'center',
    lineHeight: moderateScale(10),
    letterSpacing: 0.03,
    marginBottom: verticalScale(32),
  },
  successButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  successConfirmButton: {
    width: scale(276),
    height: verticalScale(70),
    borderRadius: scale(10),
    backgroundColor: '#DE3341',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successConfirmText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AddReviewScreen;

