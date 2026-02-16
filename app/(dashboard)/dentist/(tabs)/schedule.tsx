import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DentistScheduleScreen() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
  ];

  const schedule = {
    Mon: ["9:00", "10:30", "11:00", null, "2:00", "3:30", "4:00"],
    Tue: ["9:30", "10:00", null, "1:00", "2:30", "4:00"],
    Wed: ["9:00", "10:00", "11:30", null, "2:00", "3:00", "4:30"],
    Thu: ["9:00", null, "11:00", "12:30", "2:00", "3:30"],
    Fri: ["9:00", "10:00", "11:00", null, "2:00", "3:00", "4:00", "4:30"],
    Sat: ["9:00", "10:00", "11:00"],
    Sun: [],
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Schedule</Text>
        <Text className="text-gray-500 text-sm mt-1">
          Manage your weekly availability
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Week View */}
        <View className="flex-row justify-between mb-4">
          {days.map((day, index) => (
            <TouchableOpacity
              key={day}
              className={`items-center py-2 px-3 rounded-xl ${
                index === 0 ? "bg-[#059669]" : "bg-white"
              }`}
              style={{ elevation: 2 }}
            >
              <Text
                className={`text-xs font-medium ${
                  index === 0 ? "text-white" : "text-gray-600"
                }`}
              >
                {day}
              </Text>
              <Text
                className={`text-lg font-bold ${
                  index === 0 ? "text-white" : "text-gray-900"
                }`}
              >
                {10 + index}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Slots */}
        <View
          className="bg-white rounded-xl p-4 shadow-sm"
          style={{ elevation: 2 }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-900 font-bold">Monday, Feb 10</Text>
            <TouchableOpacity className="bg-[#059669] px-3 py-1 rounded-lg">
              <Text className="text-white font-medium text-sm">Edit</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {hours.map((hour, index) => {
              const isBooked = schedule.Mon[index] !== null;
              return (
                <TouchableOpacity
                  key={hour}
                  className={`px-4 py-2 rounded-lg ${
                    isBooked ? "bg-[#059669]" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`font-medium text-sm ${
                      isBooked ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {hour}
                    {isBooked && ` - ${schedule.Mon[index]}`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Weekly Summary */}
        <Text className="text-lg font-bold text-gray-900 mt-6 mb-4">
          Weekly Summary
        </Text>
        <View
          className="bg-white rounded-xl p-4 shadow-sm"
          style={{ elevation: 2 }}
        >
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Total Appointments</Text>
            <Text className="text-gray-900 font-bold">24</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Available Hours</Text>
            <Text className="text-gray-900 font-bold">32</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Busy Hours</Text>
            <Text className="text-gray-900 font-bold">16</Text>
          </View>
        </View>

        {/* Time Off */}
        <Text className="text-lg font-bold text-gray-900 mt-6 mb-4">
          Time Off
        </Text>
        <View className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <Text className="text-yellow-800 font-medium">
            No time off scheduled
          </Text>
          <TouchableOpacity className="mt-2">
            <Text className="text-[#059669] font-medium">+ Add Time Off</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
