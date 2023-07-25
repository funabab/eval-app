import React from "react";
import { Tabs } from "expo-router";

const DashboardLayout = () => {
  return (
    <Tabs
      initialRouteName="/dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#00000066",
      }}
    >
      <Tabs.Screen
        name="courses/edit/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
