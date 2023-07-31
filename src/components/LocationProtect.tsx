import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { firebaseFirestore } from "../firebase";
import Loader from "./Loader";
import { Position, getDistance } from "aviation-math";

interface Props {}

const LocationProtect: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const [locationStatus, setLocationStatus] =
    useState<Location.PermissionStatus>(Location.PermissionStatus.UNDETERMINED);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>();

  const [outOfRange, setOutOfRange] = useState(false);

  const [systemDoc, isLoadingSystemDoc] = useDocumentData(
    doc(firebaseFirestore, "system/kv")
  );

  const locations = systemDoc?.locations as
    | { lat: number; lng: number }[]
    | undefined;

  const locationDistance = systemDoc?.locationDistanceRange as
    | number
    | undefined;

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

  useEffect(() => {
    if (locationDistance && locations && currentLocation) {
      const locationDistances = locations
        .map((location) =>
          getDistance(
            new Position(location.lat, location.lng),
            new Position(
              currentLocation.coords.latitude,
              currentLocation.coords.longitude
            )
          )
        )
        .filter((distance) => distance < locationDistance);

      setOutOfRange(locationDistances.length === 0);
    }
  }, [locations, currentLocation, locationDistance]);

  if (isLoadingSystemDoc && !locations) {
    return <Loader />;
  }

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

      {outOfRange && (
        <Modal className="absolute left-0 top-0 w-screen h-screen" transparent>
          <View className="flex-1 bg-black/40 flex justify-center">
            <View className="bg-white px-10 py-9 rounded-2xl">
              <Text className="font-poppins-semibold600 text-xl text-center">
                Not within location
              </Text>
              <Text className="mt-2 text-center font-poppins-medium500 text-sm">
                You are not within the location that you can access this app.
              </Text>

              <TouchableOpacity
                className="py-4 rounded-md bg-black mt-8"
                onPress={() => {
                  throw new Error("Out of range");
                }}
              >
                <Text className="text-white text-sm text-center font-poppins-medium500">
                  OK
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
