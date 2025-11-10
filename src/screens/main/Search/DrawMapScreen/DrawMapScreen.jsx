import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawMapView from '../../../../components/main/drawMap/DrawMapView';

const DrawMapScreen = ({ navigation, route }) => {
	const [mode, setMode] = useState('draw'); // 'draw', 'edit', 'undo'
	const [polygonCoordinates, setPolygonCoordinates] = useState([]);
	const [isShapeClosed, setIsShapeClosed] = useState(false);
	const mapRef = useRef(null);

	// Handle Android back button
	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			handleBack();
			return true;
		});

		return () => backHandler.remove();
	}, [polygonCoordinates, isShapeClosed]);

	const handleBack = () => {
		// If there are unsaved changes (polygon coordinates)
		if (polygonCoordinates.length > 0 && !isShapeClosed) {
			Alert.alert(
				'Unsaved Changes',
				'You have unsaved changes. Going back will discard them. Continue?',
				[
					{
						text: 'Cancel',
						style: 'cancel',
					},
					{
						text: 'Continue',
						style: 'destructive',
						onPress: () => {
							if (navigation.canGoBack()) {
								navigation.goBack();
							}
						},
					},
				]
			);
		} else {
			if (navigation.canGoBack()) {
				navigation.goBack();
			}
		}
	};

	const handleModeChange = (newMode) => {
		// If clicking on the same mode, do nothing (except for undo)
		if (newMode === mode && newMode !== 'undo') {
			return;
		}

		// Handle undo separately - it's a one-time action
		if (newMode === 'undo') {
			handleUndo();
			// After undo, switch back to draw mode if there are still points, otherwise stay in draw
			if (polygonCoordinates.length > 1) {
				setMode('draw');
			} else {
				setMode('draw');
			}
		} else {
			setMode(newMode);
		}
	};

	const handleUndo = () => {
		if (polygonCoordinates.length > 0 && !isShapeClosed) {
			const newCoordinates = [...polygonCoordinates];
			newCoordinates.pop();
			setPolygonCoordinates(newCoordinates);
			setIsShapeClosed(false);
		}
	};

	const handleMapPress = (coordinate) => {
		// Only allow drawing in draw mode and when shape is not closed
		if (mode === 'draw' && !isShapeClosed) {
			setPolygonCoordinates([...polygonCoordinates, coordinate]);
		}
		// In edit mode, clicking on map doesn't add points
		// In undo mode, clicking does nothing (undo is handled by button press)
	};

	const handleCloseShape = () => {
		if (polygonCoordinates.length >= 3) {
			setIsShapeClosed(true);
			// Navigate back with the polygon coordinates
			if (route?.params?.onShapeComplete) {
				route.params.onShapeComplete(polygonCoordinates);
			}
			navigation.goBack();
		}
	};

	const handleEditPoint = (index, newCoordinate) => {
		// Only allow editing in edit mode
		if (mode === 'edit' && !isShapeClosed) {
			const newCoordinates = [...polygonCoordinates];
			newCoordinates[index] = newCoordinate;
			setPolygonCoordinates(newCoordinates);
		}
	};

	return (
		<View style={styles.container}>
			{/* Map View with Polygon Drawing */}
			<View style={styles.mapContainer}>
				<DrawMapView
					ref={mapRef}
					polygonCoordinates={polygonCoordinates}
					isShapeClosed={isShapeClosed}
					mode={mode}
					onMapPress={handleMapPress}
					onEditPoint={handleEditPoint}
				/>

				{/* Back Button - Top Left */}
				<SafeAreaView style={styles.backButtonContainer} edges={['top']}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={handleBack}
						activeOpacity={0.8}
					>
						<View style={styles.backButtonCircle}>
							<Image
								source={require('../../../../assets/icons/backArro.png')}
								style={styles.backIcon}
								resizeMode="contain"
							/>
						</View>
					</TouchableOpacity>
				</SafeAreaView>

				{/* Segment Control - Top Center */}
				<SafeAreaView style={styles.segmentControlContainer} edges={['top']}>
					<View style={styles.segmentControl}>
						{/* Draw Button */}
						<TouchableOpacity
							style={[styles.segmentButton, mode === 'draw' && styles.segmentButtonActive]}
							onPress={() => handleModeChange('draw')}
							activeOpacity={0.8}
						>
							{mode === 'draw' && (
								<Image
									source={require('../../../../assets/icons/Pencil.png')}
									style={styles.segmentIcon}
									resizeMode="contain"
								/>
							)}
							<Text style={[styles.segmentText, mode === 'draw' && styles.segmentTextActive]}>
								Draw
							</Text>
						</TouchableOpacity>

						{/* Edit Button */}
						<TouchableOpacity
							style={[styles.segmentButton, mode === 'edit' && styles.segmentButtonActive]}
							onPress={() => handleModeChange('edit')}
							activeOpacity={0.8}
						>
							<Text style={[styles.segmentText, mode === 'edit' && styles.segmentTextActive]}>
								Edit
							</Text>
						</TouchableOpacity>

						{/* Undo Button */}
						<TouchableOpacity
							style={[
								styles.segmentButton,
								(polygonCoordinates.length === 0 || isShapeClosed) && styles.segmentButtonDisabled
							]}
							onPress={() => handleModeChange('undo')}
							activeOpacity={0.8}
							disabled={polygonCoordinates.length === 0 || isShapeClosed}
						>
							<Image
								source={require('../../../../assets/icons/backArro.png')}
								style={[
									styles.segmentIcon,
									(polygonCoordinates.length === 0 || isShapeClosed) && styles.segmentIconDisabled
								]}
								resizeMode="contain"
							/>
							<Text style={[
								styles.segmentText,
								(polygonCoordinates.length === 0 || isShapeClosed) && styles.segmentTextDisabled
							]}>
								Undo
							</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>

				{/* Choose Map Button - Bottom */}
				{polygonCoordinates.length >= 3 && !isShapeClosed && (
					<SafeAreaView style={styles.buttonContainer} edges={['bottom']}>
						<TouchableOpacity
							style={styles.chooseMapButton}
							onPress={handleCloseShape}
							activeOpacity={0.8}
						>
							<Text style={styles.chooseMapButtonText}>Choose map</Text>
						</TouchableOpacity>
					</SafeAreaView>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	mapContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		position: 'relative',
	},
	backButtonContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 1000,
		paddingTop: 8,
		paddingLeft: 16,
	},
	backButton: {
		width: 40,
		height: 40,
	},
	backButtonCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 4,
	},
	backIcon: {
		width: 20,
		height: 20,
		tintColor: '#1E1E1E',
	},
	segmentControlContainer: {
		position: 'absolute',
		top: 80,
		left: 0,
		right: 0,
		zIndex: 1000,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	segmentControl: {
		flexDirection: 'row',
		backgroundColor: '#F2F4F7',
		borderRadius: 20,
		padding: 4,
		width: 246,
		height: 50,
		alignSelf: 'center',
		opacity: 1,
	},
	segmentButton: {
		width: 79,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 33,
		opacity: 1,
	},
	segmentButtonActive: {
		backgroundColor: '#E63946',
	},
	segmentText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#1E1E1E',
	},
	segmentTextActive: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
	segmentIcon: {
		width: 16,
		height: 16,
		tintColor: '#FFFFFF',
		marginRight: 6,
	},
	segmentButtonDisabled: {
		opacity: 0.5,
	},
	segmentIconDisabled: {
		tintColor: '#9AA4B2',
	},
	segmentTextDisabled: {
		color: '#9AA4B2',
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		paddingHorizontal: 20,
		paddingBottom: 20,
		paddingTop: 10,
		backgroundColor: 'transparent',
	},
	chooseMapButton: {
		width: '100%',
		height: 56,
		backgroundColor: '#E63946',
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#E63946',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	chooseMapButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FFFFFF',
	},
});

export default DrawMapScreen;

