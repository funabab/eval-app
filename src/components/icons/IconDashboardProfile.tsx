import React from "react";
import { Defs, G, Path, Rect, Svg } from "react-native-svg";

interface Props {
  size?: number;
}

const IconDashboardProfile: React.FC<Props> = ({ size = 89 }) => {
  return (
    <Svg width={size} height={size} fill="none">
      <G filter="url(#a)">
        <Rect
          width={56}
          height={56}
          x={16.5}
          y={12.5}
          fill="#000"
          fillOpacity={0.8}
          rx={28}
        />
      </G>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="M33.5 52.5v-1.333a8 8 0 0 1 8-8h5.333a8 8 0 0 1 8 8V52.5"
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeOpacity={0.2}
        strokeWidth={2}
        d="M33.5 52.5v-1.333a8 8 0 0 1 8-8h5.333a8 8 0 0 1 8 8V52.5"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="M44.167 39.167a5.333 5.333 0 1 1 0-10.667 5.333 5.333 0 0 1 0 10.667Z"
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeOpacity={0.2}
        strokeWidth={2}
        d="M44.167 39.167a5.333 5.333 0 1 1 0-10.667 5.333 5.333 0 0 1 0 10.667Z"
      />
      <Defs></Defs>
    </Svg>
  );
};

export default IconDashboardProfile;
