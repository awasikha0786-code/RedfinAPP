import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenHeader, Input, Button, SelectablePill, Icon } from '../../../../components/common';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const LISTING_TYPES = ['Rent', 'Sell'];
const PROPERTY_CATEGORIES = ['House', 'Apartment', 'Hotel', 'Villa', 'Cottage'];

const AddListingScreen = ({ navigation }) => {
  const [listingName, setListingName] = useState('The Lodge House');
  const [listingType, setListingType] = useState(LISTING_TYPES[0]);
  const [propertyCategory, setPropertyCategory] = useState(PROPERTY_CATEGORIES[0]);

  const isLargeScreen = useMemo(() => SCREEN_WIDTH >= 768, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('AddListingLocation', {
      listingName,
      listingType,
      propertyCategory,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenHeader onBackPress={handleBack} title="Add Listing" />

      <ScrollView
        contentContainerStyle={[styles.contentContainer, isLargeScreen && styles.contentContainerWide]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Hi Josh, Fill detail of your{'\n'}
            <Text style={styles.greetingHighlight}>real estate</Text>
          </Text>
        </View>

        <View style={styles.cardSection}>
          <Input
            value={listingName}
            onChangeText={setListingName}
            placeholder="Listing name"
            icon="home"
            style={styles.input}
            inputStyle={styles.inputText}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Listing type</Text>
          <View style={styles.pillsRow}>
            {LISTING_TYPES.map((type, index) => (
              <SelectablePill
                key={type}
                label={type}
                selected={listingType === type}
                onPress={() => setListingType(type)}
                style={[
                  styles.pillWrapper,
                  index !== LISTING_TYPES.length - 1 && styles.pillWrapperSpacing,
                ]}
                contentStyle={styles.pillContent}
                selectedStyle={styles.pillSelected}
                selectedTextStyle={styles.pillSelectedText}
                textStyle={styles.pillLabel}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property category</Text>
          <View style={styles.pillsGrid}>
            <View style={styles.pillsRow}>
              {PROPERTY_CATEGORIES.slice(0, 2).map((category, index) => (
                <SelectablePill
                  key={category}
                  label={category}
                  selected={propertyCategory === category}
                  onPress={() => setPropertyCategory(category)}
                  style={[
                    styles.categoryPillWrapper,
                    index !== 1 && styles.categoryPillSpacing,
                  ]}
                  contentStyle={styles.categoryPillContent}
                  selectedStyle={styles.categoryPillSelected}
                  selectedTextStyle={styles.categoryPillSelectedText}
                  textStyle={styles.categoryPillLabel}
                />
              ))}
            </View>
            <View style={[styles.pillsRow, styles.pillsRowSpacing]}>
              {PROPERTY_CATEGORIES.slice(2).map((category, index) => (
                <SelectablePill
                  key={category}
                  label={category}
                  selected={propertyCategory === category}
                  onPress={() => setPropertyCategory(category)}
                  style={[
                    styles.categoryPillWrapper,
                    index !== PROPERTY_CATEGORIES.slice(2).length - 1 && styles.categoryPillSpacing,
                  ]}
                  contentStyle={styles.categoryPillContent}
                  selectedStyle={styles.categoryPillSelected}
                  selectedTextStyle={styles.categoryPillSelectedText}
                  textStyle={styles.categoryPillLabel}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

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
          style={styles.nextButton}
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
  contentContainer: {
    paddingHorizontal: Math.max(24, SCREEN_WIDTH * 0.06),
    paddingBottom: verticalScale(32),
  },
  contentContainerWide: {
    maxWidth: 620,
    alignSelf: 'center',
    width: '100%',
  },
  greetingContainer: {
    marginTop: verticalScale(48),
    marginBottom: verticalScale(32),
    maxWidth: 303,
  },
  greetingText: {
    fontSize: moderateScale(25),
    fontWeight: '500',
    color: '#14233A',
    lineHeight: moderateScale(40),
    letterSpacing: 0.75,
  },
  greetingHighlight: {
    color: '#17455C',
    fontWeight: '700',
  },
  cardSection: {
    marginBottom: verticalScale(28),
  },
  input: {
    backgroundColor: '#F6F7FB',
    borderColor: '#F6F7FB',
    borderRadius: moderateScale(22),
    paddingVertical: verticalScale(18),
    paddingHorizontal: moderateScale(20),
  },
  inputText: {
    fontSize: moderateScale(16),
    color: '#14233A',
  },
  section: {
    marginBottom: verticalScale(32),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#14233A',
    marginBottom: verticalScale(18),
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  pillWrapper: {
    minWidth: moderateScale(71),
  },
  pillWrapperSpacing: {
    marginRight: moderateScale(10),
  },
  pillContent: {
    minWidth: moderateScale(71),
    height: moderateScale(47),
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(24),
    paddingVertical: 0,
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  pillSelected: {
    backgroundColor: '#17455C',
  },
  pillLabel: {
    fontSize: moderateScale(16),
    color: '#27496D',
    fontWeight: '600',
  },
  pillSelectedText: {
    color: '#FFFFFF',
  },
  pillsGrid: {
    flexDirection: 'column',
  },
  pillsRowSpacing: {
    marginTop: verticalScale(14),
  },
  categoryPillWrapper: {
    minWidth: moderateScale(78),
  },
  categoryPillSpacing: {
    marginRight: moderateScale(10),
  },
  categoryPillContent: {
    minWidth: moderateScale(78),
    height: moderateScale(47),
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(24),
    paddingVertical: 0,
    justifyContent: 'center',
    backgroundColor: '#F5F7FB',
  },
  categoryPillSelected: {
    backgroundColor: '#17455C',
  },
  categoryPillLabel: {
    fontSize: moderateScale(15),
    color: '#27496D',
    fontWeight: '600',
  },
  categoryPillSelectedText: {
    color: '#FFFFFF',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Math.max(24, SCREEN_WIDTH * 0.06),
    paddingBottom: Platform.select({ ios: verticalScale(24), android: verticalScale(18) }),
    paddingTop: verticalScale(12),
    backgroundColor: 'transparent',
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
  nextButtonText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    textTransform: 'none',
    color: '#FFFFFF',
  },
});

export default AddListingScreen;


