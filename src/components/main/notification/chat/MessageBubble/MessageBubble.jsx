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
    paddingRight: -20,
  },
  otherContainer: {
    alignItems: 'flex-start',
    paddingLeft: -40,
  },
  ownBubble: {
    backgroundColor: '#FFFFFF',
    maxWidth: 280,
    minHeight: 72,
    opacity: 1,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 0,
    padding: 16,
  },
  otherBubble: {
    backgroundColor: '#1B516B',
    maxWidth: 274,
    minHeight: 92,
    opacity: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 0,
    padding: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  ownText: {
    maxWidth: 248,
    opacity: 1,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.36, // 3% of 12px = 0.36px
    textAlign: 'left',
    color: '#53587A',
  },
  otherText: {
    color: '#FFFFFF',
    maxWidth: 242,
    opacity: 1,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.36, // 3% of 12px = 0.36px
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


