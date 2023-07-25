import React from "react";
import { Defs, G, Path, Rect, Svg } from "react-native-svg";

const IconDashboardTimetable = () => {
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
        d="M46.4 40h1.8v3.384l2.928 1.692-.9 1.56-3.828-2.208V40Zm-12-12h16.8a2.4 2.4 0 0 1 2.4 2.4v7.32A8.35 8.35 0 0 1 56 43.6a8.4 8.4 0 0 1-8.4 8.4 8.35 8.35 0 0 1-5.88-2.4H34.4a2.4 2.4 0 0 1-2.4-2.4V30.4a2.4 2.4 0 0 1 2.4-2.4Zm0 15.6v3.6h5.604a8.416 8.416 0 0 1-.804-3.6h-4.8Zm0-8.4h7.2v-3.6h-7.2v3.6Zm16.8 0v-3.6H44v3.6h7.2Zm-16.8 6h5.148a8.338 8.338 0 0 1 2.172-3.6H34.4v3.6Zm13.2-3.42a5.82 5.82 0 1 0 0 11.64 5.82 5.82 0 0 0 0-11.64Z"
      />
      <Defs></Defs>
    </Svg>
  );
};

export default IconDashboardTimetable;
