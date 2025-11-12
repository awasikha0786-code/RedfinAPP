import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { moderateScale, responsiveWidth, scale, verticalScale } from '../../../utils/layout';

const TopLocations = ({ navigation }) => {
	const locations = [
		{
			id: 1,
			name: 'Seattle',
			image: require('../../../assets/images/login_image.png'),
		},
		{
			id: 2,
			name: 'Austin',
			image: require('../../../assets/images/login_image1.png'),
		},
		{
			id: 3,
			name: 'Denver',
			image: require('../../../assets/images/login_image2.png'),
		},
		{
			id: 4,
			name: 'Chicago',
			image: require('../../../assets/images/login_image3.png'),
		},
	];

	const handleLocationPress = () => {
		navigation?.navigate('TopLocations');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Top Locations</Text>
			<ScrollView 
				horizontal 
				showsHorizontalScrollIndicator={false} 
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
			>
				{locations.map((location) => (
					<TouchableOpacity 
						key={location.id} 
					style={styles.locationItem}
						activeOpacity={0.8}
						onPress={handleLocationPress}
					>
					<View style={styles.cardContainer}>
						<View style={styles.avatarContainer}>
							<Image 
								source={location.image} 
								style={styles.avatarImage}
								resizeMode="cover"
							/>
						</View>
						<Text style={styles.locationText}>{location.name}</Text>
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
	locationItem: {
		marginRight: moderateScale(16),
	},
	cardContainer: {
		width: responsiveWidth(42),
		maxWidth: 160,
		height: verticalScale(56),
		borderRadius: moderateScale(50),
		backgroundColor: '#F5F4F8',
		paddingVertical: verticalScale(8),
		paddingHorizontal: moderateScale(8),
		flexDirection: 'row',
		alignItems: 'center',
		gap: moderateScale(15),
	},
	avatarContainer: {
		width: scale(40),
		height: scale(40),
		borderRadius: scale(20),
		overflow: 'hidden',
		backgroundColor: '#F3F4F6',
	},
	avatarImage: {
		width: '100%',
		height: '100%',
	},
	locationText: {
		fontSize: moderateScale(14),
		fontWeight: '600',
		color: '#14233A',
		textAlign: 'center',
	},
});

export default TopLocations;
