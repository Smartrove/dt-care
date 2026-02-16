import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminDentistsScreen() {
  const dentists = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      license: "MDCN-12345",
      specialization: "General Dentistry",
      status: "Verified",
      clinic: "Smile Dental Clinic",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      license: "MDCN-67890",
      specialization: "Orthodontics",
      status: "Pending",
      clinic: "Bright Smiles Center",
    },
    {
      id: "3",
      name: "Dr. Emily Brown",
      license: "MDCN-11111",
      specialization: "Pediatric Dentistry",
      status: "Verified",
      clinic: "Healthy Teeth Hub",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">
          Dentist Management
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Verify and manage dentists
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Search */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
          <Text className="text-gray-400 mr-3">🔍</Text>
          <TextInput
            className="flex-1 text-gray-900"
            placeholder="Search dentists..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-4">
          <View className="bg-[#6366f1] p-3 rounded-xl flex-1 mr-2">
            <Text className="text-white/80 text-xs">Total Dentists</Text>
            <Text className="text-white text-xl font-bold">156</Text>
          </View>
          <View className="bg-blue-600 p-3 rounded-xl flex-1 mx-2">
            <Text className="text-white/80 text-xs">Verified</Text>
            <Text className="text-white text-xl font-bold">120</Text>
          </View>
          <View className="bg-yellow-500 p-3 rounded-xl flex-1 ml-2">
            <Text className="text-white/80 text-xs">Pending</Text>
            <Text className="text-white text-xl font-bold">36</Text>
          </View>
        </View>

        {/* Dentist List */}
        {dentists.map((dentist) => (
          <TouchableOpacity
            key={dentist.id}
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            style={{ elevation: 2 }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-[#6366f1] rounded-full items-center justify-center">
                  <Text className="text-white font-bold">
                    {dentist.name.charAt(8)}
                  </Text>
                </View>
                <View className="ml-3">
                  <Text className="text-gray-900 font-semibold">
                    {dentist.name}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {dentist.specialization}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {dentist.license}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <View
                  className={`px-3 py-1 rounded-full ${
                    dentist.status === "Verified"
                      ? "bg-green-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      dentist.status === "Verified"
                        ? "text-blue-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {dentist.status}
                  </Text>
                </View>
              </View>
            </View>
            <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between items-center">
              <Text className="text-gray-500 text-xs">📍 {dentist.clinic}</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-lg">
                  <Text className="text-gray-700 text-xs font-medium">
                    View
                  </Text>
                </TouchableOpacity>
                {dentist.status === "Pending" && (
                  <TouchableOpacity className="bg-blue-600 px-3 py-1 rounded-lg">
                    <Text className="text-white text-xs font-medium">
                      Verify
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
