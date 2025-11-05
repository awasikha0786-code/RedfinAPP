import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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

	const handleLocationPress = () => {
		setBottomSheetVisible(true);
	};

	const handleLocationSelect = (location) => {
		setSelectedLocation(location.name);
		setBottomSheetVisible(false);
	};

	const handleCloseBottomSheet = () => {
		setBottomSheetVisible(false);
	};

	const handleNotificationPress = () => {
		navigation.navigate('Notification');
	};

	return (
		<View style={styles.container}>
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
	container: { flex: 1, backgroundColor: '#ffffff' },
	content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
});

export default HomeScreen;



