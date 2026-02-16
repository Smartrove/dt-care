import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function DentistAppointmentsScreen() {
  const appointments = [
    {
      id: "1",
      patient: "John Smith",
      time: "9:00 AM",
      date: "Today",
      type: "Consultation",
      status: "CONFIRMED",
      reason: "Regular checkup",
    },
    {
      id: "2",
      patient: "Sarah Johnson",
      time: "10:30 AM",
      date: "Today",
      type: "Teeth Cleaning",
      status: "CHECKED_IN",
      reason: "Deep cleaning requested",
    },
    {
      id: "3",
      patient: "Mike Brown",
      time: "11:30 AM",
      date: "Today",
      type: "Follow-up",
      status: "PENDING",
      reason: "Post-treatment review",
    },
    {
      id: "4",
      patient: "Emily Davis",
      time: "2:00 PM",
      date: "Today",
      type: "Treatment",
      status: "CONFIRMED",
      reason: "Root canal procedure",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "#10b981";
      case "CHECKED_IN":
        return "#0ea5e9";
      case "PENDING":
        return "#f59e0b";
      case "COMPLETED":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Appointments</Text>
        <Text className="text-gray-500 text-sm mt-1">
          Manage your patient appointments
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Date Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {["Today", "Tomorrow", "This Week", "This Month"].map(
            (filter, index) => (
              <TouchableOpacity
                key={filter}
                className={`px-4 py-2 rounded-full mr-2 ${
                  index === 0
                    ? "bg-[#059669]"
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

        {/* Appointments List */}
        {appointments.map((appointment) => (
          <TouchableOpacity
            key={appointment.id}
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            style={{ elevation: 2 }}
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-[#059669] rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-lg">
                    {appointment.patient.charAt(0)}
                  </Text>
                </View>
                <View className="ml-3">
                  <Text className="text-gray-900 font-semibold">
                    {appointment.patient}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {appointment.reason}
                  </Text>
                </View>
              </View>
              <View
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${getStatusColor(appointment.status)}20`,
                }}
              >
                <Text
                  className="text-xs font-medium"
                  style={{ color: getStatusColor(appointment.status) }}
                >
                  {appointment.status.replace("_", " ")}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4 pt-3 border-t border-gray-100">
              <View className="flex-row items-center">
                <Text className="text-gray-400 text-sm">📅</Text>
                <Text className="text-gray-600 text-sm ml-1">
                  {appointment.date}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-400 text-sm">⏰</Text>
                <Text className="text-gray-600 text-sm ml-1">
                  {appointment.time}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-400 text-sm">🔧</Text>
                <Text className="text-gray-600 text-sm ml-1">
                  {appointment.type}
                </Text>
              </View>
            </View>

            <View className="flex-row gap-2 mt-3">
              {appointment.status === "PENDING" && (
                <>
                  <TouchableOpacity className="flex-1 bg-[#059669] py-2 rounded-lg items-center">
                    <Text className="text-white font-medium text-sm">
                      Confirm
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-red-500 py-2 rounded-lg items-center">
                    <Text className="text-white font-medium text-sm">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {appointment.status === "CHECKED_IN" && (
                <TouchableOpacity className="flex-1 bg-[#059669] py-2 rounded-lg items-center">
                  <Text className="text-white font-medium text-sm">
                    Start Appointment
                  </Text>
                </TouchableOpacity>
              )}
              {appointment.status === "CONFIRMED" && (
                <TouchableOpacity className="flex-1 bg-[#059669] py-2 rounded-lg items-center">
                  <Text className="text-white font-medium text-sm">
                    Check In Patient
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
