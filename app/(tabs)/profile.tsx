import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { Settings, Crown, Trophy, Car, Camera, CreditCard as Edit3, Star, Zap, Play, Calendar, Award, Plus, Music } from 'lucide-react-native';

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
}

interface CarInfo {
  id: string;
  model: string;
  year: number;
  licensePlate: string;
  image: string;
  isPrimary: boolean;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'Hafta Şampiyonu',
    icon: '🏆',
    description: 'Haftanın en beğenilen fotoğrafı',
    earnedDate: '2 gün önce',
  },
  {
    id: '2',
    name: 'Sosyal Kelebek',
    icon: '🔥',
    description: '100+ beğeni aldı',
    earnedDate: '1 hafta önce',
  },
  {
    id: '3',
    name: 'Gece Sürücüsü',
    icon: '🌙',
    description: '10 gece modu fotoğrafı',
    earnedDate: '2 hafta önce',
  },
  {
    id: '4',
    name: 'Filtre Ustası',
    icon: '✨',
    description: '25 farklı filtre kullandı',
    earnedDate: '3 hafta önce',
  },
  {
    id: '5',
    name: 'Premium Üye',
    icon: '👑',
    description: 'Premium paket sahibi',
    earnedDate: '1 ay önce',
  },
];

const cars: CarInfo[] = [
  {
    id: '1',
    model: 'BMW M3 Competition',
    year: 2023,
    licensePlate: '34 BMW 123',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    isPrimary: true,
  },
  {
    id: '2',
    model: 'Porsche 911 GT3',
    year: 2022,
    licensePlate: '34 GT3 911',
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    isPrimary: false,
  },
];

const userStats = {
  posts: 87,
  followers: 1240,
  following: 456,
  likes: 12800,
  points: 15420, // likes + comments received
  level: 12,
  premiumMember: true,
};

const myPosts = [
  'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
  'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
  'https://images.pexels.com/photos/3802269/pexels-photo-3802269.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
  'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
  'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
  'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
];

const premiumFeatures = [
  'Reklamsız deneyim',
  'Özel AR efektleri',
  'Sınırsız filtre kullanımı',
  'Holografik plaka efektleri',
  'Premium topluluklar',
  'Profil şarkısı',
  'Spotlight öne çıkarma',
  'Özel rozetler',
];

export default function ProfileScreen() {
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [selectedTab, setSelectedTab] = useState<'posts' | 'garage' | 'badges'>('posts');

  const openBadgeDetails = (badge: Badge) => {
    setSelectedBadge(badge);
    setShowBadgeModal(true);
  };

  const renderLicensePlate = (plate: string, isPremium: boolean) => (
    <View style={[
      styles.licensePlate,
      isPremium && styles.premiumLicensePlate
    ]}>
      {isPremium && <View style={styles.hologramEffect} />}
      <Text style={styles.licensePlateText}>{plate}</Text>
      {isPremium && (
        <Text style={styles.appBadge}>APP</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Edit3 size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.username}>bmw_lover_23</Text>
          <View style={styles.pointsContainer}>
            <Star size={20} color="#FFD700" fill="#FFD700" />
            <Text style={styles.pointsText}>{userStats.points.toLocaleString()}</Text>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.avatarEditButton}>
              <Camera size={16} color="white" />
            </TouchableOpacity>
            {userStats.premiumMember && (
              <View style={styles.premiumBadge}>
                <Crown size={16} color="#FFD700" fill="#FFD700" />
              </View>
            )}
          </View>

          <Text style={styles.displayName}>Ahmet Kaya</Text>
          <Text style={styles.bio}>
            BMW & Performance car enthusiast 🏎️{'\n'}
            Track days & night drives 🌙{'\n'}
            İstanbul 📍
          </Text>

          {/* Now Playing */}
          <TouchableOpacity style={styles.nowPlaying}>
            <Music size={16} color="#1DB954" />
            <Text style={styles.nowPlayingText}>Initial D - Deja Vu</Text>
            <Play size={14} color="#1DB954" />
          </TouchableOpacity>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.posts}</Text>
              <Text style={styles.statLabel}>Gönderi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.followers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Takipçi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.following}</Text>
              <Text style={styles.statLabel}>Takip</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.likes.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Beğeni</Text>
            </View>
          </View>

          {/* Level & Premium */}
          <View style={styles.levelContainer}>
            <View style={styles.levelInfo}>
              <Trophy size={20} color="#FFD700" />
              <Text style={styles.levelText}>Level {userStats.level}</Text>
            </View>
            <TouchableOpacity 
              style={styles.premiumButton}
              onPress={() => setShowPremiumModal(true)}
            >
              <Crown size={16} color="#FFD700" />
              <Text style={styles.premiumButtonText}>Premium</Text>
            </TouchableOpacity>
          </View>

          {/* Featured Badges */}
          <View style={styles.featuredBadges}>
            {badges.slice(0, 5).map(badge => (
              <TouchableOpacity
                key={badge.id}
                style={styles.featuredBadge}
                onPress={() => openBadgeDetails(badge)}
              >
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.moreBadges}
              onPress={() => setSelectedTab('badges')}
            >
              <Plus size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'posts' && styles.activeTab]}
            onPress={() => setSelectedTab('posts')}
          >
            <Camera size={20} color={selectedTab === 'posts' ? '#007AFF' : '#8E8E93'} />
            <Text style={[
              styles.tabText,
              selectedTab === 'posts' && styles.activeTabText
            ]}>
              Gönderiler
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'garage' && styles.activeTab]}
            onPress={() => setSelectedTab('garage')}
          >
            <Car size={20} color={selectedTab === 'garage' ? '#007AFF' : '#8E8E93'} />
            <Text style={[
              styles.tabText,
              selectedTab === 'garage' && styles.activeTabText
            ]}>
              Garaj
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'badges' && styles.activeTab]}
            onPress={() => setSelectedTab('badges')}
          >
            <Award size={20} color={selectedTab === 'badges' ? '#007AFF' : '#8E8E93'} />
            <Text style={[
              styles.tabText,
              selectedTab === 'badges' && styles.activeTabText
            ]}>
              Rozetler
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === 'posts' && (
            <View style={styles.postsGrid}>
              {myPosts.map((post, index) => (
                <TouchableOpacity key={index} style={styles.postItem}>
                  <Image source={{ uri: post }} style={styles.postImage} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedTab === 'garage' && (
            <View style={styles.garageContainer}>
              {cars.map(car => (
                <View key={car.id} style={styles.carCard}>
                  <Image source={{ uri: car.image }} style={styles.carImage} />
                  <View style={styles.carInfo}>
                    <View style={styles.carHeader}>
                      <Text style={styles.carModel}>{car.model}</Text>
                      {car.isPrimary && <Star size={16} color="#FFD700" fill="#FFD700" />}
                    </View>
                    <Text style={styles.carYear}>{car.year}</Text>
                    <View style={styles.carPlateContainer}>
                      {renderLicensePlate(car.licensePlate, userStats.premiumMember)}
                    </View>
                  </View>
                  <TouchableOpacity style={styles.carEditButton}>
                    <Edit3 size={16} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.addCarButton}>
                <Plus size={24} color="#007AFF" />
                <Text style={styles.addCarText}>Araç Ekle</Text>
              </TouchableOpacity>
            </View>
          )}

          {selectedTab === 'badges' && (
            <View style={styles.badgesContainer}>
              {badges.map(badge => (
                <TouchableOpacity
                  key={badge.id}
                  style={styles.badgeCard}
                  onPress={() => openBadgeDetails(badge)}
                >
                  <Text style={styles.badgeCardIcon}>{badge.icon}</Text>
                  <View style={styles.badgeCardInfo}>
                    <Text style={styles.badgeCardName}>{badge.name}</Text>
                    <Text style={styles.badgeCardDescription}>{badge.description}</Text>
                    <Text style={styles.badgeCardDate}>{badge.earnedDate}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Badge Detail Modal */}
      <Modal
        visible={showBadgeModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.badgeModal}>
            {selectedBadge && (
              <>
                <Text style={styles.badgeModalIcon}>{selectedBadge.icon}</Text>
                <Text style={styles.badgeModalName}>{selectedBadge.name}</Text>
                <Text style={styles.badgeModalDescription}>{selectedBadge.description}</Text>
                <Text style={styles.badgeModalDate}>Kazanıldı: {selectedBadge.earnedDate}</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowBadgeModal(false)}
                >
                  <Text style={styles.modalCloseButtonText}>Kapat</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Premium Modal */}
      <Modal
        visible={showPremiumModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.premiumModal}>
            <View style={styles.premiumHeader}>
              <Crown size={32} color="#FFD700" fill="#FFD700" />
              <Text style={styles.premiumTitle}>Premium Üyelik</Text>
            </View>
            
            <ScrollView style={styles.premiumFeatures}>
              {premiumFeatures.map((feature, index) => (
                <View key={index} style={styles.premiumFeatureItem}>
                  <Zap size={16} color="#FFD700" />
                  <Text style={styles.premiumFeatureText}>{feature}</Text>
                </View>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowPremiumModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  pointsText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  premiumBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  nowPlaying: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  nowPlayingText: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    color: '#FFD700',
    fontWeight: '600',
    marginLeft: 8,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  premiumButtonText: {
    color: '#FFD700',
    fontWeight: '600',
    marginLeft: 6,
  },
  featuredBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  badgeIcon: {
    fontSize: 18,
  },
  moreBadges: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#007AFF',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postItem: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  garageContainer: {
    gap: 16,
  },
  carCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  carImage: {
    width: 120,
    height: 80,
  },
  carInfo: {
    flex: 1,
    padding: 16,
  },
  carHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  carModel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  carYear: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 8,
  },
  carPlateContainer: {
    alignSelf: 'flex-start',
  },
  licensePlate: {
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    position: 'relative',
  },
  premiumLicensePlate: {
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  hologramEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,255,255,0.2)',
    borderRadius: 4,
  },
  licensePlateText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  appBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#007AFF',
    color: 'white',
    fontSize: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  carEditButton: {
    padding: 16,
  },
  addCarButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  addCarText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  badgesContainer: {
    gap: 12,
  },
  badgeCard: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  badgeCardIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  badgeCardInfo: {
    flex: 1,
  },
  badgeCardName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  badgeCardDescription: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 4,
  },
  badgeCardDate: {
    color: '#007AFF',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeModal: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    margin: 40,
  },
  badgeModalIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  badgeModalName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  badgeModalDescription: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  badgeModalDate: {
    color: '#007AFF',
    fontSize: 14,
    marginBottom: 24,
  },
  modalCloseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  premiumModal: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 24,
    margin: 40,
    maxHeight: '80%',
  },
  premiumHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  premiumTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 12,
  },
  premiumFeatures: {
    maxHeight: 300,
  },
  premiumFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumFeatureText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
  },
});