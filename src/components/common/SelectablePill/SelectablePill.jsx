import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const SelectablePill = ({
  label,
  selected = false,
  onPress,
  IconRight,
  style,
  contentStyle,
  textStyle,
  selectedStyle,
  selectedTextStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.wrapper, style]}
    >
      <View
        style={[
          styles.pill,
          selected && styles.pillSelected,
          selected && selectedStyle,
          contentStyle,
        ]}
      >
        <Text
          style={[
            styles.label,
            selected && styles.labelSelected,
            selected && selectedTextStyle,
            textStyle,
          ]}
        >
          {label}
        </Text>
        {IconRight && <IconRight />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 999,
  },
  pill: {
    minWidth: 96,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#EEF2F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillSelected: {
    backgroundColor: '#17455C',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14233A',
  },
  labelSelected: {
    color: '#FFFFFF',
  },
});

export default SelectablePill;

