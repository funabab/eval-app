import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular_Italic,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
} from "@expo-google-fonts/poppins";
import { Text } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FIREBASE_GOOGLE_AUTH_WEB_CLIENT_Id } from "@env";

SplashScreen.preventAutoHideAsync();
GoogleSignin.configure({
  webClientId: FIREBASE_GOOGLE_AUTH_WEB_CLIENT_Id,
  offlineAccess: true,
});

const BaseLayout = () => {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        headerTitle: (props) => (
          <Text className="font-poppins-semibold600 text-xl px-7">
            {props.children}
          </Text>
        ),
        navigationBarColor: "#fff",
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    />
  );
};

export default BaseLayout;
