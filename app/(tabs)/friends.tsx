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
import {
  Search,
  UserPlus,
  Users,
  MessageCircle,
  Car,
  MapPin,
  Crown,
  Zap,
  Send,
} from 'lucide-react-native';

interface Friend {
  id: string;
  username: string;
  avatar: string;
  carModel: string;
  location: string;
  isOnline: boolean;
  isPremium: boolean;
  mutualFriends: number;
  lastSnap: string;
}

const suggestedFriends: Friend[] = [
  {
    id: '1',
    username: 'drift_master_06',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'Nissan 350Z',
    location: 'Ankara',
    isOnline: true,
    isPremium: false,
    mutualFriends: 3,
    lastSnap: '2sa',
  },
  {
    id: '2',
    username: 'bmw_ankara_34',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'BMW M3 Competition',
    location: 'Ankara',
    isOnline: false,
    isPremium: true,
    mutualFriends: 7,
    lastSnap: '1sa',
  },
  {
    id: '3',
    username: 'jdm_istanbul',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'Honda Civic Type-R',
    location: 'İstanbul',
    isOnline: true,
    isPremium: false,
    mutualFriends: 12,
    lastSnap: '5dk',
  },
  {
    id: '4',
    username: 'supercar_34',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'Lamborghini Huracán',
    location: 'İstanbul',
    isOnline: false,
    isPremium: true,
    mutualFriends: 5,
    lastSnap: '3sa',
  },
  {
    id: '5',
    username: 'classic_lover',
    avatar: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'Ford Mustang 1967',
    location: 'İzmir',
    isOnline: true,
    isPremium: false,
    mutualFriends: 2,
    lastSnap: '1g',
  },
];

const myFriends: Friend[] = [
  {
    id: '6',
    username: 'speed_demon',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'Porsche 911 GT3',
    location: 'İstanbul',
    isOnline: true,
    isPremium: true,
    mutualFriends: 0,
    lastSnap: '10dk',
  },
  {
    id: '7',
    username: 'night_rider',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'Mercedes-AMG GT',
    location: 'Ankara',
    isOnline: false,
    isPremium: false,
    mutualFriends: 0,
    lastSnap: '2sa',
  },
];

export default function FriendsScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState<'friends' | 'suggested'>('friends');
  const [friends, setFriends] = useState(myFriends);
  const [suggested, setSuggested] = useState(suggestedFriends);

  const addFriend = (friendId: string) => {
    const friendToAdd = suggested.find(f => f.id === friendId);
    if (friendToAdd) {
      setFriends(prev => [...prev, friendToAdd]);
      setSuggested(prev => prev.filter(f => f.id !== friendId));
    }
  };

  const sendMessage = (friend: Friend) => {
    Alert.alert('Mesaj Gönderiliyor', `${friend.username} ile sohbet başlatılıyor...`);
  };

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchText.toLowerCase()) ||
    friend.carModel.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredSuggested = suggested.filter(friend =>
    friend.username.toLowerCase().includes(searchText.toLowerCase()) ||
    friend.carModel.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderFriend = (friend: Friend, showAddButton = false) => (
    <View key={friend.id} style={styles.friendCard}>
      <View style={styles.friendAvatarContainer}>
        <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
        {friend.isOnline && <View style={styles.onlineIndicator} />}
        {friend.isPremium && (
          <View style={styles.premiumBadge}>
            <Crown size={12} color="#FFD700" fill="#FFD700" />
          </View>
        )}
      </View>
      
      <View style={styles.friendInfo}>
        <View style={styles.friendHeader}>
          <Text style={styles.friendUsername}>{friend.username}</Text>
          {friend.lastSnap && (
            <Text style={styles.lastSnap}>{friend.lastSnap}</Text>
          )}
        </View>
        
        <View style={styles.friendDetails}>
          <Car size={14} color="#8E8E93" />
          <Text style={styles.friendCarModel}>{friend.carModel}</Text>
        </View>
        
        <View style={styles.friendLocation}>
          <MapPin size={14} color="#8E8E93" />
          <Text style={styles.locationText}>{friend.location}</Text>
          {friend.mutualFriends > 0 && (
            <>
              <Users size={14} color="#8E8E93" />
              <Text style={styles.mutualText}>{friend.mutualFriends} ortak</Text>
            </>
          )}
        </View>
      </View>
      
      <View style={styles.friendActions}>
        {showAddButton ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addFriend(friend.id)}
          >
            <UserPlus size={20} color="#007AFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.messageButton}>
            <Send size={20} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Arkadaşlar</Text>
        <View style={styles.headerStats}>
          <Users size={20} color="#007AFF" />
          <Text style={styles.statsText}>{friends.length} arkadaş</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Arkadaş ara..."
          placeholderTextColor="#8E8E93"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'friends' && styles.activeTab]}
          onPress={() => setSelectedTab('friends')}
        >
          <Text style={[styles.tabText, selectedTab === 'friends' && styles.activeTabText]}>
            Arkadaşlarım ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'suggested' && styles.activeTab]}
          onPress={() => setSelectedTab('suggested')}
        >
          <Text style={[styles.tabText, selectedTab === 'suggested' && styles.activeTabText]}>
            Önerilen ({suggested.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {selectedTab === 'friends' && (
          <View style={styles.section}>
            {filteredFriends.length > 0 ? (
              filteredFriends.map(friend => renderFriend(friend, false))
            ) : (
              <View style={styles.emptyState}>
                <Users size={48} color="#8E8E93" />
                <Text style={styles.emptyTitle}>Henüz arkadaşın yok</Text>
                <Text style={styles.emptyDescription}>
                  Önerilen kişilerden arkadaş ekleyebilirsin
                </Text>
              </View>
            )}
          </View>
        )}

        {selectedTab === 'suggested' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sana Önerilen Kişiler</Text>
            {filteredSuggested.map(friend => renderFriend(friend, true))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
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
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#2C2C2E',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  friendCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    borderColor: '#1C1C1E',
  },
  premiumBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  friendInfo: {
    flex: 1,
  },
  friendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  friendUsername: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  lastSnap: {
    color: '#32D74B',
    fontSize: 12,
    fontWeight: '600',
  },
  friendDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  friendCarModel: {
    color: '#8E8E93',
    fontSize: 14,
    marginLeft: 6,
  },
  friendLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#8E8E93',
    fontSize: 13,
    marginLeft: 4,
    marginRight: 12,
  },
  mutualText: {
    color: '#8E8E93',
    fontSize: 13,
    marginLeft: 4,
  },
  friendActions: {
    marginLeft: 16,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  messageButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
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