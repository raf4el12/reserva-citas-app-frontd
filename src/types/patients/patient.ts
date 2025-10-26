export interface PatientBase {
  id: number
  profileId: number
  emergencyContact: string
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  allergies?: string | null
  chronic_conditions?: string | null
  deleted?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PatientProfile {
  id: number
  name: string
  lastName: string
  email: string
  phone?: string | null
  photo?: string | null
  birthday?: string | null
  address?: string | null
}

export interface Patient extends PatientBase {
  profile: PatientProfile
}

export interface PatientCreateData {
  userId?: number
  name: string
  lastName: string
  email: string
  phone?: string
  birthDate?: string
  birthday?: string
  gender?: string
  address?: string
  photo?: string | File | Blob
  emergencyContact: string
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  allergies?: string | null
  chronic_conditions?: string | null
}

export interface PatientUpdateData {
  emergencyContact?: string
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  allergies?: string | null
  chronic_conditions?: string | null
  name?: string
  lastName?: string
  email?: string
  phone?: string
  birthday?: string
  gender?: string
  address?: string
  photo?: string | File | Blob
}
