import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_400Regular_Italic,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

const BaseLayout = () => {
  const [fontsLoaded] = useFonts({
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
