import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import HomeListingCard from '../HomeListingCard/HomeListingCard';

// Try to import react-native-maps with error handling
let MapView, Marker;
try {
	// Use direct import to avoid Fabric spec issues
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

const PropertyMapView = ({ properties = [], onPropertyPress, onNearbyPress, nearbyCount = 0 }) => {
	const [mapReady, setMapReady] = useState(false);
	const [mapError, setMapError] = useState(null);

	// Default region (Chicago)
	const defaultRegion = {
		latitude: 41.8781,
		longitude: -87.6298,
		latitudeDelta: 0.1,
		longitudeDelta: 0.1,
	};

	// Calculate map region from properties
	const mapRegion = properties.length > 0 && properties[0].latitude
		? {
				latitude: properties[0].latitude,
				longitude: properties[0].longitude,
				latitudeDelta: 0.05,
				longitudeDelta: 0.05,
			}
		: defaultRegion;

	const handleMapReady = () => {
		setMapReady(true);
		setMapError(null);
	};

	const handleMapError = (error) => {
		console.warn('Map error:', error);
		setMapError('Map failed to load. Please check your Google Maps API key.');
		setMapReady(false);
	};

	// If MapView is not available, show error message
	if (!MapView || !Marker) {
		return (
			<View style={styles.container}>
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>Map view is not available.</Text>
					<Text style={styles.errorSubtext}>
						Please rebuild the app after installing react-native-maps:{'\n'}
						cd android && ./gradlew clean && cd .. && npm run android
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Loading Indicator */}
			{!mapReady && !mapError && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#21628A" />
					<Text style={styles.loadingText}>Loading map...</Text>
				</View>
			)}

			{/* Error Message */}
			{mapError && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{mapError}</Text>
					<Text style={styles.errorSubtext}>
						Make sure you have added a valid Google Maps API key in AndroidManifest.xml
					</Text>
				</View>
			)}

			{/* Map View */}
			<MapView
				style={styles.map}
				initialRegion={mapRegion}
				region={mapRegion}
				onMapReady={handleMapReady}
				onError={handleMapError}
				showsUserLocation={false}
				showsMyLocationButton={false}
				mapType="standard"
				loadingEnabled={true}
				loadingIndicatorColor="#21628A"
				loadingBackgroundColor="#FFFFFF"
			>
				{properties.map((property) => {
					if (!property.latitude || !property.longitude) return null;

					return (
						<Marker
							key={property.id}
							coordinate={{
								latitude: property.latitude,
								longitude: property.longitude,
							}}
							title={property.title}
							description={property.location}
						>
							<View style={styles.markerContainer}>
								<View style={styles.markerImageWrapper}>
									<Image
										source={property.image}
										style={styles.markerImage}
										resizeMode="cover"
									/>
								</View>
								<View style={styles.markerPin} />
							</View>
						</Marker>
					);
				})}
			</MapView>

			{/* Nearby You Button - Bottom Left */}
			<TouchableOpacity
				style={styles.nearbyButton}
				onPress={onNearbyPress}
				activeOpacity={0.8}
			>
				<View style={styles.nearbyCountBadge}>
					<Text style={styles.nearbyCountText}>{nearbyCount}</Text>
				</View>
				<Text style={styles.nearbyButtonText}>Nearby You</Text>
			</TouchableOpacity>

			{/* Property Cards - Bottom Scrollable */}
			<View style={styles.cardsContainer}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.cardsScrollContent}
				>
					{properties.map((property) => (
						<View key={property.id} style={styles.cardWrapper}>
							<HomeListingCard
								property={property}
								onPress={() => onPropertyPress?.(property)}
								compact={true}
							/>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	loadingContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		zIndex: 1000,
	},
	loadingText: {
		marginTop: 12,
		fontSize: 14,
		color: '#6C7380',
		fontWeight: '500',
	},
	errorContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5F4F8',
		zIndex: 1000,
		padding: 20,
	},
	errorText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#E63946',
		textAlign: 'center',
		marginBottom: 8,
	},
	errorSubtext: {
		fontSize: 14,
		color: '#6C7380',
		textAlign: 'center',
		lineHeight: 20,
	},
	map: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	markerContainer: {
		alignItems: 'center',
		position: 'relative',
	},
	markerImageWrapper: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 3,
		borderColor: '#21628A',
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
		borderLeftWidth: 8,
		borderRightWidth: 8,
		borderTopWidth: 12,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: '#21628A',
		marginTop: -2,
	},
	nearbyButton: {
		position: 'absolute',
		bottom: 180,
		left: 8,
		width: 137,
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#21628A',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 25,
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		zIndex: 100,
	},
	nearbyCountBadge: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#4CAF50',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	nearbyCountText: {
		color: '#ffffff',
		fontSize: 12,
		fontWeight: '700',
	},
	nearbyButtonText: {
		color: '#ffffff',
		fontSize: 14,
		fontWeight: '600',
	},
	cardsContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 160,
		paddingBottom: 20,
		paddingTop: 16,
		zIndex: 100,
		backgroundColor: '#FFFFFF',
	},
	cardsScrollContent: {
		paddingHorizontal: 20,
	},
	cardWrapper: {
		width: 268,
		height: 120,
		borderRadius: 25,
		marginRight: 12,
		overflow: 'hidden',
	},
});

export default PropertyMapView;

