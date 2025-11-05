import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../components/common/ScreenHeader/ScreenHeader';
import LocationCard from '../../../components/common/LocationCard/LocationCard';
import { Text } from '../../../components/common';

const TopLocationsScreen = ({ navigation }) => {
	const locations = [
		{
			id: 1,
			name: 'Seattle',
			image: require('../../../assets/images/login_image.png'),
		},
		{
			id: 2,
			name: 'Chicago',
			image: require('../../../assets/images/login_image1.png'),
		},
		{
			id: 3,
			name: 'Miami',
			image: require('../../../assets/images/login_image2.png'),
		},
		{
			id: 4,
			name: 'Denver',
			image: require('../../../assets/images/login_image3.png'),
		},
		{
			id: 5,
			name: 'Austin',
			image: require('../../../assets/images/login_image.png'),
		},
		{
			id: 6,
			name: 'Boston',
			image: require('../../../assets/images/login_image1.png'),
		},
	];

	const handleBack = () => {
		navigation.goBack();
	};

	const handleLocationPress = (location) => {
		console.log('Location pressed:', location.name);
		// Navigate to location details or search results
	};

	return (
		<SafeAreaView style={styles.container} edges={['bottom']}>
			<ScreenHeader onBackPress={handleBack} />

			<ScrollView 
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
			>
				{/* Title Section */}
				<View style={styles.titleSection}>
					<Text variant="headline" style={styles.title}>
						Top Locations
					</Text>
					<Text variant="body" style={styles.subtitle}>
						Find the most popular areas to live.
					</Text>
				</View>

				{/* Location Cards Grid - 3x2 */}
				<View style={styles.gridContainer}>
					{locations.map((location, index) => (
						<LocationCard
							key={location.id}
							location={location}
							ranking={index + 1}
							onPress={() => handleLocationPress(location)}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	scrollView: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 24,
	},
	titleSection: {
		paddingHorizontal: 20,
		paddingTop: 24,
		paddingBottom: 24,
		alignItems: 'flex-start',
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 8,
		textAlign: 'left',
	},
	subtitle: {
		fontSize: 16,
		fontWeight: '400',
		color: '#6C7380',
		textAlign: 'left',
	},
	gridContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
});

export default TopLocationsScreen;

