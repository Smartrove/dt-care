import {
  useGetCurrentPatientQuery,
  useGetFamilyMembersQuery,
  useGetPatientAppointmentsQuery,
} from "@/store/api/apiSlice";
import { clearAllAuthData } from "@/store/authStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  Heart,
  HelpCircle,
  Info,
  LogOut,
  Shield,
  User,
} from "lucide-react-native";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PatientProfileScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authUser = useAppSelector((state) => state.auth.user);

  // Fetch patient data
  const { data: patient, isLoading: isPatientLoading } =
    useGetCurrentPatientQuery();
  const { data: appointments } = useGetPatientAppointmentsQuery();
  const { data: familyMembers } = useGetFamilyMembersQuery();

  const menuItems = [
    {
      id: "1",
      title: "Personal Information",
      icon: User,
      color: "#3b82f6",
      action: () => {},
    },
    {
      id: "2",
      title: "Medical History",
      icon: Heart,
      color: "#10b981",
      action: () => router.push("/(dashboard)/patient/(tabs)/records"),
    },
    {
      id: "3",
      title: "Insurance Details",
      icon: FileText,
      color: "#f59e0b",
      action: () => {},
    },
    {
      id: "4",
      title: "Payment Methods",
      icon: CreditCard,
      color: "#8b5cf6",
      action: () => {},
    },
    {
      id: "5",
      title: "Notifications",
      icon: Bell,
      color: "#ef4444",
      action: () => {},
    },
    {
      id: "6",
      title: "Privacy & Security",
      icon: Shield,
      color: "#6366f1",
      action: () => {},
    },
    {
      id: "7",
      title: "Help & Support",
      icon: HelpCircle,
      color: "#6b7280",
      action: () => {},
    },
    { id: "8", title: "About", icon: Info, color: "#0891b2", action: () => {} },
  ];

  // Calculate stats from real data
  const totalAppointments = appointments?.length || 0;
  const completedAppointments =
    appointments?.filter((a) => a.status === "COMPLETED").length || 0;
  const familyMembersCount = familyMembers?.length || 0;

  // Get user initials for avatar
  const getUserInitials = () => {
    if (patient) {
      const name = `${patient.firstName} ${patient.lastName}`;
      const names = name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (authUser?.name) {
      const names = authUser.name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return authUser.name.substring(0, 2).toUpperCase();
    }
    if (authUser?.email) {
      return authUser.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  // Get display name
  const getDisplayName = () => {
    if (patient) {
      return `${patient.firstName} ${patient.lastName}`;
    }
    return authUser?.name || "Patient";
  };

  const handleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              // Clear Redux state
              dispatch(logout());
              // Clear secure storage
              await clearAllAuthData();
              // Navigate to login
              router.replace("/login");
            } catch (error) {
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-12 pb-6 rounded-b-3xl">
        <View className="items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-3 border-4 border-white/30">
            {isPatientLoading ? (
              <ActivityIndicator color="#3b82f6" />
            ) : (
              <Text className="text-blue-600 text-3xl font-bold">
                {getUserInitials()}
              </Text>
            )}
          </View>
          <Text className="text-white text-xl font-bold">
            {getDisplayName()}
          </Text>
          <Text className="text-blue-100 text-sm">
            {patient?.email || authUser?.email || ""}
          </Text>
          {patient?.phoneNumber && (
            <Text className="text-blue-200 text-sm mt-1">
              {patient.phoneNumber}
            </Text>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Stats */}
        <View className="flex-row justify-around bg-white p-4 rounded-xl mb-6 shadow-sm">
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">
              {totalAppointments}
            </Text>
            <Text className="text-gray-500 text-xs">Appointments</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">
              {completedAppointments}
            </Text>
            <Text className="text-gray-500 text-xs">Completed</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">
              {familyMembersCount}
            </Text>
            <Text className="text-gray-500 text-xs">Family</Text>
          </View>
        </View>

        {/* Medical Info */}
        {(patient?.bloodType ||
          patient?.allergies?.length ||
          patient?.medicalConditions?.length) && (
          <View className="bg-white p-4 rounded-xl mb-6 shadow-sm">
            <Text className="text-gray-900 font-bold mb-3">
              Medical Information
            </Text>
            {patient?.bloodType && (
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500">Blood Type</Text>
                <Text className="text-gray-900 font-medium">
                  {patient.bloodType}
                </Text>
              </View>
            )}
            {patient?.allergies && patient.allergies.length > 0 && (
              <View className="mb-2">
                <Text className="text-gray-500 text-xs mb-1">Allergies</Text>
                <View className="flex-row flex-wrap gap-1">
                  {patient.allergies.map((allergy, index) => (
                    <View
                      key={index}
                      className="bg-red-100 px-2 py-1 rounded-full"
                    >
                      <Text className="text-red-600 text-xs">{allergy}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {patient?.medicalConditions &&
              patient.medicalConditions.length > 0 && (
                <View>
                  <Text className="text-gray-500 text-xs mb-1">
                    Medical Conditions
                  </Text>
                  <View className="flex-row flex-wrap gap-1">
                    {patient.medicalConditions.map((condition, index) => (
                      <View
                        key={index}
                        className="bg-yellow-100 px-2 py-1 rounded-full"
                      >
                        <Text className="text-yellow-700 text-xs">
                          {condition}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
          </View>
        )}

        {/* Menu Items */}
        <View
          className="bg-white rounded-xl shadow-sm"
          style={{ elevation: 2 }}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center p-4 ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onPress={item.action}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon size={20} color={item.color} />
              </View>
              <Text className="flex-1 ml-3 text-gray-900 font-medium">
                {item.title}
              </Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 p-4 rounded-xl mt-6 flex-row items-center justify-center"
          style={{ elevation: 2 }}
        >
          <LogOut size={20} color="#EF4444" />
          <Text className="text-red-500 font-medium ml-2">Log Out</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-400 text-xs mt-6">
          Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
