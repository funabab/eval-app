import React from "react";
import { Text, View, TextInput, TextInputProps } from "react-native";
import FormControlInput from "./FormControlInput";

interface Props extends TextInputProps {
  label: string;
}

const FormControl: React.FC<Props> = ({ label, ...props }) => {
  return (
    <View>
      <Text className="font-poppins-regular400">{label}</Text>
      <FormControlInput {...props} />
    </View>
  );
};

export default FormControl;
