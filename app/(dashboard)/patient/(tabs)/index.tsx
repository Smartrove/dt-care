import {
  useGetCurrentPatientQuery,
  useGetPatientAppointmentsQuery,
} from "@/store/api/apiSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "expo-router";
import {
  Calendar,
  Clock,
  FileText,
  Lightbulb,
  Pill,
  Search,
} from "lucide-react-native";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PatientHomeScreen() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  // Fetch patient data
  const { data: patient, isLoading: isPatientLoading } =
    useGetCurrentPatientQuery();
  const { data: appointments, isLoading: isAppointmentsLoading } =
    useGetPatientAppointmentsQuery();

  // Filter upcoming appointments (not cancelled/completed)
  const upcomingAppointments =
    appointments?.filter(
      (apt) => apt.status === "PENDING" || apt.status === "CONFIRMED",
    ) || [];

  const quickActions = [
    {
      id: "1",
      title: "Book Appointment",
      icon: Calendar,
      color: "#3b82f6",
      action: () => router.push("/(dashboard)/patient/(tabs)/find-dentist"),
    },
    {
      id: "2",
      title: "Find Dentist",
      icon: Search,
      color: "#3b82f6",
      action: () => router.push("/(dashboard)/patient/(tabs)/find-dentist"),
    },
    {
      id: "3",
      title: "Medical Records",
      icon: FileText,
      color: "#3b82f6",
      action: () => router.push("/(dashboard)/patient/(tabs)/records"),
    },
    {
      id: "4",
      title: "Prescriptions",
      icon: Pill,
      color: "#3b82f6",
      action: () => router.push("/(dashboard)/patient/(tabs)/records"),
    },
  ];

  // Get user name from patient data or auth
  const displayName = patient
    ? `${patient.firstName} ${patient.lastName}`
    : user?.name || "Patient";

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-12 pb-6 rounded-b-3xl">
        <Text className="text-white text-sm opacity-80">Welcome back,</Text>
        <Text className="text-white text-2xl font-bold">{displayName}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-6">
        {/* Quick Actions */}
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                className="w-[48%] bg-white p-4 rounded-xl mb-4 items-center shadow-sm"
                style={{ elevation: 2 }}
                onPress={action.action}
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <IconComponent size={24} color={action.color} />
                </View>
                <Text className="text-gray-700 font-medium text-sm text-center">
                  {action.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upcoming Appointments */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-900">
            Upcoming Appointments
          </Text>
          <TouchableOpacity
            onPress={() =>
              router.push("/(dashboard)/patient/(tabs)/appointments")
            }
          >
            <Text className="text-blue-600 font-medium">See All</Text>
          </TouchableOpacity>
        </View>

        {isAppointmentsLoading ? (
          <View className="bg-white p-6 rounded-xl items-center">
            <ActivityIndicator color="#3b82f6" />
            <Text className="text-gray-600 mt-2">Loading appointments...</Text>
          </View>
        ) : upcomingAppointments.length > 0 ? (
          upcomingAppointments.slice(0, 3).map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              className="bg-white p-4 rounded-xl mb-3 shadow-sm"
              style={{ elevation: 2 }}
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-gray-500 text-xs">Dentist</Text>
                  <Text className="text-gray-900 font-semibold">
                    Dentist #{appointment.dentistId}
                  </Text>
                </View>
                <View
                  className={`px-3 py-1 rounded-full ${
                    appointment.status === "CONFIRMED"
                      ? "bg-blue-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      appointment.status === "CONFIRMED"
                        ? "text-blue-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {appointment.status}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-4 mt-2">
                <View className="flex-row items-center">
                  <Calendar size={12} color="#6B7280" />
                  <Text className="text-gray-600 text-xs ml-1">
                    {formatDate(appointment.appointmentDate)}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Clock size={12} color="#6B7280" />
                  <Text className="text-gray-600 text-xs ml-1">
                    {appointment.startTime}
                  </Text>
                </View>
              </View>
              <View className="mt-2 pt-2 border-t border-gray-100">
                <Text className="text-gray-500 text-xs">
                  Clinic #{appointment.clinicId}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="bg-white p-6 rounded-xl items-center">
            <Calendar size={40} color="#9CA3AF" />
            <Text className="text-gray-600 mt-2">No upcoming appointments</Text>
            <TouchableOpacity
              className="mt-4 bg-blue-600 px-6 py-2 rounded-lg"
              onPress={() =>
                router.push("/(dashboard)/patient/(tabs)/find-dentist")
              }
            >
              <Text className="text-white font-medium">Book Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Health Tips */}
        <Text className="text-lg font-bold text-gray-900 mt-6 mb-4">
          Dental Health Tips
        </Text>
        <View className="bg-blue-50 p-4 rounded-xl">
          <View className="flex-row items-center mb-2">
            <Lightbulb size={16} color="#3b82f6" />
            <Text className="text-blue-600 font-semibold ml-2">
              Tip of the Day
            </Text>
          </View>
          <Text className="text-gray-700 text-sm">
            Remember to brush your teeth twice a day for 2 minutes and floss
            daily to maintain optimal oral health!
          </Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
}
