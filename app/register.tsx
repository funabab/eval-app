import { Link, Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FormControlInput from "../src/components/FormControlInput";
import IconLoginGoogle from "../src/components/icons/IconLoginGoogle";

const RegitserScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Sign Up",
          headerBackVisible: false,
        }}
      />
      <ScrollView className="flex-1">
        <Text className="text-center font-poppins-semiboldItalic600">
          Please fill out every into
        </Text>
        <View className="flex-1 items-center justify-center pt-2 pb-20 px-7">
          <View className="space-y-4 w-full">
            <View>
              <FormControlInput
                placeholder="Full Name"
                textContentType="name"
              />
            </View>

            <View>
              <FormControlInput placeholder="Matric Number" />
            </View>

            <View>
              <FormControlInput placeholder="Department" />
            </View>

            <View>
              <FormControlInput
                placeholder="Phone Number"
                textContentType="telephoneNumber"
              />
            </View>

            <View>
              <FormControlInput
                placeholder="Email"
                textContentType="emailAddress"
              />
            </View>

            <View>
              <FormControlInput
                placeholder="Enter Password"
                textContentType="newPassword"
              />
            </View>

            <View>
              <FormControlInput
                placeholder="Confirm Password"
                textContentType="newPassword"
              />
            </View>

            <View>
              <TouchableOpacity className="mt-2">
                <View className="w-full bg-black py-4 px-2 rounded-xl">
                  <Text className="font-poppins-semibold600 text-white text-sm text-center">
                    Create Account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="font-poppins-semibold600 text-center text-lg text-black my-6">
            or
          </Text>

          <TouchableOpacity className="w-full">
            <View className="flex flex-row items-center py-3 px-2 rounded-xl justify-center border-2 border-black">
              <IconLoginGoogle />
              <Text className="font-poppins-semibold600 text-black text-sm text-center ml-4">
                Sign up with Google
              </Text>
            </View>
          </TouchableOpacity>

          <Link
            href="/"
            className="mt-3 text-center font-poppins-semibold600 text-base"
          >
            Already have an account? Sign in
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegitserScreen;
