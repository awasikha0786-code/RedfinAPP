import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from '../../../utils/layout';

const pills = ['All', 'Mortgage', 'Sell', 'Rent'];

const CategoryPills = () => {
    const [selectedPill, setSelectedPill] = useState('All');
    
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
            {pills.map((pill) => (
                <TouchableOpacity
                    key={pill}
                    onPress={() => setSelectedPill(pill)}
                    activeOpacity={0.7}
                >
                    <View style={[styles.pill, selectedPill === pill && styles.activePill]}>
                        <Text style={[styles.pillText, selectedPill === pill && styles.activeText]}>
                            {pill}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
	scroll: { marginTop: verticalScale(16) },
	pill: {
		paddingHorizontal: moderateScale(16),
		paddingVertical: verticalScale(10),
		borderRadius: moderateScale(24),
		backgroundColor: '#EEF2F6',
		marginRight: moderateScale(10),
	},
	activePill: { backgroundColor: '#1B516B' },
	pillText: { color: '#4B5563', fontWeight: '600', fontSize: moderateScale(14) },
	activeText: { color: '#FFFFFF' },
});

export default CategoryPills;


