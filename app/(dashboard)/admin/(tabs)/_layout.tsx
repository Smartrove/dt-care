import { Tabs } from "expo-router";
import {
  Building2,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react-native";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6B7280",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ focused }) => (
            <LayoutDashboard
              size={22}
              color={focused ? "#3b82f6" : "#6B7280"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ focused }) => (
            <Users size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="dentists"
        options={{
          title: "Dentists",
          tabBarIcon: ({ focused }) => (
            <Stethoscope size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="clinics"
        options={{
          title: "Clinics",
          tabBarIcon: ({ focused }) => (
            <Building2 size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Settings size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
    </Tabs>
  );
}
