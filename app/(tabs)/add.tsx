import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// İkon setlerimizi import ediyoruz
import { auth, db } from '@/src/firebaseConfig';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// --- Font Yükleme ---
const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });
};

// --- Başlık Bileşeni ---
const SectionHeader = ({ title, optional = false }: { title: string; optional?: boolean }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {optional && <Text style={styles.optionalText}>(Optional)</Text>}
    </View>
);

// --- Ana Gönderi Ekleme Ekranı ---
export default function AddPostScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // Form alanları için state'ler
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [materials, setMaterials] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFonts() {
        try { await fetchFonts(); } catch (e) { console.warn(e); } finally { setFontsLoaded(true); }
    }
    loadFonts();
  }, []);

  const handleSharePost = async () => {
      if (!title || !description) {
          Alert.alert("Missing Information", "Please fill in the project title and description.");
          return;
      }
      
      const user = auth.currentUser;
      if (!user) {
          Alert.alert("Not Logged In", "You must be logged in to share a post.");
          return;
      }

      setLoading(true);
      try {
          // 'posts' adında bir koleksiyon oluşturup içine yeni bir döküman ekliyoruz.
          await addDoc(collection(db, "posts"), {
              title: title,
              description: description,
              difficulty: difficulty,
              materials: materials,
              instructions: instructions,
              authorId: user.uid, // Gönderiyi yapan kullanıcının ID'si
              authorEmail: user.email, // Gönderiyi yapan kullanıcının e-postası
              createdAt: serverTimestamp(), // Gönderinin oluşturulma zamanı
          });
          
          Alert.alert("Success!", "Your project has been shared.");
          // Formu temizle
          setTitle('');
          setDescription('');
          setDifficulty('Beginner');
          setMaterials('');
          setInstructions('');

      } catch (error) {
          console.error("Error adding document: ", error);
          Alert.alert("Error", "Something went wrong. Please try again.");
      } finally {
          setLoading(false);
      }
  };

  if (!fontsLoaded) {
      return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                {/* --- Ekran Başlığı --- */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Feather name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Post</Text>
                    <TouchableOpacity style={styles.postButton} onPress={handleSharePost} disabled={loading}>
                        <Text style={styles.postButtonText}>{loading ? 'Sharing...' : 'Share'}</Text>
                    </TouchableOpacity>
                </View>

                {/* --- Fotoğraf Ekleme Alanı --- */}
                <View style={styles.section}>
                    <SectionHeader title="Add Photos" />
                    <TouchableOpacity style={styles.photoUploadBox}>
                        <Feather name="image" size={32} color="#967E7E" />
                        <Text style={styles.photoUploadText}>Tap to add photos</Text>
                        <Text style={styles.photoUploadSubtext}>(You can add up to 5 photos)</Text>
                    </TouchableOpacity>
                </View>

                {/* --- Proje Detayları --- */}
                <View style={styles.section}>
                    <SectionHeader title="Project Details" />
                    <Text style={styles.inputLabel}>Project Title</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g., Baby Blanket"
                        placeholderTextColor="#BDBDBD"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput 
                        style={[styles.input, styles.multilineInput]} 
                        placeholder="Tell us about your project..."
                        placeholderTextColor="#BDBDBD"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                {/* --- Zorluk Seviyesi --- */}
                <View style={styles.section}>
                    <SectionHeader title="Difficulty Level" />
                    <View style={styles.difficultyContainer}>
                        {['Beginner', 'Mid', 'Hard'].map(level => (
                            <TouchableOpacity 
                                key={level}
                                style={[styles.difficultyButton, difficulty === level && styles.activeDifficultyButton]}
                                onPress={() => setDifficulty(level)}
                            >
                                <Text style={[styles.difficultyText, difficulty === level && styles.activeDifficultyText]}>{level}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* --- Malzemeler ve Araçlar --- */}
                <View style={styles.section}>
                    <SectionHeader title="Materials & Tools" />
                    <TextInput 
                        style={[styles.input, styles.multilineInput, {height: 120}]} 
                        placeholder="List the yarn, hooks, needles, etc."
                        placeholderTextColor="#BDBDBD"
                        multiline
                        value={materials}
                        onChangeText={setMaterials}
                    />
                </View>

                 {/* --- Talimatlar --- */}
                <View style={styles.section}>
                    <SectionHeader title="Instructions" optional />
                     <TextInput 
                        style={[styles.input, styles.multilineInput, {height: 180}]} 
                        placeholder="Write your step-by-step instructions here..."
                        placeholderTextColor="#BDBDBD"
                        multiline
                        value={instructions}
                        onChangeText={setInstructions}
                    />
                </View>

            </ScrollView>
            {/* Navigasyon barı merkezi olarak yönetildiği için buradan kaldırıldı */}
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
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
  },
  postButton: {
    backgroundColor: '#967E7E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  postButtonText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
  },
  optionalText: {
    fontSize: 14,
    color: '#BDBDBD',
    fontFamily: 'Montserrat-Regular',
    marginLeft: 8,
  },
  photoUploadBox: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 16,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoUploadText: {
    marginTop: 8,
    fontSize: 16,
    color: '#504242',
    fontFamily: 'Montserrat-Regular',
  },
  photoUploadSubtext: {
    marginTop: 4,
    fontSize: 12,
    color: '#BDBDBD',
    fontFamily: 'Montserrat-Regular',
  },
  inputLabel: {
    fontSize: 14,
    color: '#616161',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  difficultyButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#EEEEEE',
  },
  activeDifficultyButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  difficultyText: {
    color: '#333',
    fontFamily: 'Montserrat-Medium',
  },
  activeDifficultyText: {
    color: 'white',
  },
});
