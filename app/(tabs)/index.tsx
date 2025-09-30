import React, { useState } from 'react';
import {
  Heart, MessageCircle, Send, MoveHorizontal as MoreHorizontal, Trophy, Zap, Camera, Play, X, UserPlus, Plus, Star
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Heart, MessageCircle, Send, MoveHorizontal as MoreHorizontal, Trophy, Zap, Camera, Play, X, UserPlus, Plus } from 'lucide-react-native';

interface Post {
  id: string;
  username: string;
  userAvatar: string;
  carModel: string;
  licensePlate: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
  isPremium: boolean;
  badges: string[];
  filter: string;
}

const samplePosts: Post[] = [
  {
    id: '1',
    username: 'bmw_lover_23',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'BMW M3 Competition',
    licensePlate: '34 BMW 123',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400&h=600',
    caption: 'Gece sürüşü 🔥 #bmw #m3 #nightdrive',
    likes: 247,
    comments: 18,
    isLiked: false,
    timestamp: '2sa',
    isPremium: true,
    badges: ['🏆', '⚡'],
    filter: 'neon',
  },
  {
    id: '2',
    username: 'jdm_master',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'Honda Civic Type-R',
    licensePlate: '06 JDM 999',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=400&h=600',
    caption: 'Track günü! 🏁',
    likes: 189,
    comments: 24,
    isLiked: true,
    timestamp: '4sa',
    isPremium: false,
    badges: ['🔥'],
    filter: 'speed',
  },
  {
    id: '3',
    username: 'mercedes_ankara',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    carModel: 'Mercedes-AMG GT',
    licensePlate: '06 AMG 777',
    image: 'https://images.pexels.com/photos/3802269/pexels-photo-3802269.jpeg?auto=compress&cs=tinysrgb&w=400&h=600',
    caption: 'Sunday cruise ✨',
    likes: 312,
    comments: 31,
    isLiked: false,
    timestamp: '1g',
    isPremium: true,
    badges: ['👑', '🏆', '⭐'],
    filter: 'chrome',
  },
];

const stories = [
  {
    id: '1',
    username: 'Hikayeni Ekle',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    isOwn: true,
    carModel: '',
    filter: '',
  },
  {
    id: '2',
    username: 'drift_king_34',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    hasNewStory: true,
    carModel: 'Nissan 350Z',
    filter: 'drift',
  },
  {
    id: '3',
    username: 'amg_beast',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    hasNewStory: true,
    carModel: 'Mercedes AMG GT',
    filter: 'neon',
  },
  {
    id: '4',
    username: 'jdm_legend',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    hasNewStory: false,
    carModel: 'Honda Civic Type-R',
    filter: 'retro',
  },
  {
    id: '5',
    username: 'bmw_power',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    hasNewStory: true,
    carModel: 'BMW M4',
    filter: 'speed',
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState(samplePosts);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [commentText, setCommentText] = useState('');

  const toggleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const openComments = (post: Post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const sendComment = () => {
    if (commentText.trim()) {
      Alert.alert('Yorum gönderildi!', `"${commentText}" yorumu eklendi.`);
      setCommentText('');
      setShowCommentModal(false);
    }
  };

  const openStory = (story: any) => {
    if (story.isOwn) {
      Alert.alert('Hikaye Ekle', 'Kamera açılacak ve hikaye oluşturabileceksin!');
    } else {
      setSelectedStory(story);
      setShowStoryModal(true);
    }
  };

  const openFriends = () => {
    setShowFriendsModal(true);
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

  const renderPost = (post: Post) => (
    <View key={post.id} style={styles.postContainer}>
      {/* User Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
          <View>
            <View style={styles.usernameRow}>
              <Text style={styles.username}>{post.username}</Text>
              {post.isPremium && <Zap size={16} color="#FFD700" fill="#FFD700" />}
              {post.badges.map((badge, index) => (
                <Text key={index} style={styles.badge}>{badge}</Text>
              ))}
            </View>
            <Text style={styles.carModel}>{post.carModel}</Text>
            <View style={styles.licensePlateContainer}>
              {renderLicensePlate(post.licensePlate, post.isPremium)}
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.image }} style={styles.postImage} />
        <View style={styles.filterIndicator}>
          <Text style={styles.filterText}>{post.filter}</Text>
        </View>
      </View>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <View style={styles.actionLeft}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => toggleLike(post.id)}
          >
            <Heart 
              size={24} 
              color={post.isLiked ? "#FF3B30" : "white"} 
              fill={post.isLiked ? "#FF3B30" : "transparent"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => openComments(post)}
          >
            <MessageCircle size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Send size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>

      {/* Likes and Caption */}
      <View style={styles.postFooter}>
        <Text style={styles.likes}>{post.likes} beğeni</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{post.username}</Text> {post.caption}
        </Text>
        {post.comments > 0 && (
          <TouchableOpacity onPress={() => openComments(post)}>
            <Text style={styles.viewComments}>
              {post.comments} yorumun tümünü görüntüle
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>SnapCar</Text>
          <Star size={20} color="#FFD700" fill="#FFD700" />
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <MessageCircle size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Car Stories */}
        <ScrollView 
          horizontal 
          style={styles.storiesContainer}
          showsHorizontalScrollIndicator={false}
        >
          {stories.map(story => (
            <TouchableOpacity 
              key={story.id} 
              style={styles.storyItem}
              onPress={() => openStory(story)}
            >
              <View style={[
                styles.storyAvatar,
                story.hasNewStory && styles.storyAvatarNew,
                story.isOwn && styles.storyAvatarOwn,
              ]}>
                <Image source={{ uri: story.avatar }} style={styles.storyImage} />
                {story.isOwn && (
                  <View style={styles.addStoryButton}>
                    <Plus size={16} color="white" />
                  </View>
                )}
                {story.filter && !story.isOwn && (
                  <View style={styles.storyFilter}>
                    <Text style={styles.storyFilterText}>{story.filter}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.storyUsername} numberOfLines={1}>
                {story.username}
              </Text>
              {story.carModel && (
                <Text style={styles.storyCarModel} numberOfLines={1}>
                  {story.carModel}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>


        {/* Posts */}
        {posts.map(renderPost)}
      </ScrollView>

      {/* Comments Modal */}
      <Modal
        visible={showCommentModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.commentModal}>
            <View style={styles.commentHeader}>
              <TouchableOpacity onPress={() => setShowCommentModal(false)}>
                <X size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.commentTitle}>Yorumlar</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <ScrollView style={styles.commentsList}>
              <Text style={styles.commentItem}>
                <Text style={styles.commentUsername}>drift_master</Text> Harika araç! 🔥
              </Text>
              <Text style={styles.commentItem}>
                <Text style={styles.commentUsername}>car_lover</Text> Bu filtre hangisi?
              </Text>
              <Text style={styles.commentItem}>
                <Text style={styles.commentUsername}>speed_demon</Text> Ankara'da mısın? 
              </Text>
            </ScrollView>
            
            <View style={styles.commentInput}>
              <TextInput
                style={styles.textInput}
                placeholder="Yorum yaz..."
                placeholderTextColor="#8E8E93"
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={sendComment}
                disabled={!commentText.trim()}
              >
                <Send size={20} color={commentText.trim() ? "#007AFF" : "#8E8E93"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Story Modal */}
      <Modal
        visible={showStoryModal}
        animationType="fade"
        transparent={false}
      >
        <View style={styles.storyModalContainer}>
          {selectedStory && (
            <>
              <View style={styles.storyModalHeader}>
                <View style={styles.storyModalUserInfo}>
                  <Image source={{ uri: selectedStory.avatar }} style={styles.storyModalAvatar} />
                  <View>
                    <Text style={styles.storyModalUsername}>{selectedStory.username}</Text>
                    <Text style={styles.storyModalCarModel}>{selectedStory.carModel}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.storyModalClose}
                  onPress={() => setShowStoryModal(false)}
                >
                  <X size={24} color="white" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.storyModalContent}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400&h=600' }} 
                  style={styles.storyModalImage} 
                />
                <View style={styles.storyModalFilter}>
                  <Text style={styles.storyModalFilterText}>{selectedStory.filter} filtresi</Text>
                </View>
              </View>
              
              <View style={styles.storyModalActions}>
                <TouchableOpacity style={styles.storyModalAction}>
                  <Heart size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.storyModalAction}>
                  <MessageCircle size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.storyModalAction}>
                  <Send size={28} color="white" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>

      {/* Friends Modal */}
      <Modal
        visible={showFriendsModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.friendsModal}>
            <View style={styles.friendsHeader}>
              <TouchableOpacity onPress={() => setShowFriendsModal(false)}>
                <X size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.friendsTitle}>Arkadaş Ekle</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <TextInput
              style={styles.friendsSearchInput}
              placeholder="Kullanıcı adı ara..."
              placeholderTextColor="#8E8E93"
            />
            
            <ScrollView style={styles.friendsList}>
              {['drift_master_06', 'bmw_ankara', 'jdm_istanbul', 'supercar_34', 'classic_lover'].map((username, index) => (
                <View key={index} style={styles.friendItem}>
                  <Image 
                    source={{ uri: `https://images.pexels.com/photos/${220453 + index}/pexels-photo-${220453 + index}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100` }} 
                    style={styles.friendAvatar} 
                  />
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendUsername}>{username}</Text>
                    <Text style={styles.friendCarInfo}>BMW M3 • İstanbul</Text>
                  </View>
                  <TouchableOpacity style={styles.addFriendButton}>
                    <UserPlus size={20} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
    marginRight: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  storiesContainer: {
    paddingVertical: 16,
    paddingLeft: 20,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  storyAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 2,
    marginBottom: 4,
    position: 'relative',
  },
  storyAvatarNew: {
    borderWidth: 2,
    borderColor: '#00D4FF',
  },
  storyAvatarOwn: {
    borderWidth: 2,
    borderColor: '#666666',
  },
  storyImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  storyFilter: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 212, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  storyFilterText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  storyUsername: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 2,
  },
  storyCarModel: {
    color: '#8E8E93',
    fontSize: 9,
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 24,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
  badge: {
    marginLeft: 4,
    fontSize: 14,
  },
  carModel: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 2,
  },
  licensePlateContainer: {
    marginTop: 6,
  },
  licensePlate: {
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
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
  imageContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  filterIndicator: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  filterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  actionLeft: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  timestamp: {
    color: '#8E8E93',
    fontSize: 12,
  },
  postFooter: {
    paddingHorizontal: 20,
  },
  likes: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
  },
  caption: {
    color: 'white',
    lineHeight: 20,
    marginBottom: 4,
  },
  viewComments: {
    color: '#8E8E93',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  commentModal: {
    backgroundColor: '#0F0F0F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  commentTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  commentsList: {
    paddingHorizontal: 20,
    maxHeight: 300,
  },
  commentItem: {
    color: 'white',
    marginBottom: 12,
    lineHeight: 20,
  },
  commentUsername: {
    fontWeight: '600',
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyModalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  storyModalUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyModalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  storyModalUsername: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  storyModalCarModel: {
    color: '#8E8E93',
    fontSize: 14,
  },
  storyModalClose: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  storyModalImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  storyModalFilter: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  storyModalFilterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  storyModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  storyModalAction: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsModal: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  friendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  friendsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  friendsSearchInput: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  friendsList: {
    paddingHorizontal: 20,
    maxHeight: 400,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  friendUsername: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  friendCarInfo: {
    color: '#8E8E93',
    fontSize: 14,
  },
  addFriendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
});