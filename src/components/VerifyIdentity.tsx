import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FaceDetector from "expo-face-detector";
import * as ImageManipulator from "expo-image-manipulator";
import IconDashboardFaceRecognition from "./icons/IconDashboardFaceRecognition";
import { AntDesign } from "@expo/vector-icons";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { firebaseFunction } from "../firebase";
import { showMessage } from "react-native-flash-message";

interface Props {
  onVerify: () => void;
}

const VerifyIdentity: React.FC<Props> = ({ onVerify }) => {
  const [verifyState, setVerifyState] = useState<
    "none" | "detecting" | "no-detection" | "detected"
  >("none");
  const [capturedImage, setCapturedImage] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >();
  const [verifyFace, isLoading, error] = useHttpsCallable(
    firebaseFunction,
    "verifyUserFace"
  );

  const handleCaptureImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets) {
      const image = result.assets[0];
      setCapturedImage(image);
      setVerifyState("detecting");
      const detectionResult = await FaceDetector.detectFacesAsync(image.uri);
      if (detectionResult.faces.length < 1) {
        setVerifyState("no-detection");
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
          const response = await verifyFace(mainpulatedImage.base64);

          if (response) {
            if (response) {
              showMessage({
                type: "success",
                message: "Success",
                description: "Face verified successfully",
              });
              onVerify();
            } else {
              setVerifyState("no-detection");
            }
          } else {
            setVerifyState("no-detection");
          }
        } catch (e) {
          setVerifyState("no-detection");
        }
      }
    }
  };

  return (
    <View className="flex-1">
      <Text className="text-center font-poppins-semibold600 text-xl my-5">
        Facial recognition needed before evaluation form can be filled
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
          {verifyState === "detecting" && "Verifying face.."}
          {verifyState === "no-detection" && "Not verified"}
        </Text>
      </View>

      <TouchableOpacity
        className="mx-auto"
        onPress={handleCaptureImage}
        disabled={verifyState === "detecting"}
      >
        {verifyState === "detecting" ? (
          <ActivityIndicator />
        ) : (
          <AntDesign name="camera" size={30} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VerifyIdentity;
