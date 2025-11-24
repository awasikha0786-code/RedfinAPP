import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageBubble from '../../../../components/main/notification/chat/MessageBubble/MessageBubble';
import ChatInput from '../../../../components/main/notification/chat/ChatInput/ChatInput';

const ChatScreen = ({ navigation, route }) => {
  const { name = 'Milano', profileImage } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi, I’m interested in this condo listing and wanted to know if tours are available?', time: '10:45', own: true, status: 'read' },
    { id: 2, text: 'Sure, I can help you schedule a showing for this property. Are you available in the afternoon?', time: '10:46', own: false },
  ]);
  const scrollRef = useRef(null);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    setMessages(prev => [...prev, { id: Date.now(), text: trimmed, time, own: true, status: 'sent' }]);
    setMessage('');
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <View style={styles.iconCircle}>
            <Image source={require('../../../../assets/icons/backArro.png')} style={styles.backIcon} />
          </View>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Image source={profileImage || require('../../../../assets/images/Avator_img.png')} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
          <View style={styles.iconCircle}>
            <Image source={require('../../../../assets/icons/Call.png')} style={styles.callIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} keyboardVerticalOffset={80} style={{ flex: 1 }}>
        <View style={styles.chatContainer}>
          <ScrollView ref={scrollRef} style={styles.messagesArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
            {messages.map(m => (
              <MessageBubble key={m.id} text={m.text} time={m.time} isOwn={m.own} status={m.status} />
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <ChatInput value={message} onChangeText={setMessage} onSendPress={handleSend} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  userInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5,
    marginLeft: -60,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  name: { fontSize: 18, fontWeight: '700', color: '#14233A' },
  status: { fontSize: 14, color: '#3A6A7E', marginTop: 2 },
  iconButton: { width: 50, height: 50 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F5F4F8', justifyContent: 'center', alignItems: 'center' },
  backIcon: { width: 20, height: 20, tintColor: '#14233A' },
  callIcon: { width: 20, height: 20, tintColor: '#14233A' },
  chatContainer: {
    width: 360,
    height: 850,
    borderRadius: 50,
    opacity: 1,
    marginTop: -10,
    borderWidth: 10,
    borderColor: '#FFFFFF',
    backgroundColor: '#F5F4F8',
    overflow: 'hidden',
    alignSelf: 'center',
    flex: 1,
  },
  messagesArea: {
    flex: 1,
    minHeight: 600,
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 16,
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  inputContainer: {
    marginTop: -80,
    alignItems: 'center',
  },
});

export default ChatScreen;


