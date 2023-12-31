export default {
  expo: {
    name: "Eval",
    slug: "eval-app",
    scheme: "evalapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.github.funabab.evalapp",
      googleServicesFile: "./google-services.json",
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    extra: {
      eas: {
        projectId: "dce73dfa-94dd-494f-80fc-012f5fe18cc8",
      },
    },
    plugins: [
      "@react-native-google-signin/google-signin",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Eval App to use your location.",
        },
      ],
    ],
  },
};
