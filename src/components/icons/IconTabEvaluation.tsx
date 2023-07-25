import React from "react";
import { G, Path, Svg, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

const IconTabEvaluation: React.FC<Props> = ({ color = "#000" }) => {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <G>
        <Path
          d="M20.5499 5.14284L23.1213 2.57141L24.3333 3.78084L21.7619 6.35313L20.5499 5.14284ZM12.3333 15.8571L8.04761 11.6048L9.41046 10.2591L12.3333 13.1563L18.6848 6.85713L20.0476 8.21055L12.3333 15.8571Z"
          fill={color}
        />
        <Path
          d="M2.04754 22.2857V20.0683L7.54525 14.5714L6.33325 13.3586L2.04754 17.6443V0H0.333252V22.2857C0.333252 22.7404 0.513864 23.1764 0.835355 23.4979C1.15685 23.8194 1.59288 24 2.04754 24H24.3333V22.2857H2.04754Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default IconTabEvaluation;
