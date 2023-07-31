import React from "react";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const AboutScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "About",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
      <ScrollView>
        <View className="px-4 py-4">
          <Text className="text-center text-base font-poppins-medium500">
            Hedonist Roots Until recently, the prevailing view assumed lorem
            ipsum was born as a nonsense text. “It's not Latin, though it looks
            like it, and it actually says nothing,” Before & After magazine
            answered a curious reader, “Its ‘words’ loosely approximate the
            frequency with which letters occur in English, which is why at a
            glance it looks pretty real.” As Cicero would put it, “Um, not so
            fast.” The placeholder text, beginning with the line “Lorem ipsum
            dolor sit amet, consectetur adipiscing elit”, looks like Latin
            because in its youth, centuries ago, it was Latin. Richard
            McClintock, a Latin scholar from Hampden-Sydney College, is credited
            with discovering the source behind the ubiquitous filler text. In
            seeing a sample of lorem ipsum, his interest was piqued by
            consectetur—a genuine, albeit rare, Latin word. Consulting a Latin
            dictionary led McClintock to a passage from De Finibus Bonorum et
            Malorum (“On the Extremes o f Good and Evil”), a first-century B.C.
            text from the Roman philosopher Cicero. In particular, the garbled
            words of lorem ipsum bear an unmistakable resemblance to sections
            1.10.32–33 of Cicero's work, with the most notable passage excerpted
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
