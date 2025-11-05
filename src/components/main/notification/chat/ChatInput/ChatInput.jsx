import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const ChatInput = ({ value, onChangeText, onSendPress }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../../assets/icons/camera.png')} style={styles.leftIcon} />
      <TextInput
        style={styles.input}
        placeholder="Say something"
        placeholderTextColor="#9AA4B2"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="send"
        onSubmitEditing={onSendPress}
      />
    <TouchableOpacity style={styles.sendButton} onPress={onSendPress} activeOpacity={0.8}>
  <Image
    source={require('../../../../../assets/icons/send.png')}
    style={{ width: 24, height: 24 }}
  />
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  leftIcon: {
    width: 20,
    height: 20,
    tintColor: '#9AA4B2',
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#14233A',
  },
  sendButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 0,
    borderRightWidth: 12,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    transform: [{ rotate: '-90deg' }],
  },
});

export default ChatInput;


