// VerifyOTPScreen.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

const VerifyOTPScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);

  const otpInputs = useRef<(TextInput | null)[]>([]);
  const userId = params.userId as string;
  const email = params.email as string;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));
    setError(null);

    // Auto-focus next input
    if (value && index < 5 && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1]?.focus();
    }

    // Handle backspace
    if (!value && index > 0 && otpInputs.current[index - 1]) {
      otpInputs.current[index - 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.filter((digit) => digit !== "").length === 6) {
      handleVerifyOTP(newOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpCode?: string) => {
    const code = otpCode || otp;

    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("YOUR_API_URL/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          otp: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired OTP");
      }

      Alert.alert(
        "Verification Successful",
        "Your account has been verified. You can now sign in.",
        [{ text: "OK", onPress: () => router.replace("/login") }],
      );
    } catch (error: any) {
      setError(error.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setResendLoading(true);

    try {
      const response = await fetch("YOUR_API_URL/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setOtp("");
      setCountdown(60);
      Alert.alert(
        "OTP Sent",
        "A new verification code has been sent to your email and phone.",
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "Failed to resend OTP. Please try again.",
      );
    } finally {
      setResendLoading(false);
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
                  Verify OTP
                </Text>
                <Text className="text-sm text-gray-500">
                  Enter the verification code
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <Text className="text-sm text-gray-700 text-center">
              We've sent a 6-digit verification code to{"\n"}
              <Text className="font-semibold text-[#0a7ea4]">{email}</Text>
            </Text>
          </View>

          {/* OTP Input Fields */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-4 text-center">
              Enter Verification Code
            </Text>
            <View className="flex-row justify-between gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    otpInputs.current[index] = ref;
                  }}
                  className={`w-12 h-14 rounded-xl border-2 text-center text-xl font-bold ${
                    error
                      ? "border-red-500 bg-red-50"
                      : otp[index]
                        ? "border-[#0a7ea4] bg-[#0a7ea4]/10"
                        : "border-gray-200"
                  }`}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[index] || ""}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectTextOnFocus
                />
              ))}
            </View>
            {error && (
              <Text className="text-red-500 text-xs mt-2 text-center">
                {error}
              </Text>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={() => handleVerifyOTP()}
            disabled={loading}
            activeOpacity={0.8}
            className={`bg-[#0a7ea4] py-4 rounded-xl items-center shadow-lg mb-4 ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-base font-bold">Verify</Text>
            )}
          </TouchableOpacity>

          {/* Resend OTP */}
          <View className="flex-row justify-center items-center mb-6">
            <Text className="text-gray-600 text-sm">Didn't receive code? </Text>
            {countdown > 0 ? (
              <Text className="text-gray-400 text-sm">
                Resend in {countdown}s
              </Text>
            ) : (
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={resendLoading}
                activeOpacity={0.7}
              >
                <Text className="text-[#0a7ea4] text-sm font-bold">
                  {resendLoading ? "Sending..." : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Back to Login */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600 text-sm">Already verified? </Text>
            <TouchableOpacity
              onPress={() => router.replace("/login")}
              activeOpacity={0.7}
            >
              <Text className="text-[#0a7ea4] text-sm font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View className="items-center mt-6">
            <Text className="text-gray-500 text-xs text-center leading-5">
              OTP expires in 15 minutes.{"\n"}
              Check your spam folder if not in inbox.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTPScreen;
