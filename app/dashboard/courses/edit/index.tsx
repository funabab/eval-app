import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import IconTabEvaluation from "../../../../src/components/icons/IconTabEvaluation";
import IconDashboardUser from "../../../../src/components/icons/IconDashboardUser";

const EditCourseScreen = () => {
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
        Please Input Your Registered Courses
      </Text>

      <View className="space-y-5 mt-5">
        <View className="px-2 py-5 border-b border-black">
          <Text className="ml-4">Select department</Text>
          <Picker>
            <Picker.Item label="Computer Science" value="Computer Science" />
          </Picker>
        </View>

        <View className="px-2 py-5 border-b border-black">
          <Text className="ml-4">Select Level</Text>
          <Picker>
            <Picker.Item label="100L" value="100" />
            <Picker.Item label="200L" value="200" />
            <Picker.Item label="300L" value="300" />
            <Picker.Item label="400L" value="400" />
          </Picker>
        </View>

        <View className="px-2 py-5 border-b border-black">
          <Text className="ml-4">Select Course</Text>
          <Picker>
            <Picker.Item label="CSC" value="CSC" />
          </Picker>
        </View>
      </View>

      <View className="px-2 mt-10">
        <TouchableOpacity>
          <View className="bg-[#4CAF50] px-12 py-4 rounded-md">
            <Text className="text-base font-poppins-medium500 text-white text-center">
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditCourseScreen;
