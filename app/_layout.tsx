import { useCallback } from "react";
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
import { Text, View } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FIREBASE_GOOGLE_AUTH_WEB_CLIENT_Id } from "@env";
import FlashMessage from "react-native-flash-message";
import { useUser } from "../src/hooks/useUser";
import Loader from "../src/components/Loader";

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
  const { isLoading } = useUser();

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View className="flex-1" onLayout={onLayout}>
      <Stack
        id="root"
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
      <FlashMessage
        position="top"
        titleStyle={{ fontSize: 14, fontFamily: "Poppins_500Medium" }}
        hideStatusBar
      />
    </View>
  );
};

export default BaseLayout;
