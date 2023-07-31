import React, { useEffect } from "react";
import { Tabs } from "expo-router/tabs";
import IconTabProfile from "../../src/components/icons/IconTabProfile";
import IconTabEvaluation from "../../src/components/icons/IconTabEvaluation";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import IconDashboardUser from "../../src/components/icons/IconDashboardUser";
import IconTabNotification from "../../src/components/icons/IconTabNotification";
import IconTabHome from "../../src/components/icons/IconTabHome";
import { useNavigation, useRouter } from "expo-router";
import { useUser } from "../../src/hooks/useUser";
import { User } from "../../src/schemas";

const checkIncompleteRegistration = (user: User) => {
  return !user?.department || !user?.matricNumber;
};

const checkFaceRecognitionRegistration = (user: User) => {
  return !user?.faceEmbeddings;
};

const DashboardLayout = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const navigate = useNavigation();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    } else {
      if (user) {
        if (checkIncompleteRegistration(user)) {
          router.replace("/complete-registration");
          return;
        }
        if (checkFaceRecognitionRegistration(user)) {
          router.replace("/register-face");
          return;
        }
      }
    }
  }, [user, isLoading]);

  return (
    <Tabs
      id="dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#00000066",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <IconTabHome color={color} />,
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <IconTabProfile color={color} />,
        }}
      />

      <Tabs.Screen
        name="evaluation/index"
        options={{
          title: "Evaluation",
          headerTitleStyle: {
            fontFamily: "Poppins_600SemiBold",
            fontSize: 24,
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <IconTabEvaluation color={color} />,
          headerLeft: () => (
            <TouchableOpacity className="px-2" onPress={() => router.back()}>
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="notification/index"
        options={{
          headerShown: true,
          title: "Notification",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins_600SemiBold",
            fontWeight: "600",
          },
          headerLeft: () => (
            <TouchableOpacity
              className="px-4"
              onPress={() => navigate.goBack()}
            >
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <IconTabNotification color={color} />,
        }}
      />

      <Tabs.Screen
        name="courses/edit/index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="courses/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
