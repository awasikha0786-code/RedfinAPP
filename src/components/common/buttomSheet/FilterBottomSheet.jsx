import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FilterBottomSheet = ({ visible, onClose, onApplyFilter }) => {
	const navigation = useNavigation();
	const [selectedPropertyType, setSelectedPropertyType] = useState('House');
	const [location, setLocation] = useState('Semarang');

	const propertyTypes = ['All', 'House', 'Apartment', 'Villa'];

	const handleReset = () => {
		setSelectedPropertyType('All');
		setLocation('Semarang');
	};

	const handleApplyFilter = () => {
		// Navigate to LocationDetailScreen with full address
		const fullAddress = location === 'Semarang' 
			? 'Chicago, IL'
			: location;
		
		navigation.navigate('LocationDetail', {
			address: fullAddress,
			propertyType: selectedPropertyType,
		});
		
		// Call the original callback if provided
		if (onApplyFilter) {
			onApplyFilter({
				propertyType: selectedPropertyType,
				location: location,
			});
		}
		onClose();
	};

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={onClose}
		>
			<Pressable style={styles.overlay} onPress={onClose}>
				<View style={styles.container}>
					<Pressable onPress={(e) => e.stopPropagation()}>
						<View style={styles.sheet}>
							<View style={styles.handleIndicator} />

							{/* Header with Title and Reset Button */}
							<View style={styles.header}>
								<Text style={styles.title}>Filter</Text>
								<TouchableOpacity style={styles.resetButton} onPress={handleReset}>
									<Text style={styles.resetText}>Reset</Text>
								</TouchableOpacity>
							</View>

							{/* Property Type Section */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Property type</Text>
								<View style={styles.propertyTypeContainer}>
									{propertyTypes.map((type) => (
										<TouchableOpacity
											key={type}
											style={[
												styles.propertyTypeButton,
												type === 'House' && styles.propertyTypeButtonHouse,
												type === 'Apartment' && styles.propertyTypeButtonApartment,
												selectedPropertyType === type && styles.propertyTypeButtonActive,
											]}
											onPress={() => setSelectedPropertyType(type)}
											activeOpacity={0.7}
										>
											<Text
												style={[
													styles.propertyTypeText,
													selectedPropertyType === type && styles.propertyTypeTextActive,
												]}
											>
												{type}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

							{/* Location Section */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Location</Text>
								<View style={styles.locationInputContainer}>
									<Image
										source={require('../../../assets/icons/Location.png')}
										style={styles.locationIcon}
										resizeMode="contain"
									/>
									<TextInput
										style={styles.locationInput}
										value={location}
										onChangeText={setLocation}
										placeholder="Enter location"
										placeholderTextColor="#9AA4B2"
									/>
									<TouchableOpacity activeOpacity={0.7}>
										<Image
											source={require('../../../assets/icons/search.png')}
											style={styles.searchIcon}
											resizeMode="contain"
										/>
									</TouchableOpacity>
								</View>
							</View>

							{/* Map Display */}
							<View style={styles.mapContainer}>
								<View style={styles.mapPlaceholder}>
									<Text style={styles.mapPlaceholderText}>Map View</Text>
									{/* Map pin with user profile */}
									<View style={styles.mapPinContainer}>
										<View style={styles.mapPinCircle}>
											<View style={styles.mapPinProfile}>
												<Text style={styles.mapPinProfileText}>👤</Text>
											</View>
										</View>
										<View style={styles.mapPinBase} />
									</View>
								</View>
							</View>

							{/* Apply Filter Button */}
							<TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter} activeOpacity={0.8}>
								<Text style={styles.applyButtonText}>Apply Filter</Text>
							</TouchableOpacity>
						</View>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
	container: {
		maxHeight: '90%',
	},
	sheet: {
		backgroundColor: '#ffffff',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		padding: 20,
		paddingTop: 12,
	},
	handleIndicator: {
		width: 40,
		height: 4,
		backgroundColor: '#9AA4B2',
		borderRadius: 2,
		alignSelf: 'center',
		marginBottom: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 24,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: '#14233A',
	},
	resetButton: {
		backgroundColor: '#21628A',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
	},
	resetText: {
		color: '#ffffff',
		fontSize: 14,
		fontWeight: '600',
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#14233A',
		marginBottom: 12,
	},
	propertyTypeContainer: {
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'flex-start',
	},
	propertyTypeButton: {
		width: 62,
		height: 47,
		borderRadius: 20,
		backgroundColor: '#F5F4F8',
		borderWidth: 1,
		borderColor: '#E0E0E0',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 1,
	},
	propertyTypeButtonHouse: {
		width: 80,
	},
	propertyTypeButtonApartment: {
		width: 101,
	},
	propertyTypeButtonActive: {
		backgroundColor: '#21628A',
		borderColor: '#21628A',
	},
	propertyTypeText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#14233A',
	},
	propertyTypeTextActive: {
		color: '#ffffff',
	},
	locationInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F5F4F8',
		borderRadius: 15,
		paddingHorizontal: 16,
		paddingVertical: 14,
		gap: 12,
	},
	locationIcon: {
		width: 20,
		height: 20,
		tintColor: '#21628A',
	},
	locationInput: {
		flex: 1,
		fontSize: 14,
		fontWeight: '400',
		color: '#14233A',
		paddingVertical: 0,
	},
	searchIcon: {
		width: 20,
		height: 20,
		tintColor: '#21628A',
	},
	mapContainer: {
		height: 200,
		borderRadius: 15,
		overflow: 'hidden',
		marginBottom: 24,
		backgroundColor: '#E8E8E8',
	},
	mapPlaceholder: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: '#E8E8E8',
	},
	mapPlaceholderText: {
		fontSize: 14,
		color: '#9AA4B2',
	},
	mapPinContainer: {
		position: 'absolute',
		top: '40%',
		left: '50%',
		marginLeft: -15,
		alignItems: 'center',
	},
	mapPinCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#ffffff',
		borderWidth: 3,
		borderColor: '#21628A',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	mapPinProfile: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E3F2FD',
	},
	mapPinProfileText: {
		fontSize: 24,
	},
	mapPinBase: {
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
	applyButton: {
		backgroundColor: '#E63946',
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	applyButtonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '700',
	},
});

export default FilterBottomSheet;

