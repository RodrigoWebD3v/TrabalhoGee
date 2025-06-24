import { Router } from 'express'
import {
  getEventsService,
  getEventByIdService,
  createEventService,
  updateEventService,
  deleteEventService
} from '../services/eventService.js'

const router = Router()

router.get('/', async (req, res) => {
  const events = await getEventsService()
  res.json(events)
})

router.get('/:id', async (req, res) => {
  const event = await getEventByIdService(req.params.id)
  if (!event) {
    res.status(404).json({ error: 'Evento não encontrado' })
    return
  }
  res.json(event)
})

router.post('/', async (req, res) => {
  const event = await createEventService(req.body)
  res.status(201).json(event)
})

router.put('/:id', async (req, res) => {
  const event = await updateEventService(req.params.id, req.body)
  if (!event) {
    res.status(404).json({ error: 'Evento não encontrado' })
    return
  }
  res.json(event)
})

router.delete('/:id', async (req, res) => {
  const success = await deleteEventService(req.params.id)
  if (!success) {
    res.status(404).json({ error: 'Evento não encontrado' })
    return
  }
  res.json({ success })
})

export default router 