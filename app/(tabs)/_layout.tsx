import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="news"
        options={{
          title: "Socialize",
          tabBarLabel: "Socials",
          headerStyle: {
            backgroundColor: "#F7FCFA",
            borderBottomWidth: 0,
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          title: "Fund Projects",
          tabBarLabel: "Projects",
          headerStyle: {
            backgroundColor: "#F7FCFA",
            borderBottomWidth: 0,
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="folder" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          headerStyle: {
            backgroundColor: "#F7FCFA",
            borderBottomWidth: 0,
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
