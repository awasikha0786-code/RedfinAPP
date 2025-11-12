import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const EMAIL_ICON = require('../../../assets/icons/message.png');

const PropertyAgentCard = ({ agent }) => {
  if (!agent) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={agent.avatar} style={styles.avatar} resizeMode="cover" />
        <View>
          <Text style={styles.name}>{agent.name}</Text>
          <Text style={styles.role}>{agent.role}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.emailButton]} activeOpacity={0.85}>
          <Image source={EMAIL_ICON} style={[styles.actionIcon, styles.emailIcon]} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 327,
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F4F8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
    alignSelf: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#14233A',
  },
  role: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6C7380',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  emailButton: {
    backgroundColor: '#F4F6FB',
  },
  emailIcon: {
    tintColor: '#21628A',
  },
});

export default PropertyAgentCard;


