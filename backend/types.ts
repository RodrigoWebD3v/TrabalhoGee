// User types
export interface User {
  id: string
  name: string
  email: string
  user: string
  pwd: string
  level: "admin" | "user"
  status: "on" | "off"
  createdAt?: string
  updatedAt?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  user: string
  pwd: string
  level: "admin" | "user"
  status: "on" | "off"
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  user?: string
  pwd?: string
  level?: "admin" | "user"
  status?: "on" | "off"
}

// Teacher types
export interface Teacher {
  id: string
  name: string
  school_disciplines: string
  contact: string
  phone_number: string
  status: "on" | "off"
  createdAt?: string
  updatedAt?: string
}

export interface CreateTeacherRequest {
  name: string
  school_disciplines: string
  contact: string
  phone_number: string
  status: "on" | "off"
}

export interface UpdateTeacherRequest {
  name?: string
  school_disciplines?: string
  contact?: string
  phone_number?: string
  status?: "on" | "off"
}

// Student types
export interface Student {
  id: string
  name: string
  age: string
  parents: string
  phone_number: string
  special_needs: string
  status: "on" | "off"
  createdAt?: string
  updatedAt?: string
}

export interface CreateStudentRequest {
  name: string
  age: string
  parents: string
  phone_number: string
  special_needs: string
  status: "on" | "off"
}

export interface UpdateStudentRequest {
  name?: string
  age?: string
  parents?: string
  phone_number?: string
  special_needs?: string
  status?: "on" | "off"
}

// Professional types
export interface Professional {
  id: string
  name: string
  specialty: string
  contact: string
  phone_number: string
  status: "on" | "off"
  createdAt?: string
  updatedAt?: string
}

export interface CreateProfessionalRequest {
  name: string
  specialty: string
  contact: string
  phone_number: string
  status: "on" | "off"
}

export interface UpdateProfessionalRequest {
  name?: string
  specialty?: string
  contact?: string
  phone_number?: string
  status?: "on" | "off"
}

// Appointment types
export interface Appointment {
  id: string
  specialty: string
  comments: string
  date: string
  student: string
  professional: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateAppointmentRequest {
  specialty: string
  comments: string
  date: string
  student: string
  professional: string
}

export interface UpdateAppointmentRequest {
  specialty?: string
  comments?: string
  date?: string
  student?: string
  professional?: string
}

// Event types
export interface Event {
  id: string
  description: string
  comments: string
  date: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateEventRequest {
  description: string
  comments: string
  date: string
}

export interface UpdateEventRequest {
  description?: string
  comments?: string
  date?: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message?: string
}
