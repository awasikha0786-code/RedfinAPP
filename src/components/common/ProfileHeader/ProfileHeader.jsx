import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileHeader = ({ onSettingsPress }) => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.emptySpace} />
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={onSettingsPress}
          activeOpacity={0.8}
        >
          <View style={styles.iconCircle}>
            <Image 
              source={require('../../../assets/icons/Setting1.png')} 
              style={styles.settingsIcon} 
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  emptySpace: {
    width: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14233A',
  },
  settingsButton: {
    zIndex: 1,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 20,
    height: 20,
    tintColor: '#14233A',
  },
});

export default ProfileHeader;

