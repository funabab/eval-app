import clsx from "clsx";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

export interface FormControlInputProps extends TextInputProps {
  errorMessage?: string;
}

const FormControlInput: React.FC<FormControlInputProps> = ({
  errorMessage,
  ...props
}) => {
  const hasError = Boolean(errorMessage);
  return (
    <View>
      <TextInput
        className={clsx(
          "py-2 px-3 border-2 text-sm text-black mt-[10px] rounded-xl font-poppins-regular400",
          {
            "border-red-600": hasError,
          }
        )}
        placeholderTextColor="#00000099"
        {...props}
      />
      {hasError && (
        <Text className="text-xs pt-2 px-2 font-poppins-medium500 text-red-600">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormControlInput;
