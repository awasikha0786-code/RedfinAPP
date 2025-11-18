import React, { useMemo, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import VirtualTourScene from '../../../components/main/propertyDetail/VirtualTourScene';

const DEFAULT_PROPERTY = {
  title: 'Sky Dandelions Apartment',
  type: 'Apartment',
  rating: 4.9,
  location: 'Jakarta, Indonesia',
  image: require('../../../assets/images/login_image.png'),
  isFavorite: false,
};

const DEFAULT_TOUR_SCENES = [
  {
    id: 'living-room',
    roomLabel: 'Living Room',
    image: require('../../../assets/images/login_image1.png'),
    activeSpot: {
      title: 'Jati dining table',
      subtitle: '2 people capacity',
    },
    hotspots: [
      { id: 'spot-1', top: 38, left: 12 },
      { id: 'spot-2', top: 22, right: 18 },
      { id: 'spot-3', bottom: 26, left: 56 },
    ],
  },
  {
    id: 'kitchen',
    roomLabel: 'Kitchen',
    image: require('../../../assets/images/login_image2.png'),
    activeSpot: {
      title: 'Kitchen countertop',
      subtitle: 'Marble surface',
    },
    hotspots: [
      { id: 'spot-1', top: 32, left: 16 },
      { id: 'spot-2', top: 24, right: 22 },
      { id: 'spot-3', bottom: 20, left: 48 },
    ],
  },
  {
    id: 'bedroom',
    roomLabel: 'Bedroom',
    image: require('../../../assets/images/login_image3.png'),
    activeSpot: {
      title: 'Reading corner',
      subtitle: 'Warm lighting experience',
    },
    hotspots: [
      { id: 'spot-1', top: 30, left: 20 },
      { id: 'spot-2', top: 18, right: 18 },
      { id: 'spot-3', bottom: 30, left: 52 },
    ],
  },
];

const PropertyVirtualTourScreen = ({ navigation, route }) => {
  const propertyParam = route?.params?.property;
  const tourScenesParam = route?.params?.tourScenes;

  const property = useMemo(
    () => ({
      ...DEFAULT_PROPERTY,
      ...(propertyParam || {}),
    }),
    [propertyParam]
  );

  const scenes = useMemo(
    () =>
      (Array.isArray(tourScenesParam) && tourScenesParam.length > 0
        ? tourScenesParam
        : DEFAULT_TOUR_SCENES),
    [tourScenesParam]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(property?.isFavorite || false);

  const insets = useSafeAreaInsets();

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % scenes.length);
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const activeScene = scenes[activeIndex] || scenes[0];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <VirtualTourScene
        safeInsets={insets}
        image={activeScene?.image}
        hotspots={activeScene?.hotspots}
        activeSpot={activeScene?.activeSpot}
        roomLabel={activeScene?.roomLabel}
        propertyInfo={{
          ...property,
          isFavorite,
        }}
        onBack={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
        onPrev={handlePrev}
        onNext={handleNext}
        onChat={() => navigation.navigate('Chat')}
        onToggleFavorite={handleToggleFavorite}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default PropertyVirtualTourScreen;

