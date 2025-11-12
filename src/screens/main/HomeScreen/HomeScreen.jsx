// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { moderateScale, verticalScale } from '../../../utils/layout';
// import {
// 	Header,
// 	SearchBar,
// 	CategoryPills,
// 	HeroCards,
// 	PopularCarousel,
// 	TopLocations,
// 	NearbyHomes,
// 	ServicesGrid,
// } from '../../../components/main/home';
// import BottomSheetLocation from '../../../components/common/buttomSheet/buttomSheet';

// const HomeScreen = ({ navigation }) => {
// 	const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
// 	const [selectedLocation, setSelectedLocation] = useState('Chicago,IL');

// 	const handleLocationPress = () => {
// 		setBottomSheetVisible(true);
// 	};

// 	const handleLocationSelect = (location) => {
// 		setSelectedLocation(location.name);
// 		setBottomSheetVisible(false);
// 	};

// 	const handleCloseBottomSheet = () => {
// 		setBottomSheetVisible(false);
// 	};

// 	const handleNotificationPress = () => {
// 		navigation.navigate('Notification');
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.shadowAccent} pointerEvents="none" />
// 			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
// 				<Header 
// 					onLocationPress={handleLocationPress} 
// 					onNotificationPress={handleNotificationPress}
// 					location={selectedLocation} 
// 				/>
// 				<SearchBar />
// 				<CategoryPills />
// 				<HeroCards navigation={navigation} />
// 				<PopularCarousel />
// 				<TopLocations navigation={navigation} />
// 				<NearbyHomes />
// 				<ServicesGrid />
// 			</ScrollView>
// 			<BottomSheetLocation 
// 				visible={bottomSheetVisible} 
// 				onClose={handleCloseBottomSheet} 
// 				onLocationSelect={handleLocationSelect} 
// 			/>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: { flex: 1, backgroundColor: '#ffffff' },
// 	shadowAccent: {
// 		position: 'absolute',
// 		top: verticalScale(-115),
// 		left: moderateScale(-110),
// 		width: moderateScale(362),
// 		height: verticalScale(356),
// 		borderRadius: moderateScale(180),
// 		backgroundColor: '#234F68',
// 		opacity: 0.2,
// 		zIndex: -1,
// 	},
// 	content: {
// 		paddingHorizontal: moderateScale(16),
// 		paddingTop: verticalScale(16),
// 		paddingBottom: verticalScale(24),
// 	},
// });

// export default HomeScreen;

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale } from '../../../utils/layout';
import {
  Header,
  SearchBar,
  CategoryPills,
  HeroCards,
  PopularCarousel,
  TopLocations,
  NearbyHomes,
  ServicesGrid,
} from '../../../components/main/home';
import BottomSheetLocation from '../../../components/common/buttomSheet/buttomSheet';

const HomeScreen = ({ navigation }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Chicago,IL');

  const handleLocationPress = () => setBottomSheetVisible(true);
  const handleLocationSelect = (location) => {
    setSelectedLocation(location.name);
    setBottomSheetVisible(false);
  };
  const handleCloseBottomSheet = () => setBottomSheetVisible(false);
  const handleNotificationPress = () => navigation.navigate('Notification');

  return (
    <View style={styles.container}>
      {/* 🌈 Very visible top-left gradient background */}
      <LinearGradient
        colors={[
          'rgba(35,79,104,0.55)', // Strong center
          'rgba(35,79,104,0.25)', // Mid fade
          'rgba(35,79,104,0.0)',  // Fully transparent edge
        ]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.shadowAccent}
        pointerEvents="none"
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header
          onLocationPress={handleLocationPress}
          onNotificationPress={handleNotificationPress}
          location={selectedLocation}
        />
        <SearchBar />
        <CategoryPills />
        <HeroCards navigation={navigation} />
        <PopularCarousel />
        <TopLocations navigation={navigation} />
        <NearbyHomes />
        <ServicesGrid />
      </ScrollView>

      <BottomSheetLocation
        visible={bottomSheetVisible}
        onClose={handleCloseBottomSheet}
        onLocationSelect={handleLocationSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  shadowAccent: {
    position: 'absolute',
    top: -100,      // pull it into view
    left: -100,
    width: 280,
    height: 250,
    borderRadius: 200,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    zIndex: 1,      // ⬅ bring in front to ensure it's visible
  },

  content: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
  },
});

export default HomeScreen;



