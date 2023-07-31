import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import FormControlInput from "../src/components/FormControlInput";
import {
  CompleteRegistrationBody,
  completeRegistrationBodySchema,
} from "../src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseFirestore } from "../src/firebase";
import { useUser } from "../src/hooks/useUser";

interface Props {}

const CompleteRegistrationScreen: React.FC<Props> = () => {
  const { user } = useUser();
  const router = useRouter();
  const { control, handleSubmit } = useForm<CompleteRegistrationBody>({
    resolver: zodResolver(completeRegistrationBodySchema),
    defaultValues: user && {
      department: user.department,
      matricNumber: user.matricNumber,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await updateDoc(doc(firebaseFirestore, `users/${user.id}`), data);
    setIsLoading(false);
    router.replace("/dashboard");
  });

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Complete your registration",
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
              <TouchableOpacity
                className={clsx("mt-2", {
                  "opacity-60": isLoading,
                })}
                disabled={isLoading}
                onPress={() => onSubmit()}
              >
                <View className="w-full bg-black py-4 px-2 rounded-xl">
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text className="font-poppins-semibold600 text-white text-sm text-center">
                      Complete Your Registration
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompleteRegistrationScreen;
