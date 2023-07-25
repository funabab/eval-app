import React from "react";
import { Tabs, useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import IconTabEvaluation from "../../../src/components/icons/IconTabEvaluation";
import { AntDesign } from "@expo/vector-icons";
import IconDashboardUser from "../../../src/components/icons/IconDashboardUser";

const CoursePage = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <Tabs.Screen
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

      <Text className="text-center text-base font-poppins-regularItalic400">
        Your Registered Courses
      </Text>

      <View className="mx-5">
        <FlatList
          data={["CSC 414", "CSC 414"]}
          renderItem={({ item }) => (
            <TouchableOpacity className="mt-10">
              <View className="border-2 border-black rounded-lg py-2">
                <Text className="font-poppins-medium500 text-base text-center">
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <View className="flex-row justify-end mt-10">
          <TouchableOpacity
            onPress={() => router.push("/dashboard/courses/edit")}
          >
            <View className="bg-black px-12 py-2 rounded-md">
              <Text className="text-base font-poppins-medium500 text-white text-center">
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CoursePage;
