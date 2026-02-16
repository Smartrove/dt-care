import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function PatientAppointmentsScreen() {
  const appointments = [
    {
      id: "1",
      dentist: "Dr. Sarah Johnson",
      date: "Feb 15, 2025",
      time: "10:00 AM",
      type: "Regular Checkup",
      status: "CONFIRMED",
      clinic: "Smile Dental Clinic",
    },
    {
      id: "2",
      dentist: "Dr. Michael Chen",
      date: "Feb 22, 2025",
      time: "2:30 PM",
      type: "Teeth Cleaning",
      status: "PENDING",
      clinic: "Bright Smiles Center",
    },
    {
      id: "3",
      dentist: "Dr. Emily Brown",
      date: "Jan 28, 2025",
      time: "11:00 AM",
      type: "Follow-up",
      status: "COMPLETED",
      clinic: "Healthy Teeth Hub",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "#10b981";
      case "PENDING":
        return "#f59e0b";
      case "COMPLETED":
        return "#6b7280";
      case "CANCELLED":
        return "#ef4444";
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
          Manage your dental appointments
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* FAB to book new appointment */}
        <TouchableOpacity
          className="bg-[#0a7ea4] flex-row items-center justify-center py-4 rounded-xl mb-6 shadow-lg"
          style={{ elevation: 4 }}
        >
          <Text className="text-white font-bold mr-2">+</Text>
          <Text className="text-white font-bold">Book New Appointment</Text>
        </TouchableOpacity>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {["All", "Upcoming", "Completed", "Cancelled"].map(
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
                  className={`font-medium ${
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
                <View className="w-12 h-12 bg-[#0a7ea4] rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-lg">
                    {appointment.dentist.charAt(4)}
                  </Text>
                </View>
                <View className="ml-3">
                  <Text className="text-gray-900 font-semibold">
                    {appointment.dentist}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {appointment.clinic}
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
                  {appointment.status}
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
            </View>

            <View className="mt-2 flex-row justify-between items-center">
              <Text className="text-gray-500 text-sm">{appointment.type}</Text>
              <View className="flex-row gap-2">
                {appointment.status !== "COMPLETED" &&
                  appointment.status !== "CANCELLED" && (
                    <>
                      <TouchableOpacity className="px-3 py-1.5 border border-gray-200 rounded-lg">
                        <Text className="text-gray-600 text-xs font-medium">
                          Reschedule
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="px-3 py-1.5 border border-red-200 rounded-lg">
                        <Text className="text-red-500 text-xs font-medium">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
