import React from "react";
import { Tabs, useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import IconTabNotification from "../../../src/components/icons/IconTabNotification";
import { AntDesign } from "@expo/vector-icons";

const SAMPLE_NOTIFICATION = [
  {
    title: "Notification one",
    date: "Monday, 12/09/2023",
    time: "07:23PM",
  },

  {
    title: "Notification two",
    date: "Monday, 12/09/2023",
    time: "07:23PM",
  },
];

const NotificationScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Tabs.Screen
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

      <View className="px-4 mt-10">
        <FlatList
          data={SAMPLE_NOTIFICATION}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View className="rounded-lg bg-[#000000e3] text-white px-8 py-3 mb-6">
                <Text className="text-sm font-poppins-medium500 text-white">
                  {item.title}
                </Text>
                <View className="justify-between flex-row mt-3">
                  <Text className="text-sm font-poppins-light300 text-white">
                    {item.date}
                  </Text>

                  <Text className="text-sm font-poppins-light300 text-white">
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;
