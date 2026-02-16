import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminClinicsScreen() {
  const clinics = [
    {
      id: "1",
      name: "Smile Dental Clinic",
      registration: "REG-12345",
      city: "Lagos Island",
      status: "Active",
      dentists: 5,
    },
    {
      id: "2",
      name: "Bright Smiles Center",
      registration: "REG-67890",
      city: "Victoria Island",
      status: "Pending",
      dentists: 3,
    },
    {
      id: "3",
      name: "Healthy Teeth Hub",
      registration: "REG-11111",
      city: "Ikeja",
      status: "Active",
      dentists: 8,
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">
          Clinic Management
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Manage dental clinics
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Search */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
          <Text className="text-gray-400 mr-3">🔍</Text>
          <TextInput
            className="flex-1 text-gray-900"
            placeholder="Search clinics..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-4">
          <View className="bg-[#6366f1] p-3 rounded-xl flex-1 mr-2">
            <Text className="text-white/80 text-xs">Total Clinics</Text>
            <Text className="text-white text-xl font-bold">48</Text>
          </View>
          <View className="bg-blue-600 p-3 rounded-xl flex-1 mx-2">
            <Text className="text-white/80 text-xs">Active</Text>
            <Text className="text-white text-xl font-bold">42</Text>
          </View>
          <View className="bg-yellow-500 p-3 rounded-xl flex-1 ml-2">
            <Text className="text-white/80 text-xs">Pending</Text>
            <Text className="text-white text-xl font-bold">6</Text>
          </View>
        </View>

        {/* Clinic List */}
        {clinics.map((clinic) => (
          <TouchableOpacity
            key={clinic.id}
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            style={{ elevation: 2 }}
          >
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="text-gray-900 font-bold">{clinic.name}</Text>
                <Text className="text-gray-500 text-xs">
                  {clinic.registration}
                </Text>
                <Text className="text-gray-400 text-xs">📍 {clinic.city}</Text>
              </View>
              <View
                className={`px-3 py-1 rounded-full ${
                  clinic.status === "Active" ? "bg-blue-100" : "bg-yellow-100"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    clinic.status === "Active"
                      ? "text-blue-700"
                      : "text-yellow-700"
                  }`}
                >
                  {clinic.status}
                </Text>
              </View>
            </View>
            <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between items-center">
              <Text className="text-gray-500 text-xs">
                👨‍⚕️ {clinic.dentists} Dentists
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-lg">
                  <Text className="text-gray-700 text-xs font-medium">
                    View
                  </Text>
                </TouchableOpacity>
                {clinic.status === "Pending" && (
                  <TouchableOpacity className="bg-green-500 px-3 py-1 rounded-lg">
                    <Text className="text-white text-xs font-medium">
                      Approve
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
