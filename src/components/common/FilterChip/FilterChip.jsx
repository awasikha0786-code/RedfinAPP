import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const FilterChip = ({ label, onRemove, style }) => {
	return (
		<View style={[styles.chip, style]}>
			<Text style={styles.chipText}>{label}</Text>
			{onRemove && (
				<TouchableOpacity 
					onPress={onRemove}
					activeOpacity={0.7}
					style={styles.removeButton}
				>
					<View style={styles.removeIconContainer}>
						<Text style={styles.removeIconText}>×</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	chip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#E8F5E9',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
		marginRight: 8,
		marginBottom: 8,
	},
	chipText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#14233A',
		marginRight: 8,
	},
	removeButton: {
		marginLeft: 4,
	},
	removeIconContainer: {
		width: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: '#E63946',
		justifyContent: 'center',
		alignItems: 'center',
	},
	removeIconText: {
		color: '#ffffff',
		fontSize: 14,
		fontWeight: '700',
		lineHeight: 14,
	},
});

export default FilterChip;
