import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../../../context/FavoritesContext';
import { moderateScale, responsiveWidth, scale, verticalScale } from '../../../utils/layout';

const PopularCarousel = ({ onPropertyPress }) => {
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
						<TouchableOpacity 
						key={property.id} 
						style={styles.card}
                        activeOpacity={0.85}
                        onPress={() => onPropertyPress?.(property)}
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
						<View style={[styles.heartIconContainer, isFavorite(property.id) && styles.heartIconContainerActive]}>
							<Image 
								source={require('../../../assets/icons/Heart.png')}
								style={[styles.heartIcon, isFavorite(property.id) && styles.heartIconActive]}
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
                  source={require('../../../assets/icons/share...png')}
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
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: verticalScale(16),
	},
	title: {
		fontSize: moderateScale(18),
		fontWeight: '800',
		color: '#14233A',
		marginBottom: verticalScale(10),
	},
	scrollView: {
		marginTop: 0,
	},
	scrollContent: {
		paddingRight: moderateScale(16),
	},
	card: {
		width: responsiveWidth(82),
		maxWidth: 360,
		height: verticalScale(220),
		borderRadius: moderateScale(16),
		backgroundColor: '#F5F4F8',
		marginRight: moderateScale(12),
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
		top: verticalScale(12),
		left: moderateScale(12),
		zIndex: 10,
	},
	heartIconContainer: {
		width: scale(40),
		height: scale(40),
		borderRadius: scale(20),
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#E63946',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heartIconContainerActive: {
		backgroundColor: '#E63946',
	},
	heartIcon: {
		width: scale(20),
		height: scale(20),
		tintColor: '#E63946',
	},
	heartIconActive: {
		tintColor: '#FFFFFF',
	},
	walkThroughButton: {
		position: 'absolute',
		bottom: verticalScale(12),
		left: moderateScale(12),
		backgroundColor: '#21628A',
		paddingHorizontal: moderateScale(12),
		paddingVertical: verticalScale(8),
		borderRadius: moderateScale(8),
		zIndex: 10,
	},
	walkThroughText: {
		color: '#ffffff',
		fontSize: moderateScale(12),
		fontWeight: '600',
	},
	contentContainer: {
		width: '40%',
		padding: moderateScale(12),
		justifyContent: 'space-between',
		position: 'relative',
	},
	shareButton: {
		position: 'absolute',
		top: verticalScale(12),
		right: moderateScale(12),
		zIndex: 10,
	},
	shareIcon: {
		width: scale(24),
		height: scale(24),
		tintColor: '#21628A',
	},
	titleText: {
		fontSize: moderateScale(16),
		fontWeight: '700',
		color: '#14233A',
		marginTop: verticalScale(24),
		marginBottom: verticalScale(8),
		lineHeight: moderateScale(20),
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: verticalScale(6),
	},
	starIcon: {
		fontSize: moderateScale(16),
		marginRight: moderateScale(4),
	},
	ratingText: {
		fontSize: moderateScale(14),
		fontWeight: '600',
		color: '#14233A',
	},
	detailsText: {
		fontSize: moderateScale(12),
		fontWeight: '400',
		color: '#6C7380',
		marginBottom: verticalScale(6),
		lineHeight: moderateScale(16),
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: verticalScale(8),
	},
	locationIcon: {
		width: scale(12),
		height: scale(12),
		tintColor: '#6C7380',
		marginRight: moderateScale(4),
	},
	locationText: {
		fontSize: moderateScale(12),
		fontWeight: '400',
		color: '#6C7380',
	},
	priceText: {
		fontSize: moderateScale(20),
		fontWeight: '700',
		color: '#21628A',
		marginTop: 'auto',
	},
});

export default PopularCarousel;
