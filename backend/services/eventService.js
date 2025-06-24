import { getEventsRepository, getEventByIdRepository, createEventRepository, updateEventRepository, deleteEventRepository } from "../repository/eventRepository.js"

export async function getEventsService() {
  return getEventsRepository()
}

export async function getEventByIdService(id) {
  return getEventByIdRepository(id)
}

export async function createEventService(eventData) {
  return createEventRepository(eventData)
}

export async function updateEventService(id, eventData) {
  return updateEventRepository(id, eventData)
}

export async function deleteEventService(id) {
  return deleteEventRepository(id)
} 