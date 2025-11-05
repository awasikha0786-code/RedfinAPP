import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenHeader = ({ onBackPress, onSharePress, onFilterPress, filterIcon, title }) => {
  const defaultFilterIcon = require('../../../assets/icons/list.png');
  const filterIconSource = filterIcon || defaultFilterIcon;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        {onBackPress ? (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onBackPress}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('../../../assets/icons/backArro.png')} 
                style={styles.icon} 
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyBackSpace} />
        )}

        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        <View style={styles.rightButtons}>
          {onSharePress && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onSharePress}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Image 
                  source={require('../../../assets/icons/Share.png')} 
                  style={styles.shareIcon} 
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
          {onFilterPress && (
            <TouchableOpacity 
              style={[styles.iconButton, { marginLeft: 8 }]} 
              onPress={onFilterPress}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Image 
                  source={filterIconSource} 
                  style={styles.filterIcon} 
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    position: 'relative',
  },
  emptyBackSpace: {
    width: 50,
    height: 50,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14233A',
  },
  iconButton: {
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
  icon: {
    width: 20,
    height: 20,
    tintColor: '#14233A',
  },
  shareIcon: {
    width: 18,
    height: 18,
    tintColor: '#14233A',
  },
  filterIcon: {
    width: 18,
    height: 18,
    tintColor: '#14233A',
  },
  rightButtons: {
    flexDirection: 'row',
  },
});

export default ScreenHeader;

