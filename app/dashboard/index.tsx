import React from "react";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import IconDashboardUser from "../../src/components/icons/IconDashboardUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import IconDashboardProfile from "../../src/components/icons/IconDashboardProfile";
import IconDashboardEvaluation from "../../src/components/icons/IconDashboardEvaluation";
import IconDashboardAbout from "../../src/components/icons/IconDashboardAbout";
import IconDashboardNotification from "../../src/components/icons/IconDashboardNotification";
import IconDashboardTimetable from "../../src/components/icons/IconDashboardTimetable";
import IconDashboardExit from "../../src/components/icons/IconDashboardExit";

interface Props {}

const DashboardHome: React.FC<Props> = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView className="flex-1 px-5">
        <View className="flex-1 justify-center mt-16">
          <View className="flex flex-row justify-between px-4">
            <View>
              <Text className="font-poppins-semibold600 text-base text-black">
                Hi Chris
              </Text>
              <Text className="text-xs font-poppins-medium500 text-black">
                Good Morning
              </Text>
            </View>
            <IconDashboardUser />
          </View>

          <View className="bg-[#D9D9D9] px-7 py-5 mt-6 rounded-lg">
            <Text className="text-xs font-poppins-medium500">
              School will be closed on Thursday, 24 June 2020, and Friday, 25
              June 2020 due to the Public Holiday.
            </Text>
            <View className="mt-[30px] flex flex-row gap-x-1 justify-center">
              <MaterialCommunityIcons name="clock" size={16} color="black" />
              <Text className="text-xs">Posted: 25 June 2020</Text>
            </View>
          </View>

          <View className="mt-12">
            <Text className="ml-4 font-poppins-semibold600 text-base">
              Quick Actions
            </Text>

            <View className="flex flex-row justify-between mt-10">
              <TouchableOpacity>
                <View className="flex">
                  <IconDashboardProfile />
                  <Text className="text-center">Profile</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View className="flex">
                  <IconDashboardEvaluation />
                  <Text className="text-center">Evalutation</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View className="flex">
                  <IconDashboardAbout />
                  <Text className="text-center">About</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-between mt-10">
              <TouchableOpacity>
                <View className="flex">
                  <IconDashboardNotification />
                  <Text className="text-center">Notification</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View className="flex">
                  <IconDashboardTimetable />
                  <Text className="text-center">Time Table</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View className="flex">
                  <IconDashboardExit />
                  <Text className="text-center">Exit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardHome;
