import { useAppSelector } from "@/store/hooks";
import { BarChart3, Calendar, Clock, Star, Users } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DentistHomeScreen() {
  const { user } = useAppSelector((state) => state.auth);

  const todayAppointments = [
    {
      id: "1",
      patient: "John Smith",
      time: "9:00 AM",
      type: "Consultation",
      status: "CONFIRMED",
    },
    {
      id: "2",
      patient: "Sarah Johnson",
      time: "10:30 AM",
      type: "Teeth Cleaning",
      status: "CHECKED_IN",
    },
    {
      id: "3",
      patient: "Mike Brown",
      time: "11:30 AM",
      type: "Follow-up",
      status: "PENDING",
    },
    {
      id: "4",
      patient: "Emily Davis",
      time: "2:00 PM",
      type: "Treatment",
      status: "CONFIRMED",
    },
  ];

  const stats = [
    { label: "Today", value: "8", icon: Calendar, color: "#3b82f6" },
    { label: "This Week", value: "24", icon: BarChart3, color: "#3b82f6" },
    { label: "Patients", value: "156", icon: Users, color: "#3b82f6" },
    { label: "Rating", value: "4.8", icon: Star, color: "#3b82f6" },
  ];

  const pendingTasks = [
    {
      id: "1",
      title: "Review lab results for John Smith",
      priority: "High",
      time: "Today",
    },
    {
      id: "2",
      title: "Update treatment plan for Sarah",
      priority: "Medium",
      time: "Today",
    },
    {
      id: "3",
      title: "Sign prescription requests",
      priority: "Low",
      time: "This week",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-12 pb-6 rounded-b-3xl">
        <Text className="text-white text-sm opacity-80">Good morning,</Text>
        <Text className="text-white text-2xl font-bold">
          {user?.name || "Dr. Smith"}
        </Text>
        <Text className="text-white text-sm opacity-80 mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-6">
        {/* Stats Cards */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View
                key={index}
                className="bg-white p-4 rounded-xl mb-3 w-[48%] shadow-sm"
                style={{ elevation: 2 }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-gray-500 text-xs">{stat.label}</Text>
                    <Text className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </Text>
                  </View>
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <IconComponent size={20} color={stat.color} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Today's Schedule */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-900">
            Today's Schedule
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-medium">View All</Text>
          </TouchableOpacity>
        </View>

        <View
          className="bg-white rounded-xl mb-6 shadow-sm"
          style={{ elevation: 2 }}
        >
          {todayAppointments.map((appointment, index) => (
            <TouchableOpacity
              key={appointment.id}
              className={`p-4 ${
                index !== todayAppointments.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center">
                    <Text className="text-white font-bold text-sm">
                      {appointment.patient.charAt(0)}
                    </Text>
                  </View>
                  <View className="ml-3">
                    <Text className="text-gray-900 font-semibold">
                      {appointment.patient}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      {appointment.type}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center">
                    <Clock size={12} color="#6B7280" />
                    <Text className="text-gray-900 font-medium ml-1">
                      {appointment.time}
                    </Text>
                  </View>
                  <View
                    className={`px-2 py-0.5 rounded-full mt-1 ${
                      appointment.status === "CONFIRMED"
                        ? "bg-blue-100"
                        : appointment.status === "CHECKED_IN"
                          ? "bg-blue-100"
                          : "bg-yellow-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        appointment.status === "CONFIRMED"
                          ? "text-blue-700"
                          : appointment.status === "CHECKED_IN"
                            ? "text-blue-700"
                            : "text-yellow-700"
                      }`}
                    >
                      {appointment.status.replace("_", " ")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pending Tasks */}
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Pending Tasks
        </Text>
        {pendingTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            className="bg-white p-4 rounded-xl mb-3 flex-row items-center shadow-sm"
            style={{ elevation: 2 }}
          >
            <View className="flex-1">
              <Text className="text-gray-900 font-medium">{task.title}</Text>
              <Text className="text-gray-500 text-xs mt-1">
                Due: {task.time}
              </Text>
            </View>
            <View
              className={`px-2 py-1 rounded-full ${
                task.priority === "High"
                  ? "bg-red-100"
                  : task.priority === "Medium"
                    ? "bg-yellow-100"
                    : "bg-blue-100"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  task.priority === "High"
                    ? "text-red-700"
                    : task.priority === "Medium"
                      ? "text-yellow-700"
                      : "text-blue-700"
                }`}
              >
                {task.priority}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
