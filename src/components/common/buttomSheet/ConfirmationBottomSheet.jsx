import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';

const ConfirmationBottomSheet = ({ 
  visible, 
  onClose, 
  onConfirm,
  onCancel,
  icon = '?',
  title = "Are you sure want to",
  highlightText = "delete",
  subtitle = "all your chat?",
  warningText = "This action can't be undo",
  cancelText = "Cancel",
  confirmText = "Delete",
  showIcon = true,
  messageAlign = 'center',
  cancelButtonStyle,
  cancelButtonTextStyle,
  confirmButtonStyle,
  confirmButtonTextStyle,
  warningTextStyle,
  containerStyle,
  sheetStyle,
  handleStyle,
  iconCircleStyle,
  messageTextStyle,
  highlightTextStyle,
  buttonContainerStyle
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.container, containerStyle]}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={[styles.sheet, sheetStyle]}>
              <View style={[styles.handleIndicator, handleStyle]} />
              
              {/* Warning Icon */}
              {showIcon && (
                <View style={styles.iconContainer}>
                  <View style={[styles.iconCircle, iconCircleStyle]}>
                    <Text style={styles.iconText}>{icon}</Text>
                  </View>
                </View>
              )}

              {/* Message */}
              <View style={styles.messageContainer}>
                <Text style={[styles.messageText, messageTextStyle, { textAlign: messageAlign }]}>
                  {title}{' '}
                  <Text style={[styles.highlightText, highlightTextStyle]}>{highlightText}</Text>
                  {' '}{subtitle}
                </Text>
              </View>

              {/* Warning Text */}
              <Text style={[styles.warningText, warningTextStyle, { textAlign: messageAlign }]}>{warningText}</Text>

              {/* Action Buttons */}
              <View style={[styles.buttonContainer, buttonContainerStyle]}>
                <TouchableOpacity 
                  style={[styles.cancelButton, cancelButtonStyle]} 
                  onPress={() => {
                    if (onCancel) {
                      onCancel();
                    } else {
                      onClose();
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.cancelButtonText, cancelButtonTextStyle]}>{cancelText}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.confirmButton, confirmButtonStyle]} 
                  onPress={() => {
                    if (onConfirm) {
                      onConfirm();
                    }
                    onClose();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.confirmButtonText, confirmButtonTextStyle]}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '50%',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 12,
    alignItems: 'center',
  },
  handleIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#9AA4B2',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E53935',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  messageText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#14233A',
    textAlign: 'center',
    lineHeight: 26,
  },
  highlightText: {
    color: '#21628A',
    fontWeight: '700',
  },
  warningText: {
    fontSize: 14,
    color: '#9AA4B2',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    paddingHorizontal: 4,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E53935',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  confirmButtonText: {
    color: '#14233A',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmationBottomSheet;

