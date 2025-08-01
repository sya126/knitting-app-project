import { Feather, Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// --- Özel Navigasyon Barı Bileşeni ---
const CustomBottomBar = ({ state, navigation }: BottomTabBarProps) => {
    const TABS = [
        { name: 'home', icon: 'home', library: 'Feather' },
        { name: 'explore', icon: 'sparkles-outline', library: 'Ionicons' },
        { name: 'add', icon: 'plus-circle', library: 'Feather' },
        { name: 'notifications', icon: 'bell', library: 'Feather' },
        { name: 'profile', icon: 'user', library: 'Feather' },
    ] as const;

    return (
        <View style={styles.navContainer}>
            <View style={styles.navBar} />
            <View style={styles.navIconsContainer}>
                {TABS.map((tab, index) => {
                    const isActive = state.index === index;
                    const iconColor = isActive ? "#504242" : "white";
                    const iconSize = 24;

                    const renderIcon = () => {
                        if (tab.library === 'Ionicons') {
                            return <Ionicons name={tab.icon} size={iconSize} color={iconColor} />;
                        }
                        return <Feather name={tab.icon} size={iconSize} color={iconColor} />;
                    };

                    return (
                        <TouchableOpacity 
                            key={tab.name} 
                            onPress={() => navigation.navigate(tab.name)} 
                            style={styles.navIconWrapper}
                        >
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

// --- Ana Sekme Düzeni ---
export default function TabLayout() {
  return (
    <Tabs
        // Varsayılan bar'ı gizleyip yerine kendi özel barımızı koyuyoruz
        tabBar={props => <CustomBottomBar {...props} />}
        screenOptions={{
            headerShown: false, // Tüm ekranlarda başlığı gizle
        }}
    >
      {/* Giriş ekranı (index) buradan kaldırıldı */}
      <Tabs.Screen name="home" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

// --- Stiller ---
const styles = StyleSheet.create({
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
        height: 80,
        backgroundColor: 'black',
    },
    navIconsContainer: {
        position: 'absolute',
        bottom: 0,
        height: 80,
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
});
