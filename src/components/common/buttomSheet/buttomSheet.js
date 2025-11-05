// src/components/common/buttomSheet/buttomSheet.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Image } from 'react-native';

const BottomSheetLocation = ({ visible, onClose, onLocationSelect }) => {
  const locations = [
    { 
      id: 1, 
      name: 'Chicago, IL', 
      line1: 'Lincoln Park, Near North Side, Chicago.',
      line2: 'IL 60614'
    },
    { 
      id: 2, 
      name: 'Chicago, IL', 
      line1: 'Logan Square, Northwest Side,',
      line2: 'Chicago, IL 60647'
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleChooseLocation = () => {
    if (selectedLocation && onLocationSelect) {
      onLocationSelect(selectedLocation);
    }
    onClose();
  };

  const handleEdit = () => {
    // Handle edit action - can navigate to edit location screen
    console.log('Edit locations');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheet}>
              <View style={styles.handleIndicator} />
              
              {/* Header with Title and Edit Button */}
              <View style={styles.header}>
                <Text style={styles.title}>Select Location</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>

              {/* Location Cards */}
              {locations.map((location) => {
                const isActive = selectedLocation.id === location.id;
                return (
                  <TouchableOpacity
                    key={location.id}
                    style={[
                      styles.card,
                      isActive ? styles.cardActive : styles.cardInactive,
                    ]}
                    onPress={() => handleSelectLocation(location)}
                  >
                    {/* Map Pin Icon */}
                    <View style={[
                      styles.iconContainer,
                      isActive ? styles.iconContainerActive : styles.iconContainerInactive
                    ]}>
                      <Image 
                        source={require('../../../assets/icons/Location.png')} 
                        style={[
                          styles.icon,
                          { tintColor: isActive ? '#ffffff' : '#14233A' }
                        ]} 
                      />
                    </View>
                    
                    {/* Location Text */}
                    <View style={styles.textContainer}>
                      <Text
                        style={[
                          styles.locationText,
                          isActive ? styles.locationTextActive : styles.locationTextInactive,
                        ]}
                      >
                        {location.line1}
                      </Text>
                      <Text
                        style={[
                          styles.locationText,
                          isActive ? styles.locationTextActive : styles.locationTextInactive,
                        ]}
                      >
                        {location.line2}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Choose Location Button */}
              <TouchableOpacity style={styles.chooseBtn} onPress={handleChooseLocation}>
                <Text style={styles.chooseText}>Choose Location</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '75%',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 12,
    maxHeight: '75%',
  },
  handleIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#9AA4B2',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14233A',
  },
  editButton: {
    backgroundColor: '#21628A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardActive: {
    backgroundColor: '#21628A',
  },
  cardInactive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainerInactive: {
    backgroundColor: '#F4F4F4',
  },
  icon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    flex: 1,
  },
  locationText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },
  locationTextActive: {
    color: '#ffffff',
  },
  locationTextInactive: {
    color: '#14233A',
  },
  chooseBtn: {
    backgroundColor: '#E63946',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  chooseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default BottomSheetLocation;
