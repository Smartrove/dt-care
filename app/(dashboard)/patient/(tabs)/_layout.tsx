import { Tabs } from "expo-router";
import { Calendar, FileText, Home, Search, User } from "lucide-react-native";

export default function PatientLayout() {
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
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home size={22} color={focused ? "#3b82f6" : "#6B7280"} />
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
        name="find-dentist"
        options={{
          title: "Find Dentist",
          tabBarIcon: ({ focused }) => (
            <Search size={22} color={focused ? "#3b82f6" : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: "Records",
          tabBarIcon: ({ focused }) => (
            <FileText size={22} color={focused ? "#3b82f6" : "#6B7280"} />
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
