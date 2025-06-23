import mongoose, { type Document, Schema } from "mongoose"

export interface IAppointment extends Document {
  specialty: string
  comments: string
  date: Date
  student: string
  professional: string
  createdAt: Date
  updatedAt: Date
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
      enum: [
        "Fisioterapeuta",
        "Psicólogo",
        "Fonoaudiólogo",
        "Terapeuta Ocupacional",
        "Psicopedagogo",
        "Neurologista",
        "Pediatra",
        "Psiquiatra",
        "Nutricionista",
      ],
    },
    comments: {
      type: String,
      trim: true,
      maxlength: [1000, "Comments cannot exceed 1000 characters"],
      default: "",
    },
    date: {
      type: Date,
      required: [true, "Appointment date is required"],
      validate: {
        validator: (v: Date) => v > new Date(),
        message: "Appointment date must be in the future",
      },
    },
    student: {
      type: String,
      required: [true, "Student is required"],
      trim: true,
    },
    professional: {
      type: String,
      required: [true, "Professional is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality and date queries
AppointmentSchema.index({ student: "text", professional: "text", specialty: "text" })
AppointmentSchema.index({ date: 1 })

export default mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema)
