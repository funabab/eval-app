import React, { useMemo } from "react";
import { useRouter } from "expo-router";
import {
  BackHandler,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconDashboardUser from "../../src/components/icons/IconDashboardUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import IconDashboardProfile from "../../src/components/icons/IconDashboardProfile";
import IconDashboardEvaluation from "../../src/components/icons/IconDashboardEvaluation";
import IconDashboardAbout from "../../src/components/icons/IconDashboardAbout";
import IconDashboardNotification from "../../src/components/icons/IconDashboardNotification";
import IconDashboardTimetable from "../../src/components/icons/IconDashboardTimetable";
import IconDashboardExit from "../../src/components/icons/IconDashboardExit";
import { useUser } from "../../src/hooks/useUser";
import dayjs from "dayjs";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Timestamp, collection, limit, query } from "firebase/firestore";
import { firebaseFirestore } from "../../src/firebase";
import Loader from "../../src/components/Loader";

interface Props {}

const DashboardHome: React.FC<Props> = () => {
  const router = useRouter();
  const { user } = useUser();
  const [broadcast, isLoadingBroadcast] = useCollectionDataOnce(
    query(collection(firebaseFirestore, "broadcasts"), limit(1))
  );

  const dayPeriod = useMemo(() => {
    const date = dayjs();
    const hour = date.hour();

    if (hour <= 12) {
      return "Morning";
    } else if (hour <= 16) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }, []);

  if (isLoadingBroadcast || !broadcast) {
    return <Loader />;
  }

  const latestBroadcast = broadcast[0] as {
    title: string;
    message: string;
    createdAt: Timestamp;
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5">
        <View className="flex-1 justify-center mt-16">
          <View className="flex flex-row justify-between px-4">
            <View>
              <Text className="font-poppins-semibold600 text-base text-black">
                Hi {user?.displayName}
              </Text>
              <Text className="text-xs font-poppins-medium500 text-black">
                Good {dayPeriod}
              </Text>
            </View>
            <IconDashboardUser />
          </View>

          <View className="bg-[#D9D9D9] px-7 py-5 mt-6 rounded-lg">
            <Text className="text-xs font-poppins-medium500">
              {latestBroadcast.message}
            </Text>
            <View className="mt-[30px] flex flex-row gap-x-1 justify-center">
              <MaterialCommunityIcons name="clock" size={16} color="black" />
              <Text className="text-xs">
                Posted:{" "}
                {dayjs(latestBroadcast.createdAt.toDate()).format(
                  "DD MMMM YYYY"
                )}
              </Text>
            </View>
          </View>

          <View className="mt-12">
            <Text className="ml-4 font-poppins-semibold600 text-base">
              Quick Actions
            </Text>

            <View className="flex flex-row justify-between mt-10">
              <TouchableOpacity
                onPress={() => router.push("/dashboard/profile")}
              >
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

              {Platform.OS === "android" && (
                <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                  <View className="flex">
                    <IconDashboardExit />
                    <Text className="text-center">Exit</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardHome;
