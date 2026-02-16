import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AdminSettingsScreen() {
  const settingsSections = [
    {
      title: "General",
      items: [
        { id: "1", title: "App Settings", icon: "⚙️", color: "#6366f1" },
        { id: "2", title: "Notifications", icon: "🔔", color: "#f59e0b" },
        { id: "3", title: "Language", icon: "🌐", color: "#0ea5e9" },
      ],
    },
    {
      title: "Platform",
      items: [
        {
          id: "4",
          title: "Verification Settings",
          icon: "✅",
          color: "#10b981",
        },
        { id: "5", title: "Appointment Rules", icon: "📅", color: "#8b5cf6" },
        { id: "6", title: "Payment Settings", icon: "💳", color: "#ec4899" },
      ],
    },
    {
      title: "Support",
      items: [
        { id: "7", title: "Help Center", icon: "❓", color: "#6b7280" },
        { id: "8", title: "Report a Problem", icon: "⚠️", color: "#ef4444" },
        { id: "9", title: "About", icon: "ℹ️", color: "#0891b2" },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Settings</Text>
        <Text className="text-gray-500 text-sm mt-1">
          Manage platform settings
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} className="mb-4">
            <Text className="text-gray-500 text-sm font-medium mb-2 ml-1">
              {section.title}
            </Text>
            <View
              className="bg-white rounded-xl shadow-sm"
              style={{ elevation: 2 }}
            >
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  className={`flex-row items-center p-4 ${
                    index !== section.items.length - 1
                      ? "border-b border-gray-100"
                      : ""
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
          </View>
        ))}

        {/* Admin Info */}
        <View className="bg-purple-50 p-4 rounded-xl border border-purple-200 mt-4">
          <Text className="text-purple-800 font-bold mb-2">Admin Account</Text>
          <Text className="text-purple-600 text-sm">
            Logged in as: admin@dtcare.com
          </Text>
          <Text className="text-purple-600 text-sm">Role: Super Admin</Text>
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
