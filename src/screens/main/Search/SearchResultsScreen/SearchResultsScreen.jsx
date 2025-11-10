import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../../components/common/ScreenHeader/ScreenHeader';
import HomeListingCard from '../../../../components/common/HomeListingCard/HomeListingCard';
import { useFavorites } from '../../../../context/FavoritesContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SearchResultsScreen = ({ navigation, route }) => {
	const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
	const initialSearchQuery = route?.params?.searchQuery || 'Modern House';
	const propertyTypeFilter = route?.params?.propertyType;
	const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

	// Sample property data with coordinates
	const allProperties = [
		{
			id: 1,
			image: require('../../../../assets/images/login_image.png'),
			title: 'Lakeview Heights',
			rating: 4.9,
			beds: 2,
			baths: 2,
			sqft: '1,630',
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
			beds: 3,
			baths: 2,
			sqft: '1,850',
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
			beds: 1,
			baths: 1,
			sqft: '1,200',
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
			beds: 4,
			baths: 3,
			sqft: '2,100',
			location: 'Chicago, IL',
			price: 450000,
			type: 'House',
			latitude: 41.8500,
			longitude: -87.6500,
		},
	];

	const handleBackPress = () => {
		navigation.goBack();
	};

	const handleFilterPress = () => {
		console.log('Filter pressed');
	};

	const handlePropertyPress = (property) => {
		console.log('Property pressed:', property.id);
	};

	const handleMapPress = () => {
		console.log('Map button pressed, filtered properties:', filteredProperties.length);
		// Navigate to MapScreen with filtered properties
		const parentNav = navigation.getParent();
		if (parentNav) {
			console.log('Navigating via parent navigation');
			parentNav.navigate('Map', {
				properties: filteredProperties,
				searchQuery: searchQuery,
			});
		} else {
			console.log('Navigating via direct navigation');
			navigation.navigate('Map', {
				properties: filteredProperties,
				searchQuery: searchQuery,
			});
		}
	};

	const handleSearch = () => {
		console.log('Search:', searchQuery);
	};

	// Filter properties based on search query and property type
	const filteredProperties = allProperties.filter((property) => {
		// Filter by property type if provided
		if (propertyTypeFilter && propertyTypeFilter !== 'All') {
			if (property.type !== propertyTypeFilter) {
				return false;
			}
		}

		// Filter by search query
		if (!searchQuery || searchQuery.trim() === '') {
			return true;
		}
		const query = searchQuery.toLowerCase();
		return (
			property.title.toLowerCase().includes(query) ||
			property.location.toLowerCase().includes(query) ||
			property.type.toLowerCase().includes(query)
		);
	});

	const hasResults = filteredProperties.length > 0;

	return (
		<SafeAreaView style={styles.container} edges={['bottom']}>
			{/* Back Button - Left Top */}
			<SafeAreaView edges={['top']} style={styles.backButtonContainer}>
				<TouchableOpacity 
					style={styles.backButton} 
					onPress={handleBackPress}
					activeOpacity={0.8}
				>
					<Image 
						source={require('../../../../assets/icons/backArro.png')} 
						style={styles.backIcon} 
						resizeMode="contain"
					/>
				</TouchableOpacity>
			</SafeAreaView>

			{/* Header with Filter */}
			<View style={styles.headerContainer}>
				<ScreenHeader 
					onFilterPress={handleFilterPress}
					filterIcon={require('../../../../assets/icons/Setting.png')}
				/>
				<View style={styles.titleSection}>
					<Text style={styles.title}>Search results</Text>
				</View>
			</View>

			{/* Search Bar - Always visible */}
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

			{/* Results Header with Count and View Toggle - Always visible */}
			<View style={styles.resultsHeader}>
				<Text style={styles.resultsText}>
					Found <Text style={styles.resultsNumber}>{filteredProperties.length}</Text> estates
				</Text>
				{hasResults && (
					<View style={styles.viewToggleContainer}>
						<TouchableOpacity
							style={[
								styles.viewButton,
								styles.viewButtonLeft,
								styles.activeViewButton
							]}
							activeOpacity={0.7}
						>
							<View style={styles.gridIconContainer}>
								<View style={styles.gridRow}>
									<View style={[styles.gridCell, styles.activeGridCell]} />
									<View style={[styles.gridCell, styles.activeGridCell]} />
								</View>
								<View style={[styles.gridRow, { marginTop: 2 }]}>
									<View style={[styles.gridCell, styles.activeGridCell]} />
									<View style={[styles.gridCell, styles.activeGridCell]} />
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.viewButton,
								styles.viewButtonRight
							]}
							onPress={handleMapPress}
							activeOpacity={0.7}
						>
							<Image
								source={require('../../../../assets/icons/Location.png')}
								style={styles.listIcon}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>

			{/* Show List View or Empty State */}
			{hasResults ? (
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
				>
						{/* Property Listings - Horizontal Scroll */}
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.horizontalScrollContent}
						>
							{filteredProperties.map((property) => (
								<View key={property.id} style={styles.horizontalCardWrapper}>
									<HomeListingCard
										property={property}
										onPress={() => handlePropertyPress(property)}
										onFavoritePress={(prop) => {
											if (isFavorite(prop.id)) {
												removeFromFavorites(prop.id);
											} else {
												addToFavorites(prop);
											}
										}}
										isFavorite={isFavorite(property.id)}
									/>
								</View>
							))}
						</ScrollView>

						{/* Nearby you Section */}
						<View style={styles.section}>
							<View style={styles.sectionHeader}>
								<Text style={styles.sectionTitle}>Nearby you</Text>
								<TouchableOpacity activeOpacity={0.7}>
									<Text style={styles.seeAllText}>See all</Text>
								</TouchableOpacity>
							</View>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.horizontalScrollContent}
							>
								{allProperties.slice(0, 2).map((property) => (
									<View key={`nearby-${property.id}`} style={styles.horizontalCardWrapper}>
										<HomeListingCard
											property={property}
											onPress={() => handlePropertyPress(property)}
											onFavoritePress={(prop) => {
												if (isFavorite(prop.id)) {
													removeFromFavorites(prop.id);
												} else {
													addToFavorites(prop);
												}
											}}
											isFavorite={isFavorite(property.id)}
										/>
									</View>
								))}
							</ScrollView>
						</View>

						{/* Most Popular Section */}
						<View style={styles.section}>
							<View style={styles.sectionHeader}>
								<Text style={styles.sectionTitle}>Most Popular</Text>
								<TouchableOpacity activeOpacity={0.7}>
									<Text style={styles.seeAllText}>See all</Text>
								</TouchableOpacity>
							</View>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.horizontalScrollContent}
							>
								{allProperties.slice(0, 2).map((property) => (
									<View key={`popular-${property.id}`} style={styles.horizontalCardWrapper}>
										<HomeListingCard
											property={property}
											onPress={() => handlePropertyPress(property)}
											onFavoritePress={(prop) => {
												if (isFavorite(prop.id)) {
													removeFromFavorites(prop.id);
												} else {
													addToFavorites(prop);
												}
											}}
											isFavorite={isFavorite(property.id)}
										/>
									</View>
								))}
							</ScrollView>
						</View>
					</ScrollView>
			) : (
				/* Empty State */
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.emptyStateContainer}>
						<View style={styles.emptyIconContainer}>
							<View style={styles.emptyIconCircle}>
								<Text style={styles.emptyIconText}>!</Text>
							</View>
						</View>
						<Text style={styles.emptyStateTitle}>Search not found.</Text>
						<Text style={styles.emptyStateMessage}>
							Sorry, we can't find the real estates you are looking for. Maybe, a little spelling mistake?
						</Text>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	backButtonContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 100,
		paddingLeft: 20,
		paddingTop: 12,
	},
	backButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#F5F4F8',
		justifyContent: 'center',
		alignItems: 'center',
	},
	backIcon: {
		width: 20,
		height: 20,
		tintColor: '#14233A',
	},
	headerContainer: {
		backgroundColor: '#ffffff',
	},
	titleSection: {
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05), // Responsive padding
		paddingTop: 8,
		paddingBottom: 16,
		alignItems: 'center',
	},
	title: {
		fontSize: SCREEN_WIDTH < 360 ? 20 : 24, // Responsive font size
		fontWeight: '700',
		color: '#14233A',
		textAlign: 'center',
	},
	scrollView: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 24,
	},
	searchBarContainer: {
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05), // Responsive padding
		paddingTop: 16,
		paddingBottom: 12,
		alignItems: 'center',
	},
	searchBar: {
		width: SCREEN_WIDTH - 40, // Responsive width
		maxWidth: 327,
		height: 70,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F2F4F7',
		borderRadius: 20,
		opacity: 1,
		paddingHorizontal: 16,
		justifyContent: 'space-between',
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		fontWeight: '400',
		color: '#14233A',
		paddingVertical: 0,
	},
	searchIcon: {
		width: 20,
		height: 20,
		tintColor: '#21628A',
	},
	resultsHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05), // Responsive padding
		paddingBottom: 16,
	},
	resultsText: {
		fontSize: SCREEN_WIDTH < 360 ? 12 : 14, // Responsive font size
		fontWeight: '400',
		color: '#6C7380',
	},
	resultsNumber: {
		fontWeight: '700',
		color: '#14233A',
	},
	viewToggleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F5F4F8',
		borderRadius: 8,
		overflow: 'hidden',
	},
	viewButton: {
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	viewButtonLeft: {
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	},
	viewButtonRight: {
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
	},
	activeViewButton: {
		backgroundColor: '#21628A',
	},
	gridIconContainer: {
		width: 16,
		height: 16,
		justifyContent: 'space-between',
	},
	gridRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	gridCell: {
		width: 6,
		height: 6,
		backgroundColor: '#6C7380',
		borderRadius: 1,
		marginRight: 2,
	},
	activeGridCell: {
		backgroundColor: '#ffffff',
	},
	listIcon: {
		width: 16,
		height: 16,
		tintColor: '#6C7380',
	},
	horizontalScrollContent: {
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05), // Responsive padding
		paddingRight: Math.max(20, SCREEN_WIDTH * 0.05),
	},
	horizontalCardWrapper: {
		width: SCREEN_WIDTH - 40, // Responsive width
		maxWidth: 327,
		marginRight: 12,
	},
	section: {
		marginTop: 24,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05), // Responsive padding
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: SCREEN_WIDTH < 360 ? 16 : 18, // Responsive font size
		fontWeight: '700',
		color: '#14233A',
	},
	seeAllText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#21628A',
	},
	emptyStateContainer: {
		paddingVertical: 60,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: Math.max(40, SCREEN_WIDTH * 0.1), // Responsive padding
	},
	emptyIconContainer: {
		alignItems: 'center',
		marginBottom: 24,
	},
	emptyIconCircle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#4CAF50',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#4CAF50',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	emptyIconText: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	emptyStateTitle: {
		fontSize: SCREEN_WIDTH < 360 ? 20 : 24, // Responsive font size
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 12,
		textAlign: 'center',
	},
	emptyStateMessage: {
		fontSize: SCREEN_WIDTH < 360 ? 12 : 14, // Responsive font size
		fontWeight: '400',
		color: '#6C7380',
		textAlign: 'center',
		lineHeight: 20,
	},
});

export default SearchResultsScreen;

