// RegisterScreen.tsx
import { useRouter } from "expo-router";
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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "";
  dateOfBirth: string;
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
}

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
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

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleRegister = async () => {
    if (!validateStep2()) {
      return;
    }

    setLoading(true);

    try {
      // API call to your NestJS backend
      const response = await fetch("YOUR_API_URL/auth/register/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Navigate to OTP verification screen
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

  const renderStep1 = () => (
    <View>
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

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNext}
        activeOpacity={0.8}
        className="bg-blue-600 py-4 rounded-xl items-center shadow-lg mb-4"
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
            <Text className="text-blue-600 text-sm font-semibold">
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
            <Text className="text-blue-600 text-sm font-semibold">
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
                  ? "bg-blue-50 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  formData.gender === gender ? "text-blue-600" : "text-gray-700"
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
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.8}
          className={`bg-blue-600 py-4 rounded-xl items-center shadow-lg ${
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
          <View className="mb-8">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center mb-4"
            >
              <Text className="text-2xl">←</Text>
            </TouchableOpacity>
            <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4">
              <Text
                className="text-white text-3xl font-bold"
                onPress={() => router.push("/")}
              >
                🦷
              </Text>
            </View>
            <Text className="text-4xl font-extrabold text-gray-900 mb-2">
              Create Account
            </Text>
            <Text className="text-base text-gray-600">
              Join DentalCare and start your journey to better dental health
            </Text>
          </View>

          {/* Progress Indicator */}
          <View className="flex-row mb-8">
            <View
              className={`flex-1 h-1 rounded-full mr-2 ${
                currentStep >= 1 ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
            <View
              className={`flex-1 h-1 rounded-full ${
                currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          </View>

          {/* Step Title */}
          <Text className="text-lg font-bold text-gray-900 mb-6">
            {currentStep === 1
              ? "Step 1: Personal Information"
              : "Step 2: Security & Profile"}
          </Text>

          {/* Form Steps */}
          {currentStep === 1 ? renderStep1() : renderStep2()}

          {/* Sign In Link */}
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-600 text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              activeOpacity={0.7}
            >
              <Text className="text-blue-600 text-sm font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View className="items-center mt-6">
            <Text className="text-gray-500 text-xs text-center leading-5">
              By creating an account, you agree to our{" "}
              <Text className="text-blue-600 font-semibold">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="text-blue-600 font-semibold">
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
