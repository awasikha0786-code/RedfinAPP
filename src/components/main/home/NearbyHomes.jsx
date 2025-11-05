import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../../../context/FavoritesContext';

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
		marginTop: 16,
		marginBottom: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: '800',
		color: '#14233A',
		marginBottom: 12,
		paddingHorizontal: 8,
	},
	gridContainer: {
		paddingHorizontal: 8,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 16,
		gap: 10,
	},
	card: {
		width: 160,
		height: 232,
		borderRadius: 25,
		opacity: 1,
		transform: [{ rotate: '0deg' }],
	},
	imageContainer: {
		width: '100%',
		height: '100%',
		position: 'relative',
		borderRadius: 25,
		overflow: 'hidden',
		marginBottom: 12,
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
		top: 12,
		right: 12,
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
	heartIcon: {
		width: 18,
		height: 18,
		tintColor: '#ffffff',
	},
	priceTag: {
		position: 'absolute',
		bottom: 12,
		left: 12,
		backgroundColor: 'rgba(33, 98, 138, 0.9)',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderTopRightRadius: 12,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 8,
		zIndex: 10,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	priceText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 20,
	},
	monthText: {
		color: '#ffffff',
		fontSize: 12,
		fontWeight: '500',
		marginLeft: 2,
		lineHeight: 16,
	},
	contentContainer: {
		paddingHorizontal: 4,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 6,
	},
	detailsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	starIcon: {
		fontSize: 14,
		marginRight: 4,
	},
	ratingText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#14233A',
		marginRight: 8,
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
});

export default NearbyHomes;
