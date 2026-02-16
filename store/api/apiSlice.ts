import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  // Appointment types
  Appointment,
  AuthResponse,
  // Clinic types
  Clinic,
  ClinicAvailability,
  ClinicService,
  CreateAvailabilityData,
  CreateCertificationData,
  CreateClinicData,
  CreateClinicServiceData,
  CreateDentistServiceData,
  CreateFamilyMemberData,
  CreateLeaveData,
  // Dentist types
  Dentist,
  DentistAvailability,
  DentistCertification,
  DentistEarnings,
  DentistLeave,
  DentistRegisterData,
  DentistService,
  FamilyMember,
  FavoriteDentist,
  ForgotPasswordData,
  // Auth types
  LoginCredentials,
  MedicalRecord,
  // Patient types
  Patient,
  PatientRegisterData,
  Prescription,
  RegisterResponse,
  ResendOtpData,
  ResetPasswordData,
  UpdateAvailabilityData,
  UpdateDentistData,
  UpdatePatientData,
  User,
  VerifyEmailData,
  VerifyPhoneData
} from "./types";

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
  tagTypes: [
    "User",
    "Posts",
    "Clinics",
    "Dentists",
    "Patients",
    "Appointments",
  ],
  endpoints: (builder) => ({
    // ============ AUTH ============
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
    verifyEmail: builder.mutation<AuthResponse, VerifyEmailData>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    verifyPhone: builder.mutation<AuthResponse, VerifyPhoneData>({
      query: (data) => ({
        url: "/auth/verify-phone",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation<AuthResponse, ResendOtpData>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<AuthResponse, ForgotPasswordData>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordData>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    // ============ CLINICS ============
    getClinics: builder.query<Clinic[], void>({
      query: () => "/clinics",
      providesTags: ["Clinics"],
    }),
    getClinicById: builder.query<Clinic, string>({
      query: (id) => `/clinics/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Clinics", id }],
    }),
    createClinic: builder.mutation<Clinic, CreateClinicData>({
      query: (data) => ({
        url: "/clinics",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Clinics"],
    }),
    getClinicServices: builder.query<ClinicService[], string>({
      query: (clinicId) => `/clinics/${clinicId}/services`,
    }),
    createClinicService: builder.mutation<
      ClinicService,
      { clinicId: string; data: CreateClinicServiceData }
    >({
      query: ({ clinicId, data }) => ({
        url: `/clinics/${clinicId}/services`,
        method: "POST",
        body: data,
      }),
    }),
    getClinicDentists: builder.query<Dentist[], string>({
      query: (clinicId) => `/clinics/${clinicId}/dentists`,
    }),
    getClinicAvailability: builder.query<ClinicAvailability[], string>({
      query: (clinicId) => `/clinics/${clinicId}/availability`,
    }),

    // ============ DENTISTS ============
    getDentists: builder.query<Dentist[], void>({
      query: () => "/dentists",
      providesTags: ["Dentists"],
    }),
    getDentistById: builder.query<Dentist, string>({
      query: (id) => `/dentists/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Dentists", id }],
    }),
    getCurrentDentist: builder.query<Dentist, void>({
      query: () => "/dentists/me",
      providesTags: ["Dentists"],
    }),
    updateCurrentDentist: builder.mutation<Dentist, UpdateDentistData>({
      query: (data) => ({
        url: "/dentists/me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Dentists"],
    }),
    getDentistCertifications: builder.query<DentistCertification[], void>({
      query: () => "/dentists/me/certifications",
    }),
    addDentistCertification: builder.mutation<
      DentistCertification,
      CreateCertificationData
    >({
      query: (data) => ({
        url: "/dentists/me/certifications",
        method: "POST",
        body: data,
      }),
    }),
    getDentistAppointments: builder.query<Appointment[], void>({
      query: () => "/dentists/me/appointments",
      providesTags: ["Appointments"],
    }),
    getDentistAvailability: builder.query<DentistAvailability[], void>({
      query: () => "/dentists/me/availability",
    }),
    addDentistAvailability: builder.mutation<
      DentistAvailability,
      CreateAvailabilityData
    >({
      query: (data) => ({
        url: "/dentists/me/availability",
        method: "POST",
        body: data,
      }),
    }),
    updateDentistAvailability: builder.mutation<
      DentistAvailability,
      { id: string; data: UpdateAvailabilityData }
    >({
      query: ({ id, data }) => ({
        url: `/dentists/me/availability/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addDentistLeave: builder.mutation<DentistLeave, CreateLeaveData>({
      query: (data) => ({
        url: "/dentists/me/leave",
        method: "POST",
        body: data,
      }),
    }),
    getDentistEarnings: builder.query<DentistEarnings, void>({
      query: () => "/dentists/me/earnings",
    }),
    getDentistServices: builder.query<DentistService[], void>({
      query: () => "/dentists/me/services",
    }),
    addDentistService: builder.mutation<
      DentistService,
      CreateDentistServiceData
    >({
      query: (data) => ({
        url: "/dentists/me/services",
        method: "POST",
        body: data,
      }),
    }),

    // ============ PATIENTS ============
    getPatients: builder.query<Patient[], void>({
      query: () => "/patients",
      providesTags: ["Patients"],
    }),
    getCurrentPatient: builder.query<Patient, void>({
      query: () => "/patients/me",
      providesTags: ["Patients"],
    }),
    updateCurrentPatient: builder.mutation<Patient, UpdatePatientData>({
      query: (data) => ({
        url: "/patients/me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Patients"],
    }),
    getFamilyMembers: builder.query<FamilyMember[], void>({
      query: () => "/patients/me/family-members",
    }),
    addFamilyMember: builder.mutation<FamilyMember, CreateFamilyMemberData>({
      query: (data) => ({
        url: "/patients/me/family-members",
        method: "POST",
        body: data,
      }),
    }),
    getPatientAppointments: builder.query<Appointment[], void>({
      query: () => "/patients/me/appointments",
      providesTags: ["Appointments"],
    }),
    getPatientMedicalRecords: builder.query<MedicalRecord[], void>({
      query: () => "/patients/me/medical-records",
    }),
    getPatientPrescriptions: builder.query<Prescription[], void>({
      query: () => "/patients/me/prescriptions",
    }),
    addFavoriteDentist: builder.mutation<FavoriteDentist, string>({
      query: (dentistId) => ({
        url: `/patients/me/favorites/${dentistId}`,
        method: "POST",
      }),
    }),
    removeFavoriteDentist: builder.mutation<void, string>({
      query: (dentistId) => ({
        url: `/patients/me/favorites/${dentistId}`,
        method: "DELETE",
      }),
    }),
    getFavoriteDentists: builder.query<Dentist[], void>({
      query: () => "/patients/me/favorites",
    }),

    // ============ POSTS ============
    getPosts: builder.query<{ data: unknown[] }, void>({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    getPostById: builder.query<unknown, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  // Auth
  useLoginMutation,
  useRegisterPatientMutation,
  useRegisterDentistMutation,
  useVerifyEmailMutation,
  useVerifyPhoneMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  // Clinics
  useGetClinicsQuery,
  useGetClinicByIdQuery,
  useCreateClinicMutation,
  useGetClinicServicesQuery,
  useCreateClinicServiceMutation,
  useGetClinicDentistsQuery,
  useGetClinicAvailabilityQuery,
  // Dentists
  useGetDentistsQuery,
  useGetDentistByIdQuery,
  useGetCurrentDentistQuery,
  useUpdateCurrentDentistMutation,
  useGetDentistCertificationsQuery,
  useAddDentistCertificationMutation,
  useGetDentistAppointmentsQuery,
  useGetDentistAvailabilityQuery,
  useAddDentistAvailabilityMutation,
  useUpdateDentistAvailabilityMutation,
  useAddDentistLeaveMutation,
  useGetDentistEarningsQuery,
  useGetDentistServicesQuery,
  useAddDentistServiceMutation,
  // Patients
  useGetPatientsQuery,
  useGetCurrentPatientQuery,
  useUpdateCurrentPatientMutation,
  useGetFamilyMembersQuery,
  useAddFamilyMemberMutation,
  useGetPatientAppointmentsQuery,
  useGetPatientMedicalRecordsQuery,
  useGetPatientPrescriptionsQuery,
  useAddFavoriteDentistMutation,
  useRemoveFavoriteDentistMutation,
  useGetFavoriteDentistsQuery,
  // Posts
  useGetPostsQuery,
  useGetPostByIdQuery,
} = apiSlice;

// Re-export types for convenience
export * from "./types";

