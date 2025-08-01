import { auth } from '@/src/firebaseConfig';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  DimensionValue,
  ImageSourcePropType,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

// --- Font Yükleme ---
const fetchFonts = () => {
  return Font.loadAsync({
    'TheSeasons-Regular': require('../assets/fonts/TheSeasons-Regular.otf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
  });
};

// --- YarnBall Bileşeni ---
const YarnBall = ({
  size,
  imageSource,
  initialX,
  initialY,
  delay = 0,
  zIndex = 1,
}: {
  size: number;
  imageSource: ImageSourcePropType;
  initialX: DimensionValue;
  initialY: DimensionValue;
  delay?: number;
  zIndex?: number;
}) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      progress.value = withRepeat(
        withTiming(1, {
          duration: 6000 + Math.random() * 5000,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true
      );
    }, delay);
    return () => clearTimeout(timeoutId);
  }, []);

const animatedStyle = useAnimatedStyle(() => {
  const translateX = interpolate(progress.value, [0, 1], [-15, 15]);
  const translateY = interpolate(progress.value, [0, 1], [-20, 20]);
  const rotate = `${interpolate(progress.value, [0, 1], [-10, 10])}deg`;

  return {
    transform: [
      { translateX },
      { translateY },
      { rotate }
    ] as const,
  };
});


  return (
    <Animated.Image
      source={imageSource}
      style={[
        styles.yarnBall,
        {
          width: size,
          height: size,
          top: initialY,
          left: initialX,
          zIndex: zIndex,
        },
        animatedStyle,
      ]}
    />
  );
};

// --- LoginScreen ---
export default function LoginScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.replace('/(tabs)/home'); // Tabs'e yönlendirme düzeltildi
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function loadResourcesAsync() {
      try {
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }
    loadResourcesAsync();
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle the redirect
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle the redirect
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <YarnBall
          size={120}
          imageSource={require('../assets/images/yumak1.png')}
          initialX="-15%"
          initialY="48%"
          zIndex={1}
        />
        <YarnBall
          size={100}
          imageSource={require('../assets/images/yumak2.png')}
          initialX="85%"
          initialY="35%"
          zIndex={1}
        />

        <View style={styles.card}>
          <Text style={styles.title}>welcome to knitting world</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSignIn}>
            <LinearGradient
              colors={['#9A707C', '#89616d']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
            <Text style={styles.orText}>continue without membership</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text style={styles.signupLink}>Sign up!</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <YarnBall
          size={110}
          imageSource={require('../assets/images/yumak1.png')}
          initialX="-8%"
          initialY="1%"
          zIndex={20}
        />
        <YarnBall
          size={100}
          imageSource={require('../assets/images/yumak3.png')}
          initialX="75%"
          initialY="-2%"
          zIndex={20}
        />
        <YarnBall
          size={100}
          imageSource={require('../assets/images/yumak3.png')}
          initialX="-5%"
          initialY="85%"
          zIndex={20}
        />
        <YarnBall
          size={110}
          imageSource={require('../assets/images/yumak2.png')}
          initialX="72%"
          initialY="85%"
          zIndex={20}
        />
      </View>
    </SafeAreaView>
  );
}

// --- Stiller ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  } as ViewStyle,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
    overflow: 'hidden',
  } as ViewStyle,
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    zIndex: 10,
  } as ViewStyle,
  title: {
    fontSize: 32,
    color: '#4A4A4A',
    fontFamily: 'TheSeasons-Regular',
    marginBottom: 30,
    textAlign: 'center',
  } as TextStyle,
  label: {
    width: '100%',
    textAlign: 'left',
    color: '#6e6e6e',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Montserrat-Medium',
  } as TextStyle,
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F9F5F6',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#EFE9EC',
    borderWidth: 1,
    marginBottom: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#5C4B51',
  } as TextStyle,
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#a0a0a0',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 25,
  } as TextStyle,
  buttonContainer: {
    width: '100%',
    borderRadius: 15,
  } as ViewStyle,
  button: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  } as ViewStyle,
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  } as TextStyle,
  orText: {
    color: '#a0a0a0',
    fontSize: 13,
    marginVertical: 20,
    fontFamily: 'Montserrat-Regular',
  } as TextStyle,
  signupText: {
    color: '#6e6e6e',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  } as TextStyle,
  signupLink: {
    color: '#89616d',
    fontFamily: 'Montserrat-Medium',
  } as TextStyle,
  yarnBall: {
    position: 'absolute',
    resizeMode: 'contain',
  } as ImageStyle,
  errorText: {
    color: 'red', 
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  } as TextStyle,
});