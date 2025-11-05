import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const LocationCard = ({ location, ranking, onPress, style }) => {
	return (
		<TouchableOpacity 
			style={[styles.card, style]} 
			onPress={onPress}
			activeOpacity={0.9}
		>
			{/* Yellow Triangular Indicator - Left Edge */}
			<View style={styles.triangleIndicator} />
			
			{/* Image Container */}
			<View style={styles.imageContainer}>
				<Image 
					source={location.image} 
					style={styles.image}
					resizeMode="cover"
				/>
				{/* Ranking Badge - Top Left of Image */}
				<View style={styles.rankingBadge}>
					<Text style={styles.rankingText}>#{ranking}</Text>
				</View>
			</View>
			
			{/* Location Name */}
			<Text style={styles.locationName}>{location.name}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '48%',
		marginBottom: 16,
		backgroundColor: '#F5F4F8',
		borderRadius: 16,
		padding: 12,
		paddingTop: 8,
		position: 'relative',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	triangleIndicator: {
		position: 'absolute',
		left: -4,
		top: '50%',
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderRightWidth: 8,
		borderTopWidth: 6,
		borderBottomWidth: 6,
		borderTopColor: 'transparent',
		borderBottomColor: 'transparent',
		borderRightColor: '#FFD700',
		zIndex: 10,
		transform: [{ translateY: -6 }],
	},
	imageContainer: {
		width: '100%',
		aspectRatio: 1.1,
		position: 'relative',
		borderRadius: 12,
		overflow: 'hidden',
		marginBottom: 12,
		backgroundColor: '#F3F4F6',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	rankingBadge: {
		position: 'absolute',
		top: 12,
		left: 12,
		backgroundColor: '#E63946',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 8,
		zIndex: 10,
		minWidth: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rankingText: {
		color: '#ffffff',
		fontSize: 14,
		fontWeight: '700',
	},
	locationName: {
		fontSize: 18,
		fontWeight: '700',
		color: '#14233A',
		textAlign: 'left',
		paddingBottom: 4,
	},
});

export default LocationCard;
