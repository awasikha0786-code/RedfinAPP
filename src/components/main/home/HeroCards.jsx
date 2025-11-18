import React from 'react';
import { ScrollView, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, responsiveWidth, scale, verticalScale } from '../../../utils/layout';

const HeroCards = ({ navigation }) => {
  const handleCardPress = (imageSource) => {
    navigation?.navigate('NewListingsAlert', { imageSource });
  };

  return (
    <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.row}
    >
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleCardPress(require('../../../assets/images/login_image.png'))}
          activeOpacity={0.9}
        >
            <Image 
                source={require('../../../assets/images/login_image.png')} 
                style={styles.image} 
                resizeMode="cover" 
            />
            {/* Text Overlay - Left Side */}
            <View style={styles.textContainer}>
              <Text style={styles.mainText}>New Listings</Text>
              <Text style={styles.mainText}>Near You</Text>
              <Text style={styles.subText}>New in Town</Text>
            </View>
            {/* Button - Bottom Left */}
            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.8}
              onPress={() => handleCardPress(require('../../../assets/images/login_image.png'))}
            >
              <Image 
                source={require('../../../assets/icons/long aero.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleCardPress(require('../../../assets/images/login_image1.png'))}
          activeOpacity={0.9}
        >
            <Image 
                source={require('../../../assets/images/login_image1.png')} 
                style={styles.image} 
                resizeMode="cover" 
            />
            {/* Text Overlay - Left Side */}
            <View style={styles.textContainer}>
              <Text style={styles.mainText}>Homes Just</Text>
              <Text style={styles.mainText}>Listed</Text>
              <Text style={styles.subText}>New in Town</Text>
            </View>
            {/* Button - Bottom Left */}
            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.8}
              onPress={() => handleCardPress(require('../../../assets/images/login_image1.png'))}
            >
              <Image 
                source={require('../../../assets/icons/long aero.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    row: { 
        marginTop: verticalScale(16),
    },
    card: { 
        width: responsiveWidth(72),
        maxWidth: 320,
        height: verticalScale(180),
        borderTopLeftRadius: moderateScale(25),
        borderTopRightRadius: moderateScale(25),
        borderBottomRightRadius: moderateScale(25),
        borderBottomLeftRadius: 0,
        overflow: 'hidden',
        marginRight: moderateScale(12),
        position: 'relative',
    },
    image: { 
        width: '100%',
        height: '100%',
        borderTopLeftRadius: moderateScale(25),
        borderTopRightRadius: moderateScale(25),
        borderBottomRightRadius: moderateScale(25),
        borderBottomLeftRadius: 0,
        opacity: 1,
        transform: [{ rotate: '0deg' }],
    },
    textContainer: {
        position: 'absolute',
        left: moderateScale(20),
        top: moderateScale(20),
        zIndex: 10,
    },
    mainText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: moderateScale(24),
        lineHeight: moderateScale(28),
        fontFamily: 'Lato',
    },
    subText: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: moderateScale(14),
        marginTop: verticalScale(8),
        opacity: 0.9,
        fontFamily: 'Lato',
    },
    actionButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: scale(93),
        height: scale(56),
        backgroundColor: '#234F68',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: moderateScale(25),
        borderBottomRightRadius: 0,
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    arrowIcon: {
        width: scale(20),
        height: scale(20),
        tintColor: '#FFFFFF',
    },
});

export default HeroCards;


