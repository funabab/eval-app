import React from "react";
import { Defs, G, Path, Rect, Svg } from "react-native-svg";

const IconDashboardEvaluation = () => {
  return (
    <Svg width={88} height={88} fill="none">
      <G filter="url(#a)">
        <Rect
          width={56}
          height={56}
          x={16}
          y={12}
          fill="#000"
          fillOpacity={0.8}
          rx={28}
        />
      </G>
      <Path
        fill="#fff"
        d="m52.217 32.143 2.571-2.572L56 30.781l-2.571 2.572-1.212-1.21ZM44 42.857l-4.286-4.252 1.363-1.346L44 40.156l6.352-6.299 1.362 1.354L44 42.857Z"
      />
      <Path
        fill="#fff"
        d="M33.714 49.286v-2.218l5.498-5.497L38 40.36l-4.286 4.285V27H32v22.286A1.714 1.714 0 0 0 33.714 51H56v-1.714H33.714Z"
      />
      <Defs></Defs>
    </Svg>
  );
};

export default IconDashboardEvaluation;
