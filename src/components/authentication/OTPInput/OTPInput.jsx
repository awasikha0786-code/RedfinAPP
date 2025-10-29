import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text } from '../../common';

const BOX_SIZE = 60;

const OTPInput = ({
  value = ['', '', '', ''],
  onChange,
  boxes = 4,
  autoFocus = true,
  style,
  boxStyle,
  inputStyle,
  activeColor = '#1B516B',
  inactiveBg = '#F5F4F8',
}) => {
  const refs = useRef([]);

  useEffect(() => {
    if (autoFocus && refs.current[0]) {
      refs.current[0].focus();
    }
  }, [autoFocus]);

  const isFilled = useMemo(() => value.every(v => v !== ''), [value]);

  const handleChange = (val, idx) => {
    const onlyDigit = val.replace(/\D/g, '').slice(0, 1);
    const next = [...value];
    next[idx] = onlyDigit;
    onChange?.(next);
    if (onlyDigit && idx < boxes - 1) refs.current[idx + 1]?.focus();
  };

  const handleKeyPress = (e, idx) => {
    if (e.nativeEvent.key === 'Backspace' && value[idx] === '' && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: boxes }).map((_, idx) => {
        const filled = value[idx] !== '';
        return (
          <View
            key={idx}
            style={[
              styles.box,
              { backgroundColor: inactiveBg, borderColor: filled ? activeColor : 'transparent' },
              boxStyle,
            ]}
          >
            <TextInput
              ref={(r) => (refs.current[idx] = r)}
              value={value[idx]}
              onChangeText={(t) => handleChange(t, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              keyboardType="number-pad"
              maxLength={1}
              style={[styles.input, inputStyle]}
              returnKeyType="next"
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginHorizontal: 8,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#1B516B',
  },
});

export default OTPInput;


