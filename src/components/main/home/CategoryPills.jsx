import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from '../../../utils/layout';

const pillConfig = [
    { label: 'All', width: 62 },
    { label: 'Featured', width: 96 },
    { label: 'Sell', width: 67 },
    { label: 'Rent', width: 67 },
];

const CategoryPills = ({ navigation }) => {
    const [selectedPill, setSelectedPill] = useState('All');
    
    const handlePillPress = (label) => {
        setSelectedPill(label);
        if (label === 'Featured' && navigation) {
            navigation.navigate('FeaturedHomes');
        }
    };
    
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            {pillConfig.map((pill) => (
                <TouchableOpacity
                    key={pill.label}
                    onPress={() => handlePillPress(pill.label)}
                    activeOpacity={0.7}
                >
                    <View
                        style={[
                            styles.pill,
                            {
                                minWidth: moderateScale(pill.width),
                            },
                            selectedPill === pill.label && styles.activePill,
                        ]}
                    >
                        <Text style={[styles.pillText, selectedPill === pill.label && styles.activeText]}>
                            {pill.label}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
	scroll: { marginTop: verticalScale(16) },
	scrollContent: {
		columnGap: moderateScale(10),
		paddingHorizontal: moderateScale(4),
	},
	pill: {
		minHeight: verticalScale(47),
		borderRadius: moderateScale(20),
		backgroundColor: '#EEF2F6',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: moderateScale(24),
		paddingVertical: verticalScale(17.5),
	},
	activePill: { backgroundColor: '#1B516B' },
	pillText: { color: '#4B5563', fontWeight: '600', fontSize: moderateScale(14) },
	activeText: { color: '#FFFFFF' },
});

export default CategoryPills;


