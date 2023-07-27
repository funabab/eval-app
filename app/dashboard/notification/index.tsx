import React from "react";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

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
