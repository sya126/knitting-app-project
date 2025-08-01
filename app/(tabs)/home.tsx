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
interface SuggestionCardProps {
    image: ImageSourcePropType;
    title: string;
    description: string;
    author: string;
    likes: number;
}

// --- Font Yükleme ---
const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });
};

// --- Örnek Veriler ---
const suggestions: SuggestionCardProps[] = [
    { 
        image: { uri: 'https://picsum.photos/seed/s1/400/400' },
        title: 'Easy Baby Booties',
        description: 'Ideal for beginners, a quick and adorable project.',
        author: '@knit_love',
        likes: 248,
    },
    { 
        image: { uri: 'https://picsum.photos/seed/s2/400/400' },
        title: 'Chic Winter Scarf Models',
        description: 'Knit stylish scarf models with different patterns and techniques.',
        author: '@yarn_world',
        likes: 187,
    },
    { 
        image: { uri: 'https://picsum.photos/seed/s3/400/400' },
        title: 'Amigurumi Starter Set',
        description: 'A step-by-step guide for those new to amigurumi.',
        author: '@amigurumi_ask',
        likes: 324,
    },
];

// --- Öneri Kartı Bileşeni ---
const SuggestionCard = ({ image, title, description, author, likes }: SuggestionCardProps) => (
    <View style={styles.card}>
        <Image source={image} style={styles.cardImage} />
        <TouchableOpacity style={styles.bookmarkButton}>
            <Feather name="bookmark" size={18} color="#504242" />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <View style={styles.cardFooter}>
            <View style={styles.authorInfo}>
                <View style={styles.authorAvatar} />
                <Text style={styles.authorName}>{author}</Text>
            </View>
            <View style={styles.likesInfo}>
                <Feather name="heart" size={14} color="#9E9E9E" />
                <Text style={styles.likesCount}>{likes}</Text>
            </View>
        </View>
    </View>
);

// --- Başlık Bileşeni ---
const SectionHeader = ({ title, actionText }: { title: string; actionText?: string }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {actionText && (
            <TouchableOpacity>
                <Text style={styles.sectionAction}>{actionText}</Text>
            </TouchableOpacity>
        )}
    </View>
);


// --- Ana Sayfa Ekranı Bileşeni ---
export default function HomeScreen() {
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
                {/* --- Karşılama Mesajı --- */}
                <View style={styles.welcomeHeader}>
                    <Feather name="user" size={24} color="#333" />
                    <View style={styles.welcomeTextContainer}>
                        <Text style={styles.welcomeTitle}>Hello, Ayşe!</Text>
                        <Text style={styles.welcomeSubtitle}>What would you like to discover today?</Text>
                    </View>
                </View>

                {/* --- Ana Aksiyon Butonları --- */}
                <View style={styles.mainActions}>
                    <TouchableOpacity style={styles.actionButtonPrimary}>
                        <Feather name="plus" size={20} color="white" />
                        <Text style={styles.actionButtonPrimaryText}>Start New Project</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButtonSecondary}>
                        <Feather name="search" size={20} color="#333" />
                        <Text style={styles.actionButtonSecondaryText}>Explore</Text>
                    </TouchableOpacity>
                </View>

                {/* --- Zorluk Kategorileri --- */}
                <SectionHeader title="Categories by Difficulty" />
                <View style={styles.difficultyContainer}>
                    <TouchableOpacity style={styles.difficultyButton}>
                        <Text style={styles.difficultyText}>Beginner Friendly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.difficultyButton}>
                        <Text style={styles.difficultyText}>Mid Level</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.difficultyButton}>
                        <Text style={styles.difficultyText}>Hard</Text>
                    </TouchableOpacity>
                </View>

                {/* --- Senin İçin Öneriler --- */}
                <SectionHeader title="Suggestions for You" actionText="See All" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
                    {suggestions.map(item => <SuggestionCard key={item.title} {...item} />)}
                </ScrollView>

                {/* --- Günün İpucu --- */}
                <SectionHeader title="Tip of the Day" />
                <View style={styles.tipCard}>
                    <Text style={styles.tipText}>
                        To get straight edges in your knitting, slip the first stitch of every row purlwise. This technique creates a neat, chain-like edge.
                    </Text>
                    <TouchableOpacity style={styles.tipButton}>
                        <Text style={styles.tipButtonText}>More Tips</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            {/* Navigasyon barı buradan kaldırıldı, artık _layout.tsx dosyasından yönetiliyor */}
        </View>
    </SafeAreaView>
  );
}

// --- Stil Tanımlamaları ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  welcomeTextContainer: {
    marginLeft: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
    color: '#111',
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#666',
    fontFamily: 'Montserrat-Regular',
  },
  mainActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  actionButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#967E7E', // Gül kurusu
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  actionButtonPrimaryText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 8,
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  actionButtonSecondaryText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: '#111',
  },
  sectionAction: {
    fontSize: 14,
    color: '#967E7E',
    fontFamily: 'Montserrat-Medium',
  },
  difficultyContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  difficultyButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    flex: 1,
  },
  difficultyText: {
    color: '#333',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  suggestionsScroll: {
    paddingLeft: 24,
    paddingRight: 12,
  },
  card: {
    width: 280,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 12,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  authorName: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'Montserrat-Regular',
  },
  likesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
    fontFamily: 'Montserrat-Regular',
  },
  tipCard: {
    backgroundColor: '#EAE0E0',
    margin: 24,
    borderRadius: 16,
    padding: 20,
  },
  tipText: {
    fontSize: 15,
    color: '#504242',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 22,
    marginBottom: 16,
  },
  tipButton: {
    backgroundColor: '#967E7E',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  tipButtonText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
});
