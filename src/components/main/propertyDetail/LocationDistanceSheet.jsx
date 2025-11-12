import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Text,
} from 'react-native';

const LOCATION_ICON = require('../../../assets/icons/Location.png');

const LocationDistanceSheet = ({
  visible,
  onClose,
  distances = [],
  onEdit,
  title = 'Location Distance',
  editLabel = 'Edit',
}) => {
  const data = Array.isArray(distances) && distances.length > 0 ? distances : [];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.handle} />

              <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity style={styles.editButton} onPress={onEdit} activeOpacity={0.85}>
                  <Text style={styles.editButtonText}>{editLabel}</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              >
                {data.map((item) => (
                  <View key={item.id || item.distance} style={styles.distanceCard}>
                    <View style={styles.iconWrapper}>
                      <Image source={LOCATION_ICON} style={styles.icon} />
                    </View>
                    <View style={styles.distanceTextWrapper}>
                      <Text style={styles.distancePrimary}>
                        <Text style={styles.distanceValue}>{item.distance}</Text>{' '}
                        <Text style={styles.distanceSuffix}>{item.suffix}</Text>
                      </Text>
                      {item.description ? (
                        <Text style={styles.distanceDescription}>{item.description}</Text>
                      ) : null}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 32,
    maxHeight: '60%',
  },
  handle: {
    width: 54,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(20, 35, 58, 0.18)',
    alignSelf: 'center',
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Raleway',
    fontSize: 20,
    fontWeight: '700',
    color: '#14233A',
  },
  editButton: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#E63946',
  },
  editButtonText: {
    fontFamily: 'Raleway',
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 8,
    rowGap: 16,
  },
  distanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(20, 35, 58, 0.08)',
    paddingHorizontal: 20,
    paddingVertical: 18,
    shadowColor: '#10213A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(31, 77, 112, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#1F4D70',
  },
  distanceTextWrapper: {
    flex: 1,
  },
  distancePrimary: {
    fontFamily: 'Raleway',
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2F4A',
    marginBottom: 4,
  },
  distanceValue: {
    fontFamily: 'Raleway',
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2F4A',
  },
  distanceSuffix: {
    fontFamily: 'Raleway',
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2F4A',
  },
  distanceDescription: {
    fontFamily: 'Raleway',
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7A92',
  },
});

export default LocationDistanceSheet;



