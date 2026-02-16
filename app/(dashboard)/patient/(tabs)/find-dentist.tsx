import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function FindDentistScreen() {
  const dentists = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "General Dentistry",
      rating: 4.8,
      reviews: 124,
      experience: "10 years",
      location: "Lagos Island",
      fee: "₦5,000",
      available: true,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Orthodontics",
      rating: 4.9,
      reviews: 89,
      experience: "8 years",
      location: "Victoria Island",
      fee: "₦8,000",
      available: true,
    },
    {
      id: "3",
      name: "Dr. Emily Brown",
      specialization: "Pediatric Dentistry",
      rating: 4.7,
      reviews: 56,
      experience: "6 years",
      location: "Ikeja",
      fee: "₦4,500",
      available: false,
    },
  ];

  const specializations = [
    "All",
    "General Dentistry",
    "Orthodontics",
    "Pediatric Dentistry",
    "Cosmetic Dentistry",
    "Oral Surgery",
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Find a Dentist</Text>
        <Text className="text-gray-500 text-sm mt-1">
          Search and book appointments with top dentists
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
          <Text className="text-gray-400 mr-3">🔍</Text>
          <TextInput
            className="flex-1 text-gray-900"
            placeholder="Search by name, location, or specialty"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Specialization Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {specializations.map((spec, index) => (
            <TouchableOpacity
              key={spec}
              className={`px-4 py-2 rounded-full mr-2 ${
                index === 0 ? "bg-[#0a7ea4]" : "bg-white border border-gray-200"
              }`}
            >
              <Text
                className={`font-medium text-xs ${
                  index === 0 ? "text-white" : "text-gray-700"
                }`}
              >
                {spec}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Dentist List */}
        {dentists.map((dentist) => (
          <TouchableOpacity
            key={dentist.id}
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            style={{ elevation: 2 }}
          >
            <View className="flex-row items-start">
              <View className="w-16 h-16 bg-[#0a7ea4] rounded-full items-center justify-center">
                <Text className="text-white font-bold text-xl">
                  {dentist.name.charAt(4)}
                </Text>
              </View>
              <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-gray-900 font-bold">
                      {dentist.name}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {dentist.specialization}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-yellow-500 mr-1">★</Text>
                    <Text className="text-gray-900 font-medium">
                      {dentist.rating}
                    </Text>
                    <Text className="text-gray-400 text-xs ml-1">
                      ({dentist.reviews})
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center mt-2 gap-3">
                  <Text className="text-gray-500 text-xs">
                    📍 {dentist.location}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    💼 {dentist.experience}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center mt-3">
                  <Text className="text-[#0a7ea4] font-bold text-lg">
                    {dentist.fee}
                  </Text>
                  <TouchableOpacity
                    className={`px-4 py-2 rounded-lg ${
                      dentist.available ? "bg-[#0a7ea4]" : "bg-gray-300"
                    }`}
                    disabled={!dentist.available}
                  >
                    <Text
                      className={`font-medium text-sm ${
                        dentist.available ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {dentist.available ? "Book Now" : "Unavailable"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
