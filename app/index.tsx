// LandingScreen.tsx
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  bgColor,
}) => {
  return (
    <View className="w-[48%] bg-white p-5 rounded-2xl shadow-sm mb-4">
      <View
        className={`w-14 h-14 ${bgColor} rounded-xl items-center justify-center mb-3`}
      >
        <Text className="text-2xl">{icon}</Text>
      </View>
      <Text className="text-base font-bold text-gray-800 mb-1.5">{title}</Text>
      <Text className="text-sm text-gray-600 leading-5">{description}</Text>
    </View>
  );
};

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  description,
  isLast,
}) => (
  <View className="flex-row mb-6">
    <View className="items-center mr-4">
      <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center">
        <Text className="text-white text-lg font-bold">{step}</Text>
      </View>
      {!isLast && <View className="w-0.5 flex-1 bg-gray-200 mt-2" />}
    </View>
    <View className="flex-1 pt-2">
      <Text className="text-lg font-bold text-gray-800 mb-1.5">{title}</Text>
      <Text className="text-sm text-gray-600 leading-5">{description}</Text>
    </View>
  </View>
);

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  location,
  text,
  avatar,
}) => (
  <View className="w-80 bg-white p-5 rounded-2xl shadow-sm mr-4">
    <View className="flex-row items-center mb-3">
      <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
        <Text className="text-blue-700 text-base font-bold">{avatar}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-600">{location}</Text>
      </View>
      <View className="flex-row gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} className="text-sm">
            ⭐
          </Text>
        ))}
      </View>
    </View>
    <Text className="text-sm text-gray-700 leading-5">{text}</Text>
  </View>
);

interface StatCardProps {
  value: string;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => (
  <View className="w-[48%] bg-gray-50 p-5 rounded-2xl items-center">
    <Text className={`text-3xl font-extrabold ${color} mb-1`}>{value}</Text>
    <Text className="text-sm text-gray-600 font-medium text-center">
      {label}
    </Text>
  </View>
);

const LandingScreen: React.FC = () => {
  const router = useRouter();

  const features = [
    {
      icon: "📅",
      title: "Easy Booking",
      description: "Book appointments with verified dentists in seconds",
      bgColor: "bg-blue-100",
    },
    {
      icon: "⭐",
      title: "Verified Dentists",
      description: "All dentists are MDCN licensed and verified",
      bgColor: "bg-yellow-100",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      description: "Safe payments with Paystack integration",
      bgColor: "bg-green-100",
    },
    {
      icon: "📍",
      title: "Find Nearby",
      description: "Locate quality dental care close to you",
      bgColor: "bg-pink-100",
    },
    {
      icon: "⚡",
      title: "Instant Confirmation",
      description: "Get immediate appointment confirmation",
      bgColor: "bg-purple-100",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Accounts",
      description: "Manage dental care for your entire family",
      bgColor: "bg-indigo-100",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Search & Find",
      description:
        "Search for dentists by location, specialty, or availability",
    },
    {
      step: "2",
      title: "Book Appointment",
      description: "Choose your preferred time slot and book instantly",
    },
    {
      step: "3",
      title: "Make Payment",
      description: "Pay securely using your preferred payment method",
    },
    {
      step: "4",
      title: "Visit & Smile",
      description: "Visit the clinic and get the best dental care",
    },
  ];

  const testimonials = [
    {
      name: "Adebayo Okonkwo",
      location: "Lagos",
      text: "Finding a good dentist in Lagos used to be so difficult. This platform made it incredibly easy!",
      avatar: "AO",
    },
    {
      name: "Chioma Nwosu",
      location: "Abuja",
      text: "The booking process is seamless, and I love that I can see reviews before choosing a dentist.",
      avatar: "CN",
    },
    {
      name: "Ibrahim Mohammed",
      location: "Port Harcourt",
      text: "Great platform! Helped me find an emergency dentist on a Sunday. Highly recommend!",
      avatar: "IM",
    },
  ];

  const stats = [
    { value: "500+", label: "Verified Dentists", color: "text-blue-600" },
    { value: "10,000+", label: "Happy Patients", color: "text-green-600" },
    { value: "15+", label: "Cities Covered", color: "text-orange-600" },
    { value: "4.8/5", label: "Average Rating", color: "text-purple-600" },
  ];

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="bg-blue-50 pt-16 pb-10 px-5">
          <View className="items-center">
            {/* Badge */}
            <View className="bg-blue-100 px-4 py-2 rounded-full mb-5">
              <Text className="text-blue-700 text-xs font-semibold">
                🦷 Nigeria's #1 Dental Care Platform
              </Text>
            </View>

            {/* Hero Title */}
            <Text className="text-4xl font-extrabold text-gray-900 text-center mb-4 leading-tight">
              Find & Book{"\n"}
              <Text className="text-blue-600">Trusted Dentists</Text>
              {"\n"}Near You
            </Text>

            {/* Hero Description */}
            <Text className="text-base text-gray-600 text-center mb-8 leading-6 px-2">
              Connect with verified dental professionals across Nigeria. Book
              appointments instantly, manage your dental health, and smile with
              confidence.
            </Text>

            {/* CTA Buttons */}
            <View className="flex-row gap-3 mb-10">
              <TouchableOpacity
                className="bg-blue-600 px-7 py-3.5 rounded-xl shadow-lg active:scale-95"
                onPress={() => router.push("/signup")}
                activeOpacity={0.8}
              >
                <Text className="text-white text-base font-bold">
                  Get Started
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white px-7 py-3.5 rounded-xl border-2 border-blue-600 active:scale-95"
                onPress={() => router.push("/login")}
                activeOpacity={0.8}
              >
                <Text className="text-blue-600 text-base font-bold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

            {/* Hero Image Placeholder */}
            <View className="w-48 h-48 bg-white rounded-full items-center justify-center shadow-xl">
              <Text className="text-8xl">🦷</Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View className="py-10 px-5 bg-white">
          <View className="flex-row flex-wrap justify-between gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                color={stat.color}
              />
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View className="py-10 px-5 bg-gray-50">
          <Text className="text-3xl font-extrabold text-gray-900 text-center mb-2">
            Why Choose Us
          </Text>
          <Text className="text-base text-gray-600 text-center mb-8">
            Everything you need for better dental health
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                bgColor={feature.bgColor}
              />
            ))}
          </View>
        </View>

        {/* How It Works Section */}
        <View className="py-10 px-5 bg-white">
          <Text className="text-3xl font-extrabold text-gray-900 text-center mb-2">
            How It Works
          </Text>
          <Text className="text-base text-gray-600 text-center mb-8">
            Get started in 4 simple steps
          </Text>

          <View className="mt-2">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step.step}
                title={step.title}
                description={step.description}
                isLast={index === steps.length - 1}
              />
            ))}
          </View>
        </View>

        {/* Testimonials Section */}
        <View className="py-10 bg-gray-50">
          <Text className="text-3xl font-extrabold text-gray-900 text-center mb-2 px-5">
            What Our Users Say
          </Text>
          <Text className="text-base text-gray-600 text-center mb-8 px-5">
            Hear from happy patients across Nigeria
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-5 gap-4"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                location={testimonial.location}
                text={testimonial.text}
                avatar={testimonial.avatar}
              />
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View className="bg-blue-600 py-12 px-5">
          <View className="items-center">
            <Text className="text-3xl font-extrabold text-white text-center mb-3">
              Ready to Get Started?
            </Text>
            <Text className="text-base text-blue-100 text-center mb-7">
              Join thousands of Nigerians managing their dental health with ease
            </Text>

            <TouchableOpacity
              className="bg-white px-8 py-4 rounded-xl shadow-lg active:scale-95"
              onPress={() => router.push("/signup")}
              activeOpacity={0.8}
            >
              <Text className="text-blue-600 text-base font-bold">
                Create Free Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="py-8 px-5 bg-gray-50 items-center">
          <Text className="text-sm text-gray-600 mb-3">
            © 2024 DentalCare Nigeria. All rights reserved.
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-blue-600 font-medium">
              Privacy Policy
            </Text>
            <Text className="text-sm text-gray-400">•</Text>
            <Text className="text-sm text-blue-600 font-medium">
              Terms of Service
            </Text>
            <Text className="text-sm text-gray-400">•</Text>
            <Text className="text-sm text-blue-600 font-medium">Contact</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LandingScreen;
