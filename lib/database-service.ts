import connectDB from "./mongodb"
import User, { type IUser } from "./models/User"
import Teacher, { type ITeacher } from "./models/Teacher"
import Student, { type IStudent } from "./models/Student"
import Professional, { type IProfessional } from "./models/Professional"
import Appointment, { type IAppointment } from "./models/Appointment"
import Event, { type IEvent } from "./models/Event"
import type {
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

export class DatabaseService {
  constructor() {
    this.init()
  }

  private async init() {
    await connectDB()
  }

  // Users CRUD
  async getUsers(): Promise<IUser[]> {
    await connectDB()
    return User.find({}).sort({ createdAt: -1 })
  }

  async getUserById(id: string): Promise<IUser | null> {
    await connectDB()
    return User.findById(id)
  }

  async createUser(userData: CreateUserRequest): Promise<IUser> {
    await connectDB()
    const user = new User(userData)
    return user.save()
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<IUser | null> {
    await connectDB()
    return User.findByIdAndUpdate(id, userData, { new: true, runValidators: true })
  }

  async deleteUser(id: string): Promise<boolean> {
    await connectDB()
    const result = await User.findByIdAndDelete(id)
    return !!result
  }

  async authenticateUser(username: string, password: string): Promise<IUser | null> {
    await connectDB()
    const user = await User.findOne({ user: username }).select("+pwd")
    if (!user) return null

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return null

    // Return user without password
    return User.findById(user._id)
  }

  // Teachers CRUD
  async getTeachers(): Promise<ITeacher[]> {
    await connectDB()
    return Teacher.find({}).sort({ createdAt: -1 })
  }

  async getTeacherById(id: string): Promise<ITeacher | null> {
    await connectDB()
    return Teacher.findById(id)
  }

  async createTeacher(teacherData: CreateTeacherRequest): Promise<ITeacher> {
    await connectDB()
    const teacher = new Teacher(teacherData)
    return teacher.save()
  }

  async updateTeacher(id: string, teacherData: UpdateTeacherRequest): Promise<ITeacher | null> {
    await connectDB()
    return Teacher.findByIdAndUpdate(id, teacherData, { new: true, runValidators: true })
  }

  async deleteTeacher(id: string): Promise<boolean> {
    await connectDB()
    const result = await Teacher.findByIdAndDelete(id)
    return !!result
  }

  // Students CRUD
  async getStudents(): Promise<IStudent[]> {
    await connectDB()
    return Student.find({}).sort({ createdAt: -1 })
  }

  async getStudentById(id: string): Promise<IStudent | null> {
    await connectDB()
    return Student.findById(id)
  }

  async createStudent(studentData: CreateStudentRequest): Promise<IStudent> {
    await connectDB()
    const student = new Student(studentData)
    return student.save()
  }

  async updateStudent(id: string, studentData: UpdateStudentRequest): Promise<IStudent | null> {
    await connectDB()
    return Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true })
  }

  async deleteStudent(id: string): Promise<boolean> {
    await connectDB()
    const result = await Student.findByIdAndDelete(id)
    return !!result
  }

  // Professionals CRUD
  async getProfessionals(): Promise<IProfessional[]> {
    await connectDB()
    return Professional.find({}).sort({ createdAt: -1 })
  }

  async getProfessionalById(id: string): Promise<IProfessional | null> {
    await connectDB()
    return Professional.findById(id)
  }

  async createProfessional(professionalData: CreateProfessionalRequest): Promise<IProfessional> {
    await connectDB()
    const professional = new Professional(professionalData)
    return professional.save()
  }

  async updateProfessional(id: string, professionalData: UpdateProfessionalRequest): Promise<IProfessional | null> {
    await connectDB()
    return Professional.findByIdAndUpdate(id, professionalData, { new: true, runValidators: true })
  }

  async deleteProfessional(id: string): Promise<boolean> {
    await connectDB()
    const result = await Professional.findByIdAndDelete(id)
    return !!result
  }

  // Appointments CRUD
  async getAppointments(): Promise<IAppointment[]> {
    await connectDB()
    return Appointment.find({}).sort({ date: 1 })
  }

  async getAppointmentById(id: string): Promise<IAppointment | null> {
    await connectDB()
    return Appointment.findById(id)
  }

  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<IAppointment> {
    await connectDB()
    const appointment = new Appointment(appointmentData)
    return appointment.save()
  }

  async updateAppointment(id: string, appointmentData: UpdateAppointmentRequest): Promise<IAppointment | null> {
    await connectDB()
    return Appointment.findByIdAndUpdate(id, appointmentData, { new: true, runValidators: true })
  }

  async deleteAppointment(id: string): Promise<boolean> {
    await connectDB()
    const result = await Appointment.findByIdAndDelete(id)
    return !!result
  }

  // Events CRUD
  async getEvents(): Promise<IEvent[]> {
    await connectDB()
    return Event.find({}).sort({ date: 1 })
  }

  async getEventById(id: string): Promise<IEvent | null> {
    await connectDB()
    return Event.findById(id)
  }

  async createEvent(eventData: CreateEventRequest): Promise<IEvent> {
    await connectDB()
    const event = new Event(eventData)
    return event.save()
  }

  async updateEvent(id: string, eventData: UpdateEventRequest): Promise<IEvent | null> {
    await connectDB()
    return Event.findByIdAndUpdate(id, eventData, { new: true, runValidators: true })
  }

  async deleteEvent(id: string): Promise<boolean> {
    await connectDB()
    const result = await Event.findByIdAndDelete(id)
    return !!result
  }

  // Dashboard stats
  async getDashboardStats() {
    await connectDB()

    const [users, teachers, students, professionals, appointments, events] = await Promise.all([
      User.countDocuments(),
      Teacher.countDocuments(),
      Student.countDocuments(),
      Professional.countDocuments(),
      Appointment.countDocuments(),
      Event.countDocuments(),
    ])

    // Get upcoming appointments (next 7 days)
    const now = new Date()
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const upcomingAppointments = await Appointment.find({
      date: { $gte: now, $lte: nextWeek },
    })
      .sort({ date: 1 })
      .limit(5)

    // Get upcoming events (next 30 days)
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    const upcomingEvents = await Event.find({
      date: { $gte: now, $lte: nextMonth },
    })
      .sort({ date: 1 })
      .limit(5)

    return {
      users,
      teachers,
      students,
      professionals,
      appointments,
      events,
      upcomingAppointments,
      upcomingEvents,
    }
  }

  // Search functionality
  async searchUsers(query: string): Promise<IUser[]> {
    await connectDB()
    return User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { user: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 })
  }

  async searchTeachers(query: string): Promise<ITeacher[]> {
    await connectDB()
    return Teacher.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { school_disciplines: { $regex: query, $options: "i" } },
        { contact: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 })
  }

  async searchStudents(query: string): Promise<IStudent[]> {
    await connectDB()
    return Student.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { parents: { $regex: query, $options: "i" } },
        { special_needs: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 })
  }

  async searchProfessionals(query: string): Promise<IProfessional[]> {
    await connectDB()
    return Professional.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { specialty: { $regex: query, $options: "i" } },
        { contact: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 })
  }

  async searchAppointments(query: string): Promise<IAppointment[]> {
    await connectDB()
    return Appointment.find({
      $or: [
        { student: { $regex: query, $options: "i" } },
        { professional: { $regex: query, $options: "i" } },
        { specialty: { $regex: query, $options: "i" } },
      ],
    }).sort({ date: 1 })
  }

  async searchEvents(query: string): Promise<IEvent[]> {
    await connectDB()
    return Event.find({
      $or: [{ description: { $regex: query, $options: "i" } }, { comments: { $regex: query, $options: "i" } }],
    }).sort({ date: 1 })
  }
}

// Export singleton instance
export const dbService = new DatabaseService()
