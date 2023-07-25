import { Tabs } from "expo-router";
import React from "react";

const DashboardLayout = () => {
  return (
    <Tabs
      initialRouteName="/dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#00000066",
      }}
    />
  );
};

export default DashboardLayout;
