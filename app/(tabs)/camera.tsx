import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { 
  Camera, 
  RotateCw, 
  Zap, 
  Palette, 
  Send, 
  X,
  Users,
  UserPlus,
  Sparkles
} from 'lucide-react-native';

const filters = [
  { id: 'neon', name: 'Neon', icon: '⚡', color: '#00FFFF' },
  { id: 'night', name: 'Night Drive', icon: '🌙', color: '#4A00E0' },
  { id: 'speed', name: 'Speed Lines', icon: '💨', color: '#FF6B6B' },
  { id: 'retro', name: 'Retro', icon: '🕶️', color: '#FF8C69' },
  { id: 'fire', name: 'Fire', icon: '🔥', color: '#FF4500' },
  { id: 'chrome', name: 'Chrome', icon: '✨', color: '#C0C0C0' },
];

const communities = [
  'BMW Club Turkey',
  'JDM Istanbul',
  'Mercedes Ankara',
  'Supercar Global',
  'Drift Masters',
  'Classic Cars TR'
];

const friends = [
  'Ahmet K.',
  'Mehmet S.',
  'Ayşe D.',
  'Fatma Y.',
  'Ali R.',
  'Zeynep M.'
];

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareText, setShareText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.permissionContainer} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera izni gerekli</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo);
        setShowShareModal(true);
      } catch (error) {
        console.error('Photo capture failed:', error);
        Alert.alert('Hata', 'Fotoğraf çekilemedi. Lütfen tekrar deneyin.');
      }
    }
  };

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        console.log('Video recorded:', video);
        setIsRecording(false);
        setShowShareModal(true);
      } catch (error) {
        console.error('Video recording failed:', error);
        setIsRecording(false);
        Alert.alert('Hata', 'Video kaydedilemedi. Lütfen tekrar deneyin.');
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const shareContent = (target: string) => {
    if (shareText.trim()) {
      Alert.alert('Paylaşıldı!', `"${shareText}" mesajı ile ${target} kişisine gönderildi.`);
    } else {
      Alert.alert('Paylaşıldı!', `İçerik ${target} kişisine gönderildi.`);
    }
    setShowShareModal(false);
    setShareText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
      >
        {/* Filter Overlay */}
        {selectedFilter && (
          <View style={[
            styles.filterOverlay,
            { backgroundColor: filters.find(f => f.id === selectedFilter)?.color + '20' }
          ]} />
        )}

        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.topButton} onPress={() => setSelectedFilter('')}>
            <X size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.appTitle}>SnapCar</Text>
          <TouchableOpacity style={styles.topButton} onPress={toggleCameraFacing}>
            <RotateCw size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filter Selection */}
        <ScrollView 
          horizontal 
          style={styles.filterScroll}
          showsHorizontalScrollIndicator={false}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && styles.filterButtonActive,
                { borderColor: filter.color }
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={styles.filterEmoji}>{filter.icon}</Text>
              <Text style={styles.filterName}>{filter.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.sideButton}>
            <Sparkles size={28} color="white" />
          </TouchableOpacity>
          
          <View style={styles.captureContainer}>
            <TouchableOpacity 
              style={[
                styles.captureButton,
                isRecording && styles.captureButtonRecording
              ]}
              onPress={takePicture}
              onLongPress={startRecording}
              onPressOut={stopRecording}
            >
              <Camera size={32} color="white" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.sideButton}>
            <Palette size={28} color="white" />
          </TouchableOpacity>
        </View>

        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Çekiliyor...</Text>
          </View>
        )}
      </CameraView>

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowShareModal(false)}>
                <X size={24} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Paylaş</Text>
              <View style={{ width: 24 }} />
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Açıklama ekle..."
              placeholderTextColor="#8E8E93"
              value={shareText}
              onChangeText={setShareText}
              multiline
            />

            <Text style={styles.sectionTitle}>Arkadaşlar</Text>
            <ScrollView style={styles.friendsList}>
              {friends.map((friend, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.friendItem}
                  onPress={() => shareContent(friend)}
                >
                  <UserPlus size={20} color="#007AFF" />
                  <Text style={styles.friendName}>{friend}</Text>
                  <Send size={16} color="#8E8E93" />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Topluluklar</Text>
            <ScrollView style={styles.friendsList}>
              {communities.map((community, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.friendItem}
                  onPress={() => shareContent(community)}
                >
                  <Users size={20} color="#32D74B" />
                  <Text style={styles.friendName}>{community}</Text>
                  <Send size={16} color="#8E8E93" />
                </TouchableOpacity>
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
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  filterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  topControls: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  topButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  filterScroll: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  filterButton: {
    width: 80,
    height: 80,
    marginLeft: 15,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterButtonActive: {
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  filterEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  filterName: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 2,
  },
  sideButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureContainer: {
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureButtonRecording: {
    backgroundColor: '#FF3B30',
  },
  recordingIndicator: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,59,48,0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 2,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 8,
  },
  recordingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  textInput: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
    marginBottom: 24,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  friendsList: {
    maxHeight: 120,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  friendName: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
});