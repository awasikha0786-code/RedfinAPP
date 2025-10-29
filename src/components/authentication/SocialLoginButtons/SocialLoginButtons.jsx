import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from '../../common/index.js';

const SocialLoginButtons = ({
  onGooglePress,
  onFacebookPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* OR Separator */}
      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Social Buttons */}
      <View style={styles.buttonsContainer}>
        {/* Google Button */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onGooglePress}
          activeOpacity={0.8}
        >
          <Icon name="google" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>

        {/* Facebook Button */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onFacebookPress}
          activeOpacity={0.8}
        >
          <Icon name="facebook" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
});

export default SocialLoginButtons;
