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
        style={styles.sendIcon}
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
    width: 327,
    height: 70,
    borderRadius: 100,
    opacity: 1,
    margin: 16,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  sendIcon: {
    width: 20,
    height: 20,
    opacity: 1,
  },
});

export default ChatInput;


