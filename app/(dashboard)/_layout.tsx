import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="patient/(tabs)" />
      <Stack.Screen name="dentist/(tabs)" />
      <Stack.Screen name="admin/(tabs)" />
    </Stack>
  );
}
