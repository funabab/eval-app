import React, { useMemo } from "react";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Timestamp, collection } from "firebase/firestore";
import { firebaseFirestore } from "../../../src/firebase";
import Loader from "../../../src/components/Loader";
import dayjs from "dayjs";

const NotificationScreen = () => {
  const router = useRouter();
  const [broadcasts, isLoading] = useCollectionDataOnce(
    collection(firebaseFirestore, "broadcasts")
  );

  const allBroadcasts = useMemo(
    () =>
      broadcasts?.map(
        (broadcast: {
          title: string;
          message: string;
          createdAt: Timestamp;
        }) => {
          const date = dayjs(broadcast.createdAt.toDate());

          return {
            ...broadcast,
            date: date.format("dddd, DD/MM/YYYY"),
            time: date.format("mm:ssA"),
          };
        }
      ),
    [broadcasts]
  );

  if (isLoading || !broadcasts) {
    return <Loader />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 mt-10">
        <FlatList
          data={allBroadcasts}
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
