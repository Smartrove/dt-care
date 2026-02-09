// RegisterScreen.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type UserRole = "PATIENT" | "DENTIST";

interface FormData {
  // Common fields
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "";
  dateOfBirth: string;
  // Dentist-specific fields
  mdcnLicenseNumber: string;
  yearsOfExperience: string;
  bio: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  dateOfBirth?: string;
  mdcnLicenseNumber?: string;
  yearsOfExperience?: string;
  role?: string;
}

const DENTIST_SPECIALIZATIONS = [
  "GENERAL_DENTISTRY",
  "ORTHODONTICS",
  "PERIODONTICS",
  "ENDODONTICS",
  "PROSTHODONTICS",
  "ORAL_SURGERY",
  "PEDIATRIC_DENTISTRY",
  "COSMETIC_DENTISTRY",
  "IMPLANTOLOGY",
  "ORAL_PATHOLOGY",
];

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    mdcnLicenseNumber: "",
    yearsOfExperience: "",
    bio: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      !/^(\+234|0)[789]\d{9}$/.test(formData.phoneNumber.replace(/\s/g, ""))
    ) {
      newErrors.phoneNumber = "Please enter a valid Nigerian phone number";
    }

    if (!selectedRole) {
      newErrors.role = "Please select your account type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDentistStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.mdcnLicenseNumber.trim()) {
      newErrors.mdcnLicenseNumber = "MDCN license number is required";
    }

    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of experience is required";
    } else if (parseInt(formData.yearsOfExperience) < 0) {
      newErrors.yearsOfExperience = "Please enter a valid number";
    }

    if (selectedSpecializations.length === 0) {
      newErrors.role = "Please select at least one specialization";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedRole === "DENTIST") {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    } else if (currentStep === 2 && selectedRole === "PATIENT") {
      if (validateStep2()) {
        handleRegister();
      }
    }
  };

  const handleDentistRegister = () => {
    if (validateDentistStep()) {
      handleRegister();
    }
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else {
      router.back();
    }
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      const endpoint =
        selectedRole === "DENTIST"
          ? "auth/register/dentist"
          : "auth/register/patient";

      const payload: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
      };

      if (selectedRole === "DENTIST") {
        payload.mdcnLicenseNumber = formData.mdcnLicenseNumber;
        payload.yearsOfExperience = parseInt(formData.yearsOfExperience);
        payload.specializations = selectedSpecializations;
        payload.bio = formData.bio;
      }

      // API call to your NestJS backend
      const response = await fetch(`YOUR_API_URL/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push({
        pathname: "/verify-otp",
        params: { userId: data.userId, email: formData.email },
      });

      Alert.alert(
        "Success",
        "Account created! Please check your email and phone for verification codes.",
      );
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.message || "Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const totalSteps = selectedRole === "DENTIST" ? 3 : 2;
    return (
      <View className="flex-row justify-center mb-6">
        {[1, 2, 3].map((step) => (
          <View key={step} className="items-center mx-1">
            <View
              className={`w-8 h-8 rounded-full items-center justify-center ${
                currentStep >= step ? "bg-[#0a7ea4]" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-bold ${
                  currentStep >= step ? "text-white" : "text-gray-500"
                }`}
              >
                {step}
              </Text>
            </View>
            {step < totalSteps && (
              <View
                className={`w-8 h-0.5 mt-[-16px] ${
                  currentStep > step ? "bg-[#0a7ea4]" : "bg-gray-200"
                }`}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderStep1 = () => (
    <View>
      {/* Role Selection */}
      <View className="mb-6">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          I am a <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row gap-3">
          {[
            { role: "PATIENT", label: "Patient", icon: "🏥" },
            { role: "DENTIST", label: "Dentist", icon: "👨‍⚕️" },
          ].map((option) => (
            <TouchableOpacity
              key={option.role}
              onPress={() => setSelectedRole(option.role as UserRole)}
              className={`flex-1 py-4 rounded-xl border-2 items-center ${
                selectedRole === option.role
                  ? "border-[#0a7ea4] bg-[#0a7ea4]/10"
                  : "border-gray-200"
              }`}
            >
              <Text className="text-2xl mb-1">{option.icon}</Text>
              <Text
                className={`text-sm font-semibold ${
                  selectedRole === option.role
                    ? "text-[#0a7ea4]"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.role && (
          <Text className="text-red-500 text-xs mt-1 ml-1">{errors.role}</Text>
        )}
      </View>

      {/* First Name */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          First Name <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="text-base text-gray-900"
            placeholder="Enter your first name"
            placeholderTextColor="#9CA3AF"
            value={formData.firstName}
            onChangeText={(text) => updateFormData("firstName", text)}
            autoCapitalize="words"
          />
        </View>
        {errors.firstName && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.firstName}
          </Text>
        )}
      </View>

      {/* Last Name */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Last Name <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 ${
            errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="text-base text-gray-900"
            placeholder="Enter your last name"
            placeholderTextColor="#9CA3AF"
            value={formData.lastName}
            onChangeText={(text) => updateFormData("lastName", text)}
            autoCapitalize="words"
          />
        </View>
        {errors.lastName && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.lastName}
          </Text>
        )}
      </View>

      {/* Email */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Email Address <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="text-base text-gray-900"
            placeholder="example@email.com"
            placeholderTextColor="#9CA3AF"
            value={formData.email}
            onChangeText={(text) => updateFormData("email", text.toLowerCase())}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        {errors.email && (
          <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>
        )}
      </View>

      {/* Phone Number */}
      <View className="mb-6">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Phone Number <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 ${
            errors.phoneNumber ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="text-base text-gray-900"
            placeholder="08012345678"
            placeholderTextColor="#9CA3AF"
            value={formData.phoneNumber}
            onChangeText={(text) => updateFormData("phoneNumber", text)}
            keyboardType="phone-pad"
          />
        </View>
        {errors.phoneNumber && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.phoneNumber}
          </Text>
        )}
        <Text className="text-gray-500 text-xs mt-1 ml-1">
          Format: 08012345678 or +2348012345678
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleNext}
        activeOpacity={0.8}
        className="bg-[#0a7ea4] py-4 rounded-xl items-center shadow-lg mb-4"
      >
        <Text className="text-white text-base font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View>
      {/* Password */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Password <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 flex-row items-center ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="flex-1 text-base text-gray-900"
            placeholder="Create a strong password"
            placeholderTextColor="#9CA3AF"
            value={formData.password}
            onChangeText={(text) => updateFormData("password", text)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-[#0a7ea4] text-sm font-semibold">
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.password}
          </Text>
        )}
        <Text className="text-gray-500 text-xs mt-1 ml-1">
          Must be 8+ characters with uppercase, lowercase, and number
        </Text>
      </View>

      {/* Confirm Password */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Confirm Password <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 flex-row items-center ${
            errors.confirmPassword ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="flex-1 text-base text-gray-900"
            placeholder="Re-enter your password"
            placeholderTextColor="#9CA3AF"
            value={formData.confirmPassword}
            onChangeText={(text) => updateFormData("confirmPassword", text)}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text className="text-[#0a7ea4] text-sm font-semibold">
              {showConfirmPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.confirmPassword}
          </Text>
        )}
      </View>

      {/* Gender Selection */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Gender <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row gap-2">
          {["MALE", "FEMALE", "OTHER"].map((gender) => (
            <TouchableOpacity
              key={gender}
              onPress={() => updateFormData("gender", gender)}
              className={`flex-1 py-3 rounded-xl border-2 items-center ${
                formData.gender === gender
                  ? "border-[#0a7ea4] bg-[#0a7ea4]/10"
                  : "border-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  formData.gender === gender
                    ? "text-[#0a7ea4]"
                    : "text-gray-700"
                }`}
              >
                {gender.charAt(0) + gender.slice(1).toLowerCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.gender && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.gender}
          </Text>
        )}
      </View>

      {/* Date of Birth */}
      <View className="mb-6">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Date of Birth <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="text-base text-gray-900"
            placeholder="YYYY-MM-DD (e.g., 1990-01-15)"
            placeholderTextColor="#9CA3AF"
            value={formData.dateOfBirth}
            onChangeText={(text) => updateFormData("dateOfBirth", text)}
            keyboardType="numbers-and-punctuation"
          />
        </View>
        {errors.dateOfBirth && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.dateOfBirth}
          </Text>
        )}
        <Text className="text-gray-500 text-xs mt-1 ml-1">
          Format: YYYY-MM-DD (e.g., 1990-01-15)
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="gap-3">
        <TouchableOpacity
          onPress={handleNext}
          disabled={loading}
          activeOpacity={0.8}
          className={`bg-[#0a7ea4] py-4 rounded-xl items-center shadow-lg ${
            loading ? "opacity-70" : ""
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : selectedRole === "DENTIST" ? (
            <Text className="text-white text-base font-bold">Continue</Text>
          ) : (
            <Text className="text-white text-base font-bold">
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBack}
          disabled={loading}
          activeOpacity={0.8}
          className="border-2 border-gray-200 py-4 rounded-xl items-center"
        >
          <Text className="text-gray-700 text-base font-bold">Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDentistStep = () => (
    <View>
      {/* MDCN License */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          MDCN License Number <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 ${
            errors.mdcnLicenseNumber ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="text-base text-gray-900"
            placeholder="Enter your MDCN license number"
            placeholderTextColor="#9CA3AF"
            value={formData.mdcnLicenseNumber}
            onChangeText={(text) => updateFormData("mdcnLicenseNumber", text)}
            autoCapitalize="characters"
          />
        </View>
        {errors.mdcnLicenseNumber && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.mdcnLicenseNumber}
          </Text>
        )}
        <Text className="text-gray-500 text-xs mt-1 ml-1">
          Medical & Dental Council of Nigeria registration number
        </Text>
      </View>

      {/* Years of Experience */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Years of Experience <Text className="text-red-500">*</Text>
        </Text>
        <View
          className={`border-2 rounded-xl px-4 py-3 ${
            errors.yearsOfExperience ? "border-red-500" : "border-gray-200"
          }`}
        >
          <TextInput
            className="text-base text-gray-900"
            placeholder="e.g., 5"
            placeholderTextColor="#9CA3AF"
            value={formData.yearsOfExperience}
            onChangeText={(text) => updateFormData("yearsOfExperience", text)}
            keyboardType="number-pad"
          />
        </View>
        {errors.yearsOfExperience && (
          <Text className="text-red-500 text-xs mt-1 ml-1">
            {errors.yearsOfExperience}
          </Text>
        )}
      </View>

      {/* Specializations */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Specializations <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {DENTIST_SPECIALIZATIONS.map((spec) => {
            const isSelected = selectedSpecializations.includes(spec);
            const shortName = spec.replace(/_/g, " ");
            return (
              <TouchableOpacity
                key={spec}
                onPress={() => {
                  if (isSelected) {
                    setSelectedSpecializations(
                      selectedSpecializations.filter((s) => s !== spec),
                    );
                  } else {
                    setSelectedSpecializations([
                      ...selectedSpecializations,
                      spec,
                    ]);
                  }
                }}
                className={`px-3 py-2 rounded-lg border-2 ${
                  isSelected
                    ? "border-[#0a7ea4] bg-[#0a7ea4]/10"
                    : "border-gray-200"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    isSelected ? "text-[#0a7ea4]" : "text-gray-600"
                  }`}
                >
                  {shortName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {errors.role && (
          <Text className="text-red-500 text-xs mt-1 ml-1">{errors.role}</Text>
        )}
      </View>

      {/* Bio (Optional) */}
      <View className="mb-6">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Bio <Text className="text-gray-400">(Optional)</Text>
        </Text>
        <View className="border-2 border-gray-200 rounded-xl px-4 py-3">
          <TextInput
            className="text-base text-gray-900 min-h-[80]"
            placeholder="Tell patients about yourself..."
            placeholderTextColor="#9CA3AF"
            value={formData.bio}
            onChangeText={(text) => updateFormData("bio", text)}
            multiline
            textAlignVertical="top"
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View className="gap-3">
        <TouchableOpacity
          onPress={handleDentistRegister}
          disabled={loading}
          activeOpacity={0.8}
          className={`bg-[#0a7ea4] py-4 rounded-xl items-center shadow-lg ${
            loading ? "opacity-70" : ""
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-base font-bold">
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBack}
          disabled={loading}
          activeOpacity={0.8}
          className="border-2 border-gray-200 py-4 rounded-xl items-center"
        >
          <Text className="text-gray-700 text-base font-bold">Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-16 pb-8">
          {/* Header */}
          <View className="mb-6">
            <TouchableOpacity
              onPress={handleBack}
              className="w-10 h-10 items-center justify-center mb-4"
            >
              <Text className="text-2xl">←</Text>
            </TouchableOpacity>
            <View className="flex-row items-center gap-3 mb-2">
              <View className="w-12 h-12 bg-[#0a7ea4] rounded-xl items-center justify-center">
                <Text className="text-white text-xl font-bold">🦷</Text>
              </View>
              <View>
                <Text className="text-2xl font-bold text-gray-900">
                  Create Account
                </Text>
                <Text className="text-sm text-gray-500">
                  {selectedRole === "DENTIST"
                    ? "Register as a Dentist"
                    : "Register as a Patient"}
                </Text>
              </View>
            </View>
          </View>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form Steps */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 &&
            selectedRole === "DENTIST" &&
            renderDentistStep()}

          {/* Login Link */}
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-600 text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              activeOpacity={0.7}
            >
              <Text className="text-[#0a7ea4] text-sm font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View className="items-center mt-4">
            <Text className="text-gray-500 text-xs text-center leading-5">
              By continuing, you agree to our{" "}
              <Text className="text-[#0a7ea4] font-semibold">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="text-[#0a7ea4] font-semibold">
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
