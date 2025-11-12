import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { moderateScale, responsiveWidth, scale, verticalScale } from '../../../utils/layout';

const SearchBar = () => (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
            <Image 
                source={require('../../../assets/icons/search.png')}
                style={styles.searchIcon}
            />
            <TextInput
                placeholder="Search by city, address, ZIP"
                placeholderTextColor="#9299AA"
                style={styles.input}
            />
            <View style={styles.divider} />
            <Image 
                source={require('../../../assets/icons/mic.png')}
                style={styles.micIcon}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(85),
        maxWidth: 327,
        height: verticalScale(70),
        borderRadius: moderateScale(10),
        backgroundColor: '#F5F4F8',
        paddingHorizontal: moderateScale(18),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: verticalScale(16),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        width: scale(20),
        height: scale(20),
        marginRight: moderateScale(10),
        tintColor: '#1B2A3C',
    },
    input: {
        flex: 1,
        fontSize: moderateScale(15),
        color: '#1B2A3C',
    },
    divider: {
        width: 1,
        height: verticalScale(28),
        backgroundColor: '#D9DEE6',
        marginHorizontal: moderateScale(12),
    },
    micIcon: {
        width: scale(20),
        height: scale(20),
        tintColor: '#BCC3D4',
    },
});

export default SearchBar;


