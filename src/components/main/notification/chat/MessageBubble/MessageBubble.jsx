import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ text, time, isOwn = false, status }) => {
  return (
    <View style={[styles.container, isOwn ? styles.ownContainer : styles.otherContainer]}>
      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.text, isOwn ? styles.ownText : styles.otherText]}>{text}</Text>
        {isOwn && (
          <View style={styles.tickContainer}>
            <Text style={styles.tick}>✓</Text>
          </View>
        )}
      </View>
      {!!time && (
        <View style={styles.metaRow}>
          <Text style={styles.time}>{time}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  ownContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  otherContainer: {
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  ownBubble: {
    backgroundColor: '#FFFFFF',
  },
  otherBubble: {
    backgroundColor: '#1B516B',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  ownText: {
    color: '#14233A',
  },
  otherText: {
    color: '#FFFFFF',
  },
  time: {
    fontSize: 12,
    color: '#9AA4B2',
    marginTop: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tickContainer: {
    position: 'absolute',
    left: 8,
    bottom: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 0,
  },
  tick: {
    fontSize: 12,
    color: '#DE3341',
    lineHeight: 12,
  },
});

export default MessageBubble;


