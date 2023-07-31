import React from "react";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import IconDashboardUser from "../../../src/components/icons/IconDashboardUser";
import { SafeAreaView } from "react-native-safe-area-context";
import clsx from "clsx";
import { useUser } from "../../../src/hooks/useUser";
import { useSignOut } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../../src/firebase";
import LocationProtect from "../../../src/components/LocationProtect";

const MENU_ITEMS = ["Profile", "Evaluation", "Courses", "Log out"];

const DashboardProfileScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const [logout] = useSignOut(firebaseAuth);

  return (
    <LocationProtect>
      <SafeAreaView className="flex-1 justify-center bg-white">
        <View className="flex-1 mt-10">
          <View className="flex items-center">
            <IconDashboardUser height={102} width={102} />
            <Text className="text-[32px] font-poppins-medium500 mt-[18px]">
              {user?.displayName}
            </Text>
            <Text className="text-xl">{user?.department}</Text>
          </View>

          <FlatList
            data={MENU_ITEMS}
            renderItem={(item) => (
              <TouchableOpacity
                className="mt-8 mx-3"
                onPress={() => {
                  switch (item.item) {
                    case "Log out":
                      logout();
                      break;
                    case "Courses":
                      router.push("/dashboard/courses");
                      break;
                    case "Evaluation":
                      router.push("/dashboard/evaluation");
                      break;
                    case "Profile":
                      router.push("/dashboard/profile");
                      break;
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
    </LocationProtect>
  );
};

export default DashboardProfileScreen;
