import React from "react";
import { Tabs, useRouter } from "expo-router";
import IconTabProfile from "../../src/components/icons/IconTabProfile";
import IconTabEvaluation from "../../src/components/icons/IconTabEvaluation";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import IconDashboardUser from "../../src/components/icons/IconDashboardUser";
import IconTabNotification from "../../src/components/icons/IconTabNotification";
import IconTabHome from "../../src/components/icons/IconTabHome";

const DashboardLayout = () => {
  const router = useRouter();
  return (
    <Tabs
      initialRouteName="/dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#00000066",
      }}
    >
      <Tabs.Screen
        name="courses/edit/index"
        options={{
          href: null,
        }}
      />

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
        name="courses/index"
        options={{
          title: "Courses",
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
          headerRight: () => (
            <TouchableOpacity className="px-2">
              <IconDashboardUser
                width={24}
                height={24}
                onPress={() => router.push("/dashboard/profile")}
              />
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
            <TouchableOpacity className="px-4" onPress={() => router.back()}>
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <IconTabNotification color={color} />,
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
