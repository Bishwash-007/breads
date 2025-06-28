import React, { useEffect } from "react";
import { Appearance } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@clerk/clerk-expo";
import { useFonts } from "@expo-google-fonts/dm-sans";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useRouter, useSegments } from "expo-router";
import AppShell from "./AppShell";
import { useThemeStore } from "@/context/useThemeStore";

const AppBootstrap = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  // Set initial theme from system
  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    if (systemTheme === "dark" || systemTheme === "light") {
      useThemeStore.getState().setTheme(systemTheme);
    }
  }, []);

  // Prevents splash screen autohhide
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Hide splash once fonts are ready
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoaded]);

  // routes
  useEffect(() => {
    if (!isLoaded || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    if (isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/(tabs)/feed");
    } else if (!isSignedIn && inAuthGroup) {
      router.replace("/(public)");
    }

    SplashScreen.hideAsync();
  }, [isLoaded, isSignedIn, fontsLoaded]);

  if (!fontsLoaded || !isLoaded) return null;

  return <AppShell />;
};

export default AppBootstrap;
