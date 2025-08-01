import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// İkon setlerimizi ve Font'u import ediyoruz
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

// --- TypeScript Tip Tanımlamaları ---
interface Post {
    id: string;
    source: ImageSourcePropType;
    height: number;
}

interface EmptyStateProps {
    icon: React.ComponentProps<typeof Feather>['name'];
    title: string;
    subtitle: string;
}

// --- Font Yükleme ---
const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });
};

// --- Örnek Veriler ---
const userPosts: Post[] = [
    { id: '1', source: { uri: 'https://picsum.photos/seed/p1/400/500' }, height: 250 },
    { id: '2', source: { uri: 'https://picsum.photos/seed/p2/400/400' }, height: 200 },
    { id: '3', source: { uri: 'https://picsum.photos/seed/p3/400/600' }, height: 300 },
    { id: '4', source: { uri: 'https://picsum.photos/seed/p4/400/400' }, height: 200 },
    { id: '5', source: { uri: 'https://picsum.photos/seed/p5/400/550' }, height: 280 },
];
const savedPosts: Post[] = [];

// --- Boş Durum Bileşeni ---
const EmptyState = ({ icon, title, subtitle }: EmptyStateProps) => (
    <View style={styles.emptyContainer}>
        <Feather name={icon} size={48} color="#EAE0E0" />
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptySubtitle}>{subtitle}</Text>
    </View>
);


// --- Ana Profil Ekranı Bileşeni ---
export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Posted');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
        try {
            await fetchFonts();
        } catch (e) {
            console.warn(e);
        } finally {
            setFontsLoaded(true);
        }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
      return null;
  }

  const itemsToDisplay = activeTab === 'Posted' ? userPosts : savedPosts;
  const column1 = itemsToDisplay.filter((_, index) => index % 2 === 0);
  const column2 = itemsToDisplay.filter((_, index) => index % 2 !== 0);

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                {/* --- Üst Bilgi Kartı --- */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Image 
                                source={{ uri: 'https://placehold.co/200x200/EAE0E0/FFFFFF?text=JD' }} 
                                style={styles.avatar} 
                            />
                            <TouchableOpacity style={styles.editAvatarButton}>
                                <Feather name="edit-2" size={14} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>Jane Doe</Text>
                            <Text style={styles.userHandle}>@jane_doe10</Text>
                            <Text style={styles.userBio}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.profileActions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- Sekme Seçici --- */}
                <View style={styles.tabSelector}>
                    <TouchableOpacity 
                        style={[styles.tabButton, activeTab === 'Posted' ? styles.activeTabButton : styles.inactiveTabButton]}
                        onPress={() => setActiveTab('Posted')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Posted' ? styles.activeTabText : styles.inactiveTabText]}>Posted</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tabButton, activeTab === 'Saved' ? styles.activeTabButton : styles.inactiveTabButton]}
                        onPress={() => setActiveTab('Saved')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Saved' ? styles.activeTabText : styles.inactiveTabText]}>Saved</Text>
                    </TouchableOpacity>
                </View>

                {/* --- İçerik Galerisi veya Boş Durum --- */}
                {itemsToDisplay.length > 0 ? (
                    <View style={styles.galleryContainer}>
                        <View style={styles.column}>
                            {column1.map(item => (
                                <Image key={item.id} source={item.source} style={[styles.galleryImage, { height: item.height }]} />
                            ))}
                        </View>
                         <View style={styles.column}>
                            {column2.map(item => (
                                <Image key={item.id} source={item.source} style={[styles.galleryImage, { height: item.height }]} />
                            ))}
                        </View>
                    </View>
                ) : (
                    activeTab === 'Posted' ? (
                        <EmptyState 
                            icon="camera-off"
                            title="You haven't shared anything yet."
                            subtitle="Make your first post!"
                        />
                    ) : (
                         <EmptyState 
                            icon="bookmark"
                            title="You haven't saved anything yet."
                            subtitle="You can find them in Explore."
                        />
                    )
                )}
            </ScrollView>
            {/* Navigasyon barı buradan kaldırıldı, artık _layout.tsx dosyasından yönetiliyor */}
        </View>
    </SafeAreaView>
  );
}

// --- Stil Tanımlamaları ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  profileCard: {
    backgroundColor: 'black',
    borderRadius: 24,
    margin: 16,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#333',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
  },
  userHandle: {
    color: '#BDBDBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 8,
  },
  userBio: {
    color: '#E0E0E0',
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 18,
  },
  profileActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#EAE0E0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#504242',
    fontFamily: 'Montserrat-Medium',
  },
  tabSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#EAE0E0',
  },
  inactiveTabButton: {
      backgroundColor: '#967E7E',
  },
  tabText: {
    fontFamily: 'Montserrat-Medium',
  },
  activeTabText: {
    color: '#504242',
  },
  inactiveTabText: {
    color: '#FFFFFF',
  },
  galleryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  column: {
    flex: 1,
    paddingHorizontal: 6,
  },
  galleryImage: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#424242',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#9E9E9E',
    marginTop: 8,
    textAlign: 'center',
  },
});
