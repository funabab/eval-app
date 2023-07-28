import { Link, Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FormControlInput from "../src/components/FormControlInput";
import IconLoginGoogle from "../src/components/icons/IconLoginGoogle";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAccountBody, registerAccountBodySchema } from "../src/schemas";
import { showMessage } from "react-native-flash-message";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { firebaseFunction } from "../src/firebase";
import clsx from "clsx";

const RegitserScreen = () => {
  const { control, handleSubmit } = useForm<RegisterAccountBody>({
    resolver: zodResolver(registerAccountBodySchema),
  });
  const router = useRouter();

  const [createAccount, isLoading, error] = useHttpsCallable(
    firebaseFunction,
    "registerAccount"
  );

  useEffect(() => {
    if (error) {
      showMessage({
        message: "Error",
        type: "danger",
        description: error.message,
      });
    }
  }, [error]);

  const onSubmit = handleSubmit((data) => {
    createAccount(data)
      .then((response) => {
        if (response) {
          showMessage({
            message: "Success",
            type: "success",
            description: (response.data as any).message,
          });
          router.replace("/");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Sign Up",
          headerBackVisible: false,
          headerShown: true,
        }}
      />
      <ScrollView className="flex-1">
        <Text className="text-center font-poppins-semiboldItalic600">
          Please fill out every into
        </Text>
        <View className="flex-1 items-center justify-center pt-2 pb-20 px-7">
          <View className="space-y-4 w-full">
            <View>
              <Controller
                control={control}
                name="fullName"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlInput
                    placeholder="Full Name"
                    textContentType="name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />
            </View>

            <View>
              <Controller
                control={control}
                name="matricNumber"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlInput
                    placeholder="Matric Number"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />
            </View>

            <View>
              <Controller
                control={control}
                name="department"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlInput
                    placeholder="Department"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />
            </View>

            <View>
              <Controller
                control={control}
                name="phoneNumber"
                defaultValue="+234"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlInput
                    placeholder="Phone Number"
                    textContentType="telephoneNumber"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />
            </View>

            <View>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlInput
                    placeholder="Email"
                    textContentType="emailAddress"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />
            </View>

            <View>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlInput
                    placeholder="Enter Password"
                    textContentType="newPassword"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                    secureTextEntry
                  />
                )}
              />
            </View>

            <View>
              <Controller
                control={control}
                name="confirmPassword"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControlInput
                    placeholder="Confirm Password"
                    textContentType="newPassword"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                    secureTextEntry
                  />
                )}
              />
            </View>

            <View>
              <TouchableOpacity
                className={clsx("mt-2", {
                  "opacity-60": isLoading,
                })}
                disabled={isLoading}
                onPress={() => onSubmit()}
              >
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
