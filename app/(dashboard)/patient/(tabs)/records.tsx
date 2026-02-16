import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PatientRecordsScreen() {
  const records = [
    {
      id: "1",
      date: "Jan 15, 2025",
      dentist: "Dr. Sarah Johnson",
      type: "Regular Checkup",
      clinic: "Smile Dental Clinic",
      notes: "No cavities found. Good oral hygiene.",
    },
    {
      id: "2",
      date: "Dec 10, 2024",
      dentist: "Dr. Michael Chen",
      type: "Teeth Cleaning",
      clinic: "Bright Smiles Center",
      notes: "Professional cleaning completed. Recommended flossing daily.",
    },
    {
      id: "3",
      date: "Nov 5, 2024",
      dentist: "Dr. Sarah Johnson",
      type: "Fillings",
      clinic: "Smile Dental Clinic",
      notes:
        "Composite filling on lower right molar. Patient tolerated procedure well.",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">
          Medical Records
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          View your dental history and records
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {["All Records", "Checkups", "Treatments", "Prescriptions"].map(
            (filter, index) => (
              <TouchableOpacity
                key={filter}
                className={`px-4 py-2 rounded-full mr-2 ${
                  index === 0
                    ? "bg-[#0a7ea4]"
                    : "bg-white border border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium text-xs ${
                    index === 0 ? "text-white" : "text-gray-700"
                  }`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        {/* Records List */}
        {records.map((record) => (
          <TouchableOpacity
            key={record.id}
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            style={{ elevation: 2 }}
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-gray-500 text-xs">{record.date}</Text>
                <Text className="text-gray-900 font-bold mt-1">
                  {record.type}
                </Text>
                <Text className="text-gray-500 text-sm">{record.dentist}</Text>
              </View>
              <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-700 text-xs font-medium">
                  View Details
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-4 pt-3 border-t border-gray-100">
              <Text className="text-gray-500 text-xs">📍 {record.clinic}</Text>
            </View>
            <View className="mt-2 bg-gray-50 p-2 rounded-lg">
              <Text className="text-gray-600 text-xs">
                <Text className="font-medium">Notes:</Text> {record.notes}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
