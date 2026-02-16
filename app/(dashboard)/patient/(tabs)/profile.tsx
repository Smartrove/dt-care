import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PatientProfileScreen() {
  const menuItems = [
    { id: "1", title: "Personal Information", icon: "👤", color: "#0a7ea4" },
    { id: "2", title: "Medical History", icon: "🏥", color: "#10b981" },
    { id: "3", title: "Insurance Details", icon: "📋", color: "#f59e0b" },
    { id: "4", title: "Payment Methods", icon: "💳", color: "#8b5cf6" },
    { id: "5", title: "Notifications", icon: "🔔", color: "#ef4444" },
    { id: "6", title: "Privacy & Security", icon: "🔒", color: "#6366f1" },
    { id: "7", title: "Help & Support", icon: "❓", color: "#6b7280" },
    { id: "8", title: "About", icon: "ℹ️", color: "#0891b2" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#0a7ea4] px-6 pt-12 pb-6 rounded-b-3xl">
        <View className="items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-3 border-4 border-white/30">
            <Text className="text-[#0a7ea4] text-3xl font-bold">JS</Text>
          </View>
          <Text className="text-white text-xl font-bold">John Smith</Text>
          <Text className="text-white/80 text-sm">john.smith@email.com</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Stats */}
        <View className="flex-row justify-around bg-white p-4 rounded-xl mb-6 shadow-sm">
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#0a7ea4]">12</Text>
            <Text className="text-gray-500 text-xs">Appointments</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#0a7ea4]">3</Text>
            <Text className="text-gray-500 text-xs"> Dentists</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#0a7ea4]">5</Text>
            <Text className="text-gray-500 text-xs">Records</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View
          className="bg-white rounded-xl shadow-sm"
          style={{ elevation: 2 }}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center p-4 ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Text className="text-lg">{item.icon}</Text>
              </View>
              <Text className="flex-1 ml-3 text-gray-900 font-medium">
                {item.title}
              </Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          className="bg-red-50 p-4 rounded-xl mt-6 flex-row items-center justify-center"
          style={{ elevation: 2 }}
        >
          <Text className="text-red-500 font-medium mr-2">🚪</Text>
          <Text className="text-red-500 font-medium">Log Out</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-400 text-xs mt-6">
          Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
