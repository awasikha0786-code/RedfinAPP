import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Try to import react-native-maps with error handling
let MapView, Marker;
try {
	const maps = require('react-native-maps');
	if (maps.default) {
		MapView = maps.default;
		Marker = maps.Marker || maps.default.Marker;
	} else {
		MapView = maps.MapView;
		Marker = maps.Marker;
	}
} catch (error) {
	console.warn('react-native-maps not available:', error);
	MapView = null;
	Marker = null;
}

const LocationDetailScreen = ({ navigation, route }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [mapReady, setMapReady] = useState(false);

	// Default location coordinates (Semarang, Indonesia based on the image)
	const defaultRegion = {
		latitude: -6.9667,
		longitude: 110.4167,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};

	const address = route?.params?.address || 'Chicago, IL';
	const propertyType = route?.params?.propertyType || 'House';

	const handleBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		}
	};

	const handleSearch = () => {
		console.log('Search:', searchQuery);
	};

	const handleChooseLine = () => {
		// Navigate to SearchResultFilterScreen with address and propertyType
		console.log('handleChooseLine called with:', { address, propertyType });
		
		// Navigate to SearchResultFilter screen in stack
		navigation.navigate('SearchResultFilter', {
			address: address || 'Chicago, IL',
			propertyType: propertyType || 'House',
		});
	};

	const handleMapReady = () => {
		setMapReady(true);
	};

	const handleCurrentLocationPress = () => {
		// Re-center map on current location
		console.log('Current location pressed');
	};

	// If MapView is not available, show placeholder
	if (!MapView || !Marker) {
		return (
			<SafeAreaView style={styles.container} edges={['top']}>
				{/* Header */}
				<View style={styles.headerContainer}>
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
				</View>

				{/* Search Bar */}
				<View style={styles.searchBarContainer}>
					<View style={styles.searchBar}>
						<Image
							source={require('../../../../assets/icons/search.png')}
							style={styles.searchIcon}
							resizeMode="contain"
						/>
						<TextInput
							style={styles.searchInput}
							value={searchQuery}
							onChangeText={setSearchQuery}
							placeholder="Find location"
							placeholderTextColor="#9AA4B2"
							returnKeyType="search"
							onSubmitEditing={handleSearch}
						/>
						<TouchableOpacity onPress={handleSearch} activeOpacity={0.7}>
							<Image
								source={require('../../../../assets/icons/mic.png')}
								style={styles.micIcon}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				</View>

				{/* Map Placeholder */}
				<View style={styles.mapPlaceholder}>
					<Text style={styles.placeholderText}>Map view not available</Text>
				</View>

				{/* Floating Location Detail Card */}
				<View style={styles.floatingCard}>
					<View style={styles.cardContent}>
						<View style={styles.locationIconWrapper}>
							<Image
								source={require('../../../../assets/icons/Location.png')}
								style={styles.cardLocationIcon}
								resizeMode="contain"
							/>
						</View>
						<View style={styles.cardTextContainer}>
							<Text style={styles.cardTitle}>Location detail</Text>
							<Text style={styles.cardAddress} numberOfLines={2}>
								{address || 'Jl. Pandanaran, Semarang Tengah, Semarang City, Central Java 50241'}
							</Text>
						</View>
					</View>
				</View>

				{/* Floating Choose Line Button */}
				<TouchableOpacity style={styles.floatingButton} onPress={handleChooseLine} activeOpacity={0.8}>
					<Text style={styles.buttonText}>CHOOSE LINE</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			{/* Header with Back Button */}
			<View style={styles.headerContainer}>
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
			</View>

			{/* Search Bar */}
			<View style={styles.searchBarContainer}>
				<View style={styles.searchBar}>
					<Image
						source={require('../../../../assets/icons/search.png')}
						style={styles.searchIcon}
						resizeMode="contain"
					/>
					<TextInput
						style={styles.searchInput}
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder="Find location"
						placeholderTextColor="#9AA4B2"
						returnKeyType="search"
						onSubmitEditing={handleSearch}
					/>
					<TouchableOpacity onPress={handleSearch} activeOpacity={0.7}>
						<Image
							source={require('../../../../assets/icons/mic.png')}
							style={styles.micIcon}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Full Screen Map View */}
			<View style={styles.mapContainer}>
				<MapView
					provider={MapView.PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={defaultRegion}
					region={defaultRegion}
					onMapReady={handleMapReady}
					showsUserLocation={false}
					showsMyLocationButton={false}
					mapType="standard"
					loadingEnabled={true}
				>
					{/* Location Pin Marker */}
					<Marker
						coordinate={{
							latitude: defaultRegion.latitude,
							longitude: defaultRegion.longitude,
						}}
						title="Selected Location"
					>
						<View style={styles.markerContainer}>
							<View style={styles.markerImageWrapper}>
								<Image
									source={require('../../../../assets/images/Avator_img.png')}
									style={styles.markerImage}
									resizeMode="cover"
								/>
							</View>
							<View style={styles.markerPin} />
							<View style={styles.markerGlow} />
						</View>
					</Marker>
				</MapView>

				{/* Current Location Button */}
				<TouchableOpacity
					style={styles.currentLocationButton}
					onPress={handleCurrentLocationPress}
					activeOpacity={0.8}
				>
					<Image
						source={require('../../../../assets/icons/Center Location.png')}
						style={styles.currentLocationIcon}
						resizeMode="contain"
					/>
				</TouchableOpacity>
			</View>

			{/* Floating Location Detail Card */}
			<View style={styles.floatingCard}>
				<Text style={styles.cardTitle}>Location detail</Text>
				<View style={styles.cardContent}>
					<View style={styles.locationIconWrapper}>
						<Image
							source={require('../../../../assets/icons/Location.png')}
							style={styles.cardLocationIcon}
							resizeMode="contain"
						/>
					</View>
					<View style={styles.cardTextContainer}>
						<Text style={styles.cardAddress} numberOfLines={2}>
							{address || 'Jl. Pandanaran, Semarang Tengah, Semarang City, Central Java 50241'}
						</Text>
					</View>
				</View>
			</View>

			{/* Floating Choose Line Button */}
			<TouchableOpacity style={styles.floatingButton} onPress={handleChooseLine} activeOpacity={0.8}>
				<Text style={styles.buttonText}>CHOOSE LINE</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(9, 53, 82, 0.69)',
	},
	headerContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		paddingTop: 12,
		paddingHorizontal: 20,
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
	searchBarContainer: {
		position: 'absolute',
		top: 70,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
		zIndex: 1000,
		alignItems: 'center',
	},
	searchBar: {
		width: '100%',
		height: 70,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		paddingHorizontal: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	searchIcon: {
		width: 20,
		height: 20,
		tintColor: '#21628A',
		marginRight: 12,
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		fontWeight: '400',
		color: '#1E1E1E',
		paddingVertical: 0,
	},
	micIcon: {
		width: 20,
		height: 20,
		tintColor: '#21628A',
		marginLeft: 12,
	},
	mapContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	mapPlaceholder: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5F4F8',
	},
	placeholderText: {
		fontSize: 16,
		color: '#6C7380',
	},
	markerContainer: {
		alignItems: 'center',
		position: 'relative',
	},
	markerImageWrapper: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 3,
		borderColor: '#4CAF50',
		backgroundColor: '#ffffff',
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	markerImage: {
		width: '100%',
		height: '100%',
	},
	markerPin: {
		width: 0,
		height: 0,
		borderLeftWidth: 10,
		borderRightWidth: 10,
		borderTopWidth: 15,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: '#4CAF50',
		marginTop: -5,
	},
	markerGlow: {
		position: 'absolute',
		bottom: -10,
		width: 60,
		height: 30,
		borderRadius: 30,
		backgroundColor: '#4CAF50',
		opacity: 0.3,
		zIndex: -1,
	},
	currentLocationButton: {
		position: 'absolute',
		bottom: 280,
		right: 20,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#21628A',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		zIndex: 100,
	},
	currentLocationIcon: {
		width: 24,
		height: 24,
		tintColor: '#ffffff',
	},
	floatingCard: {
		position: 'absolute',
		bottom: 100,
		left: '50%',
		marginLeft: -163.5,
		width: 327,
		height: 133,
		backgroundColor: '#FFFFFF',
		borderRadius: 25,
		padding: 20,
		opacity: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 8,
		zIndex: 1000,
	},
	cardContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginTop: 12,
	},
	locationIconWrapper: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#ECEDF3',
		borderWidth: 0,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 0,
	},
	cardLocationIcon: {
		width: 24,
		height: 24,
		tintColor: '#FFFFFF',
	},
	cardTextContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: '#14233A',
		marginTop: 0,
		marginBottom: 0,
		alignSelf: 'flex-start',
	},
	cardAddress: {
		fontSize: 14,
		fontWeight: '400',
		color: '#6C7380',
		lineHeight: 20,
	},
	floatingButton: {
		position: 'absolute',
		bottom: 30,
		left: 20,
		right: 20,
		backgroundColor: '#E63946',
		borderRadius: 15,
		paddingVertical: 18,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#E63946',
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 8,
		zIndex: 1001,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: 0.5,
	},
});

export default LocationDetailScreen;

