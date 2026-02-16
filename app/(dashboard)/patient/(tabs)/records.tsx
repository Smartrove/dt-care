import {
  useGetPatientMedicalRecordsQuery,
  useGetPatientPrescriptionsQuery,
} from "@/store/api/apiSlice";
import { FileText, Pill, ScrollText } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type FilterType = "All" | "Records" | "Prescriptions";

export default function PatientRecordsScreen() {
  const [filter, setFilter] = useState<FilterType>("All");

  const { data: medicalRecords, isLoading: isRecordsLoading } =
    useGetPatientMedicalRecordsQuery();
  const { data: prescriptions, isLoading: isPrescriptionsLoading } =
    useGetPatientPrescriptionsQuery();

  const isLoading = isRecordsLoading || isPrescriptionsLoading;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filterOptions: FilterType[] = ["All", "Records", "Prescriptions"];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-12 pb-4">
        <Text className="text-2xl font-bold text-white">Medical Records</Text>
        <Text className="text-blue-100 text-sm mt-1">
          View your dental history and prescriptions
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
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
                className={`font-medium text-xs ${
                  filter === option ? "text-white" : "text-gray-700"
                }`}
              >
                {option === "Records" ? "Medical Records" : option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Loading State */}
        {isLoading && (
          <View className="bg-white p-6 rounded-xl items-center">
            <ActivityIndicator color="#3b82f6" />
            <Text className="text-gray-600 mt-2">Loading records...</Text>
          </View>
        )}

        {/* Medical Records Section */}
        {!isLoading &&
          (filter === "All" || filter === "Records") &&
          medicalRecords &&
          medicalRecords.length > 0 && (
            <>
              {filter === "All" && (
                <Text className="text-lg font-bold text-gray-900 mb-4 mt-2">
                  Medical Records
                </Text>
              )}
              {medicalRecords.map((record) => (
                <TouchableOpacity
                  key={record.id}
                  className="bg-white p-4 rounded-xl mb-3 shadow-sm"
                  style={{ elevation: 2 }}
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                      <Text className="text-gray-500 text-xs">
                        {formatDate(record.createdAt)}
                      </Text>
                      <Text className="text-gray-900 font-bold mt-1">
                        {record.diagnosis}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        Dentist #{record.dentistId}
                      </Text>
                    </View>
                    <View className="bg-blue-100 px-3 py-1 rounded-full">
                      <Text className="text-blue-600 text-xs font-medium">
                        Record
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-4 pt-3 border-t border-gray-100">
                    <View className="flex-row items-center">
                      <ScrollText size={14} color="#6B7280" />
                      <Text className="text-gray-500 text-xs ml-1">
                        Appointment #{record.appointmentId}
                      </Text>
                    </View>
                  </View>
                  <View className="mt-2 bg-gray-50 p-2 rounded-lg">
                    <Text className="text-gray-600 text-xs">
                      <Text className="font-medium">Treatment:</Text>{" "}
                      {record.treatment}
                    </Text>
                    {record.notes && (
                      <Text className="text-gray-500 text-xs mt-1">
                        <Text className="font-medium">Notes:</Text>{" "}
                        {record.notes}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

        {/* Prescriptions Section */}
        {!isLoading &&
          (filter === "All" || filter === "Prescriptions") &&
          prescriptions &&
          prescriptions.length > 0 && (
            <>
              {filter === "All" && (
                <Text className="text-lg font-bold text-gray-900 mb-4 mt-2">
                  Prescriptions
                </Text>
              )}
              {prescriptions.map((prescription) => (
                <TouchableOpacity
                  key={prescription.id}
                  className="bg-white p-4 rounded-xl mb-3 shadow-sm"
                  style={{ elevation: 2 }}
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                      <Text className="text-gray-500 text-xs">
                        {formatDate(prescription.createdAt)}
                      </Text>
                      <Text className="text-gray-900 font-bold mt-1">
                        Prescription
                      </Text>
                      <Text className="text-gray">
                        Dentist-500 text-sm #{prescription.dentistId}
                      </Text>
                    </View>
                    <View className="bg-green-100 px-3 py-1 rounded-full">
                      <Text className="text-green-600 text-xs font-medium">
                        Rx
                      </Text>
                    </View>
                  </View>

                  {/* Medications List */}
                  <View className="mt-2">
                    <Text className="text-gray-700 text-sm font-medium mb-2">
                      Medications:
                    </Text>
                    {prescription.medications.map((med, index) => (
                      <View
                        key={index}
                        className="bg-gray-50 p-2 rounded-lg mb-2"
                      >
                        <View className="flex-row items-center">
                          <Pill size={14} color="#6B7280" />
                          <Text className="text-gray-900 text-xs font-medium ml-1">
                            {med.name}
                          </Text>
                        </View>
                        <Text className="text-gray-600 text-xs ml-5">
                          {med.dosage} - {med.frequency} for {med.duration}
                        </Text>
                        {med.instructions && (
                          <Text className="text-gray-500 text-xs ml-5 italic">
                            {med.instructions}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>

                  {prescription.notes && (
                    <View className="mt-2 bg-yellow-50 p-2 rounded-lg">
                      <Text className="text-yellow-700 text-xs">
                        <Text className="font-medium">Notes:</Text>{" "}
                        {prescription.notes}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </>
          )}

        {/* Empty State */}
        {!isLoading &&
          ((filter === "All" &&
            !medicalRecords?.length &&
            !prescriptions?.length) ||
            (filter === "Records" && !medicalRecords?.length) ||
            (filter === "Prescriptions" && !prescriptions?.length)) && (
            <View className="bg-white p-6 rounded-xl items-center">
              <FileText size={40} color="#9CA3AF" />
              <Text className="text-gray-600 mt-2">No records found</Text>
              <Text className="text-gray-400 text-sm">
                Your medical records and prescriptions will appear here
              </Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
}
