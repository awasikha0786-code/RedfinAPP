import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TabSelector = ({ tabs = [], activeTab, onTabChange }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5F4F8',
    borderRadius: 100,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    width: Math.min(327, SCREEN_WIDTH - 32),
    height: 50,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6C7380',
  },
  activeTabText: {
    color: '#14233A',
    fontWeight: '600',
  },
});

export default TabSelector;

