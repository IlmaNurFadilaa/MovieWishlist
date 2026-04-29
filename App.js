import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { SettingsProvider } from "./src/context/SettingsContext"; // IMPORT SETTINGS CONTEXT
import { WishlistProvider } from "./src/context/WishlistContext";
import AppNavigator from "./src/navigation/AppNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_600SemiBold,
          Poppins_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    // BUNGKUS APLIKASI DENGAN SETTINGSPROVIDER AGAR TIDAK WHITE SCREEN
    <SettingsProvider>
      <WishlistProvider>
        <AppNavigator onReady={onLayoutRootView} />
      </WishlistProvider>
    </SettingsProvider>
  );
}