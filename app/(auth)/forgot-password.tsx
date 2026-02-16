import { useForgotPasswordMutation } from "@/store/api/apiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, KeyRound, Mail } from "lucide-react-native";
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

const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState((params.email as string) || "");
  const [step, setStep] = useState<"email" | "success">("email");
  const [error, setError] = useState<string | null>(null);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);

    try {
      await forgotPassword({ email }).unwrap();
      setStep("success");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Failed to send reset link. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleResendEmail = () => {
    setStep("email");
  };

  if (step === "success") {
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
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center mb-6"
            >
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>

            {/* Success Icon */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
                <Mail size={40} color="#2563eb" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Check Your Email
              </Text>
              <Text className="text-base text-gray-600 text-center">
                We've sent a password reset link to{"\n"}
                <Text className="font-semibold text-blue-600">{email}</Text>
              </Text>
            </View>

            {/* Instructions */}
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
              <Text className="text-sm text-gray-600 mb-2">
                Didn't receive the email? Check your spam folder or try again.
              </Text>
              <Text className="text-sm text-gray-600">
                The reset link will expire in 15 minutes.
              </Text>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              onPress={handleResendEmail}
              className="bg-blue-600 py-4 rounded-xl items-center shadow-lg mb-4"
            >
              <Text className="text-white text-base font-bold">
                Resend Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace("/login")}
              className="border-2 border-gray-200 py-4 rounded-xl items-center"
            >
              <Text className="text-gray-700 text-base font-bold">
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

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
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3 mb-2">
              <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                <KeyRound size={24} color="#FFFFFF" />
              </View>
              <View>
                <Text className="text-2xl font-bold text-gray-900">
                  Forgot Password
                </Text>
                <Text className="text-sm text-gray-500">
                  Reset your account password
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <Text className="text-sm text-gray-700">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </Text>
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Email Address <Text className="text-red-500">*</Text>
            </Text>
            <View
              className={`border-2 rounded-xl px-4 py-3 ${
                error ? "border-red-500" : "border-gray-200"
              }`}
            >
              <TextInput
                className="text-base text-gray-900"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError(null);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {error && (
              <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>
            )}
          </View>

          {/* Send Reset Link Button */}
          <TouchableOpacity
            onPress={handleSendResetLink}
            disabled={isLoading}
            activeOpacity={0.8}
            className={`bg-blue-600 py-4 rounded-xl items-center shadow-lg mb-6 ${
              isLoading ? "opacity-70" : ""
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-bold">
                Send Reset Link
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
              <Text className="text-blue-600 text-sm font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View className="items-center mt-6">
            <Text className="text-gray-500 text-xs text-center leading-5">
              Need help?{" "}
              <Text className="text-blue-600 font-semibold">
                Contact Support
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
