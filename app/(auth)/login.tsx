// LoginScreen.tsx
import { useLoginMutation } from "@/store/api/apiSlice";
import { setAccessToken, setUser } from "@/store/authStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials, setError } from "@/store/slices/authSlice";
import { decodeJWT } from "@/utils/jwt";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  // Redux hooks
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loginMutation, { isLoading }] = useLoginMutation();

  // Redirect based on role after successful login
  useEffect(() => {
    console.log("role", user?.role);
    if (user) {
      switch (user.role) {
        case "PATIENT":
          router.replace("/(dashboard)/patient/(tabs)" as any);
          break;
        case "DENTIST":
          router.replace("/(dashboard)/dentist/(tabs)" as any);
          break;
        case "ADMIN":
        case "SUPPORT":
          router.replace("/(dashboard)/admin/(tabs)" as any);
          break;
        default:
          router.replace("/(dashboard)/(tabs)" as any);
      }
    }
  }, [user, router]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

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

    try {
      const result = await loginMutation({ email, password }).unwrap();

      // Decode JWT token to get user info
      const payload = decodeJWT(result.accessToken);

      if (!payload) {
        throw new Error("Invalid token received");
      }

      // Create user object from JWT payload
      const user = {
        id: payload.sub,
        email: payload.email || email,
        name: payload.name || email.split("@")[0],
        role:
          (payload.role as "PATIENT" | "DENTIST" | "ADMIN" | "SUPPORT") ||
          "PATIENT",
      };

      dispatch(
        setCredentials({
          user,
          accessToken: result.accessToken,
        }),
      );

      // Persist auth data to secure storage
      await Promise.all([
        setAccessToken(result.accessToken),
        setUser(JSON.stringify(user)),
      ]);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      dispatch(setError(errorMessage));
      Alert.alert("Login Failed", errorMessage);
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
          <View className="mb-10">
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="w-14 h-14 bg-blue-600 rounded-2xl items-center justify-center mb-4"
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

          <View className="mb-6">
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
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
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
                    if (errors.password) {
                      setErrors({ ...errors, password: undefined });
                    }
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
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
            </View>

            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "/forgot-password", params: { email } })
              }
              activeOpacity={0.7}
              className="self-end"
            >
              <Text className="text-blue-600 text-sm font-semibold">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
            className={`bg-blue-600 py-4 rounded-xl items-center shadow-lg mb-6 ${
              isLoading ? "opacity-70" : ""
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-bold">Sign In</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="text-gray-500 text-sm mx-4">OR</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

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

          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              activeOpacity={0.7}
            >
              <Text className="text-blue-600 text-sm font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center pb-6">
            <Text className="text-gray-500 text-xs text-center leading-5">
              By continuing, you agree to our{" "}
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
}
