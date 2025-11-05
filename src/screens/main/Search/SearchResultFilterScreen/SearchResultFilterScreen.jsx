import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../../components/common/ScreenHeader/ScreenHeader';
import HomeListingCard from '../../../../components/common/HomeListingCard/HomeListingCard';
import FilterChip from '../../../../components/common/FilterChip/FilterChip';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SearchResultFilterScreen = ({ navigation, route }) => {
	const address = route?.params?.address || 'Semarang, Indonesia';
	const propertyType = route?.params?.propertyType || 'House';
	const [searchQuery, setSearchQuery] = useState('Modern House');
	const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
	
	// Active filters state
	const [activeFilters, setActiveFilters] = useState([
		{ id: '1', label: 'House' },
		{ id: '2', label: 'Semarang' },
		{ id: '3', label: '$150 - $350' },
	]);

	// Sample property data with coordinates - updated to match image
	const allProperties = [
		{
			id: 1,
			image: require('../../../../assets/images/login_image.png'),
			title: 'Bridgeland Modern House',
			rating: 4.9,
			beds: 2,
			baths: 2,
			sqft: '1,630',
			location: 'Semarang, Indonesia',
			price: 260,
			priceUnit: 'month',
			type: 'House',
			latitude: -6.9667,
			longitude: 110.4167,
		},
		{
			id: 2,
			image: require('../../../../assets/images/login_image1.png'),
			title: 'Wayside Modern House',
			rating: 4.4,
			beds: 3,
			baths: 2,
			sqft: '1,850',
			location: 'Semarang, Indonesia',
			price: 220,
			priceUnit: 'month',
			type: 'House',
			latitude: -6.9667,
			longitude: 110.4167,
		},
		{
			id: 3,
			image: require('../../../../assets/images/login_image2.png'),
			title: 'Shoolview House',
			rating: 4.6,
			beds: 4,
			baths: 3,
			sqft: '2,100',
			location: 'Semarang, Indonesia',
			price: 245,
			priceUnit: 'month',
			type: 'House',
			latitude: -6.9667,
			longitude: 110.4167,
		},
		{
			id: 4,
			image: require('../../../../assets/images/login_image3.png'),
			title: 'Riverside Modern House',
			rating: 4.8,
			beds: 3,
			baths: 2,
			sqft: '1,900',
			location: 'Semarang, Indonesia',
			price: 280,
			priceUnit: 'month',
			type: 'House',
			latitude: -6.9667,
			longitude: 110.4167,
		},
		{
			id: 5,
			image: require('../../../../assets/images/login_image.png'),
			title: 'Downtown Modern House',
			rating: 4.7,
			beds: 2,
			baths: 1,
			sqft: '1,500',
			location: 'Semarang, Indonesia',
			price: 180,
			priceUnit: 'month',
			type: 'House',
			latitude: -6.9667,
			longitude: 110.4167,
		},
	];

	const handleFilterPress = () => {
		console.log('Filter pressed');
	};

	const handlePropertyPress = (property) => {
		console.log('Property pressed:', property.id);
	};

	const handleMapPress = () => {
		// Navigate to MapScreen with filtered properties
		navigation.navigate('Map', {
			properties: filteredProperties,
			searchQuery: searchQuery,
		});
	};

	const handleSearch = () => {
		console.log('Search:', searchQuery);
	};

	const handleRemoveFilter = (filterId) => {
		setActiveFilters(activeFilters.filter(filter => filter.id !== filterId));
	};

	// Filter properties based on search query and property type
	const filteredProperties = allProperties.filter((property) => {
		// Filter by property type if provided
		if (propertyType && propertyType !== 'All') {
			if (property.type !== propertyType) {
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
	const resultsCount = 128; // Matching the image

	return (
		<SafeAreaView style={styles.container} edges={['bottom']}>
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
					Found <Text style={styles.resultsNumber}>{resultsCount}</Text> estates
				</Text>
				{hasResults && (
					<View style={styles.viewToggleContainer}>
						<TouchableOpacity
							style={[
								styles.viewButton,
								styles.viewButtonLeft,
								viewMode === 'grid' && styles.activeViewButton
							]}
							onPress={() => setViewMode('grid')}
							activeOpacity={0.7}
						>
							<View style={styles.gridIconContainer}>
								<View style={styles.gridRow}>
									<View style={[styles.gridCell, viewMode === 'grid' && styles.activeGridCell]} />
									<View style={[styles.gridCell, viewMode === 'grid' && styles.activeGridCell]} />
								</View>
								<View style={[styles.gridRow, { marginTop: 2 }]}>
									<View style={[styles.gridCell, viewMode === 'grid' && styles.activeGridCell]} />
									<View style={[styles.gridCell, viewMode === 'grid' && styles.activeGridCell]} />
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.viewButton,
								styles.viewButtonRight,
								viewMode === 'list' && styles.activeViewButton
							]}
							onPress={() => setViewMode('list')}
							activeOpacity={0.7}
						>
							<Image
								source={require('../../../../assets/icons/list.png')}
								style={[
									styles.listIcon,
									viewMode === 'list' && styles.activeListIcon
								]}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>

			{/* Active Filters */}
			{activeFilters.length > 0 && (
				<View style={styles.filtersContainer}>
					<ScrollView 
						horizontal 
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.filtersScrollContent}
					>
						{activeFilters.map((filter) => (
							<FilterChip
								key={filter.id}
								label={filter.label}
								onRemove={() => handleRemoveFilter(filter.id)}
							/>
						))}
					</ScrollView>
				</View>
			)}

			{/* Show List View or Empty State */}
			{hasResults ? (
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
				>
					{/* Property Listings - Vertical List View */}
					{filteredProperties.map((property) => (
						<View key={property.id} style={styles.cardWrapper}>
							<HomeListingCard
								property={property}
								onPress={() => handlePropertyPress(property)}
							/>
						</View>
					))}
				</ScrollView>
			) : (
				/* Empty State */
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.emptyStateContainer}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.emptyIconContainer}>
						<View style={styles.emptyIconCircle}>
							<Text style={styles.emptyIconText}>✓</Text>
						</View>
					</View>
					<Text style={styles.emptyStateTitle}>No results found</Text>
					<Text style={styles.emptyStateMessage}>
						We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
					</Text>
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
	headerContainer: {
		backgroundColor: '#ffffff',
	},
	titleSection: {
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05),
		paddingTop: 8,
		paddingBottom: 16,
		alignItems: 'center',
	},
	title: {
		fontSize: SCREEN_WIDTH < 360 ? 20 : 24,
		fontWeight: '700',
		color: '#14233A',
		textAlign: 'center',
	},
	scrollView: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 24,
		paddingTop: 8,
	},
	searchBarContainer: {
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05),
		paddingTop: 16,
		paddingBottom: 12,
		alignItems: 'center',
	},
	searchBar: {
		width: SCREEN_WIDTH - 40,
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
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05),
		paddingBottom: 16,
	},
	resultsText: {
		fontSize: SCREEN_WIDTH < 360 ? 12 : 14,
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
	activeListIcon: {
		tintColor: '#21628A',
	},
	filtersContainer: {
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05),
		paddingTop: 12,
		paddingBottom: 12,
	},
	filtersScrollContent: {
		paddingRight: Math.max(20, SCREEN_WIDTH * 0.05),
	},
	cardWrapper: {
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05),
	},
	horizontalScrollContent: {
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05),
		paddingRight: Math.max(20, SCREEN_WIDTH * 0.05),
	},
	horizontalCardWrapper: {
		width: SCREEN_WIDTH - 40,
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
		paddingHorizontal: Math.max(20, SCREEN_WIDTH * 0.05),
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: SCREEN_WIDTH < 360 ? 16 : 18,
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
		paddingHorizontal: Math.max(40, SCREEN_WIDTH * 0.1),
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
		fontSize: SCREEN_WIDTH < 360 ? 20 : 24,
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 12,
		textAlign: 'center',
	},
	emptyStateMessage: {
		fontSize: SCREEN_WIDTH < 360 ? 12 : 14,
		fontWeight: '400',
		color: '#6C7380',
		textAlign: 'center',
		lineHeight: 20,
	},
});

export default SearchResultFilterScreen;

