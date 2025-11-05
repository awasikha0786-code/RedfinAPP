import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import HomeListingCard from '../HomeListingCard/HomeListingCard';

const StaticMapView = ({ properties = [], onPropertyPress, onNearbyPress, nearbyCount = 0 }) => {
	return (
		<View style={styles.container}>
			{/* Static Map Background */}
			<View style={styles.mapContainer}>
				{/* Map Pattern Background */}
				<View style={styles.mapBackground}>
					{/* Roads Pattern */}
					<View style={styles.road} />
					<View style={[styles.road, styles.roadHorizontal]} />
					{/* Green Areas (Parks) */}
					<View style={styles.park1} />
					<View style={styles.park2} />
					{/* Water Body */}
					<View style={styles.water} />
				</View>

				{/* Property Markers */}
				{properties.slice(0, 3).map((property, index) => (
					<View
						key={property.id}
						style={[
							styles.markerContainer,
							styles[`marker${index + 1}`]
						]}
					>
						<View style={styles.markerPin}>
							<Image
								source={property.image}
								style={styles.markerImage}
								resizeMode="cover"
							/>
							<View style={styles.markerPinBase} />
							<View style={styles.markerGlow} />
						</View>
					</View>
				))}

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
			</View>

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
	mapContainer: {
		flex: 1,
		position: 'relative',
		backgroundColor: '#E8E8E8',
	},
	mapBackground: {
		width: '100%',
		height: '100%',
		position: 'relative',
	},
	road: {
		position: 'absolute',
		width: '100%',
		height: 40,
		backgroundColor: '#F5F5F5',
		top: '30%',
	},
	roadHorizontal: {
		width: 40,
		height: '100%',
		left: '40%',
		top: 0,
	},
	park1: {
		position: 'absolute',
		width: '35%',
		height: '25%',
		backgroundColor: '#C8E6C9',
		top: '10%',
		left: '5%',
		borderRadius: 8,
	},
	park2: {
		position: 'absolute',
		width: '30%',
		height: '20%',
		backgroundColor: '#C8E6C9',
		bottom: '30%',
		right: '10%',
		borderRadius: 8,
	},
	water: {
		position: 'absolute',
		width: '25%',
		height: '35%',
		backgroundColor: '#B3E5FC',
		bottom: '15%',
		left: '15%',
		borderRadius: 12,
	},
	markerContainer: {
		position: 'absolute',
		zIndex: 10,
	},
	marker1: {
		top: '25%',
		right: '20%',
	},
	marker2: {
		top: '45%',
		left: '15%',
	},
	marker3: {
		bottom: '25%',
		right: '25%',
	},
	markerPin: {
		alignItems: 'center',
		position: 'relative',
	},
	markerImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 3,
		borderColor: '#21628A',
		backgroundColor: '#ffffff',
	},
	markerPinBase: {
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
	markerGlow: {
		position: 'absolute',
		bottom: -8,
		width: 80,
		height: 40,
		borderRadius: 40,
		backgroundColor: '#4CAF50',
		opacity: 0.3,
		zIndex: -1,
	},
	nearbyButton: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#21628A',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 12,
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	nearbyCountBadge: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#4CAF50',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 8,
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
		height: 200,
		paddingBottom: 10,
	},
	cardsScrollContent: {
		paddingHorizontal: 20,
	},
	cardWrapper: {
		width: 327,
		marginRight: 12,
	},
});

export default StaticMapView;

