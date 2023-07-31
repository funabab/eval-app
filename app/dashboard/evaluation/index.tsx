import React, { useState } from "react";
import VerifyIdentity from "../../../src/components/VerifyIdentity";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import LocationProtect from "../../../src/components/LocationProtect";
import { ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import {
  EvaluationBody,
  evaluationBodySchema,
} from "../../../src/schemas/evaluation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControlInput from "../../../src/components/FormControlInput";
import { Picker } from "@react-native-picker/picker";
import clsx from "clsx";
import { addDoc, collection, doc } from "firebase/firestore";
import { firebaseFirestore } from "../../../src/firebase";
import { showMessage } from "react-native-flash-message";
import { useRouter } from "expo-router";

const EvaluationScreen = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { control, handleSubmit } = useForm<EvaluationBody>({
    resolver: zodResolver(evaluationBodySchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    addDoc(collection(firebaseFirestore, "evaluations"), data)
      .then(() => {
        showMessage({
          type: "success",
          message: "Success",
          description: "Evaluation submitted successfully",
        });
        setIsVerified(false);
        router.replace("/dashboard");
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <LocationProtect>
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1">
          {!isVerified && (
            <VerifyIdentity onVerify={() => setIsVerified(true)} />
          )}

          {isVerified && (
            <React.Fragment>
              <Text className="text-center font-poppins-semiboldItalic600">
                please answer all questions
              </Text>
              <View className="flex-1 items-center justify-center pt-2 pb-20 px-7 mt-10">
                <View className="space-y-8 w-full">
                  <View>
                    <Text className="font-poppins-medium500 text-base">
                      Matric Number
                    </Text>
                    <Controller
                      control={control}
                      name="matricNumber"
                      render={({
                        field: { onBlur, onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControlInput
                          placeholder="Answer here"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          errorMessage={error?.message}
                        />
                      )}
                    />
                  </View>

                  <View>
                    <Text className="font-poppins-medium500 text-base">
                      Was the lecturer present?
                    </Text>
                    <Controller
                      control={control}
                      name="lecturerPresence"
                      render={({ field: { onBlur, onChange, value } }) => (
                        <View className="rounded-xl border-2 mt-1">
                          <Picker
                            placeholder="Answer here"
                            onBlur={onBlur}
                            onValueChange={(item) => onChange(item)}
                            selectedValue={value}
                          >
                            <Picker.Item label="Answer here" enabled={false} />
                            <Picker.Item label="yes" value="yes" />
                            <Picker.Item label="no" value="yes" />
                          </Picker>
                        </View>
                      )}
                    />
                  </View>

                  <View>
                    <Text className="font-poppins-medium500 text-base">
                      Course code?
                    </Text>
                    <Controller
                      control={control}
                      name="courseCode"
                      render={({
                        field: { onBlur, onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControlInput
                          placeholder="Answer here"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          errorMessage={error?.message}
                        />
                      )}
                    />
                  </View>

                  <View>
                    <Text className="font-poppins-medium500 text-base">
                      Rate the lecturer out of 5
                    </Text>
                    <Controller
                      control={control}
                      name="lecturerRate"
                      render={({ field: { onBlur, onChange, value } }) => (
                        <View className="rounded-xl border-2 mt-1">
                          <Picker
                            placeholder="Answer here"
                            onBlur={onBlur}
                            selectedValue={value}
                            onValueChange={(item) => onChange(item)}
                          >
                            <Picker.Item label="Answer here" enabled={false} />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                          </Picker>
                        </View>
                      )}
                    />
                  </View>

                  <View>
                    <Text className="font-poppins-medium500 text-base">
                      Lecturer’s Name?
                    </Text>
                    <Controller
                      control={control}
                      name="lecturerName"
                      render={({
                        field: { onBlur, onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControlInput
                          placeholder="Answer here"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          errorMessage={error?.message}
                        />
                      )}
                    />
                  </View>

                  <View>
                    <Text className="font-poppins-medium500 text-base">
                      Did the lecturer use the necessary material?
                    </Text>
                    <Controller
                      control={control}
                      name="lecturerMaterial"
                      render={({ field: { onBlur, onChange, value } }) => (
                        <View className="rounded-xl border-2 mt-1">
                          <Picker
                            placeholder="Answer here"
                            onBlur={onBlur}
                            onValueChange={(item) => onChange(item)}
                            selectedValue={value}
                          >
                            <Picker.Item label="Answer here" enabled={false} />
                            <Picker.Item label="yes" value="yes" />
                            <Picker.Item label="no" value="yes" />
                          </Picker>
                        </View>
                      )}
                    />
                  </View>

                  <View>
                    <Text className="font-poppins-medium500 text-base">
                      Was the lecturer punctual?
                    </Text>
                    <Controller
                      control={control}
                      name="lecturerPuntuality"
                      render={({ field: { onBlur, onChange, value } }) => (
                        <View className="rounded-xl border-2 mt-1">
                          <Picker
                            placeholder="Answer here"
                            onBlur={onBlur}
                            onValueChange={(item) => onChange(item)}
                            selectedValue={value}
                          >
                            <Picker.Item label="Answer here" enabled={false} />
                            <Picker.Item label="yes" value="yes" />
                            <Picker.Item label="no" value="yes" />
                          </Picker>
                        </View>
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
                      <View className="mx-auto bg-black py-4 px-16 rounded-full">
                        {isLoading ? (
                          <ActivityIndicator />
                        ) : (
                          <Text className="font-poppins-semibold600 text-white text-sm text-center">
                            Submit
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </React.Fragment>
          )}
        </ScrollView>
      </View>
    </LocationProtect>
  );
};

export default EvaluationScreen;
