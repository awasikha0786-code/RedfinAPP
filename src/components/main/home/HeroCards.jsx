import React from 'react';
import { ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
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
            <Text style={styles.cardText}>New Listings Near You</Text>
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
            <Text style={styles.cardText}>Homes Just Listed</Text>
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
        borderRadius: moderateScale(25),
        overflow: 'hidden',
        marginRight: moderateScale(12),
    },
    image: { 
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(25),
        opacity: 1,
        transform: [{ rotate: '0deg' }],
    },
    cardText: { 
        position: 'absolute',
        left: moderateScale(12),
        bottom: moderateScale(12),
        color: '#fff',
        fontWeight: '800',
        fontSize: moderateScale(16),
    },
});

export default HeroCards;


