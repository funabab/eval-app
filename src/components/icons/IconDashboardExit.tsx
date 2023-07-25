import React from "react";
import { Defs, G, Path, Rect, Svg } from "react-native-svg";

const IconDashboardExit = () => {
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
        d="m50 33.333-1.692 1.88 3.096 3.454H39.2v2.666h12.204l-3.096 3.44L50 46.667 56 40l-6-6.667Zm-15.6-2.666H44V28h-9.6c-1.32 0-2.4 1.2-2.4 2.667v18.666C32 50.8 33.08 52 34.4 52H44v-2.667h-9.6V30.667Z"
      />
      <Defs></Defs>
    </Svg>
  );
};

export default IconDashboardExit;
