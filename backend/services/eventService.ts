import type { CreateEventRequest, UpdateEventRequest } from "../types"
import { getEventsRepository, getEventByIdRepository, createEventRepository, updateEventRepository, deleteEventRepository } from "../repository/eventRepository"
import type { IEvent } from "../models/Event"

export async function getEventsService(): Promise<IEvent[]> {
  return getEventsRepository()
}

export async function getEventByIdService(id: string): Promise<IEvent | null> {
  return getEventByIdRepository(id)
}

export async function createEventService(eventData: CreateEventRequest): Promise<IEvent> {
  return createEventRepository(eventData)
}

export async function updateEventService(id: string, eventData: UpdateEventRequest): Promise<IEvent | null> {
  return updateEventRepository(id, eventData)
}

export async function deleteEventService(id: string): Promise<boolean> {
  return deleteEventRepository(id)
} 