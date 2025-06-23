import { mockData } from "./mock-data"
import type {
  User,
  Teacher,
  Student,
  Professional,
  Appointment,
  Event,
  CreateUserRequest,
  UpdateUserRequest,
  CreateTeacherRequest,
  UpdateTeacherRequest,
  CreateStudentRequest,
  UpdateStudentRequest,
  CreateProfessionalRequest,
  UpdateProfessionalRequest,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  CreateEventRequest,
  UpdateEventRequest,
} from "./types"

// In-memory database simulation
class Database {
  private users: User[] = [...mockData.users]
  private teachers: Teacher[] = [...mockData.teachers]
  private students: Student[] = [...mockData.students]
  private professionals: Professional[] = [...mockData.professionals]
  private appointments: Appointment[] = [...mockData.appointments]
  private events: Event[] = [...mockData.events]

  // Helper function to generate IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  // Helper function to add timestamps
  private addTimestamps<T>(item: T): T & { createdAt: string; updatedAt: string } {
    const now = new Date().toISOString()
    return {
      ...item,
      createdAt: now,
      updatedAt: now,
    }
  }

  // Helper function to update timestamps
  private updateTimestamp<T>(item: T): T & { updatedAt: string } {
    return {
      ...item,
      updatedAt: new Date().toISOString(),
    }
  }

  // Users CRUD
  async getUsers(): Promise<User[]> {
    return this.users
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const newUser = this.addTimestamps({
      id: this.generateId(),
      ...userData,
    })
    this.users.push(newUser)
    return newUser
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = this.updateTimestamp({
      ...this.users[userIndex],
      ...userData,
    })
    return this.users[userIndex]
  }

  async deleteUser(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex === -1) return false

    this.users.splice(userIndex, 1)
    return true
  }

  // Teachers CRUD
  async getTeachers(): Promise<Teacher[]> {
    return this.teachers
  }

  async getTeacherById(id: string): Promise<Teacher | null> {
    return this.teachers.find((teacher) => teacher.id === id) || null
  }

  async createTeacher(teacherData: CreateTeacherRequest): Promise<Teacher> {
    const newTeacher = this.addTimestamps({
      id: this.generateId(),
      ...teacherData,
    })
    this.teachers.push(newTeacher)
    return newTeacher
  }

  async updateTeacher(id: string, teacherData: UpdateTeacherRequest): Promise<Teacher | null> {
    const teacherIndex = this.teachers.findIndex((teacher) => teacher.id === id)
    if (teacherIndex === -1) return null

    this.teachers[teacherIndex] = this.updateTimestamp({
      ...this.teachers[teacherIndex],
      ...teacherData,
    })
    return this.teachers[teacherIndex]
  }

  async deleteTeacher(id: string): Promise<boolean> {
    const teacherIndex = this.teachers.findIndex((teacher) => teacher.id === id)
    if (teacherIndex === -1) return false

    this.teachers.splice(teacherIndex, 1)
    return true
  }

  // Students CRUD
  async getStudents(): Promise<Student[]> {
    return this.students
  }

  async getStudentById(id: string): Promise<Student | null> {
    return this.students.find((student) => student.id === id) || null
  }

  async createStudent(studentData: CreateStudentRequest): Promise<Student> {
    const newStudent = this.addTimestamps({
      id: this.generateId(),
      ...studentData,
    })
    this.students.push(newStudent)
    return newStudent
  }

  async updateStudent(id: string, studentData: UpdateStudentRequest): Promise<Student | null> {
    const studentIndex = this.students.findIndex((student) => student.id === id)
    if (studentIndex === -1) return null

    this.students[studentIndex] = this.updateTimestamp({
      ...this.students[studentIndex],
      ...studentData,
    })
    return this.students[studentIndex]
  }

  async deleteStudent(id: string): Promise<boolean> {
    const studentIndex = this.students.findIndex((student) => student.id === id)
    if (studentIndex === -1) return false

    this.students.splice(studentIndex, 1)
    return true
  }

  // Professionals CRUD
  async getProfessionals(): Promise<Professional[]> {
    return this.professionals
  }

  async getProfessionalById(id: string): Promise<Professional | null> {
    return this.professionals.find((professional) => professional.id === id) || null
  }

  async createProfessional(professionalData: CreateProfessionalRequest): Promise<Professional> {
    const newProfessional = this.addTimestamps({
      id: this.generateId(),
      ...professionalData,
    })
    this.professionals.push(newProfessional)
    return newProfessional
  }

  async updateProfessional(id: string, professionalData: UpdateProfessionalRequest): Promise<Professional | null> {
    const professionalIndex = this.professionals.findIndex((professional) => professional.id === id)
    if (professionalIndex === -1) return null

    this.professionals[professionalIndex] = this.updateTimestamp({
      ...this.professionals[professionalIndex],
      ...professionalData,
    })
    return this.professionals[professionalIndex]
  }

  async deleteProfessional(id: string): Promise<boolean> {
    const professionalIndex = this.professionals.findIndex((professional) => professional.id === id)
    if (professionalIndex === -1) return false

    this.professionals.splice(professionalIndex, 1)
    return true
  }

  // Appointments CRUD
  async getAppointments(): Promise<Appointment[]> {
    return this.appointments
  }

  async getAppointmentById(id: string): Promise<Appointment | null> {
    return this.appointments.find((appointment) => appointment.id === id) || null
  }

  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<Appointment> {
    const newAppointment = this.addTimestamps({
      id: this.generateId(),
      ...appointmentData,
    })
    this.appointments.push(newAppointment)
    return newAppointment
  }

  async updateAppointment(id: string, appointmentData: UpdateAppointmentRequest): Promise<Appointment | null> {
    const appointmentIndex = this.appointments.findIndex((appointment) => appointment.id === id)
    if (appointmentIndex === -1) return null

    this.appointments[appointmentIndex] = this.updateTimestamp({
      ...this.appointments[appointmentIndex],
      ...appointmentData,
    })
    return this.appointments[appointmentIndex]
  }

  async deleteAppointment(id: string): Promise<boolean> {
    const appointmentIndex = this.appointments.findIndex((appointment) => appointment.id === id)
    if (appointmentIndex === -1) return false

    this.appointments.splice(appointmentIndex, 1)
    return true
  }

  // Events CRUD
  async getEvents(): Promise<Event[]> {
    return this.events
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.events.find((event) => event.id === id) || null
  }

  async createEvent(eventData: CreateEventRequest): Promise<Event> {
    const newEvent = this.addTimestamps({
      id: this.generateId(),
      ...eventData,
    })
    this.events.push(newEvent)
    return newEvent
  }

  async updateEvent(id: string, eventData: UpdateEventRequest): Promise<Event | null> {
    const eventIndex = this.events.findIndex((event) => event.id === id)
    if (eventIndex === -1) return null

    this.events[eventIndex] = this.updateTimestamp({
      ...this.events[eventIndex],
      ...eventData,
    })
    return this.events[eventIndex]
  }

  async deleteEvent(id: string): Promise<boolean> {
    const eventIndex = this.events.findIndex((event) => event.id === id)
    if (eventIndex === -1) return false

    this.events.splice(eventIndex, 1)
    return true
  }

  // Authentication
  async authenticateUser(username: string, password: string): Promise<User | null> {
    return this.users.find((user) => user.user === username && user.pwd === password) || null
  }
}

// Export singleton instance
export const db = new Database()
