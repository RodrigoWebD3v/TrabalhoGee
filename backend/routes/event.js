import { Router } from 'express'
import {
  listAllEventsService,
  getEventsService,
  createEventService,
  updateEventService,
  deleteEventService
} from '../services/eventService.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const events = await listAllEventsService()
    res.status(200).json({ success: true, data: events })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar eventos' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await getEventsService(req.params.id)
    if (!event) {
      return res.status(404).json({ success: false, error: 'Evento não encontrado' })
    }
    res.status(200).json({ success: true, data: event })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar evento' })
  }
})

router.post('/', async (req, res) => {
  try {
    const event = await createEventService(req.body)
    res.status(201).json({ success: true, data: event, message: 'Evento criado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao criar evento' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const event = await updateEventService(req.params.id, req.body)
    if (!event) {
      return res.status(404).json({ success: false, error: 'Evento não encontrado' })
    }
    res.status(200).json({ success: true, data: event, message: 'Evento atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar evento' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteEventService(req.params.id)
    if (!success) {
      return res.status(404).json({ success: false, error: 'Evento não encontrado' })
    }
    res.status(200).json({ success: true, message: 'Evento removido com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao remover evento' })
  }
})

export default router 