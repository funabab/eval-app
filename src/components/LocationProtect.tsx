import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";

interface Props {}

const LocationProtect: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const [locationStatus, setLocationStatus] =
    useState<Location.PermissionStatus>(Location.PermissionStatus.UNDETERMINED);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>();

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then((response) => {
      if (response.status === Location.PermissionStatus.DENIED) {
        throw new Error("Permission not granted");
      } else {
        setLocationStatus(response.status);
      }
    });
  }, []);

  useEffect(() => {
    if (locationStatus === Location.PermissionStatus.GRANTED) {
      Location.getCurrentPositionAsync().then((location) =>
        setCurrentLocation(location)
      );
    }
  }, [locationStatus]);

  return (
    <React.Fragment>
      {children}
      {locationStatus !== Location.PermissionStatus.GRANTED && (
        <Modal className="absolute left-0 top-0 w-screen h-screen" transparent>
          <View className="flex-1 bg-black/40 flex justify-center">
            <View className="bg-white px-10 py-9 rounded-2xl">
              <Text className="font-poppins-semibold600 text-xl text-center">
                Enable Location
              </Text>
              <Text className="mt-2 text-center font-poppins-medium500 text-sm">
                This App needs to be able to access your location before you can
                proceed
              </Text>

              <TouchableOpacity
                className="py-4 rounded-md bg-black mt-8"
                onPress={() => {
                  Location.requestForegroundPermissionsAsync().then(
                    (response) => setLocationStatus(response.status)
                  );
                }}
              >
                <Text className="text-white text-sm text-center font-poppins-medium500">
                  Turn on Location
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mt-4"
                onPress={() => {
                  throw new Error("Can't cancel location requirement");
                }}
              >
                <Text className="text-sm text-center font-poppins-medium500 text-black">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default LocationProtect;
