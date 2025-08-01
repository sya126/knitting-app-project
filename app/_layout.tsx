import { Stack } from 'expo-router';
import React from 'react';

// Bu, uygulamanın ana yönlendiricisidir.
// Giriş ekranı (index) ve sekmeler grubu ((tabs)) arasında geçişi yönetir.
export default function RootLayout() {
  return (
    <Stack>
      {/* Giriş ekranını (app/index.tsx) gösterir */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Sekmeler grubunu (app/(tabs)) gösterir */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
