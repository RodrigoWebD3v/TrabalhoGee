import { Router } from 'express'
import {
  listAllAppointmentsService,
  getAppointmentsService,
  updateAppointmentService,
  deleteAppointmentService
} from '../services/appointmentService.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const appointments = await listAllAppointmentsService()
    res.status(200).json({ success: true, appointments: appointments })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: 'Erro ao buscar agendamentos' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const appointment = await getAppointmentsService(req.params.id)
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Agendamento não encontrado' })
    }
    res.status(200).json({ success: true, data: appointment })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar agendamento' })
  }
})

router.post('/', async (req, res) => {
  try {
    const appointment = await createAppointmentService(req.body)
    res.status(200).status(201).json({ success: true, data: appointment, message: 'Agendamento criado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao criar agendamento' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const appointment = await updateAppointmentService(req.params.id, req.body)
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Agendamento não encontrado' })
    }
    res.status(200).json({ success: true, data: appointment, message: 'Agendamento atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar agendamento' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteAppointmentService(req.params.id)
    if (!success) {
      return res.status(404).json({ success: false, error: 'Agendamento não encontrado' })
    }
    res.status(200).json({ success: true, message: 'Agendamento removido com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao remover agendamento' })
  }
})

export default router 