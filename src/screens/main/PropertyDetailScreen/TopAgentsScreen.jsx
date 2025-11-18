import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from '../../../components/common';
import { scale, verticalScale, moderateScale } from '../../../utils/layout';

const avatarImage = require('../../../assets/images/Avator_img.png');

const agents = [
  { id: '1', name: 'Amanda', rating: 4.9, sold: 112, avatar: avatarImage },
  { id: '2', name: 'Anderson', rating: 4.9, sold: 112, avatar: avatarImage },
  { id: '3', name: 'Samantha', rating: 4.9, sold: 112, avatar: avatarImage },
  { id: '4', name: 'Andrew', rating: 4.9, sold: 112, avatar: avatarImage },
  { id: '5', name: 'Michael', rating: 4.9, sold: 112, avatar: avatarImage },
  { id: '6', name: 'Tobi', rating: 4.9, sold: 112, avatar: avatarImage },
];

const TopAgentsScreen = ({ navigation }) => {
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.85} onPress={handleBack}>
          <Icon name="backArrow" size={moderateScale(18)} color="#1F2A44" />
        </TouchableOpacity>
        <Text style={styles.title}>Top Real Estate Agents</Text>
        <Text style={styles.subtitle}>Find top local agents with proven results</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardGrid}>
          {agents.map((agent, index) => (
            <TouchableOpacity
              key={agent.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('AgentProfile', { agent })}
            >
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <View style={styles.avatarWrapper}>
                <Image source={agent.avatar} style={styles.avatar} />
              </View>
              <Text style={styles.agentName}>{agent.name}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Image
                    source={require('../../../assets/icons/star.png')}
                    style={[styles.metaIcon, styles.starIcon]}
                  />
                  <Text style={styles.metaLabel}>{agent.rating}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Image
                    source={require('../../../assets/icons/Home.png')}
                    style={[styles.metaIcon, styles.homeIcon]}
                  />
                  <Text style={styles.metaLabel}>{agent.sold} Sold</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(16),
  },
  backButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F4F5FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  backIcon: {
    fontSize: moderateScale(20),
    color: '#1F2A44',
  },
  title: {
    fontFamily: 'Lato',
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(14),
    color: '#5E6A85',
    marginBottom: verticalScale(20),
  },
  listContent: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(32),
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: verticalScale(16),
  },
  card: {
    width: scale(150),
    borderRadius: scale(24),
    backgroundColor: '#F8F8FD',
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    gap: verticalScale(12),
    shadowColor: 'rgba(26, 58, 95, 0.12)',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  rankBadge: {
    position: 'absolute',
    top: verticalScale(16),
    left: scale(16),
    backgroundColor: '#E74E5B',
    borderRadius: scale(18),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
  },
  rankText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avatarWrapper: {
    width: scale(84),
    height: scale(84),
    borderRadius: scale(42),
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#D9E5F8',
    overflow: 'hidden',
    marginTop: verticalScale(16),
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  agentName: {
    fontFamily: 'Lato',
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1F2A44',
    marginTop: verticalScale(4),
  },
  metaRow: {
    flexDirection: 'row',
    columnGap: scale(12),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
  },
  metaIcon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
  },
  starIcon: {
    tintColor: '#F6C645',
  },
  homeIcon: {
    tintColor: '#1F2A44',
  },
  metaLabel: {
    fontFamily: 'Raleway',
    fontSize: moderateScale(13),
    color: '#4C5772',
    fontWeight: '600',
  },
});

export default TopAgentsScreen;

