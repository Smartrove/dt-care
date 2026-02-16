import { UserRole } from "@/store/slices/authSlice";

// ============ AUTH ============
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

export interface VerifyEmailData {
  userId: string;
  otp: string;
}

export interface VerifyPhoneData {
  userId: string;
  otp: string;
}

export interface ResendOtpData {
  userId: string;
  type: "EMAIL" | "PHONE";
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

// ============ CLINICS ============
export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClinicData {
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  imageUrl?: string;
}

export interface ClinicService {
  id: string;
  clinicId: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export interface CreateClinicServiceData {
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface DentistClinic {
  id: string;
  clinicId: string;
  dentistId: string;
  isActive: boolean;
}

export interface ClinicAvailability {
  id: string;
  clinicId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

// ============ DENTISTS ============
export interface Dentist {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;
  mdcnLicenseNumber: string;
  yearsOfExperience: number;
  bio?: string;
  imageUrl?: string;
  specializations: string[];
  rating?: number;
  reviewCount?: number;
  isVerified: boolean;
  isActive: boolean;
}

export interface UpdateDentistData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
  imageUrl?: string;
  specializations?: string[];
}

export interface DentistCertification {
  id: string;
  dentistId: string;
  name: string;
  issuedBy: string;
  issueDate: string;
  expiryDate?: string;
  documentUrl?: string;
}

export interface CreateCertificationData {
  name: string;
  issuedBy: string;
  issueDate: string;
  expiryDate?: string;
  documentUrl?: string;
}

export interface DentistService {
  id: string;
  dentistId: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export interface CreateDentistServiceData {
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface DentistAvailability {
  id: string;
  dentistId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface CreateAvailabilityData {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface UpdateAvailabilityData {
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
}

export interface DentistLeave {
  id: string;
  dentistId: string;
  startDate: string;
  endDate: string;
  reason?: string;
  isApproved: boolean;
}

export interface CreateLeaveData {
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface DentistEarnings {
  totalEarnings: number;
  monthlyEarnings: number;
  pendingPayments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

// ============ PATIENTS ============
export interface Patient {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;
  imageUrl?: string;
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
  isActive: boolean;
}

export interface UpdatePatientData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  imageUrl?: string;
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
}

export interface FamilyMember {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phoneNumber?: string;
  email?: string;
}

export interface CreateFamilyMemberData {
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phoneNumber?: string;
  email?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  dentistId: string;
  appointmentId: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
  createdAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  dentistId: string;
  appointmentId: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }[];
  notes?: string;
  createdAt: string;
}

export interface FavoriteDentist {
  id: string;
  patientId: string;
  dentistId: string;
  addedAt: string;
}

// ============ APPOINTMENTS ============
export interface Appointment {
  id: string;
  patientId: string;
  dentistId: string;
  clinicId: string;
  serviceId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  notes?: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
