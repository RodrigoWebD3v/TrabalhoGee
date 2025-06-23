import mongoose, { type Document, Schema } from "mongoose"

export interface IStudent extends Document {
  name: string
  age: string
  parents: string
  phone_number: string
  special_needs: string
  status: "on" | "off"
  createdAt: Date
  updatedAt: Date
}

const StudentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    age: {
      type: String,
      required: [true, "Age is required"],
      validate: {
        validator: (v: string) => {
          const age = Number.parseInt(v)
          return !isNaN(age) && age > 0 && age <= 100
        },
        message: "Age must be a valid number between 1 and 100",
      },
    },
    parents: {
      type: String,
      required: [true, "Parents/guardians information is required"],
      trim: true,
      maxlength: [200, "Parents information cannot exceed 200 characters"],
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    special_needs: {
      type: String,
      required: [true, "Special needs information is required"],
      trim: true,
      maxlength: [500, "Special needs information cannot exceed 500 characters"],
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
StudentSchema.index({ name: "text", parents: "text", special_needs: "text" })

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema)
