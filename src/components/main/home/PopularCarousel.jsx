import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../../../context/FavoritesContext';

const PopularCarousel = () => {
	const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
	const properties = [
		{
			id: 1,
			image: require('../../../assets/images/login_image.png'),
			title: 'Lakeview Heights',
			rating: 4.9,
			beds: 2,
			baths: 2,
			sqft: '1,630',
			location: 'Chicago, IL',
			price: 290000,
		},
		{
			id: 2,
			image: require('../../../assets/images/login_image1.png'),
			title: 'Villa',
			rating: 4.8,
			beds: 3,
			baths: 2,
			sqft: '1,850',
			location: 'Chicago, IL',
			price: 320000,
		},
	];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Popular in Chicago</Text>
			<ScrollView 
				horizontal 
				showsHorizontalScrollIndicator={false} 
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
			>
				{properties.map((property) => (
					<View 
						key={property.id} 
						style={styles.card}
					>
						{/* Left Image Section */}
						<View style={styles.imageContainer}>
							<Image 
								source={property.image} 
								style={styles.image}
								resizeMode="cover"
							/>
							{/* Heart Icon Overlay - Top Left */}
							<TouchableOpacity 
								style={styles.heartButton}
								activeOpacity={0.8}
								onPress={() => {
									if (isFavorite(property.id)) {
										removeFromFavorites(property.id);
									} else {
										addToFavorites(property);
									}
								}}
							>
								<View style={styles.heartIconContainer}>
									<Image 
										source={require('../../../assets/icons/Heart.png')}
										style={styles.heartIcon}
										resizeMode="contain"
									/>
								</View>
							</TouchableOpacity>
							{/* 3D Walk Through Button - Bottom Left */}
							<TouchableOpacity 
								style={styles.walkThroughButton}
								activeOpacity={0.8}
								onPress={() => {}}
							>
								<Text style={styles.walkThroughText}>3D Walk Through</Text>
							</TouchableOpacity>
						</View>

						{/* Right Content Section */}
						<View style={styles.contentContainer}>
							{/* Share Icon - Top Right */}
							<TouchableOpacity 
								style={styles.shareButton}
								activeOpacity={0.8}
								onPress={() => {}}
							>
								<Image 
									source={require('../../../assets/icons/Share.png')}
									style={styles.shareIcon}
									resizeMode="contain"
								/>
							</TouchableOpacity>

							{/* Title - Two Lines */}
							<Text style={styles.titleText}>{property.title}</Text>

							{/* Star Rating */}
							<View style={styles.ratingContainer}>
								<Text style={styles.starIcon}>⭐</Text>
								<Text style={styles.ratingText}>{property.rating}</Text>
							</View>

							{/* Property Details */}
							<Text style={styles.detailsText}>
								{property.beds} beds {property.baths} baths {property.sqft} sq ft
							</Text>

							{/* Location */}
							<View style={styles.locationContainer}>
								<Image 
									source={require('../../../assets/icons/Location.png')}
									style={styles.locationIcon}
									resizeMode="contain"
								/>
								<Text style={styles.locationText}>{property.location}</Text>
							</View>

							{/* Price */}
							{property.price && <Text style={styles.priceText}>$ {property.price.toLocaleString()}</Text>}
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: '800',
		color: '#14233A',
		marginBottom: 10,
	},
	scrollView: {
		marginTop: 0,
	},
	scrollContent: {
		paddingRight: 16,
	},
	card: {
		width: 320,
		height: 220,
		borderRadius: 16,
		backgroundColor: '#F5F4F8',
		marginRight: 12,
		overflow: 'hidden',
		flexDirection: 'row',
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	imageContainer: {
		width: '60%',
		height: '100%',
		position: 'relative',
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
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#E63946',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heartIcon: {
		width: 20,
		height: 20,
		tintColor: '#ffffff',
	},
	walkThroughButton: {
		position: 'absolute',
		bottom: 12,
		left: 12,
		backgroundColor: '#21628A',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
		zIndex: 10,
	},
	walkThroughText: {
		color: '#ffffff',
		fontSize: 12,
		fontWeight: '600',
	},
	contentContainer: {
		width: '40%',
		padding: 12,
		justifyContent: 'space-between',
		position: 'relative',
	},
	shareButton: {
		position: 'absolute',
		top: 12,
		right: 12,
		zIndex: 10,
	},
	shareIcon: {
		width: 18,
		height: 18,
		tintColor: '#21628A',
	},
	titleText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#14233A',
		marginTop: 24,
		marginBottom: 8,
		lineHeight: 20,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 6,
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
	detailsText: {
		fontSize: 12,
		fontWeight: '400',
		color: '#6C7380',
		marginBottom: 6,
		lineHeight: 16,
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	locationIcon: {
		width: 12,
		height: 12,
		tintColor: '#6C7380',
		marginRight: 4,
	},
	locationText: {
		fontSize: 12,
		fontWeight: '400',
		color: '#6C7380',
	},
	priceText: {
		fontSize: 20,
		fontWeight: '700',
		color: '#21628A',
		marginTop: 'auto',
	},
});

export default PopularCarousel;
