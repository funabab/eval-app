import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

const FormControlInput: React.FC<Props> = (props) => {
  return (
    <TextInput
      className="py-2 px-3 border-2 text-sm text-black mt-[10px] rounded-xl font-poppins-regular400"
      placeholderTextColor="#00000099"
      {...props}
    />
  );
};

export default FormControlInput;
