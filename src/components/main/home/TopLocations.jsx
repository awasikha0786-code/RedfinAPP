import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

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
						<View style={styles.avatarContainer}>
							<Image 
								source={location.image} 
								style={styles.avatarImage}
								resizeMode="cover"
							/>
						</View>
						<Text style={styles.locationText}>{location.name}</Text>
					</TouchableOpacity>
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
	locationItem: {
		alignItems: 'center',
		marginRight: 16,
	},
	avatarContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		overflow: 'hidden',
		backgroundColor: '#F3F4F6',
		marginBottom: 8,
		borderWidth: 2,
		borderColor: '#E0E0E0',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
	},
	avatarImage: {
		width: '100%',
		height: '100%',
	},
	locationText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#14233A',
		textAlign: 'center',
	},
});

export default TopLocations;
