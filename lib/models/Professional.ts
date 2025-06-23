import mongoose, { type Document, Schema } from "mongoose"

export interface IProfessional extends Document {
  name: string
  specialty: string
  contact: string
  phone_number: string
  status: "on" | "off"
  createdAt: Date
  updatedAt: Date
}

const ProfessionalSchema = new Schema<IProfessional>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
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
        "Outro",
      ],
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
ProfessionalSchema.index({ name: "text", specialty: "text", contact: "text" })

export default mongoose.models.Professional || mongoose.model<IProfessional>("Professional", ProfessionalSchema)
