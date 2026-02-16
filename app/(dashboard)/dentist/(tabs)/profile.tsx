import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DentistProfileScreen() {
  const menuItems = [
    { id: "1", title: "Personal Information", icon: "👤", color: "#059669" },
    { id: "2", title: "Professional Details", icon: "🎓", color: "#0ea5e9" },
    { id: "3", title: "Services & Pricing", icon: "💰", color: "#10b981" },
    { id: "4", title: "Availability", icon: "📅", color: "#f59e0b" },
    { id: "5", title: "Clinic Settings", icon: "🏥", color: "#8b5cf6" },
    { id: "6", title: "Notifications", icon: "🔔", color: "#ef4444" },
    { id: "7", title: "Privacy & Security", icon: "🔒", color: "#6366f1" },
    { id: "8", title: "Account Status", icon: "✅", color: "#059669" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#059669] px-6 pt-12 pb-6 rounded-b-3xl">
        <View className="items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-3 border-4 border-white/30">
            <Text className="text-[#059669] text-3xl font-bold">SJ</Text>
          </View>
          <Text className="text-white text-xl font-bold">
            Dr. Sarah Johnson
          </Text>
          <Text className="text-white/80 text-sm">General Dentistry</Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-yellow-400 mr-1">★</Text>
            <Text className="text-white font-medium">4.8</Text>
            <Text className="text-white/60 text-sm ml-1">(124 reviews)</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Stats */}
        <View className="flex-row justify-around bg-white p-4 rounded-xl mb-6 shadow-sm">
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#059669]">156</Text>
            <Text className="text-gray-500 text-xs">Patients</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#059669]">10</Text>
            <Text className="text-gray-500 text-xs">Years Exp</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#059669]">Verified</Text>
            <Text className="text-gray-500 text-xs">MDCN</Text>
          </View>
        </View>

        {/* Account Status */}
        <View className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-200">
          <View className="flex-row items-center">
            <Text className="text-blue-600 text-xl mr-2">✓</Text>
            <View>
              <Text className="text-blue-800 font-bold">Verified Account</Text>
              <Text className="text-blue-600 text-xs">
                Your credentials have been verified by MDCN
              </Text>
            </View>
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
