import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  style,
  inputStyle,
  showPasswordToggle = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, style, isFocused && styles.containerFocused]}>
      {icon && !isFocused && (
        <View style={styles.iconContainer}>
          <Icon name={icon} style={styles.icon} />
        </View>
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        placeholderTextColor="#999999"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {icon && isFocused && (
        <View style={styles.rightIconContainer}>
          <Icon name={icon} style={styles.rightIcon} />
        </View>
      )}
      {showPasswordToggle && secureTextEntry && (
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={togglePasswordVisibility}
        >
          <Icon 
            name={isPasswordVisible ? "eye-off" : "eye"} 
            style={styles.passwordIcon} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  containerFocused: {
    borderColor: '#21628A',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#21628A',
  },
  rightIconContainer: {
    marginLeft: 12,
  },
  rightIcon: {
    width: 20,
    height: 20,
    tintColor: '#21628A',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingVertical: 0,
  },
  passwordToggle: {
    padding: 4,
  },
  passwordIcon: {
    width: 20,
    height: 20,
    tintColor: '#666666',
  },
});

export default Input;
