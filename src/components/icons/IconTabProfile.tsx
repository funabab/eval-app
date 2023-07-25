import React from "react";
import { Path, Svg } from "react-native-svg";

interface Props {
  color?: string;
}

const IconTabProfile: React.FC<Props> = ({ color = "black" }) => {
  return (
    <Svg width="30" height="32" viewBox="0 0 30 32" fill="none">
      <Path
        d="M14.6668 14.6667C11.7213 14.6667 9.3335 12.2789 9.3335 9.33333C9.3335 6.38781 11.7213 4 14.6668 4C17.6123 4 20.0002 6.38781 20.0002 9.33333C20.0002 12.2789 17.6123 14.6667 14.6668 14.6667Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M4 28V26.6666C4 22.2484 7.58172 18.6666 12 18.6666H17.3333C21.7516 18.6666 25.3333 22.2484 25.3333 26.6666V28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default IconTabProfile;
