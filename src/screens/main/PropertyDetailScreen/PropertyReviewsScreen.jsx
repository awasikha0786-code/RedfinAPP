import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import {
  PropertyReviewCard,
  PropertyReviewFilterGroup,
  PropertyReviewSummaryCard,
} from '../../../components/main/propertyDetail';
import { moderateScale, verticalScale } from '../../../utils/layout';

const FALLBACK_PROPERTY = {
  image: require('../../../assets/images/login_image.png'),
  title: 'Sky Dandelions Apartment',
  rating: 4.9,
  type: 'Apartment',
  location: 'Jakarta, Indonesia',
};

const FALLBACK_REVIEWS = [];

const DEFAULT_FILTERS = [
  { label: 'All', value: null },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

const PropertyReviewsScreen = ({ navigation, route }) => {
  const property = route?.params?.property || FALLBACK_PROPERTY;
  const reviews = route?.params?.reviews || FALLBACK_REVIEWS;

  const [selectedRating, setSelectedRating] = useState(null);

  const filters = route?.params?.filters || DEFAULT_FILTERS;

  const filteredReviews = useMemo(() => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return [];
    }

    if (selectedRating == null) {
      return reviews;
    }

    return reviews.filter((review) => review?.rating === selectedRating);
  }, [reviews, selectedRating]);

  const handleBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.85} onPress={handleBack}>
          <Image
            source={require('../../../assets/icons/backArro.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PropertyReviewSummaryCard property={property} />

        <PropertyReviewFilterGroup
          options={filters}
          value={selectedRating}
          onChange={setSelectedRating}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>User reviews</Text>
        </View>

        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <PropertyReviewCard
              key={review.id}
              review={review}
              onMediaPress={(index, selectedReview, mediaSources) => {
                navigation.navigate('PropertyReviewMedia', {
                  review: selectedReview,
                  media: mediaSources,
                  initialIndex: index,
                });
              }}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No reviews found</Text>
            <Text style={styles.emptySubtitle}>
              We couldn’t find any reviews that match this filter.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(16),
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#F1F3FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    tintColor: '#1F2F4A',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: '#14233A',
  },
  headerSpacer: {
    width: moderateScale(40),
  },
  scrollContent: {
    paddingBottom: verticalScale(32),
  },
  sectionHeader: {
    paddingHorizontal: moderateScale(24),
    marginTop: verticalScale(32),
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#14233A',
  },
  emptyState: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(40),
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2F4A',
    marginBottom: verticalScale(8),
  },
  emptySubtitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#6C7380',
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});

export default PropertyReviewsScreen;

