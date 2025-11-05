import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const TransactionPropertyCard = ({ property, onPress, onFavoritePress, isFavorite = false }) => {
  const handleHeartPress = (e) => {
    e.stopPropagation();
    if (onFavoritePress) {
      onFavoritePress(property);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image 
          source={property.image} 
          style={styles.image}
          resizeMode="cover"
        />
        {/* Heart Icon - Top Right */}
        <TouchableOpacity 
          style={styles.heartButton}
          activeOpacity={0.8}
          onPress={handleHeartPress}
        >
          <View style={[styles.heartIconContainer, isFavorite && styles.heartIconContainerActive]}>
            <Image
              source={require('../../../assets/icons/Heart.png')}
              style={styles.heartIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        {/* Property Type Tag - Bottom Right */}
        <View style={styles.propertyTag}>
          <Text style={styles.propertyTagText}>{property.type || 'Rent'}</Text>
        </View>
      </View>
      
      {/* Content Below Image */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <View style={styles.dateRow}>
          <Text style={styles.dateIcon}>🕒</Text>
          <Text style={styles.dateText}>{property.date || 'November 21, 2021'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
  },
  heartIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E63946',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconContainerActive: {
    backgroundColor: '#E63946',
    opacity: 1,
  },
  heartIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  propertyTag: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#1B516B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  propertyTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#14233A',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#9AA4B2',
  },
});

export default TransactionPropertyCard;

