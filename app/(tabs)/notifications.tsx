import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// İkon setlerimizi ve Font'u import ediyoruz
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

// --- TypeScript Tip Tanımlamaları ---
type NotificationType = 'like' | 'comment' | 'follow' | 'course';

interface Notification {
    id: string;
    type: NotificationType;
    user: string;
    avatar: string;
    actionText: string;
    postTitle?: string;
    comment?: string;
    time: string;
    isRead: boolean;
}

// --- Font Yükleme ---
const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });
};

// --- Örnek Veriler ---
const notifications: Notification[] = [
    {
        id: '1',
        type: 'like',
        user: 'Zeynep Örgücü',
        avatar: 'https://placehold.co/100x100/EAE0E0/504242?text=ZÖ',
        actionText: 'liked your post',
        postTitle: 'Baby Blanket',
        time: '30 minutes ago',
        isRead: false,
    },
    {
        id: '2',
        type: 'comment',
        user: 'Ayşe Nakış',
        avatar: 'https://placehold.co/100x100/333/FFF?text=AN',
        actionText: 'commented on your post:',
        postTitle: 'Amigurumi Rabbit',
        comment: '"Looks great, could you share the pattern?"',
        time: '2 hours ago',
        isRead: false,
    },
    {
        id: '3',
        type: 'follow',
        user: 'Mehmet Örgü',
        avatar: 'https://placehold.co/100x100/EAE0E0/504242?text=MÖ',
        actionText: 'started following you.',
        time: '4 hours ago',
        isRead: true,
    },
    {
        id: '4',
        type: 'course',
        user: 'New course available!',
        avatar: 'gift', // HATA DÜZELTMESİ: 'lightbulb' yerine geçerli bir ikon olan 'gift' kullanıldı.
        actionText: 'Are you ready to learn a new knitting technique?',
        postTitle: 'Our "Lace Knitting Techniques" course has started!',
        time: '2 days ago',
        isRead: true,
    },
];

// --- Bildirim Kartı Bileşeni ---
const NotificationItem = ({ notification }: { notification: Notification }) => {
    const isInteractive = notification.type === 'comment' || notification.type === 'follow';
    return (
        <View style={[styles.notificationCard, !notification.isRead && styles.unreadCard]}>
            <View style={styles.avatarContainer}>
                {notification.type === 'course' ? (
                    <Feather name={notification.avatar as any} size={24} color="#967E7E" />
                ) : (
                    <Image source={{ uri: notification.avatar }} style={styles.avatar} />
                )}
            </View>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                    <Text style={{ fontFamily: 'Montserrat-Medium' }}>{notification.user}</Text>
                    {' '}{notification.actionText}
                    {notification.postTitle && <Text style={{ fontFamily: 'Montserrat-Medium' }}> "{notification.postTitle}"</Text>}
                </Text>
                {notification.comment && <Text style={styles.commentText}>{notification.comment}</Text>}
                <Text style={styles.timeText}>{notification.time}</Text>
                {isInteractive && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>{notification.type === 'comment' ? 'Reply' : 'Follow Back'}</Text>
                        </TouchableOpacity>
                         <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>{notification.type === 'comment' ? 'Dismiss' : 'View Profile'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {notification.postTitle && notification.type !== 'course' && (
                <Image source={{ uri: 'https://picsum.photos/seed/p1/200/200' }} style={styles.postThumbnail} />
            )}
        </View>
    );
};


// --- Ana Bildirim Ekranı Bileşeni ---
export default function NotificationsScreen() {
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

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                {/* --- Başlık --- */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <TouchableOpacity>
                        <Feather name="settings" size={22} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* --- Bildirim Listesi --- */}
                <View style={styles.listContainer}>
                    <Text style={styles.listHeader}>Today</Text>
                    {notifications.slice(0, 3).map(item => <NotificationItem key={item.id} notification={item} />)}
                    
                    <Text style={styles.listHeader}>This Week</Text>
                    {notifications.slice(3).map(item => <NotificationItem key={item.id} notification={item} />)}
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  );
}

// --- Stil Tanımlamaları ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Medium',
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  listHeader: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 16,
    marginTop: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  unreadCard: {
    backgroundColor: '#F5F5F5',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAE0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
    color: '#333',
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 6,
    fontFamily: 'Montserrat-Regular',
  },
  postThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: '#967E7E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  secondaryButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
});
