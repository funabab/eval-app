import React from "react";
import { Path, Svg } from "react-native-svg";

interface Props {
  color?: string;
}

const IconTabHome: React.FC<Props> = ({ color = "#000" }) => {
  return (
    <Svg width={30} height={27} fill="none">
      <Path
        stroke={color}
        strokeWidth={2}
        d="M12.23 26v-8h5.54v8h5.63V14H27L15 2 3 14h3.6v12h5.63Z"
      />
    </Svg>
  );
};

export default IconTabHome;
