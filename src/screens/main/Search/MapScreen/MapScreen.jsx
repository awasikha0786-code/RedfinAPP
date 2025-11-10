import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Modal, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropertyMapView from '../../../../components/common/PropertyMapView/PropertyMapView';
import FilterBottomSheet from '../../../../components/common/buttomSheet/FilterBottomSheet';

const MapScreen = ({ navigation: navProp, route }) => {
	// Use the navigation prop directly, or get it from hook
	// MapScreen is in MainStack, so we should use the navigation prop
	const navigation = navProp || useNavigation();
	const [searchQuery, setSearchQuery] = useState(route?.params?.searchQuery || 'Modern House');
	const [nearbyBottomSheetVisible, setNearbyBottomSheetVisible] = useState(false);
	const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
	const [recentSearches, setRecentSearches] = useState([]);
	const searchInputRef = useRef(null);
	const modalSearchInputRef = useRef(null);

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

	// Load recent searches on mount
	useEffect(() => {
		loadRecentSearches();
	}, []);

	const loadRecentSearches = async () => {
		try {
			const stored = await AsyncStorage.getItem('recentSearches');
			if (stored) {
				setRecentSearches(JSON.parse(stored));
			} else {
				// Default recent searches for demo
				const defaultSearches = [
					{ id: 1, text: 'Modern house', type: 'text' },
					{ id: 2, text: 'Semarang', type: 'text' },
					{ id: 3, text: 'Sky Dandelions Apartment', type: 'property', image: require('../../../../assets/images/login_image.png') },
				];
				setRecentSearches(defaultSearches);
				await AsyncStorage.setItem('recentSearches', JSON.stringify(defaultSearches));
			}
		} catch (error) {
			console.error('Error loading recent searches:', error);
		}
	};

	const saveRecentSearch = async (searchText) => {
		if (!searchText || searchText.trim() === '') return;
		
		try {
			const newSearch = { id: Date.now(), text: searchText.trim(), type: 'text' };
			const updated = [newSearch, ...recentSearches.filter(s => s.text !== searchText.trim())].slice(0, 10);
			setRecentSearches(updated);
			await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
		} catch (error) {
			console.error('Error saving recent search:', error);
		}
	};

	const removeRecentSearch = async (id) => {
		try {
			const updated = recentSearches.filter(s => s.id !== id);
			setRecentSearches(updated);
			await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
		} catch (error) {
			console.error('Error removing recent search:', error);
		}
	};

	const clearAllRecentSearches = async () => {
		try {
			setRecentSearches([]);
			await AsyncStorage.setItem('recentSearches', JSON.stringify([]));
		} catch (error) {
			console.error('Error clearing recent searches:', error);
		}
	};

	const handleSearchBarPress = () => {
		setIsSearchModalVisible(true);
		setTimeout(() => {
			modalSearchInputRef.current?.focus();
		}, 100);
	};

	const handleRecentSearchPress = (search) => {
		setSearchQuery(search.text);
		setIsSearchModalVisible(false);
		handleSearch();
	};


	const handleSearchSubmit = () => {
		if (searchQuery.trim()) {
			saveRecentSearch(searchQuery);
		}
		handleSearch();
		setIsSearchModalVisible(false);
	};

	const handleDrawOnMap = () => {
		setIsSearchModalVisible(false);
		// Navigate to DrawMapScreen after modal closes
		setTimeout(() => {
			try {
				// MapScreen is in MainStack, so we need to ensure we use the MainStack navigator
				// The navigation prop should be the MainStack navigator
				// But if useNavigation() was used, it might return Tab navigator
				// So we'll use the navigation prop (navProp) which is guaranteed to be MainStack
				
				const mainStackNav = navProp || navigation;
				
				// Try direct navigation first (both screens are in MainStack)
				if (mainStackNav && typeof mainStackNav.navigate === 'function') {
					mainStackNav.navigate('DrawMap', {
						onShapeComplete: (coordinates) => {
							console.log('Shape completed with coordinates:', coordinates);
							// Handle the completed shape coordinates here
						},
					});
				} else {
					// Fallback: try to find MainStack navigator via getParent
					const parentNav = navigation?.getParent?.();
					if (parentNav && typeof parentNav.navigate === 'function') {
						parentNav.navigate('DrawMap', {
							onShapeComplete: (coordinates) => {
								console.log('Shape completed with coordinates:', coordinates);
							},
						});
					} else {
						// Last resort: use CommonActions with root navigator
						const rootNav = navigation?.getParent?.()?.getParent?.() || navigation?.getParent?.() || navigation;
						if (rootNav && rootNav.dispatch) {
							rootNav.dispatch(
								CommonActions.navigate({
									name: 'DrawMap',
									params: {
										onShapeComplete: (coordinates) => {
											console.log('Shape completed with coordinates:', coordinates);
										},
									},
								})
							);
						}
					}
				}
			} catch (error) {
				console.error('Navigation error in handleDrawOnMap:', error);
			}
		}, 200);
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

			{/* Search Bar - Overlapping Header and Map */}
			<TouchableOpacity 
				style={styles.searchBarContainer}
				onPress={handleSearchBarPress}
				activeOpacity={0.9}
			>
				<View style={styles.searchBar}>
					<TextInput
						ref={searchInputRef}
						style={styles.searchInput}
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder="Search House, Apartment, etc |"
						placeholderTextColor="#9AA4B2"
						returnKeyType="search"
						onSubmitEditing={handleSearch}
						editable={false}
						pointerEvents="none"
					/>
					<Image
						source={require('../../../../assets/icons/search.png')}
						style={styles.searchIcon}
						resizeMode="contain"
					/>
				</View>
			</TouchableOpacity>

			{/* Nearby You Bottom Sheet */}
			<FilterBottomSheet
				visible={nearbyBottomSheetVisible}
				onClose={handleCloseNearbyBottomSheet}
				onApplyFilter={handleApplyFilter}
			/>

			{/* Full Screen Search Modal */}
			<Modal
				visible={isSearchModalVisible}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setIsSearchModalVisible(false)}
			>
				<KeyboardAvoidingView
					style={styles.modalContainer}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				>
					{/* Blurred Map Background */}
					<View style={styles.modalBackground}>
						<View style={styles.blurOverlay} />
					</View>

					<SafeAreaView style={styles.modalSafeArea} edges={['top']}>
						<ScrollView 
							style={styles.modalContent}
							contentContainerStyle={styles.modalContentContainer}
							keyboardShouldPersistTaps="handled"
						>
							{/* Search Bar Card */}
							<View style={styles.searchCardContainer}>
								<View style={styles.modalSearchBarContainer}>
									<View style={styles.modalSearchBar}>
										<TextInput
											ref={modalSearchInputRef}
											style={styles.modalSearchInput}
											value={searchQuery}
											onChangeText={setSearchQuery}
											placeholder="Search House, Apartment, etc |"
											placeholderTextColor="#9AA4B2"
											returnKeyType="search"
											onSubmitEditing={handleSearchSubmit}
											autoFocus={true}
										/>
										<TouchableOpacity onPress={handleSearchSubmit} activeOpacity={0.7}>
											<Image
												source={require('../../../../assets/icons/search.png')}
												style={styles.modalSearchIcon}
												resizeMode="contain"
											/>
										</TouchableOpacity>
									</View>
								</View>

								{/* Draw on Map Button */}
								<TouchableOpacity
									style={styles.drawOnMapButton}
									onPress={handleDrawOnMap}
									activeOpacity={0.8}
								>
									<Image
										source={require('../../../../assets/icons/Pencil.png')}
										style={styles.drawOnMapIcon}
										resizeMode="contain"
									/>
									<Text style={styles.drawOnMapText}>Draw on map</Text>
								</TouchableOpacity>
							</View>

							{/* Recent Search Section Card */}
							{recentSearches.length > 0 && (
								<View style={styles.recentSearchCardContainer}>
									<View style={styles.recentSearchHeader}>
										<Text style={styles.recentSearchTitle}>Recent Search</Text>
										<TouchableOpacity
											onPress={clearAllRecentSearches}
											activeOpacity={0.7}
										>
											<Text style={styles.clearText}>Clear</Text>
										</TouchableOpacity>
									</View>
									<View style={styles.recentSearchList}>
										{recentSearches.map((search) => (
											<TouchableOpacity
												key={search.id}
												style={styles.recentSearchItem}
												onPress={() => handleRecentSearchPress(search)}
												activeOpacity={0.7}
											>
												{search.type === 'property' && search.image ? (
													<Image
														source={search.image}
														style={styles.recentSearchImage}
														resizeMode="cover"
													/>
												) : (
													<Image
														source={require('../../../../assets/icons/Timer.png')}
														style={styles.recentSearchIcon}
														resizeMode="contain"
													/>
												)}
												<Text style={styles.recentSearchText} numberOfLines={1}>
													{search.text}
												</Text>
												<TouchableOpacity
													style={styles.removeSearchButton}
													onPress={(e) => {
														e.stopPropagation();
														removeRecentSearch(search.id);
													}}
													activeOpacity={0.7}
												>
													<Text style={styles.removeSearchText}>×</Text>
												</TouchableOpacity>
											</TouchableOpacity>
										))}
									</View>
								</View>
							)}
						</ScrollView>
					</SafeAreaView>
				</KeyboardAvoidingView>
			</Modal>
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
		paddingBottom: 35,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
		zIndex: 1000,
		overflow: 'visible',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 4,
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
		position: 'absolute',
		top: 62,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
		alignItems: 'center',
		zIndex: 1001,
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
		backgroundColor: '#FFFFFF',
	},
	modalContainer: {
		flex: 1,
	},
	modalBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(35, 79, 104, 0.67)',
	},
	blurOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(35, 79, 104, 0.67)',
		opacity: 0.95,
	},
	modalSafeArea: {
		flex: 1,
	},
	modalContent: {
		flex: 1,
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	modalContentContainer: {
		paddingBottom: 40,
	},
	searchCardContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		paddingTop: 16,
		paddingBottom: 16,
		marginBottom: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	modalSearchBarContainer: {
		paddingHorizontal: 20,
		paddingBottom: 16,
	},
	modalSearchBar: {
		width: '100%',
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F9FAFB',
		borderRadius: 16,
		paddingHorizontal: 16,
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: '#E5E7EB',
	},
	modalSearchInput: {
		flex: 1,
		fontSize: 16,
		fontWeight: '400',
		color: '#1E1E1E',
		paddingVertical: 0,
	},
	modalSearchIcon: {
		width: 20,
		height: 20,
		tintColor: '#21628A',
	},
	drawOnMapButton: {
		marginHorizontal: 20,
		marginBottom: 16,
		height: 56,
		backgroundColor: '#E63946',
		borderRadius: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#E63946',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	drawOnMapIcon: {
		width: 20,
		height: 20,
		tintColor: '#FFFFFF',
		marginRight: 8,
	},
	drawOnMapText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FFFFFF',
	},
	recentSearchCardContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		paddingTop: 16,
		paddingBottom: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	recentSearchHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 16,
	},
	recentSearchTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#1E1E1E',
	},
	clearText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#21628A',
	},
	recentSearchList: {
		paddingHorizontal: 20,
	},
	recentSearchItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		marginBottom: 8,
		backgroundColor: '#F9FAFB',
		borderRadius: 12,
	},
	recentSearchIcon: {
		width: 20,
		height: 20,
		tintColor: '#9AA4B2',
		marginRight: 12,
	},
	recentSearchImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
		marginRight: 12,
	},
	recentSearchText: {
		flex: 1,
		fontSize: 16,
		fontWeight: '400',
		color: '#1E1E1E',
	},
	removeSearchButton: {
		width: 24,
		height: 24,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 8,
	},
	removeSearchText: {
		fontSize: 24,
		fontWeight: '300',
		color: '#9AA4B2',
		lineHeight: 24,
	},
});

export default MapScreen;




