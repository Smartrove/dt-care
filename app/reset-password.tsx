// ResetPasswordScreen.tsx
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

const ResetPasswordScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const userId = params.userId as string;
  const resetToken = params.token as string;

  const validateForm = (): boolean => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("YOUR_API_URL/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          resetToken,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      Alert.alert(
        "Password Reset Successful",
        "Your password has been updated. You can now sign in with your new password.",
        [{ text: "OK", onPress: () => router.replace("/login") }],
      );
    } catch (error: any) {
      Alert.alert(
        "Reset Failed",
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

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
            <View className="flex-row items-center gap-3 mb-2">
              <View className="w-12 h-12 bg-[#0a7ea4] rounded-xl items-center justify-center">
                <Text className="text-white text-xl font-bold">🔐</Text>
              </View>
              <View>
                <Text className="text-2xl font-bold text-gray-900">
                  Reset Password
                </Text>
                <Text className="text-sm text-gray-500">
                  Create a new password
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <Text className="text-sm text-gray-700">
              Your new password must be different from previously used
              passwords.
            </Text>
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              New Password <Text className="text-red-500">*</Text>
            </Text>
            <View
              className={`border-2 rounded-xl px-4 py-3 flex-row items-center ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            >
              <TextInput
                className="flex-1 text-base text-gray-900"
                placeholder="Create a new password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
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

          {/* Confirm Password Input */}
          <View className="mb-6">
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
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: undefined });
                }}
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

          {/* Reset Password Button */}
          <TouchableOpacity
            onPress={handleResetPassword}
            disabled={loading}
            activeOpacity={0.8}
            className={`bg-[#0a7ea4] py-4 rounded-xl items-center shadow-lg mb-6 ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-bold">
                Reset Password
              </Text>
            )}
          </TouchableOpacity>

          {/* Back to Login */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600 text-sm">
              Remember your password?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/login")}
              activeOpacity={0.7}
            >
              <Text className="text-[#0a7ea4] text-sm font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Security Note */}
          <View className="items-center mt-6">
            <View className="flex-row items-center gap-2">
              <Text className="text-gray-400 text-xs">🔒</Text>
              <Text className="text-gray-500 text-xs">
                Your password is encrypted and secure
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
