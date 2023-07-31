import React from "react";
import { View } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import animLoader from "../lottie/animation_loader.json";
import { styled } from "nativewind";

const StyledAnimatedLottieView = styled(AnimatedLottieView);

interface Props {}

const Loader: React.FC<Props> = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <StyledAnimatedLottieView
        className="w-52 h-52"
        source={animLoader}
        autoPlay
      />
    </View>
  );
};

export default Loader;
