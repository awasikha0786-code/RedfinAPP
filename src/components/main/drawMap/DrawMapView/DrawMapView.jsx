import React, { forwardRef, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

// Try to import react-native-maps with error handling
let MapView, Marker, Polygon;
try {
	const maps = require('react-native-maps');
	if (maps.default) {
		MapView = maps.default;
		Marker = maps.Marker || maps.default.Marker;
		Polygon = maps.Polygon || maps.default.Polygon;
	} else {
		MapView = maps.MapView;
		Marker = maps.Marker;
		Polygon = maps.Polygon;
	}
	// Ensure PROVIDER_GOOGLE is available
	if (MapView && !MapView.PROVIDER_GOOGLE) {
		MapView.PROVIDER_GOOGLE = 'google';
	}
} catch (error) {
	console.warn('react-native-maps not available:', error);
	MapView = null;
	Marker = null;
	Polygon = null;
}

const DrawMapView = forwardRef(({ 
	polygonCoordinates = [], 
	isShapeClosed = false, 
	mode = 'draw',
	onMapPress,
	onEditPoint 
}, ref) => {
	const [mapReady, setMapReady] = useState(false);
	const [mapError, setMapError] = useState(null);

	// Default region (Semarang, Indonesia based on image)
	const defaultRegion = {
		latitude: -6.9667,
		longitude: 110.4167,
		latitudeDelta: 0.02,
		longitudeDelta: 0.02,
	};

	const handleMapReady = () => {
		setMapReady(true);
		setMapError(null);
	};

	const handleMapError = (error) => {
		console.error('Map error:', error);
		console.error('Error details:', JSON.stringify(error, null, 2));
		setMapError('Map failed to load. Please check your Google Maps API key.');
		setMapReady(false);
	};

	const handleMapPress = (event) => {
		if (onMapPress && mode === 'draw') {
			const coordinate = event.nativeEvent.coordinate;
			onMapPress(coordinate);
		}
	};

	// If MapView is not available, show error message
	if (!MapView || !Marker || !Polygon) {
		return (
			<View style={styles.container}>
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>Map view is not available.</Text>
					<Text style={styles.errorSubtext}>
						Please rebuild the app after installing react-native-maps
					</Text>
				</View>
			</View>
		);
	}

	// Create closed polygon coordinates if shape is closed
	const closedPolygonCoordinates = isShapeClosed && polygonCoordinates.length >= 3
		? [...polygonCoordinates, polygonCoordinates[0]]
		: polygonCoordinates;

	// Calculate center for "Map Area" text
	const getPolygonCenter = () => {
		if (polygonCoordinates.length === 0) return null;
		const sumLat = polygonCoordinates.reduce((sum, coord) => sum + coord.latitude, 0);
		const sumLng = polygonCoordinates.reduce((sum, coord) => sum + coord.longitude, 0);
		return {
			latitude: sumLat / polygonCoordinates.length,
			longitude: sumLng / polygonCoordinates.length,
		};
	};

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
						Make sure you have added a valid Google Maps API key
					</Text>
				</View>
			)}

			{/* Map View */}
			<MapView
				ref={ref}
				provider={MapView?.PROVIDER_GOOGLE || 'google'}
				style={styles.map}
				initialRegion={defaultRegion}
				region={defaultRegion}
				onMapReady={handleMapReady}
				onError={handleMapError}
				onPress={handleMapPress}
				showsUserLocation={false}
				showsMyLocationButton={false}
				mapType="standard"
				loadingEnabled={true}
				loadingIndicatorColor="#21628A"
				loadingBackgroundColor="#FFFFFF"
				cacheEnabled={true}
				zoomEnabled={true}
				scrollEnabled={true}
			>
				{/* Polygon */}
				{polygonCoordinates.length >= 3 && (
					<Polygon
						coordinates={closedPolygonCoordinates}
						strokeColor="#21628A"
						strokeWidth={3}
						fillColor="rgba(138, 43, 226, 0.3)"
					/>
				)}

				{/* Control Points / Markers */}
				{polygonCoordinates.map((coordinate, index) => (
					<Marker
						key={index}
						coordinate={coordinate}
						draggable={mode === 'edit'}
						onDragEnd={(e) => {
							if (onEditPoint) {
								onEditPoint(index, e.nativeEvent.coordinate);
							}
						}}
					>
						<View style={styles.controlPoint}>
							<View style={styles.controlPointInner} />
						</View>
					</Marker>
				))}

				{/* Map Area Text Overlay */}
				{isShapeClosed && polygonCoordinates.length >= 3 && getPolygonCenter() && (
					<Marker
						coordinate={getPolygonCenter()}
						anchor={{ x: 0.5, y: 0.5 }}
					>
						<View style={styles.textOverlay}>
							<Text style={styles.textOverlayText}>Map Area</Text>
						</View>
					</Marker>
				)}
			</MapView>
		</View>
	);
});

DrawMapView.displayName = 'DrawMapView';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		backgroundColor: '#FFFFFF',
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
	controlPoint: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
		borderWidth: 3,
		borderColor: '#21628A',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 6,
	},
	controlPointInner: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#21628A',
	},
	textOverlay: {
		backgroundColor: 'rgba(30, 30, 30, 0.8)',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
	},
	textOverlayText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FFFFFF',
	},
});

export default DrawMapView;

