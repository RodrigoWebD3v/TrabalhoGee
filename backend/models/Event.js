import mongoose, { Schema } from "mongoose"

const EventSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    comments: {
      type: String,
      trim: true,
      maxlength: [1000, "Comments cannot exceed 1000 characters"],
      default: "",
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality and date queries
EventSchema.index({ description: "text", comments: "text" })
EventSchema.index({ date: 1 })

export default mongoose.models.Event || mongoose.model("Event", EventSchema) 