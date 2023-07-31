import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconDashboardFaceRecognition from "../src/components/icons/IconDashboardFaceRecognition";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FaceDetector from "expo-face-detector";
import * as ImageManipulator from "expo-image-manipulator";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { firebaseFunction } from "../src/firebase";
import { showMessage } from "react-native-flash-message";

const RegisterFaceScreen = () => {
  const [registerState, setRegisterState] = useState<
    "none" | "detecting" | "no-detection" | "detected"
  >("none");
  const [capturedImage, setCapturedImage] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >();
  const [resgiterFace] = useHttpsCallable(firebaseFunction, "registerUserFace");
  const router = useRouter();

  const handleCaptureImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets) {
      const image = result.assets[0];
      setCapturedImage(image);
      setRegisterState("detecting");
      const detectionResult = await FaceDetector.detectFacesAsync(image.uri);
      if (detectionResult.faces.length < 1) {
        setRegisterState("no-detection");
      } else {
        try {
          const detectedFace = detectionResult.faces[0];
          const mainpulatedImage = await ImageManipulator.manipulateAsync(
            image.uri,
            [
              {
                crop: {
                  originX: detectedFace.bounds.origin.x,
                  originY: detectedFace.bounds.origin.y,
                  width: detectedFace.bounds.size.width,
                  height: detectedFace.bounds.size.height,
                },
              },
              {
                resize: {
                  width: 1024,
                },
              },
            ],
            {
              base64: true,
              format: ImageManipulator.SaveFormat.JPEG,
            }
          );
          const response = await resgiterFace(mainpulatedImage.base64);

          if (response) {
            showMessage({
              type: "success",
              message: "Success",
              description: "Face registered successfully",
            });
            router.replace("/dashboard");
          } else {
            setRegisterState("no-detection");
          }
        } catch (e) {
          setRegisterState("no-detection");
        }
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Facial Recognition",
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerShown: true,
        }}
      />
      <ScrollView className="flex-1">
        <Text className="text-center font-poppins-semibold600 text-xl my-5">
          Facial recognition needed
        </Text>
        <View>
          <View className="items-center my-20 h-[204]">
            {capturedImage ? (
              <View className="h-full w-full">
                <ImageBackground
                  source={capturedImage}
                  resizeMode="contain"
                  className="h-full"
                />
              </View>
            ) : (
              <IconDashboardFaceRecognition />
            )}
          </View>

          <Text className="text-center my-5 font-poppins-medium500">
            {registerState === "detecting" && "Registering face.."}
            {registerState === "no-detection" && "No Face Detected"}
          </Text>
        </View>

        <TouchableOpacity
          className="mx-auto"
          onPress={handleCaptureImage}
          disabled={registerState === "detecting"}
        >
          {registerState === "detecting" ? (
            <ActivityIndicator />
          ) : (
            <AntDesign name="camera" size={30} color="black" />
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegisterFaceScreen;
