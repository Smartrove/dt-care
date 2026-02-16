import {
  useAddFavoriteDentistMutation,
  useGetDentistsQuery,
  useGetFavoriteDentistsQuery,
  useRemoveFavoriteDentistMutation,
} from "@/store/api/apiSlice";
import { Briefcase, Heart, Search, Star } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FindDentistScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

  // Fetch dentists and favorites
  const { data: dentists, isLoading: isDentistsLoading } =
    useGetDentistsQuery();
  const { data: favoriteDentists, isLoading: isFavoritesLoading } =
    useGetFavoriteDentistsQuery();
  const [addFavorite, { isLoading: isAddingFavorite }] =
    useAddFavoriteDentistMutation();
  const [removeFavorite, { isLoading: isRemovingFavorite }] =
    useRemoveFavoriteDentistMutation();

  // Get list of favorite dentist IDs
  const favoriteIds = useMemo(() => {
    return new Set(favoriteDentists?.map((d) => d.id) || []);
  }, [favoriteDentists]);

  // Specializations from the API data
  const specializations = useMemo(() => {
    const specs = new Set<string>(["All"]);
    dentists?.forEach((dentist) => {
      dentist.specializations?.forEach((spec) => {
        specs.add(spec);
      });
    });
    return Array.from(specs);
  }, [dentists]);

  // Filter dentists based on search and specialization
  const filteredDentists = useMemo(() => {
    return (
      dentists?.filter((dentist) => {
        const matchesSearch =
          searchQuery === "" ||
          `${dentist.firstName} ${dentist.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          dentist.specializations?.some((s) =>
            s.toLowerCase().includes(searchQuery.toLowerCase()),
          );

        const matchesSpecialization =
          selectedSpecialization === "All" ||
          dentist.specializations?.includes(selectedSpecialization);

        return matchesSearch && matchesSpecialization;
      }) || []
    );
  }, [dentists, searchQuery, selectedSpecialization]);

  const handleToggleFavorite = async (dentistId: string) => {
    try {
      if (favoriteIds.has(dentistId)) {
        await removeFavorite(dentistId).unwrap();
        Alert.alert("Success", "Dentist removed from favorites");
      } else {
        await addFavorite(dentistId).unwrap();
        Alert.alert("Success", "Dentist added to favorites");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update favorites. Please try again.");
    }
  };

  // Get dentist full name
  const getDentistName = (
    dentist: typeof dentists extends (infer T)[] | undefined ? T : never,
  ) => {
    return `Dr. ${dentist.firstName} ${dentist.lastName}`;
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-12 pb-4">
        <Text className="text-2xl font-bold text-white">Find a Dentist</Text>
        <Text className="text-blue-100 text-sm mt-1">
          Search and book appointments with top dentists
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 text-gray-900 ml-3"
            placeholder="Search by name or specialty"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Specialization Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {specializations.map((spec) => (
            <TouchableOpacity
              key={spec}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedSpecialization === spec
                  ? "bg-blue-600"
                  : "bg-white border border-gray-200"
              }`}
              onPress={() => setSelectedSpecialization(spec)}
            >
              <Text
                className={`font-medium text-xs ${
                  selectedSpecialization === spec
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {spec.replace(/_/g, " ")}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Loading State */}
        {isDentistsLoading && (
          <View className="bg-white p-6 rounded-xl items-center">
            <ActivityIndicator color="#3b82f6" />
            <Text className="text-gray-600 mt-2">Loading dentists...</Text>
          </View>
        )}

        {/* Dentist List */}
        {!isDentistsLoading &&
          filteredDentists.map((dentist) => (
            <View
              key={dentist.id}
              className="bg-white p-4 rounded-xl mb-3 shadow-sm"
              style={{ elevation: 2 }}
            >
              <View className="flex-row items-start">
                {/* Avatar */}
                <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center">
                  {dentist.imageUrl ? (
                    <View className="w-16 h-16 rounded-full overflow-hidden">
                      <Text className="text-white font-bold text-xl">
                        {dentist.firstName[0]}
                        {dentist.lastName[0]}
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-white font-bold text-xl">
                      {dentist.firstName[0]}
                      {dentist.lastName[0]}
                    </Text>
                  )}
                </View>

                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-gray-900 font-bold">
                        {getDentistName(dentist)}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {dentist.specializations
                          ?.map((s) => s.replace(/_/g, " "))
                          .join(", ")}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleToggleFavorite(dentist.id)}
                      disabled={isAddingFavorite || isRemovingFavorite}
                      className="p-1"
                    >
                      <Heart
                        size={24}
                        color={
                          favoriteIds.has(dentist.id) ? "#EF4444" : "#9CA3AF"
                        }
                        fill={favoriteIds.has(dentist.id) ? "#EF4444" : "none"}
                      />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row items-center mt-2 gap-3">
                    {dentist.rating && (
                      <View className="flex-row items-center">
                        <Star size={14} color="#EAB308" fill="#EAB308" />
                        <Text className="text-gray-900 font-medium ml-1">
                          {dentist.rating}
                        </Text>
                        <Text className="text-gray-400 text-xs ml-1">
                          ({dentist.reviewCount || 0})
                        </Text>
                      </View>
                    )}
                    <View className="flex-row items-center">
                      <Briefcase size={14} color="#6B7280" />
                      <Text className="text-gray-500 text-xs ml-1">
                        {dentist.yearsOfExperience} years
                      </Text>
                    </View>
                  </View>

                  {/* Bio */}
                  {dentist.bio && (
                    <Text
                      className="text-gray-500 text-xs mt-2"
                      numberOfLines={2}
                    >
                      {dentist.bio}
                    </Text>
                  )}

                  <View className="flex-row justify-between items-center mt-3">
                    {dentist.isVerified && (
                      <View className="bg-green-100 px-2 py-1 rounded-full">
                        <Text className="text-green-600 text-xs font-medium">
                          Verified
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity
                      className={`px-4 py-2 rounded-lg ml-auto ${
                        dentist.isActive ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      disabled={!dentist.isActive}
                    >
                      <Text
                        className={`font-medium text-sm ${
                          dentist.isActive ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {dentist.isActive ? "Book Now" : "Unavailable"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

        {/* Empty State */}
        {!isDentistsLoading && filteredDentists.length === 0 && (
          <View className="bg-white p-6 rounded-xl items-center">
            <Search size={40} color="#9CA3AF" />
            <Text className="text-gray-600 mt-2">No dentists found</Text>
            <Text className="text-gray-400 text-sm">
              Try adjusting your search criteria
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
