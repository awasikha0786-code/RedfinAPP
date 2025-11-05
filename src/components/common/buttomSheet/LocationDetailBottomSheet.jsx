import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LocationDetailBottomSheet = ({ visible, onClose, onChooseLine, address }) => {
	if (!visible) return null;

	return (
		<View style={styles.container}>
			<View style={styles.sheet}>
				{/* Title */}
				<Text style={styles.title}>Location detail</Text>

				{/* Location Icon and Address */}
				<View style={styles.addressContainer}>
					<View style={styles.locationIconContainer}>
						<Image
							source={require('../../../assets/icons/Location.png')}
							style={styles.locationIcon}
							resizeMode="contain"
						/>
					</View>
					<View style={styles.addressTextContainer}>
						<Text style={styles.addressText} numberOfLines={2}>
							{address || 'Chicago, IL'}
						</Text>
					</View>
				</View>

				{/* Choose Line Button */}
				<TouchableOpacity style={styles.chooseLineButton} onPress={onChooseLine} activeOpacity={0.8}>
					<Text style={styles.chooseLineText}>CHOOSE LINE</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
	},
	sheet: {
		backgroundColor: '#ffffff',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		padding: 20,
		paddingTop: 16,
		paddingBottom: 24,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 10,
		minHeight: 180,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 20,
	},
	addressContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 24,
	},
	locationIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#F5F4F8',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	locationIcon: {
		width: 20,
		height: 20,
		tintColor: '#14233A',
	},
	addressTextContainer: {
		flex: 1,
	},
	addressText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#14233A',
		lineHeight: 20,
	},
	chooseLineButton: {
		backgroundColor: '#E63946',
		paddingVertical: 16,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	chooseLineText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: 0.5,
	},
});

export default LocationDetailBottomSheet;

