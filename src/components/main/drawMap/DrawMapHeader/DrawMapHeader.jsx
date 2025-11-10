import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DrawMapHeader = ({ mode, onModeChange, onBack }) => {
	return (
		<SafeAreaView style={styles.safeArea} edges={['top']}>
			<View style={styles.headerContainer}>
				{/* Back Button */}
				<TouchableOpacity
					style={styles.backButton}
					onPress={onBack}
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

				{/* Segment Control */}
				<View style={styles.segmentControl}>
					{/* Draw Button */}
					<TouchableOpacity
						style={[styles.segmentButton, mode === 'draw' && styles.segmentButtonActive]}
						onPress={() => onModeChange('draw')}
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
						onPress={() => onModeChange('edit')}
						activeOpacity={0.8}
					>
						<Text style={[styles.segmentText, mode === 'edit' && styles.segmentTextActive]}>
							Edit
						</Text>
					</TouchableOpacity>

					{/* Undo Button */}
					<TouchableOpacity
						style={[styles.segmentButton, mode === 'undo' && styles.segmentButtonActive]}
						onPress={() => onModeChange('undo')}
						activeOpacity={0.8}
					>
						{mode === 'undo' && (
							<Image
								source={require('../../../../assets/icons/backArro.png')}
								style={styles.segmentIcon}
								resizeMode="contain"
							/>
						)}
						<Text style={[styles.segmentText, mode === 'undo' && styles.segmentTextActive]}>
							Undo
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: '#FFFFFF',
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 16,
		backgroundColor: '#FFFFFF',
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	backButton: {
		marginRight: 16,
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
	segmentControl: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#F2F4F7',
		borderRadius: 12,
		padding: 4,
		height: 44,
	},
	segmentButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		paddingHorizontal: 12,
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
});

export default DrawMapHeader;

