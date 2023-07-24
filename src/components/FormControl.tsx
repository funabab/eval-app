import React from "react";
import { Text, View, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  label: string;
  placeholder?: string;
}

const FormControl: React.FC<Props> = ({ label, ...props }) => {
  return (
    <View>
      <Text className="font-poppins-regular400">{label}</Text>
      <TextInput
        className="py-2 px-3 border-2 text-sm text-black mt-[10px] rounded-xl font-poppins-regular400"
        placeholderTextColor="#00000099"
        {...props}
      />
    </View>
  );
};

export default FormControl;
