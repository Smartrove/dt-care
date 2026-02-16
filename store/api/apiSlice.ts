import { UserRole } from "@/store/slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PatientRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;
}

export interface DentistRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;
  mdcnLicenseNumber: string;
  yearsOfExperience: number;
  specializations: string[];
  bio?: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_BASE_URL) {
    return process.env.EXPO_PUBLIC_BASE_URL as string;
  }
  // Fallback for development
  return process.env.EXPO_PUBLIC_BASE_URL;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { accessToken: string | null } })
        .auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Posts"],
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string; refreshToken: string },
      LoginCredentials
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerPatient: builder.mutation<RegisterResponse, PatientRegisterData>({
      query: (userData) => ({
        url: "/auth/register/patient",
        method: "POST",
        body: userData,
      }),
    }),
    registerDentist: builder.mutation<RegisterResponse, DentistRegisterData>({
      query: (userData) => ({
        url: "/auth/register/dentist",
        method: "POST",
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
    getPosts: builder.query<{ data: unknown[] }, void>({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    getPostById: builder.query<unknown, string>({
      query: (id: string) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterPatientMutation,
  useRegisterDentistMutation,
  useGetCurrentUserQuery,
  useGetPostsQuery,
  useGetPostByIdQuery,
} = apiSlice;
