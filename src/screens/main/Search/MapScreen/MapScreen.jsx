import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropertyMapView from '../../../../components/common/PropertyMapView/PropertyMapView';
import FilterBottomSheet from '../../../../components/common/buttomSheet/FilterBottomSheet';

const MapScreen = ({ navigation, route }) => {
	const [searchQuery, setSearchQuery] = useState(route?.params?.searchQuery || 'Modern House');
	const [nearbyBottomSheetVisible, setNearbyBottomSheetVisible] = useState(false);

	// Sample property data with coordinates (can be passed via route params)
	const properties = route?.params?.properties || [
		{
			id: 1,
			image: require('../../../../assets/images/login_image.png'),
			title: 'Lakeview Heights',
			rating: 4.9,
			location: 'Chicago, IL',
			price: 290000,
			type: 'House',
			latitude: 41.9396,
			longitude: -87.6528,
		},
		{
			id: 2,
			image: require('../../../../assets/images/login_image1.png'),
			title: 'Villa',
			rating: 4.8,
			location: 'Chicago, IL',
			price: 320000,
			type: 'Villa',
			latitude: 41.8781,
			longitude: -87.6298,
		},
		{
			id: 3,
			image: require('../../../../assets/images/login_image2.png'),
			title: 'Downtown Condo',
			rating: 4.7,
			location: 'Chicago, IL',
			price: 250000,
			type: 'Condo',
			latitude: 41.8825,
			longitude: -87.6441,
		},
		{
			id: 4,
			image: require('../../../../assets/images/login_image3.png'),
			title: 'Riverside Home',
			rating: 4.9,
			location: 'Chicago, IL',
			price: 450000,
			type: 'House',
			latitude: 41.8500,
			longitude: -87.6500,
		},
	];

	const handleBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		} else {
			navigation.navigate('SearchResults');
		}
	};

	const handleFilterPress = () => {
		console.log('Filter pressed');
	};

	const handleSearch = () => {
		console.log('Search:', searchQuery);
	};

	const handlePropertyPress = (property) => {
		console.log('Property pressed:', property.id);
		// Can navigate to property detail screen here
	};

	const handleNearbyPress = () => {
		setNearbyBottomSheetVisible(true);
	};

	const handleCloseNearbyBottomSheet = () => {
		setNearbyBottomSheetVisible(false);
	};

	const handleApplyFilter = (filterData) => {
		console.log('Filter applied:', filterData);
		// Apply filter logic here
	};

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			{/* Header with Back, Title, and Filter */}
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<TouchableOpacity
						style={styles.iconButton}
						onPress={handleBack}
						activeOpacity={0.8}
					>
						<View style={styles.iconCircle}>
							<Image
								source={require('../../../../assets/icons/backArro.png')}
								style={styles.backIcon}
								resizeMode="contain"
							/>
						</View>
					</TouchableOpacity>

					<Text style={styles.headerTitle}>Search results</Text>

					<TouchableOpacity
						style={styles.iconButton}
						onPress={handleFilterPress}
						activeOpacity={0.8}
					>
						<View style={styles.iconCircle}>
							<Image
								source={require('../../../../assets/icons/list.png')}
								style={styles.filterIcon}
								resizeMode="contain"
							/>
						</View>
					</TouchableOpacity>
				</View>

				{/* Search Bar */}
				<View style={styles.searchBarContainer}>
					<View style={styles.searchBar}>
						<TextInput
							style={styles.searchInput}
							value={searchQuery}
							onChangeText={setSearchQuery}
							placeholder="Modern House"
							placeholderTextColor="#9AA4B2"
							returnKeyType="search"
							onSubmitEditing={handleSearch}
						/>
						<TouchableOpacity onPress={handleSearch} activeOpacity={0.7}>
							<Image
								source={require('../../../../assets/icons/search.png')}
								style={styles.searchIcon}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			{/* Fullscreen Map View */}
			<View style={styles.mapContainer}>
				<PropertyMapView
					properties={properties}
					onPropertyPress={handlePropertyPress}
					onNearbyPress={handleNearbyPress}
					nearbyCount={properties.length}
				/>
			</View>

			{/* Nearby You Bottom Sheet */}
			<FilterBottomSheet
				visible={nearbyBottomSheetVisible}
				onClose={handleCloseNearbyBottomSheet}
				onApplyFilter={handleApplyFilter}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	headerContainer: {
		backgroundColor: '#ffffff',
		paddingBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
		zIndex: 1000,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 16,
	},
	iconButton: {
		zIndex: 1,
	},
	iconCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 4,
	},
	backIcon: {
		width: 20,
		height: 20,
		tintColor: '#1E1E1E',
	},
	filterIcon: {
		width: 18,
		height: 18,
		tintColor: '#1E1E1E',
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: '#1E1E1E',
		textAlign: 'center',
		position: 'absolute',
		left: 0,
		right: 0,
		zIndex: 0,
	},
	searchBarContainer: {
		paddingHorizontal: 20,
		paddingBottom: 12,
		alignItems: 'center',
	},
	searchBar: {
		width: 327,
		height: 70,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F2F4F7',
		borderRadius: 20,
		paddingHorizontal: 16,
		justifyContent: 'space-between',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		fontWeight: '400',
		color: '#1E1E1E',
		paddingVertical: 0,
	},
	searchIcon: {
		width: 20,
		height: 20,
		tintColor: '#21628A',
	},
	mapContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
});

export default MapScreen;

