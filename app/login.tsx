// LoginScreen.tsx
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

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // API call to your NestJS backend
      const response = await fetch("YOUR_API_URL/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Store tokens (implement your auth storage)
      // await AsyncStorage.setItem("accessToken", data.accessToken);
      // await AsyncStorage.setItem("refreshToken", data.refreshToken);

      // Navigate based on user role
      if (data.user.role === "DENTIST") {
        router.replace("/(dashboard)/(tabs)");
      } else {
        router.replace("/(dashboard)/(tabs)");
      }
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.message || "Invalid email or password. Please try again.",
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
        <View className="flex-1 px-6 pt-16">
          {/* Header */}
          <View className="mb-10">
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="w-14 h-14 bg-[#0a7ea4] rounded-2xl items-center justify-center mb-4"
            >
              <Text className="text-white text-3xl font-bold">🦷</Text>
            </TouchableOpacity>
            <Text className="text-3xl font-extrabold text-gray-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-base text-gray-600">
              Sign in to continue to DentalCare
            </Text>
          </View>

          {/* Login Form */}
          <View className="mb-6">
            {/* Email Input */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </Text>
              <View
                className={`border-2 rounded-xl px-4 py-3 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              >
                <TextInput
                  className="text-base text-gray-900"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View className="mb-3">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Password
              </Text>
              <View
                className={`border-2 rounded-xl px-4 py-3 flex-row items-center ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="Enter your password"
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
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
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
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "/forgot-password", params: { email } })
              }
              activeOpacity={0.7}
              className="self-end"
            >
              <Text className="text-[#0a7ea4] text-sm font-semibold">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
            className={`bg-[#0a7ea4] py-4 rounded-xl items-center shadow-lg mb-6 ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-bold">Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="text-gray-500 text-sm mx-4">OR</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="mb-8">
            <TouchableOpacity
              activeOpacity={0.8}
              className="border-2 border-gray-200 py-3.5 rounded-xl items-center flex-row justify-center mb-3"
            >
              <Text className="text-xl mr-2">🔍</Text>
              <Text className="text-gray-700 text-base font-semibold">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="border-2 border-gray-200 py-3.5 rounded-xl items-center flex-row justify-center"
            >
              <Text className="text-xl mr-2">📱</Text>
              <Text className="text-gray-700 text-base font-semibold">
                Continue with Phone
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              activeOpacity={0.7}
            >
              <Text className="text-[#0a7ea4] text-sm font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Terms & Privacy */}
          <View className="items-center pb-6">
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

export default LoginScreen;
