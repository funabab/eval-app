import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

interface Props extends SvgProps {}

const IconDashboardFaceRecognition: React.FC<Props> = (props) => {
  return (
    <Svg width={206} height={206} fill="none" {...props}>
      <Path
        fill="#000"
        fillOpacity={0.8}
        d="M7.194.009a7.888 7.888 0 0 0-4.65 2.785A7.942 7.942 0 0 0 .777 7.931V31.7c0 2.101.831 4.116 2.312 5.602a7.878 7.878 0 0 0 5.58 2.32c2.094 0 4.102-.834 5.582-2.32a7.938 7.938 0 0 0 2.312-5.602V15.854h15.786a7.878 7.878 0 0 0 5.581-2.32 7.938 7.938 0 0 0 2.312-5.603A7.938 7.938 0 0 0 37.93 2.33 7.878 7.878 0 0 0 32.349.01H8.669a7.863 7.863 0 0 0-.741 0 7.864 7.864 0 0 0-.742 0h.008Zm165.011 0a7.964 7.964 0 0 0-5.256 3.107 8.02 8.02 0 0 0 1.568 11.205 7.948 7.948 0 0 0 5.906 1.533h15.786V31.7c0 2.101.832 4.116 2.312 5.602a7.878 7.878 0 0 0 5.581 2.32 7.878 7.878 0 0 0 5.581-2.32 7.939 7.939 0 0 0 2.312-5.602V7.932a7.939 7.939 0 0 0-2.312-5.603 7.878 7.878 0 0 0-5.581-2.32h-23.679a7.865 7.865 0 0 0-.742 0 7.87 7.87 0 0 0-.734 0 7.896 7.896 0 0 0-.742 0ZM103.386 7.93c-64.715 0-72.221 63.446-70.792 93.592-4.878 3.494-8.138 9.159-8.138 17.327H8.67a7.65 7.65 0 0 0-.742 0 7.65 7.65 0 0 0-.742 0 7.919 7.919 0 0 0-5.364 2.847 7.977 7.977 0 0 0 1.05 11.204 7.902 7.902 0 0 0 5.798 1.794h189.432a7.876 7.876 0 0 0 5.581-2.32 7.94 7.94 0 0 0 0-11.205 7.88 7.88 0 0 0-5.581-2.32h-15.786c0-7.78-2.968-13.833-8.138-17.581 1.366-30.24-6.259-93.338-70.792-93.338Zm-23.68 55.46c0 25.036 71.038 14.474 71.038 31.69v18.817l8.88-.99c.118-.008.315 0 .742 0 5.604 0 6.164 2.725 6.164 5.942h-24.421c.426-1.22.742-2.591.742-3.962 0-3.151-1.247-6.174-3.468-8.403a11.816 11.816 0 0 0-8.372-3.481c-3.14 0-6.151 1.252-8.371 3.481a11.906 11.906 0 0 0-3.468 8.403c0 1.371.316 2.742.742 3.962H86.858c.426-1.22.742-2.591.742-3.962 0-3.151-1.247-6.174-3.468-8.403a11.816 11.816 0 0 0-8.372-3.481c-3.14 0-6.151 1.252-8.371 3.481a11.908 11.908 0 0 0-3.468 8.403c0 1.371.316 2.742.742 3.962H40.242c0-2.179.024-5.942 7.15-5.942l8.636.99V95.082c0-21.574 14.397-8.834 23.679-31.691Zm-38.478 79.227c15.313 36.754 36.26 55.459 62.158 55.459 25.905 0 46.853-18.697 62.157-55.459h-17.27c-12.155 26.264-27.262 39.614-44.887 39.614s-32.724-13.35-44.896-39.614H41.228Zm-33.3 23.523a7.79 7.79 0 0 0-.987.245 7.89 7.89 0 0 0-4.494 2.855 7.94 7.94 0 0 0-1.67 5.068v23.768c0 2.101.831 4.117 2.312 5.602A7.878 7.878 0 0 0 8.669 206h23.68a7.878 7.878 0 0 0 5.581-2.321 7.936 7.936 0 0 0 2.312-5.602 7.938 7.938 0 0 0-2.312-5.602 7.877 7.877 0 0 0-5.581-2.32H16.563v-15.846a7.95 7.95 0 0 0-2.475-6.047 7.892 7.892 0 0 0-2.852-1.728 7.857 7.857 0 0 0-3.308-.393Zm189.432 0c-.334.06-.663.142-.987.245a7.888 7.888 0 0 0-4.494 2.855 7.942 7.942 0 0 0-1.67 5.068v15.846h-15.786a7.876 7.876 0 0 0-5.581 2.32 7.94 7.94 0 0 0 0 11.204 7.877 7.877 0 0 0 5.581 2.321h23.679a7.877 7.877 0 0 0 5.581-2.321 7.938 7.938 0 0 0 2.312-5.602v-23.768a7.944 7.944 0 0 0-2.475-6.047 7.883 7.883 0 0 0-6.16-2.121Z"
      />
    </Svg>
  );
};

export default IconDashboardFaceRecognition;