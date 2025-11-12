import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Avatar from '../../common/Avatar/Avatar';
import { moderateScale, verticalScale } from '../../../utils/layout';

const Item = ({ label, source, onPress }) => (
	<TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.8}>
		{/* Reusable Avatar component: shows image if provided, otherwise first letter fallback */}
		<Avatar label={label} source={source} />
		<Text style={styles.itemText}>{label}</Text>
	</TouchableOpacity>
);

const ServicesGrid = () => (
	<View style={styles.container}>
		<Text style={styles.title}>Redfin Services</Text>
		<View style={styles.row}>
			<Item label="Buy" source={require('../../../assets/images/Buy.png')} onPress={() => {}} />
			<Item label="Sell" source={require('../../../assets/images/sale.png')} onPress={() => {}} />
			<Item label="Mortgage" source={require('../../../assets/images/Mortgage.png')} onPress={() => {}} />
			<Item label="Rent" source={require('../../../assets/images/Rent.png')} onPress={() => {}} />
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		marginTop: verticalScale(40),
		marginBottom: verticalScale(24),
		paddingHorizontal: 0,
	},
	title: {
		fontSize: moderateScale(18),
		fontWeight: '800',
		color: '#14233A',
		marginBottom: verticalScale(12),
		paddingHorizontal: 0,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 0,
	},
	item: {
		width: '23%',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	itemText: {
		fontWeight: '700',
		color: '#1F2A37',
		marginTop: verticalScale(8),
		textAlign: 'center',
	},
});

export default ServicesGrid;


