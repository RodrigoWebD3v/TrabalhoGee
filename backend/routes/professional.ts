import { Router } from 'express'
import {
  getProfessionalsService,
  getProfessionalByIdService,
  createProfessionalService,
  updateProfessionalService,
  deleteProfessionalService
} from '../services/professionalService'

const router = Router()

router.get('/', async (req, res) => {
  const professionals = await getProfessionalsService()
  res.json(professionals)
})

router.get('/:id', async (req, res) => {
  const professional = await getProfessionalByIdService(req.params.id)
  if (!professional) return res.status(404).json({ error: 'Profissional não encontrado' })
  res.json(professional)
})

router.post('/', async (req, res) => {
  const professional = await createProfessionalService(req.body)
  res.status(201).json(professional)
})

router.put('/:id', async (req, res) => {
  const professional = await updateProfessionalService(req.params.id, req.body)
  if (!professional) return res.status(404).json({ error: 'Profissional não encontrado' })
  res.json(professional)
})

router.delete('/:id', async (req, res) => {
  const success = await deleteProfessionalService(req.params.id)
  if (!success) return res.status(404).json({ error: 'Profissional não encontrado' })
  res.json({ success })
})

export default router 