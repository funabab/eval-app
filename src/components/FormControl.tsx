import React from "react";
import { Text, View } from "react-native";
import FormControlInput, { FormControlInputProps } from "./FormControlInput";

interface Props extends FormControlInputProps {
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
