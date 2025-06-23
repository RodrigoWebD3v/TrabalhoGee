import Event, { IEvent } from "../models/Event"
import connectDB from "../mongodb"
import type { CreateEventRequest, UpdateEventRequest } from "../types"

export async function getEventsRepository(): Promise<IEvent[]> {
  await connectDB()
  return Event.find({}).sort({ date: 1 })
}

export async function getEventByIdRepository(id: string): Promise<IEvent | null> {
  await connectDB()
  return Event.findById(id)
}

export async function createEventRepository(eventData: CreateEventRequest): Promise<IEvent> {
  await connectDB()
  const event = new Event(eventData)
  return event.save()
}

export async function updateEventRepository(id: string, eventData: UpdateEventRequest): Promise<IEvent | null> {
  await connectDB()
  return Event.findByIdAndUpdate(id, eventData, { new: true, runValidators: true })
}

export async function deleteEventRepository(id: string): Promise<boolean> {
  await connectDB()
  const result = await Event.findByIdAndDelete(id)
  return !!result
} 