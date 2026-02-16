import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminUsersScreen() {
  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john@email.com",
      role: "Patient",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      role: "Dentist",
      status: "Active",
    },
    {
      id: "3",
      name: "Mike Brown",
      email: "mike@email.com",
      role: "Patient",
      status: "Pending",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@email.com",
      role: "Patient",
      status: "Suspended",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">
          User Management
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Manage all platform users
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Search */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
          <Text className="text-gray-400 mr-3">🔍</Text>
          <TextInput
            className="flex-1 text-gray-900"
            placeholder="Search users..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-4">
          <View className="bg-[#6366f1] p-3 rounded-xl flex-1 mr-2">
            <Text className="text-white/80 text-xs">Total Users</Text>
            <Text className="text-white text-xl font-bold">2,345</Text>
          </View>
          <View className="bg-blue-600 p-3 rounded-xl flex-1 mx-2">
            <Text className="text-white/80 text-xs">Active</Text>
            <Text className="text-white text-xl font-bold">2,100</Text>
          </View>
          <View className="bg-yellow-500 p-3 rounded-xl flex-1 ml-2">
            <Text className="text-white/80 text-xs">Pending</Text>
            <Text className="text-white text-xl font-bold">245</Text>
          </View>
        </View>

        {/* User List */}
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            style={{ elevation: 2 }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-[#6366f1] rounded-full items-center justify-center">
                  <Text className="text-white font-bold">
                    {user.name.charAt(0)}
                  </Text>
                </View>
                <View className="ml-3">
                  <Text className="text-gray-900 font-semibold">
                    {user.name}
                  </Text>
                  <Text className="text-gray-500 text-xs">{user.email}</Text>
                </View>
              </View>
              <View className="items-end">
                <View className="flex-row items-center gap-2">
                  <Text className="text-gray-500 text-xs">{user.role}</Text>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      user.status === "Active"
                        ? "bg-blue-100"
                        : user.status === "Pending"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        user.status === "Active"
                          ? "text-green-700"
                          : user.status === "Pending"
                            ? "text-yellow-700"
                            : "text-red-700"
                      }`}
                    >
                      {user.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
