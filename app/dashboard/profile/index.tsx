import React from "react";
import { Tabs, useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import IconTabProfile from "../../../src/components/icons/IconTabProfile";
import { ScrollView } from "react-native-gesture-handler";
import IconDashboardUser from "../../../src/components/icons/IconDashboardUser";
import { SafeAreaView } from "react-native-safe-area-context";
import clsx from "clsx";

const MENU_ITEMS = ["Profile", "Evaluation", "Courses", "Log out"];

const DashboardProfileScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      <Tabs.Screen
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <IconTabProfile color={color} />,
        }}
      />
      <View className="flex-1 mt-10">
        <View className="flex items-center">
          <IconDashboardUser height={102} width={102} />
          <Text className="text-[32px] font-poppins-medium500 mt-[18px]">
            Chris Adams
          </Text>
          <Text className="text-xl">Computer Science</Text>
        </View>

        <FlatList
          data={MENU_ITEMS}
          renderItem={(item) => (
            <TouchableOpacity
              className="mt-8 mx-3"
              onPress={() => {
                if (item.item === "Log out") {
                  router.push("/");
                }
              }}
            >
              <Text
                className={clsx("border-black text-2xl pl-12 pb-2", {
                  "border-b-2": item.index < MENU_ITEMS.length - 1,
                })}
              >
                {item.item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default DashboardProfileScreen;
