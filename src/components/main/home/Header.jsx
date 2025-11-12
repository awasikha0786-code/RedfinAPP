import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { moderateScale, responsiveWidth, scale, verticalScale } from '../../../utils/layout';

const Header = ({ onLocationPress, onNotificationPress, location = 'Chicago,IL' }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity
                    style={styles.locationButton}
                    activeOpacity={0.8}
                    onPress={onLocationPress}
                >
                    <Image 
                        source={require('../../../assets/icons/Location.png')} 
                        style={styles.locationIcon} 
                    />
                    <Text style={styles.locationText}>{location}</Text>
                    <Image 
                        source={require('../../../assets/icons/list.png')} 
                        style={styles.listIcon} 
                    />
                </TouchableOpacity>

                <View style={styles.avatarsContainer}>
                    <TouchableOpacity 
                        style={styles.notificationButton} 
                        onPress={onNotificationPress || (() => {})} 
                        activeOpacity={0.8}
                    >
                        <Image source={require('../../../assets/icons/notification.png')} style={styles.notificationImage} />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.avatarButton, styles.rightAvatar]} onPress={() => {}} activeOpacity={0.8}>
                        <Image source={require('../../../assets/images/Avator_img.png')} style={styles.avatarImage} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.texts}>
                <Text style={styles.title}>Welcome back, Ethan!</Text>
                <Text style={styles.subtitle}>Find your next home</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingVertical: verticalScale(12),
        paddingLeft: 0,
        paddingRight: moderateScale(16),
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationButton: {
        minWidth: responsiveWidth(34),
        height: verticalScale(50),
        borderRadius: moderateScale(25),
        borderWidth: 1,
        borderColor: '#21628A',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(12),
    },
    locationText: {
        color: '#21628A',
        fontWeight: '600',
        fontSize: moderateScale(14),
        marginHorizontal: moderateScale(6),
    },
    locationIcon: {
        width: scale(18),
        height: scale(18),
        resizeMode: 'contain',
    },
    listIcon: {
        width: scale(16),
        height: scale(16),
        resizeMode: 'contain',
    },
    texts: {
        marginTop: verticalScale(10),
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: '800',
        color: '#14233A',
    },
    subtitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#3A6A7E',
        marginTop: verticalScale(6),
    },
    avatarsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    notificationButton: {
        width: scale(50),
        height: scale(50),
        borderRadius: moderateScale(25),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E63946',
        position: 'relative',
    },
    notificationImage: {
        width: scale(24),
        height: scale(24),
        resizeMode: 'contain',
        tintColor: '#14233A',
    },
    notificationBadge: {
        position: 'absolute',
        top: scale(8),
        right: scale(8),
        width: scale(8),
        height: scale(8),
        borderRadius: scale(4),
        backgroundColor: '#E63946',
    },
    avatarButton: {
        width: scale(50),
        height: scale(50),
        borderRadius: moderateScale(25),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default Header;


