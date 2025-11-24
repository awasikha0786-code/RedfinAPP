import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import TabSelector from '../../../components/main/notification/TabSelector/TabSelector';
import FilterButton from '../../../components/main/notification/FilterButton/FilterButton';
import NotificationCard from '../../../components/main/notification/NotificationCard/NotificationCard';
import ConfirmationBottomSheet from '../../../components/common/buttomSheet/ConfirmationBottomSheet';

const NotificationScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Notification');
  const [activeFilter, setActiveFilter] = useState('All');
  const [deleteBottomSheetVisible, setDeleteBottomSheetVisible] = useState(false);

  const filters = ['All', 'Review', 'Sold', 'House'];

  // Sample notification data
  const [todayNotifications, setTodayNotifications] = useState([
    {
      id: 1,
      profileImage: require('../../../assets/images/Avator_img.png'),
      name: 'Emmett Perry',
      message: 'Just messaged you. Check the message in message tab.',
      boldParts: ['message'],
      timestamp: '10 mins ago',
      propertyImage: null,
    },
    {
      id: 2,
      profileImage: require('../../../assets/images/Avator_img.png'),
      name: 'Geraldo',
      message: 'Just giving 5 Star review on your listing Lakeview Condo',
      boldParts: ['5 Star', 'Lakeview Condo'],
      timestamp: '40 mins ago',
      propertyImage: require('../../../assets/images/image.png'),
    },
    {
      id: 3,
      profileImage: require('../../../assets/images/Avator_img.png'),
      name: 'Walter Lindsey',
      message: 'Just closed a sale Schoolview House',
      boldParts: ['Schoolview House'],
      timestamp: '4 hours ago',
      propertyImage: require('../../../assets/images/image1.png'),
    },
  ]);

  const [olderNotifications, setOlderNotifications] = useState([
    {
      id: 4,
      profileImage: require('../../../assets/images/Avator_img.png'),
      name: 'Velma Cole',
      message: 'Just favorited your listing Schoolview House',
      boldParts: ['Schoolview House'],
      timestamp: '2 Days ago',
      propertyImage: require('../../../assets/images/image2.png'),
    },
  ]);

  // Messages list (All chats)
  const [chats, setChats] = useState([
    {
      id: 101,
      profileImage: require('../../../assets/images/Avator_img.png'),
      name: 'Milano',
      message: 'asking about a tour time tomorrow',
      boldParts: [],
      timestamp: '10:45',
    },
    {
      id: 102,
      profileImage: require('../../../assets/images/Avator_img.png'),
      name: 'Samuel Ella',
      message: 'sent a note about your listing',
      boldParts: [],
      timestamp: '11:00',
    },
    {
      id: 103,
      profileImage: require('../../../assets/images/Avator_img.png'),
      name: 'Emmet Perry',
      message: 'wants details about the property',
      boldParts: [],
      timestamp: '12:50',
    },
  ]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDeletePress = () => {
    setDeleteBottomSheetVisible(true);
  };

  const handleConfirmDelete = () => {
    // Delete all notifications and chats based on active tab
    if (activeTab === 'Notification') {
      setTodayNotifications([]);
      setOlderNotifications([]);
    } else {
      setChats([]);
    }
  };

  const handleDeleteNotification = (id, section) => {
    if (section === 'today') {
      setTodayNotifications(prev => prev.filter(item => item.id !== id));
    } else {
      setOlderNotifications(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleDeleteChat = (id) => {
    setChats(prev => prev.filter(chat => chat.id !== id));
  };

  const renderRightAction = (onPress) => (
    <View style={styles.swipeActionContainer}>
      <TouchableOpacity style={styles.swipeActionButton} onPress={onPress} activeOpacity={0.8}>
        <Image 
          source={require('../../../assets/icons/Trash.png')} 
          style={styles.swipeTrashIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Custom Header with delete icon */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleBackPress}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('../../../assets/icons/backArro.png')} 
                style={styles.backIcon} 
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleDeletePress}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('../../../assets/icons/Trash.png')} 
                style={styles.trashIcon} 
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Tab Selector */}
        <TabSelector
          tabs={['Notification', 'Messages']}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === 'Notification' ? (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onPress={() => setActiveFilter(filter)}
              />
            ))}
          </ScrollView>
        ) : null}

        {activeTab === 'Notification' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today</Text>
            {todayNotifications.map((notification) => (
              <View key={notification.id} style={styles.cardWrapper}>
                <Swipeable
                  renderRightActions={() => renderRightAction(() => handleDeleteNotification(notification.id, 'today'))}
                  overshootRight={false}
                >
                  <NotificationCard
                    profileImage={notification.profileImage}
                    name={notification.name}
                    message={notification.message}
                    boldParts={notification.boldParts}
                    timestamp={notification.timestamp}
                    propertyImage={notification.propertyImage}
                  />
                </Swipeable>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.title}>All chats</Text>
            {chats.map((c) => (
              <View key={c.id} style={styles.cardWrapper}>
                <Swipeable
                  renderRightActions={() => renderRightAction(() => handleDeleteChat(c.id))}
                  overshootRight={false}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Chat', { name: c.name, profileImage: c.profileImage })}
                  >
                    <NotificationCard
                      profileImage={c.profileImage}
                      name={c.name}
                      message={c.message}
                      boldParts={c.boldParts}
                      timestamp={c.timestamp}
                    />
                  </TouchableOpacity>
                </Swipeable>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Notification' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Older notifications</Text>
            {olderNotifications.map((notification) => (
              <View key={notification.id} style={styles.cardWrapper}>
                <Swipeable
                  renderRightActions={() => renderRightAction(() => handleDeleteNotification(notification.id, 'older'))}
                  overshootRight={false}
                >
                  <NotificationCard
                    profileImage={notification.profileImage}
                    name={notification.name}
                    message={notification.message}
                    boldParts={notification.boldParts}
                    timestamp={notification.timestamp}
                    propertyImage={notification.propertyImage}
                  />
                </Swipeable>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      {/* Delete Confirmation Bottom Sheet */}
      <ConfirmationBottomSheet
        visible={deleteBottomSheetVisible}
        onClose={() => setDeleteBottomSheetVisible(false)}
        onConfirm={handleConfirmDelete}
        title="Are you sure want to"
        highlightText="delete"
        subtitle={activeTab === 'Notification' ? "all your notifications?" : "all your chat?"}
        warningText="This action can't be undo"
        cancelText="Cancel"
        confirmText="Delete"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  iconButton: {
    width: 50,
    height: 50,
    zIndex: 1,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#14233A',
  },
  trashIcon: {
    width: 15,
    height: 15,
    tintColor: '#14233A',
  },
  swipeActionContainer: {
    height: 109,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  swipeActionButton: {
    width: 100,
    height: 109,
    backgroundColor: '#1B516B',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  swipeTrashIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14233A',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#14233A',
    marginBottom: 16,
  },
  cardWrapper: {
    alignItems: 'flex-start',
    width: '100%',
  },
});

export default NotificationScreen;

