import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';

const SearchBar = () => (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
            <Image 
                source={require('../../../assets/icons/search.png')}
                style={styles.searchIcon}
            />
            <TextInput
                placeholder="Search by city, address, ZIP"
                placeholderTextColor="#9AA4B2"
                style={styles.input}
            />
            <Image 
                source={require('../../../assets/icons/mic.png')}
                style={styles.micIcon}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: 327,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#F2F4F7',
        opacity: 1,
        paddingHorizontal: 14,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#14233A',
    },
    micIcon: {
        width: 20,
        height: 20,
        marginLeft: 8,
    },
});

export default SearchBar;


