import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const NotificationCard = ({ 
  profileImage, 
  name, 
  message, 
  boldParts = [], 
  timestamp, 
  propertyImage 
}) => {
  // Helper function to render message with bold parts
  const renderMessage = () => {
    if (boldParts.length === 0) {
      return <Text style={styles.messageText}>{message}</Text>;
    }

    const parts = [];
    let remainingText = message;
    let keyIndex = 0;

    // Process each bold part
    boldParts.forEach((boldPart) => {
      const index = remainingText.indexOf(boldPart);
      if (index !== -1) {
        // Add text before bold part
        if (index > 0) {
          parts.push(remainingText.substring(0, index));
        }
        // Add bold part as a nested Text component
        parts.push(
          <Text key={`bold-${keyIndex++}`} style={styles.boldText}>
            {boldPart}
          </Text>
        );
        // Update remaining text
        remainingText = remainingText.substring(index + boldPart.length);
      }
    });

    // Add remaining text
    if (remainingText.length > 0) {
      parts.push(remainingText);
    }

    return <Text style={styles.messageText}>{parts}</Text>;
  };

  return (
    <View style={styles.container}>
      <Image 
        source={profileImage} 
        style={styles.profileImage} 
      />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {renderMessage()}
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
      {propertyImage && (
        <Image 
          source={propertyImage} 
          style={styles.propertyImage} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5F4F8',
    width: 327,
    height: 108,
    borderRadius: 25,
    opacity: 1,
    padding: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#14233A',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#6C7380',
    lineHeight: 20,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: '700',
    color: '#14233A',
  },
  timestamp: {
    fontSize: 12,
    color: '#9AA4B2',
    marginTop: 4,
  },
  propertyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginLeft: 12,
  },
});

export default NotificationCard;

