import { Link, Stack, useRouter } from "expo-router";
import IconLoginUser from "../src/components/icons/IconLoginUser";
import { ScrollView, Text, View } from "react-native";
import FormControl from "../src/components/FormControl";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconLoginGoogle from "../src/components/icons/IconLoginGoogle";
import { signInWithGoogle } from "../src/firebase";

export const LoginScreen = () => {
  const router = useRouter();

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
                <FormControl
                  label="Enter Email Address"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  placeholder="Email address"
                />
              </View>

              <View>
                <FormControl
                  label="Input Password"
                  textContentType="newPassword"
                  placeholder="password"
                  secureTextEntry
                />
              </View>
            </View>
            <TouchableOpacity
              className="mt-10"
              onPress={() => router.push("/dashboard")}
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
