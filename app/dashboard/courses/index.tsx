import React from "react";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import LocationProtect from "../../../src/components/LocationProtect";

const CoursePage = () => {
  const router = useRouter();
  return (
    <LocationProtect>
      <View className="flex-1 bg-white">
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
    </LocationProtect>
  );
};

export default CoursePage;
