import React from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

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
        marginTop: 16,
    },
    card: { 
        width: 270,
        height: 180,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 12,
    },
    image: { 
        width: 270,
        height: 180,
        borderRadius: 25,
        opacity: 1,
        transform: [{ rotate: '0deg' }],
    },
    cardText: { 
        position: 'absolute',
        left: 12,
        bottom: 12,
        color: '#fff',
        fontWeight: '800',
        fontSize: 16,
    },
});

export default HeroCards;


