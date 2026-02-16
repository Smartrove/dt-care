import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function DentistPatientsScreen() {
  const patients = [
    {
      id: "1",
      name: "John Smith",
      age: 32,
      gender: "Male",
      lastVisit: "Jan 15, 2025",
      nextAppointment: "Feb 15, 2025",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      age: 28,
      gender: "Female",
      lastVisit: "Jan 10, 2025",
      nextAppointment: "Feb 10, 2025",
      status: "Active",
    },
    {
      id: "3",
      name: "Mike Brown",
      age: 45,
      gender: "Male",
      lastVisit: "Dec 20, 2024",
      nextAppointment: null,
      status: "Inactive",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Patients</Text>
        <Text className="text-gray-500 text-sm mt-1">
          Manage your patient database
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
          <Text className="text-gray-400 mr-3">🔍</Text>
          <TextInput
            className="flex-1 text-gray-900"
            placeholder="Search patients..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-4">
          <View className="bg-[#059669] p-3 rounded-xl flex-1 mr-2">
            <Text className="text-white/80 text-xs">Total Patients</Text>
            <Text className="text-white text-xl font-bold">156</Text>
          </View>
          <View className="bg-blue-500 p-3 rounded-xl flex-1 ml-2">
            <Text className="text-white/80 text-xs">Active</Text>
            <Text className="text-white text-xl font-bold">124</Text>
          </View>
        </View>

        {/* Patients List */}
        {patients.map((patient) => (
          <TouchableOpacity
            key={patient.id}
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            style={{ elevation: 2 }}
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#059669] rounded-full items-center justify-center">
                <Text className="text-white font-bold text-lg">
                  {patient.name.charAt(0)}
                </Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-gray-900 font-semibold">
                  {patient.name}
                </Text>
                <Text className="text-gray-500 text-xs">
                  {patient.age} years • {patient.gender}
                </Text>
              </View>
              <View className="items-end">
                <View
                  className={`px-2 py-1 rounded-full ${
                    patient.status === "Active" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      patient.status === "Active"
                        ? "text-blue-700"
                        : "text-gray-500"
                    }`}
                  >
                    {patient.status}
                  </Text>
                </View>
                <Text className="text-gray-400 text-xs mt-1">
                  Last: {patient.lastVisit}
                </Text>
              </View>
            </View>
            <View className="flex-row gap-2 mt-3">
              <TouchableOpacity className="flex-1 bg-gray-100 py-2 rounded-lg items-center">
                <Text className="text-gray-700 font-medium text-sm">
                  View Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-[#059669] py-2 rounded-lg items-center">
                <Text className="text-white font-medium text-sm">
                  Book Appointment
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
