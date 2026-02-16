import { useAppSelector } from "@/store/hooks";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  Calendar,
  ShieldCheck,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AdminHomeScreen() {
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    {
      label: "Total Users",
      value: "2,345",
      icon: Users,
      color: "#3b82f6",
      change: "+12%",
    },
    {
      label: "Dentists",
      value: "156",
      icon: Stethoscope,
      color: "#3b82f6",
      change: "+5%",
    },
    {
      label: "Clinics",
      value: "48",
      icon: Building2,
      color: "#3b82f6",
      change: "+3%",
    },
    {
      label: "Appointments",
      value: "1,234",
      icon: Calendar,
      color: "#3b82f6",
      change: "+18%",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      action: "New dentist registered",
      user: "Dr. Sarah Johnson",
      time: "2 mins ago",
      type: "dentist",
    },
    {
      id: "2",
      action: "New clinic added",
      user: "Smile Dental Clinic",
      time: "15 mins ago",
      type: "clinic",
    },
    {
      id: "3",
      action: "Appointment completed",
      user: "John Smith",
      time: "1 hour ago",
      type: "appointment",
    },
    {
      id: "4",
      action: "User reported issue",
      user: "Mike Brown",
      time: "2 hours ago",
      type: "report",
    },
  ];

  const pendingApprovals = [
    {
      id: "1",
      title: "Dentist Verification",
      dentist: "Dr. Emily Brown",
      clinic: "Healthy Teeth Hub",
      days: 2,
    },
    {
      id: "2",
      title: "Clinic Verification",
      dentist: "Bright Smiles Center",
      clinic: "New Registration",
      days: 3,
    },
    {
      id: "3",
      title: "Document Review",
      dentist: "Dr. Michael Chen",
      clinic: "Dental Care Plus",
      days: 1,
    },
  ];

  const quickActions = [
    { title: "Manage Users", icon: UserPlus, color: "#3b82f6" },
    { title: "Verify Dentists", icon: ShieldCheck, color: "#3b82f6" },
    { title: "Clinics", icon: Building2, color: "#3b82f6" },
    { title: "Reports", icon: BarChart3, color: "#3b82f6" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-12 pb-6 rounded-b-3xl">
        <Text className="text-white text-sm opacity-80">Welcome back,</Text>
        <Text className="text-white text-2xl font-bold">
          {user?.name || "Admin"}
        </Text>
        <Text className="text-white text-sm opacity-80 mt-1">
          Here's what's happening today
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
                    <Text className="text-blue-600 text-xs mt-1">
                      {stat.change}
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

        {/* Pending Approvals */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-900">
            Pending Approvals
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-medium">View All</Text>
          </TouchableOpacity>
        </View>

        <View
          className="bg-white rounded-xl mb-6 shadow-sm"
          style={{ elevation: 2 }}
        >
          {pendingApprovals.map((approval, index) => (
            <TouchableOpacity
              key={approval.id}
              className={`p-4 ${
                index !== pendingApprovals.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-gray-900 font-semibold">
                    {approval.title}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">
                    {approval.dentist}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {approval.clinic}
                  </Text>
                </View>
                <View className="items-end">
                  <View className="bg-yellow-100 px-2 py-1 rounded-lg">
                    <Text className="text-yellow-700 text-xs font-medium">
                      {approval.days} days
                    </Text>
                  </View>
                  <TouchableOpacity className="mt-2">
                    <Text className="text-blue-600 text-xs font-medium">
                      Review
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Recent Activity
        </Text>
        {recentActivity.map((activity) => {
          const getActivityIcon = () => {
            switch (activity.type) {
              case "dentist":
                return Stethoscope;
              case "clinic":
                return Building2;
              case "appointment":
                return Calendar;
              default:
                return AlertTriangle;
            }
          };
          const IconComponent = getActivityIcon();

          return (
            <View
              key={activity.id}
              className="bg-white p-4 rounded-xl mb-3 flex-row items-center shadow-sm"
              style={{ elevation: 2 }}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  activity.type === "dentist"
                    ? "bg-blue-100"
                    : activity.type === "clinic"
                      ? "bg-blue-100"
                      : activity.type === "appointment"
                        ? "bg-blue-100"
                        : "bg-red-100"
                }`}
              >
                <IconComponent
                  size={18}
                  color={activity.type === "report" ? "#ef4444" : "#3b82f6"}
                />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-gray-900 font-medium">
                  {activity.action}
                </Text>
                <Text className="text-gray-500 text-xs">{activity.user}</Text>
              </View>
              <Text className="text-gray-400 text-xs">{activity.time}</Text>
            </View>
          );
        })}

        {/* Quick Actions */}
        <Text className="text-lg font-bold text-gray-900 mt-6 mb-4">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={index}
                className="w-[48%] bg-blue-600 p-4 rounded-xl mb-3 items-center"
                style={{ elevation: 2 }}
              >
                <IconComponent size={24} color="#fff" />
                <Text className="text-white font-medium text-center mt-2">
                  {action.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ScrollView>
  );
}
