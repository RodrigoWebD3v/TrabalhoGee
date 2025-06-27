import { Router } from 'express'
import {
  listAllProfessionalsService,
  getProfessionalDetailsService,
  updateProfessionalService,
  deleteProfessionalService,
  createProfessionalService
} from '../services/professionalService.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const professionals = await listAllProfessionalsService()
    res.status(200).json({ success: true, professionals: professionals })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar profissionais' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const professional = await getProfessionalDetailsService(req.params.id)
    if (!professional) {
      return res.status(404).json({ success: false, error: 'Profissional não encontrado' })
    }
    res.status(200).json({ success: true, data: professional })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar profissional' })
  }
})

router.post('/', async (req, res) => {
  try {
    const professional = await createProfessionalService(req.body)
    res.status(201).json({ success: true, data: professional, message: 'Profissional criado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao criar profissional' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const professional = await updateProfessionalService(req.params.id, req.body)
    if (!professional) {
      return res.status(404).json({ success: false, error: 'Profissional não encontrado' })
    }
    res.status(200).json({ success: true, data: professional, message: 'Profissional atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar profissional' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteProfessionalService(req.params.id)
    if (!success) {
      return res.status(404).json({ success: false, error: 'Profissional não encontrado' })
    }
    res.status(200).json({ success: true, message: 'Profissional removido com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao remover profissional' })
  }
})

export default router 