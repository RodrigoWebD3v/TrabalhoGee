import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  name: string
  email: string
  user: string
  pwd: string
  level: "admin" | "user"
  status: "on" | "off"
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    user: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    pwd: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    level: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
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

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("pwd")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.pwd = await bcrypt.hash(this.pwd, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.pwd)
}

// Remove password from JSON output
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.pwd
  return userObject
}

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
