import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
// İkon setlerimizi import ediyoruz
import { Feather, Ionicons } from '@expo/vector-icons';
// Özel şekil için SVG kütüphanesini import ediyoruz
import * as Font from 'expo-font';

// --- TypeScript Tip Tanımlamaları ---
interface Model {
    id: string;
    source: ImageSourcePropType;
    title: string;
    author: string;
    mainImage: string;
    diagramImage: string;
    materials: string[];
    pattern: string[];
}

interface CustomBottomBarProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
}

// --- Font Yükleme ---
const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });
};

// --- Örnek Veriler ---
const models: Model[] = [
    { 
        id: '1', 
        source: { uri: 'https://picsum.photos/seed/a/400/400' },
        title: 'Star Granny Square',
        author: 'JaneDoe10',
        mainImage: 'https://i.pinimg.com/564x/8d/96/11/8d/961184a86f06a01b2f70396fb9925e.jpg',
        diagramImage: 'https://i.pinimg.com/564x/6e/86/6e/6e866e1338a113d7a858175b92b67825.jpg',
        materials: ['Hook-3.00MM', 'Yarn Weight-3 Light', 'Needle', 'Marking Clip'],
        pattern: [
            'R1: MR,Ch×3, Dcx14, Sl.st',
            'R2: [Ch×5,Sc×l, Hdc× l, Dc×l, Tr×l, Sk2 Sl.st in 3rd st]repeat five times in this circle, fasten off',
            'R3: [Sc×l (change color) (BLO) Hdc×l, (BLO) Dc×l] repeat five times in this circle, Sl.st',
        ]
    },
    { id: '2', source: { uri: 'https://picsum.photos/seed/b/400/500' }, title: 'Cozy Winter Hat', mainImage: 'https://picsum.photos/seed/b/400/500', diagramImage: 'https://picsum.photos/seed/b2/400/400', materials: ['Hook-5.00MM'], pattern: ['R1: Start here.'], author: 'User2' },
    { id: '3', source: { uri: 'https://picsum.photos/seed/c/400/600' }, title: 'Market Net Bag', mainImage: 'https://picsum.photos/seed/c/400/600', diagramImage: 'https://picsum.photos/seed/c2/400/400', materials: ['Hook-4.00MM'], pattern: ['R1: Begin pattern.'], author: 'User3' },
    { id: '4', source: { uri: 'https://picsum.photos/seed/d/400/400' }, title: 'Moon Motif', mainImage: 'https://picsum.photos/seed/d/400/400', diagramImage: 'https://picsum.photos/seed/d2/400/400', materials: ['Hook-2.50MM'], pattern: ['R1: Follow diagram.'], author: 'User4' },
    { id: '5', source: { uri: 'https://picsum.photos/seed/e/400/550' }, title: 'Waffle Stitch Scarf', mainImage: 'https://picsum.photos/seed/e/400/550', diagramImage: 'https://picsum.photos/seed/e2/400/400', materials: ['Hook-6.00MM'], pattern: ['R1: Make a chain.'], author: 'User5' },
];

// --- Model Detay Kartı Bileşeni ---
const ModelDetailCard = ({ model, onClose }: { model: Model; onClose: () => void }) => {
    return (
        <Pressable style={styles.overlayContainer} onPress={onClose}>
            <Pressable style={styles.detailCard}>
                <View style={styles.detailTopSection}>
                    <View style={styles.detailImageContainer}>
                        <Image source={{ uri: model.mainImage }} style={styles.detailMainImage} />
                    </View>
                    <View style={styles.detailInfoContainer}>
                        <Text style={styles.detailTitle}>{model.title}</Text>
                        <Text style={styles.detailAuthor}>posted by {model.author}</Text>
                        <View>
                            {model.materials.map((item, index) => (
                                <Text key={index} style={styles.materialItem}>• {item}</Text>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.detailBottomSection}>
                    <View style={styles.writtenPatternSection}>
                        <Text style={styles.sectionTitle}>Written Pattern</Text>
                        {model.pattern.map((step, index) => (
                            <Text key={index} style={styles.patternStep}>{step}</Text>
                        ))}
                    </View>
                    <View style={styles.diagramSection}>
                        <Image
                            source={{ uri: model.diagramImage }}
                            style={styles.diagramImage}
                        />
                    </View>
                </View>
            </Pressable>
        </Pressable>
    );
};


// --- Özel Navigasyon Barı ---
const CustomBottomBar = ({ activeTab, onTabPress }: CustomBottomBarProps) => {
    const TABS = [
        { name: 'explore', icon: 'sparkles-outline', library: 'Ionicons' },
        { name: 'add', icon: 'plus-circle', library: 'Feather' },
        { name: 'home', icon: 'home', library: 'Feather' },
        { name: 'notifications', icon: 'bell', library: 'Feather' },
        { name: 'profile', icon: 'user', library: 'Feather' },
    ] as const;

    return (
        <View style={styles.navContainer}>
            <View style={styles.navBar} />
            <View style={styles.navIconsContainer}>
                {TABS.map(tab => {
                    const isActive = activeTab === tab.name;
                    const iconColor = isActive ? "#504242" : "white";
                    const iconSize = 24;

                    const renderIcon = () => {
                        if (tab.library === 'Ionicons') {
                            return <Ionicons name={tab.icon} size={iconSize} color={iconColor} />;
                        }
                        return <Feather name={tab.icon} size={iconSize} color={iconColor} />;
                    };

                    return (
                        <TouchableOpacity key={tab.name} onPress={() => onTabPress(tab.name)} style={styles.navIconWrapper}>
                            {isActive ? (
                                <View style={styles.activeIconContainer}>
                                    {renderIcon()}
                                </View>
                            ) : (
                                renderIcon()
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};


// --- Ana Keşfet Ekranı Bileşeni ---
export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [activeNavTab, setActiveNavTab] = useState('explore');
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

  const renderCategoryButton = (category: string, customStyle: StyleProp<ViewStyle> = {}) => (
    <TouchableOpacity
        key={category}
        style={[styles.categoryButton, activeCategory === category && styles.activeCategoryButton, customStyle]}
        onPress={() => setActiveCategory(category)}
    >
        <Text style={[styles.categoryText, activeCategory === category && styles.activeCategoryText]}>
            {category}
        </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={{flex: 1}}>
            <View style={styles.contentContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}
                >
                    <View style={styles.searchWrapper}>
                        <View style={styles.searchContainer}>
                            <Feather name="search" size={22} color="#A99999" style={styles.searchIcon} />
                            <TextInput
                                placeholder="Search for the model you want"
                                placeholderTextColor="#A99999"
                                style={styles.searchInput}
                            />
                            <Feather name="mic" size={22} color="#A99999" />
                        </View>
                    </View>

                    <View style={styles.mainContent}>
                        <View style={styles.leftColumn}>
                            <View style={styles.categoryContainer}>
                                <View style={styles.categoryRow}>
                                    {renderCategoryButton('Popular')}
                                    {renderCategoryButton('Bags')}
                                </View>
                                <View style={styles.categoryRow}>
                                    {renderCategoryButton('Amigurumi', {width: '100%'})}
                                </View>
                                <View style={styles.categoryRow}>
                                    {renderCategoryButton('Scarves')}
                                    {renderCategoryButton('Blankets')}
                                </View>
                                 <View style={styles.categoryRow}>
                                    {renderCategoryButton('Granny Squares', {width: '100%'})}
                                </View>
                                 <View style={styles.categoryRow}>
                                    {renderCategoryButton('More')}
                                </View>
                            </View>
                            <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectedModel(models[1])}>
                                <Image source={models[1].source} style={[styles.galleryImage, { height: 200 }]} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectedModel(models[3])}>
                                <Image source={models[3].source} style={[styles.galleryImage, { height: 240 }]} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rightColumn}>
                            <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectedModel(models[0])}>
                                <Image source={models[0].source} style={[styles.galleryImage, { height: 180 }]} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectedModel(models[2])}>
                                <Image source={models[2].source} style={[styles.galleryImage, { height: 240 }]} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectedModel(models[4])}>
                                <Image source={models[4].source} style={[styles.galleryImage, { height: 200 }]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <CustomBottomBar activeTab={activeNavTab} onTabPress={setActiveNavTab} />
            
            {/* Detay Kartı Overlay'i */}
            {selectedModel && <ModelDetailCard model={selectedModel} onClose={() => setSelectedModel(null)} />}
        </View>
    </SafeAreaView>
  );
}

// --- Stil Tanımlamaları ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  contentContainer: { flex: 1, backgroundColor: 'white' },
  searchWrapper: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1.5, borderColor: '#F0F0F0' },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: '#333', fontFamily: 'Montserrat-Regular' },
  mainContent: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24 },
  leftColumn: { width: '48%' },
  rightColumn: { width: '48%' },
  categoryContainer: { marginBottom: 12 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  categoryButton: { backgroundColor: '#DBC8C8', paddingVertical: 10, borderRadius: 8, alignItems: 'center', flex: 1, marginHorizontal: 2 },
  activeCategoryButton: { backgroundColor: '#967E7E' },
  categoryText: { color: '#504242', fontSize: 14, fontFamily: 'Montserrat-Medium' },
  activeCategoryText: { color: '#FFFFFF' },
  imageContainer: { borderWidth: 1.5, borderColor: '#F0F0F0', borderRadius: 12, padding: 4, marginBottom: 12 },
  galleryImage: { width: '100%', borderRadius: 8, resizeMode: 'cover' },
  // Düz Navigasyon Bar Stilleri
  navContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 80,
  },
  navBar: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 60,
      backgroundColor: 'black',
  },
  navIconsContainer: {
      position: 'absolute',
      bottom: 0,
      height: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  navIconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: '100%',
  },
  activeIconContainer: {
      position: 'absolute',
      top: -20,
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#EAE0E0',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
  },
  // Detay Kartı Stilleri
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    zIndex: 100,
  },
  detailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    padding: 16,
  },
  detailTopSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailImageContainer: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  detailMainImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  detailInfoContainer: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  detailTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
  detailAuthor: {
    color: '#E0E0E0',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginTop: 2,
    marginBottom: 8,
  },
  materialItem: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  detailBottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  writtenPatternSection: {
    flex: 0.6,
    marginRight: 16,
  },
  diagramSection: {
    flex: 0.4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 8,
    color: 'black',
  },
  patternStep: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#333',
    marginBottom: 6,
    lineHeight: 16,
  },
  diagramImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
  },
});
