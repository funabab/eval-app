import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const BaseLayout = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
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
        header: (props) => (
          <SafeAreaView>
            <Text className="font-poppins-semibold600 text-xl px-7 py-5">
              {props.options.title}
            </Text>
          </SafeAreaView>
        ),
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    />
  );
};

export default BaseLayout;
