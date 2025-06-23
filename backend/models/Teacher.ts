import mongoose, { type Document, Schema } from "mongoose"

export interface ITeacher extends Document {
  name: string
  school_disciplines: string
  contact: string
  phone_number: string
  status: "on" | "off"
  createdAt: Date
  updatedAt: Date
}

const TeacherSchema = new Schema<ITeacher>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    school_disciplines: {
      type: String,
      required: [true, "School disciplines are required"],
      trim: true,
      maxlength: [500, "School disciplines cannot exceed 500 characters"],
    },
    contact: {
      type: String,
      required: [true, "Contact email is required"],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    status: {
      type: String,
      enum: ["on", "off"],
      default: "on",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
TeacherSchema.index({ name: "text", school_disciplines: "text", contact: "text" })

export default mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema)
