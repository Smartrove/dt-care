import { Tabs } from "expo-router";
import {
  Calendar,
  Clock,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react-native";

export default function DentistLayout() {
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
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <LayoutDashboard
              size={22}
              color={focused ? "#3b82f6" : "#6B7280"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ focused }) => (
            <Calendar size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: "Patients",
          tabBarIcon: ({ focused }) => (
            <Users size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ focused }) => (
            <Clock size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <User size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
    </Tabs>
  );
}
