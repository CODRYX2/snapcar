import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Search, MessageCircle, Send, Users, Car, Crown, Circle, CircleCheck as CheckCircle2 } from 'lucide-react-native';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isGroup: boolean;
  groupName?: string;
  carModel?: string;
  isPremium: boolean;
  isOnline: boolean;
}

const messages: Message[] = [
  {
    id: '1',
    sender: 'drift_master_06',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    lastMessage: 'Harika fotoğraf! Hangi filtre kullandın?',
    timestamp: '2dk',
    unread: true,
    isGroup: false,
    carModel: 'Nissan 350Z',
    isPremium: false,
    isOnline: true,
  },
  {
    id: '2',
    sender: 'BMW Club Turkey',
    avatar: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    lastMessage: 'Yeni challenge başladı! Katılmayı unutmayın 🏆',
    timestamp: '15dk',
    unread: true,
    isGroup: true,
    groupName: 'BMW Club Turkey',
    isPremium: true,
    isOnline: false,
  },
  {
    id: '3',
    sender: 'speed_demon',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    lastMessage: 'Track günü için hazır mısın?',
    timestamp: '1sa',
    unread: false,
    isGroup: false,
    carModel: 'Porsche 911 GT3',
    isPremium: true,
    isOnline: false,
  },
  {
    id: '4',
    sender: 'JDM Istanbul',
    avatar: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    lastMessage: 'Cumartesi buluşması için lokasyon paylaşıldı',
    timestamp: '3sa',
    unread: false,
    isGroup: true,
    groupName: 'JDM Istanbul',
    isPremium: false,
    isOnline: false,
  },
  {
    id: '5',
    sender: 'night_rider',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    lastMessage: 'Gece cruise\'a katılacak mısın?',
    timestamp: '1g',
    unread: false,
    isGroup: false,
    carModel: 'Mercedes-AMG GT',
    isPremium: false,
    isOnline: true,
  },
];

export default function MessagesScreen() {
  const [searchText, setSearchText] = useState('');
  const [messageList, setMessageList] = useState(messages);

  const filteredMessages = messageList.filter(message =>
    message.sender.toLowerCase().includes(searchText.toLowerCase()) ||
    (message.groupName && message.groupName.toLowerCase().includes(searchText.toLowerCase()))
  );

  const openChat = (message: Message) => {
    console.log('Opening chat with:', message.isGroup ? message.groupName : message.sender);
    // Navigation to chat screen would be implemented here
  };

  const markAsRead = (messageId: string) => {
    setMessageList(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, unread: false } : msg
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mesajlar</Text>
        <View style={styles.headerStats}>
          <MessageCircle size={20} color="#007AFF" />
          <Text style={styles.statsText}>
            {messageList.filter(m => m.unread).length} yeni
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Mesaj ara..."
          placeholderTextColor="#8E8E93"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredMessages.map(message => (
          <TouchableOpacity
            key={message.id}
            style={[
              styles.messageCard,
              message.unread && styles.unreadMessage
            ]}
            onPress={() => {
              openChat(message);
              if (message.unread) markAsRead(message.id);
            }}
          >
            <View style={styles.avatarContainer}>
              <Image source={{ uri: message.avatar }} style={styles.avatar} />
              {message.isOnline && <View style={styles.onlineIndicator} />}
              {message.isPremium && (
                <View style={styles.premiumBadge}>
                  <Crown size={12} color="#FFD700" fill="#FFD700" />
                </View>
              )}
            </View>

            <View style={styles.messageInfo}>
              <View style={styles.messageHeader}>
                <View style={styles.senderInfo}>
                  {message.isGroup ? (
                    <Users size={16} color="#32D74B" />
                  ) : (
                    <Car size={16} color="#007AFF" />
                  )}
                  <Text style={styles.senderName}>
                    {message.isGroup ? message.groupName : message.sender}
                  </Text>
                </View>
                <Text style={styles.timestamp}>{message.timestamp}</Text>
              </View>

              {!message.isGroup && message.carModel && (
                <Text style={styles.carModel}>{message.carModel}</Text>
              )}

              <Text
                style={[
                  styles.lastMessage,
                  message.unread && styles.unreadText
                ]}
                numberOfLines={2}
              >
                {message.lastMessage}
              </Text>
            </View>

            <View style={styles.messageActions}>
              {message.unread ? (
                <View style={styles.unreadDot} />
              ) : (
                <CheckCircle2 size={16} color="#8E8E93" />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {filteredMessages.length === 0 && (
          <View style={styles.emptyState}>
            <MessageCircle size={48} color="#8E8E93" />
            <Text style={styles.emptyTitle}>Mesaj bulunamadı</Text>
            <Text style={styles.emptyDescription}>
              Arama kriterlerinizi değiştirmeyi deneyin
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F0F0F',
    borderRadius: 12,
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  messageCard: {
    backgroundColor: '#0F0F0F',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  unreadMessage: {
    backgroundColor: '#001122',
    borderColor: '#003366',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#32D74B',
    borderWidth: 2,
    borderColor: '#0F0F0F',
  },
  premiumBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  timestamp: {
    color: '#8E8E93',
    fontSize: 12,
  },
  carModel: {
    color: '#8E8E93',
    fontSize: 13,
    marginBottom: 4,
  },
  lastMessage: {
    color: '#8E8E93',
    fontSize: 14,
    lineHeight: 18,
  },
  unreadText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  messageActions: {
    marginLeft: 12,
    alignItems: 'center',
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
  },
});