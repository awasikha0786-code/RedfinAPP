import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

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
        paddingVertical: 12,
        paddingLeft: 0,
        paddingRight: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationButton: {
        width: 131,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#21628A',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    locationText: {
        color: '#21628A',
        fontWeight: '600',
        fontSize: 14,
        marginHorizontal: 6,
    },
    locationIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    listIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    texts: {
        marginTop: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#14233A',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3A6A7E',
        marginTop: 6,
    },
    avatarsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    notificationButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E63946',
        position: 'relative',
    },
    notificationImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: '#14233A',
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E63946',
    },
    avatarButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
});

export default Header;


