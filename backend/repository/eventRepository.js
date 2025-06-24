import Event from "../models/Event.js"
import connectDB from "../mongodb.js"

export async function getEventsRepository() {
  await connectDB()
  return Event.find({}).sort({ date: 1 })
}

export async function getEventByIdRepository(id) {
  await connectDB()
  return Event.findById(id)
}

export async function createEventRepository(eventData) {
  await connectDB()
  const event = new Event(eventData)
  return event.save()
}

export async function updateEventRepository(id, eventData) {
  await connectDB()
  return Event.findByIdAndUpdate(id, eventData, { new: true, runValidators: true })
}

export async function deleteEventRepository(id) {
  await connectDB()
  const result = await Event.findByIdAndDelete(id)
  return !!result
} 