import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../../../context/FavoritesContext';
import { moderateScale, responsiveWidth, scale, verticalScale } from '../../../utils/layout';

const NearbyHomes = () => {
	const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
	const homes = [
		{
			id: 1,
			title: 'Wings Tower',
			image: require('../../../assets/images/login_image.png'),
			rating: 4.9,
			location: 'Chicago, IL',
			price: 220,
			priceUnit: 'month',
		},
		{
			id: 2,
			title: 'Mill Sper House',
			image: require('../../../assets/images/login_image1.png'),
			rating: 4.8,
			location: 'Chicago, IL',
			price: 271,
			priceUnit: 'month',
		},
		{
			id: 3,
			title: 'Bungalow House',
			image: require('../../../assets/images/login_image2.png'),
			rating: 4.7,
			location: 'Chicago, IL',
			price: 235,
			priceUnit: 'month',
		},
		{
			id: 4,
			title: 'Sky Dandelions',
			image: require('../../../assets/images/login_image3.png'),
			rating: 4.9,
			location: 'Chicago, IL',
			price: 290,
			priceUnit: 'month',
		},
	];

	// Split homes into rows of 2
	const topRow = homes.slice(0, 2);
	const bottomRow = homes.slice(2, 4);

	const renderCard = (home) => (
		<View key={home.id} style={styles.card}>
			{/* Image Container */}
			<View style={styles.imageContainer}>
				<Image 
					source={home.image} 
					style={styles.cardImage}
					resizeMode="cover"
				/>
				{/* Heart Icon Overlay - Top Right */}
				<TouchableOpacity 
					style={styles.heartButton}
					activeOpacity={0.8}
					onPress={() => {
						if (isFavorite(home.id)) {
							removeFromFavorites(home.id);
						} else {
							addToFavorites(home);
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
				{/* Price Tag Overlay - Bottom Left */}
				<View style={styles.priceTag}>
					<Text style={styles.priceText}>$ {home.price}</Text>
					<Text style={styles.monthText}>/{home.priceUnit}</Text>
				</View>
			</View>

			{/* Content Below Image */}
			<View style={styles.contentContainer}>
				{/* Title */}
				<Text style={styles.cardTitle}>{home.title}</Text>

				{/* Rating and Location */}
				<View style={styles.detailsRow}>
					<Text style={styles.starIcon}>⭐</Text>
					<Text style={styles.ratingText}>{home.rating}</Text>
					<Image 
						source={require('../../../assets/icons/Location.png')}
						style={styles.locationIcon}
						resizeMode="contain"
					/>
					<Text style={styles.locationText}>{home.location}</Text>
				</View>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Nearby Homes</Text>
			<View style={styles.gridContainer}>
				{/* Top Row - 2 Cards */}
				<View style={styles.row}>
					{topRow.map((home) => renderCard(home))}
				</View>
				{/* Bottom Row - 2 Cards */}
				<View style={styles.row}>
					{bottomRow.map((home) => renderCard(home))}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: verticalScale(16),
		marginBottom: verticalScale(8),
	},
	title: {
		fontSize: moderateScale(18),
		fontWeight: '800',
		color: '#14233A',
		marginBottom: verticalScale(12),
		paddingHorizontal: moderateScale(8),
	},
	gridContainer: {
		paddingHorizontal: moderateScale(8),
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: verticalScale(16),
		gap: moderateScale(10),
	},
	card: {
		width: responsiveWidth(44),
		maxWidth: 200,
		height: verticalScale(232),
		borderRadius: moderateScale(25),
		opacity: 1,
		transform: [{ rotate: '0deg' }],
	},
	imageContainer: {
		width: '100%',
		height: '100%',
		position: 'relative',
		borderRadius: moderateScale(25),
		overflow: 'hidden',
		marginBottom: verticalScale(12),
		backgroundColor: '#F3F4F6',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	cardImage: {
		width: '100%',
		height: '100%',
	},
	heartButton: {
		position: 'absolute',
		top: verticalScale(12),
		right: moderateScale(12),
		zIndex: 10,
	},
	heartIconContainer: {
		width: scale(36),
		height: scale(36),
		borderRadius: scale(18),
		backgroundColor: '#E63946',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heartIcon: {
		width: scale(18),
		height: scale(18),
		tintColor: '#ffffff',
	},
	priceTag: {
		position: 'absolute',
		bottom: verticalScale(12),
		left: moderateScale(12),
		backgroundColor: 'rgba(33, 98, 138, 0.9)',
		paddingHorizontal: moderateScale(10),
		paddingVertical: verticalScale(6),
		borderTopRightRadius: moderateScale(12),
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: moderateScale(8),
		zIndex: 10,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	priceText: {
		color: '#ffffff',
		fontSize: moderateScale(16),
		fontWeight: '700',
		lineHeight: moderateScale(20),
	},
	monthText: {
		color: '#ffffff',
		fontSize: moderateScale(12),
		fontWeight: '500',
		marginLeft: moderateScale(2),
		lineHeight: moderateScale(16),
	},
	contentContainer: {
		paddingHorizontal: moderateScale(4),
	},
	cardTitle: {
		fontSize: moderateScale(16),
		fontWeight: '700',
		color: '#14233A',
		marginBottom: verticalScale(6),
	},
	detailsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	starIcon: {
		fontSize: moderateScale(14),
		marginRight: moderateScale(4),
	},
	ratingText: {
		fontSize: moderateScale(12),
		fontWeight: '600',
		color: '#14233A',
		marginRight: moderateScale(8),
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
});

export default NearbyHomes;
