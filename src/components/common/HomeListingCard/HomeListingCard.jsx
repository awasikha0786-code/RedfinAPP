import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const HomeListingCard = ({ property, onPress, compact = false, onFavoritePress, isFavorite = false, customStyle, imageContainerStyle, titleStyle, priceStyle }) => {
	const handleHeartPress = (e) => {
		e.stopPropagation();
		if (onFavoritePress) {
			onFavoritePress(property);
		}
	};

	// Calculate image height based on custom style
	const cardHeight = customStyle?.height || (compact ? 120 : 180);
	const imageHeight = customStyle ? cardHeight : (compact ? 120 : 180);

	return (
		<TouchableOpacity 
			style={[styles.card, compact && styles.cardCompact, customStyle]} 
			onPress={onPress}
			activeOpacity={0.9}
		>
			{/* Left Image Section */}
			<View style={[
				styles.imageContainer, 
				compact && styles.imageContainerCompact, 
				customStyle && styles.imageContainerCustom,
				customStyle && { height: imageHeight },
				imageContainerStyle
			]}>
				<Image 
					source={property.image} 
					style={[styles.image, imageContainerStyle && { borderRadius: imageContainerStyle.borderRadius }]}
					resizeMode="cover"
				/>
				{/* Heart Icon Overlay - Top Left */}
				<TouchableOpacity 
					style={[styles.heartButton, compact && styles.heartButtonCompact]}
					activeOpacity={0.8}
					onPress={handleHeartPress}
				>
					<View style={[styles.heartIconContainer, compact && styles.heartIconContainerCompact, isFavorite && styles.heartIconContainerActive]}>
						<Image 
							source={require('../../../assets/icons/Heart.png')}
							style={[styles.heartIcon, compact && styles.heartIconCompact]}
							resizeMode="contain"
						/>
					</View>
				</TouchableOpacity>
				{/* Property Type Tag - Bottom Left */}
				<View style={[styles.propertyTag, compact && styles.propertyTagCompact]}>
					<Text style={[styles.propertyTagText, compact && styles.propertyTagTextCompact]}>{property.type || 'House'}</Text>
				</View>
			</View>

			{/* Right Content Section */}
			<View style={[styles.contentContainer, compact && styles.contentContainerCompact, titleStyle && { paddingTop: 0, justifyContent: 'flex-start' }]}>
				{/* Title */}
				<View style={titleStyle && { width: titleStyle.width, height: titleStyle.height, marginTop: titleStyle.marginTop || 8, marginBottom: 8 }}>
					<Text style={[styles.titleText, compact && styles.titleTextCompact, titleStyle]} numberOfLines={2}>{property.title}</Text>
				</View>

				{/* Star Rating */}
				<View style={[styles.ratingContainer, compact && styles.ratingContainerCompact]}>
					<Text style={styles.starIcon}>⭐</Text>
					<Text style={[styles.ratingText, compact && styles.ratingTextCompact]}>{property.rating}</Text>
				</View>

				{/* Location */}
				<View style={[styles.locationContainer, compact && styles.locationContainerCompact]}>
					<Image 
						source={require('../../../assets/icons/Location.png')}
						style={styles.locationIcon}
						resizeMode="contain"
					/>
					<Text style={[styles.locationText, compact && styles.locationTextCompact]}>{property.location}</Text>
				</View>

				{/* Price - Hidden in compact mode */}
				{!compact && property.price && (
					<View style={priceStyle && { width: priceStyle.width, height: priceStyle.height }}>
						<Text style={[styles.priceText, priceStyle]} numberOfLines={1}>
							$ {typeof property.price === 'number' ? property.price.toLocaleString() : property.price}
						</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		backgroundColor: '#F5F4F8',
		borderRadius: 16,
		marginBottom: 16,
		overflow: 'hidden',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	imageContainer: {
		width: 160,
		height: 180,
		position: 'relative',
	},
	// For favorites screen custom layout
	imageContainerCustom: {
		width: '50%',
		height: '100%',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	heartButton: {
		position: 'absolute',
		top: 12,
		left: 12,
		zIndex: 10,
	},
	heartIconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: '#E63946',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heartIconContainerActive: {
		backgroundColor: '#E63946',
	},
	heartIcon: {
		width: 18,
		height: 18,
		tintColor: '#ffffff',
	},
	propertyTag: {
		position: 'absolute',
		bottom: 12,
		left: 12,
		backgroundColor: '#21628A',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 8,
		zIndex: 10,
	},
	heartButtonCompact: {
		top: 8,
		left: 8,
	},
	heartIconContainerCompact: {
		width: 28,
		height: 28,
		borderRadius: 14,
	},
	heartIconCompact: {
		width: 14,
		height: 14,
	},
	propertyTagCompact: {
		bottom: 8,
		left: 8,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
	},
	propertyTagTextCompact: {
		fontSize: 11,
	},
	propertyTagText: {
		color: '#ffffff',
		fontSize: 12,
		fontWeight: '600',
	},
	contentContainer: {
		flex: 1,
		padding: 16,
		justifyContent: 'space-between',
	},
	titleText: {
		fontSize: 18,
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 8,
		lineHeight: 24,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	starIcon: {
		fontSize: 16,
		marginRight: 4,
	},
	ratingText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#14233A',
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	locationIcon: {
		width: 14,
		height: 14,
		tintColor: '#6C7380',
		marginRight: 6,
	},
	locationText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#6C7380',
	},
	priceText: {
		fontSize: 22,
		fontWeight: '700',
		color: '#21628A',
		marginTop: 'auto',
	},
	priceUnit: {
		fontSize: 22,
		fontWeight: '700',
		color: '#21628A',
	},
	// Compact styles for map view
	cardCompact: {
		width: 268,
		height: 120,
		borderRadius: 25,
		marginBottom: 0,
	},
	imageContainerCompact: {
		width: 120,
		height: 120,
	},
	contentContainerCompact: {
		flex: 1,
		padding: 12,
		justifyContent: 'flex-start',
	},
	titleTextCompact: {
		fontSize: 16,
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 6,
		lineHeight: 20,
	},
	ratingContainerCompact: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 6,
	},
	ratingTextCompact: {
		fontSize: 13,
		fontWeight: '600',
		color: '#14233A',
	},
	locationContainerCompact: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 0,
	},
	locationTextCompact: {
		fontSize: 12,
		fontWeight: '400',
		color: '#6C7380',
	},
	priceTextCompact: {
		fontSize: 18,
		fontWeight: '700',
		color: '#21628A',
		marginTop: 4,
	},
});

export default HomeListingCard;
