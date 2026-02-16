import { useGetPatientAppointmentsQuery } from "@/store/api/apiSlice";
import { useRouter } from "expo-router";
import { Calendar, Clock, Plus } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PatientAppointmentsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<
    "All" | "Upcoming" | "Completed" | "Cancelled"
  >("All");

  const {
    data: appointments,
    isLoading,
    error,
  } = useGetPatientAppointmentsQuery();

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
      case "NO_SHOW":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  // Filter appointments based on selected filter
  const filteredAppointments =
    appointments?.filter((appointment) => {
      if (filter === "All") return true;
      if (filter === "Upcoming")
        return (
          appointment.status === "PENDING" || appointment.status === "CONFIRMED"
        );
      if (filter === "Completed") return appointment.status === "COMPLETED";
      if (filter === "Cancelled")
        return (
          appointment.status === "CANCELLED" || appointment.status === "NO_SHOW"
        );
      return true;
    }) || [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filterOptions: Array<"All" | "Upcoming" | "Completed" | "Cancelled"> = [
    "All",
    "Upcoming",
    "Completed",
    "Cancelled",
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-12 pb-4">
        <Text className="text-2xl font-bold text-white">Appointments</Text>
        <Text className="text-blue-100 text-sm mt-1">
          Manage your dental appointments
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* FAB to book new appointment */}
        <TouchableOpacity
          className="bg-blue-600 flex-row items-center justify-center py-4 rounded-xl mb-6 shadow-lg"
          style={{ elevation: 4 }}
          onPress={() =>
            router.push("/(dashboard)/patient/(tabs)/find-dentist")
          }
        >
          <Plus size={20} color="#FFFFFF" />
          <Text className="text-white font-bold ml-2">
            Book New Appointment
          </Text>
        </TouchableOpacity>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              className={`px-4 py-2 rounded-full mr-2 ${
                filter === option
                  ? "bg-blue-600"
                  : "bg-white border border-gray-200"
              }`}
              onPress={() => setFilter(option)}
            >
              <Text
                className={`font-medium ${
                  filter === option ? "text-white" : "text-gray-700"
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Loading State */}
        {isLoading && (
          <View className="bg-white p-6 rounded-xl items-center">
            <ActivityIndicator color="#3b82f6" />
            <Text className="text-gray-600 mt-2">Loading appointments...</Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View className="bg-red-50 p-4 rounded-xl items-center mb-4">
            <Text className="text-red-600 text-center">
              Failed to load appointments. Please try again.
            </Text>
          </View>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredAppointments.length === 0 && (
          <View className="bg-white p-6 rounded-xl items-center mb-4">
            <Calendar size={40} color="#9CA3AF" />
            <Text className="text-gray-600 mt-2">
              No {filter.toLowerCase()} appointments
            </Text>
          </View>
        )}

        {/* Appointments List */}
        {!isLoading &&
          !error &&
          filteredAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              className="bg-white p-4 rounded-xl mb-3 shadow-sm"
              style={{ elevation: 2 }}
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-blue-600 rounded-full items-center justify-center">
                    <Text className="text-white font-bold text-lg">D</Text>
                  </View>
                  <View className="ml-3">
                    <Text className="text-gray-900 font-semibold">
                      Dentist #{appointment.dentistId}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      Clinic #{appointment.clinicId}
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
                  <Calendar size={16} color="#9CA3AF" />
                  <Text className="text-gray-600 text-sm ml-1">
                    {formatDate(appointment.appointmentDate)}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Clock size={16} color="#9CA3AF" />
                  <Text className="text-gray-600 text-sm ml-1">
                    {appointment.startTime} - {appointment.endTime}
                  </Text>
                </View>
              </View>

              <View className="mt-2 flex-row justify-between items-center">
                <Text className="text-gray-500 text-sm">
                  Service #{appointment.serviceId} • ₦{appointment.totalPrice}
                </Text>
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
