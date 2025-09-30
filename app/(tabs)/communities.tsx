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
} from 'react-native';
import {
  Search,
  Users,
  Crown,
  Car,
  MapPin,
  Trophy,
  Star,
  Calendar,
  ChevronRight,
  Zap,
  MessageCircle,
} from 'lucide-react-native';

interface Community {
  id: string;
  name: string;
  image: string;
  members: number;
  type: 'brand' | 'location' | 'premium';
  description: string;
  isJoined: boolean;
  isPremium: boolean;
  hasEvent: boolean;
  eventTitle?: string;
}

const communities: Community[] = [
  {
    id: '1',
    name: 'BMW Türkiye',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    members: 12500,
    type: 'brand',
    description: 'BMW sahipleri ve tutkunları',
    isJoined: true,
    isPremium: false,
    hasEvent: true,
    eventTitle: 'BMW Meet - Maslak',
  },
  {
    id: '2',
    name: 'İstanbul JDM',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    members: 8920,
    type: 'location',
    description: 'İstanbul JDM topluluğu',
    isJoined: false,
    isPremium: true,
    hasEvent: false,
  },
  {
    id: '3',
    name: 'Mercedes-AMG Club',
    image: 'https://images.pexels.com/photos/3802269/pexels-photo-3802269.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    members: 15600,
    type: 'brand',
    description: 'AMG performans tutkunları',
    isJoined: true,
    isPremium: true,
    hasEvent: true,
    eventTitle: 'AMG Track Day',
  },
  {
    id: '4',
    name: 'Ankara Supercars',
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    members: 4200,
    type: 'location',
    description: 'Ankara süper araç sahipleri',
    isJoined: false,
    isPremium: false,
    hasEvent: false,
  },
  {
    id: '5',
    name: 'Classic Cars TR',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    members: 6800,
    type: 'brand',
    description: 'Klasik araç koleksiyonerleri',
    isJoined: false,
    isPremium: false,
    hasEvent: true,
    eventTitle: 'Vintage Car Show',
  },
  {
    id: '6',
    name: 'Drift Masters',
    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    members: 9100,
    type: 'premium',
    description: 'Pro drift topluluğu',
    isJoined: true,
    isPremium: true,
    hasEvent: true,
    eventTitle: 'Drift Championship',
  },
];

const trendingTopics = [
  { id: '1', title: '#NightMode', posts: 1247 },
  { id: '2', title: '#BMWMeet', posts: 892 },
  { id: '3', title: '#Drift2024', posts: 654 },
  { id: '4', title: '#SupercarSunday', posts: 445 },
  { id: '5', title: '#JDMLife', posts: 332 },
];


export default function CommunitiesScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'joined'>('joined');
  const [communitiesList, setCommunitiesList] = useState(communities);

  const toggleJoin = (communityId: string) => {
    setCommunitiesList(prev =>
      prev.map(community =>
        community.id === communityId
          ? {
              ...community,
              isJoined: !community.isJoined,
              members: community.isJoined 
                ? community.members - 1 
                : community.members + 1,
            }
          : community
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'brand':
        return <Car size={16} color="#007AFF" />;
      case 'location':
        return <MapPin size={16} color="#32D74B" />;
      default:
        return <Users size={16} color="#8E8E93" />;
    }
  };

  const openGroupChat = (community: Community) => {
    Alert.alert(
      'Grup Sohbeti',
      `${community.name} grup sohbetine katılıyorsunuz...`
    );
  };
  const filteredCommunities = communitiesList.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchText.toLowerCase());
    
    switch (selectedTab) {
      case 'joined':
        return matchesSearch && community.isJoined;
      case 'trending':
        return matchesSearch && community.hasEvent;
      default:
        return matchesSearch;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Gruplarım</Text>
        <View style={styles.headerStats}>
          <Trophy size={20} color="#FFD700" />
          <Text style={styles.statsText}>
            {communitiesList.filter(c => c.isJoined).length} grup
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Grup ara..."
          placeholderTextColor="#8E8E93"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.activeTabText]}>
            Tümü
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'joined' && styles.activeTab]}
          onPress={() => setSelectedTab('joined')}
        >
          <Text style={[styles.tabText, selectedTab === 'joined' && styles.activeTabText]}>
            Keşfet
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Communities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedTab === 'joined' ? 'Katıldığım Gruplar' : 'Önerilen Gruplar'}
          </Text>
          {filteredCommunities.map(community => (
            <View key={community.id} style={styles.communityCard}>
              <Image source={{ uri: community.image }} style={styles.communityImage} />
              
              <View style={styles.communityInfo}>
                <View style={styles.communityHeader}>
                  <Text style={styles.communityName}>{community.name}</Text>
                  <View style={styles.communityBadges}>
                    {getTypeIcon(community.type)}
                    {community.isPremium && <Crown size={14} color="#FFD700" fill="#FFD700" />}
                  </View>
                </View>
                
                <Text style={styles.communityDescription}>{community.description}</Text>
                
                <View style={styles.communityStats}>
                  <Users size={14} color="#8E8E93" />
                  <Text style={styles.memberCount}>
                    {community.members.toLocaleString()} üye
                  </Text>
                  {community.hasEvent && (
                    <>
                      <Calendar size={14} color="#32D74B" />
                      <Text style={styles.eventIndicator}>Etkinlik var</Text>
                    </>
                  )}
                </View>
                
                {community.eventTitle && (
                  <View style={styles.eventBanner}>
                    <Zap size={12} color="#FFD700" />
                    <Text style={styles.eventBannerText}>{community.eventTitle}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.communityActions}>
                {community.isJoined && (
                  <TouchableOpacity
                    style={styles.chatButton}
                    onPress={() => openGroupChat(community)}
                  >
                    <MessageCircle size={20} color="#007AFF" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    community.isJoined && styles.joinedButtonText,
                  ]}
                  onPress={() => toggleJoin(community.id)}
                >
                  <Text
                    style={[
                      styles.joinButtonText,
                      community.isJoined && styles.joinedButtonText,
                    ]}
                  >
                    {community.isJoined ? 'Ayrıl' : 'Katıl'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
    color: '#FFD700',
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
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  activeTab: {
    backgroundColor: '#00D4FF',
    borderColor: '#00D4FF',
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
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventDetails: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 2,
  },
  eventCommunity: {
    color: '#007AFF',
    fontSize: 13,
  },
  eventIcon: {
    marginLeft: 16,
  },
  trendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  trendTitle: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  trendCount: {
    color: '#8E8E93',
    fontSize: 14,
  },
  communityCard: {
    backgroundColor: '#0F0F0F',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  communityImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  communityInfo: {
    padding: 16,
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  communityName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  communityBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  communityDescription: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 12,
  },
  communityStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  memberCount: {
    color: '#8E8E93',
    fontSize: 13,
    marginLeft: 6,
    marginRight: 16,
  },
  eventIndicator: {
    color: '#32D74B',
    fontSize: 13,
    marginLeft: 6,
  },
  eventBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  eventBannerText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  communityActions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  chatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  joinButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  joinedButtonText: {
    color: '#007AFF',
  },
});