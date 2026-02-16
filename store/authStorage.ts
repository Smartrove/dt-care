import * as SecureStore from "expo-secure-store";

const TOKEN_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
} as const;

/**
 * Store access token securely
 */
export async function setAccessToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEYS.ACCESS_TOKEN, token);
}

/**
 * Get access token from secure storage
 */
export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEYS.ACCESS_TOKEN);
}

/**
 * Delete access token from secure storage
 */
export async function deleteAccessToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEYS.ACCESS_TOKEN);
}

/**
 * Store refresh token securely
 */
export async function setRefreshToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEYS.REFRESH_TOKEN, token);
}

/**
 * Get refresh token from secure storage
 */
export async function getRefreshToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEYS.REFRESH_TOKEN);
}

/**
 * Delete refresh token from secure storage
 */
export async function deleteRefreshToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEYS.REFRESH_TOKEN);
}

/**
 * Store user data as JSON string
 */
export async function setUser(user: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEYS.USER, user);
}

/**
 * Get user data from secure storage
 */
export async function getUser(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEYS.USER);
}

/**
 * Delete user data from secure storage
 */
export async function deleteUser(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEYS.USER);
}

/**
 * Clear all auth data (tokens + user)
 */
export async function clearAllAuthData(): Promise<void> {
  await Promise.all([deleteAccessToken(), deleteRefreshToken(), deleteUser()]);
}

/**
 * Store complete auth data (tokens + user)
 */
export async function setAuthData(
  accessToken: string,
  refreshToken: string,
  user: string,
): Promise<void> {
  await Promise.all([
    setAccessToken(accessToken),
    setRefreshToken(refreshToken),
    setUser(user),
  ]);
}

/**
 * Get complete auth data from storage
 */
export async function getAuthData(): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
  user: string | null;
}> {
  const [accessToken, refreshToken, user] = await Promise.all([
    getAccessToken(),
    getRefreshToken(),
    getUser(),
  ]);

  return { accessToken, refreshToken, user };
}
