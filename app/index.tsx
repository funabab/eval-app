import { Link, Stack, useRouter } from "expo-router";
import IconLoginUser from "../src/components/icons/IconLoginUser";
import { ScrollView, Text, View } from "react-native";
import FormControl from "../src/components/FormControl";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconLoginGoogle from "../src/components/icons/IconLoginGoogle";
import {
  firebaseAuth,
  firebaseErrors,
  signInWithGoogle,
} from "../src/firebase";
import { Controller, useForm } from "react-hook-form";
import { LoginAccountBody, loginAccountBodySchema } from "../src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import clsx from "clsx";
import { useEffect } from "react";
import { showMessage } from "react-native-flash-message";

export const LoginScreen = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginAccountBody>({
    resolver: zodResolver(loginAccountBodySchema),
  });
  const [login, user, isLoading, error] =
    useSignInWithEmailAndPassword(firebaseAuth);

  useEffect(() => {
    if (error) {
      showMessage({
        type: "danger",
        message: "Error",
        description: firebaseErrors[error.code],
      });
    }
  }, [error]);

  const onSubmit = handleSubmit((data: LoginAccountBody) => {
    login(data.email, data.password).catch((e) => {
      console.error(e);
    });
  });

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Log in",
          headerShown: true,
        }}
      />
      <ScrollView className="flex-1">
        <View className="flex-1 items-center justify-center pt-10 pb-20">
          <IconLoginUser />
          <Text className="text-center text-base mt-2 font-poppins-semibold600">
            Welcome back
          </Text>

          <View className="px-7 w-full mt-7">
            <View className="space-y-6">
              <View>
                <Controller
                  control={control}
                  name="email"
                  render={({
                    field: { onBlur, onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl
                      label="Enter Email Address"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      placeholder="Email address"
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
                    <FormControl
                      label="Input Password"
                      textContentType="newPassword"
                      placeholder="password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      errorMessage={error?.message}
                      secureTextEntry
                    />
                  )}
                />
              </View>
            </View>
            <TouchableOpacity
              className={clsx("mt-10", {
                "opacity-40": isLoading,
              })}
              disabled={isLoading}
              onPress={() => onSubmit()}
            >
              <View className="w-full bg-black py-4 px-2 rounded-xl">
                <Text className="font-poppins-semibold600 text-white text-sm text-center">
                  Login
                </Text>
              </View>
            </TouchableOpacity>

            <Text className="font-poppins-semibold600 text-center text-lg text-black my-6">
              or
            </Text>

            <TouchableOpacity onPress={() => signInWithGoogle()}>
              <View className="w-full flex flex-row items-center py-3 px-2 rounded-xl justify-center border-2 border-black">
                <IconLoginGoogle />
                <Text className="font-poppins-semibold600 text-black text-sm text-center ml-4">
                  Sign in with Google
                </Text>
              </View>
            </TouchableOpacity>

            <Link
              href="/register"
              className="mt-3 text-center font-poppins-semibold600 text-base"
            >
              Don’t have an account? Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
