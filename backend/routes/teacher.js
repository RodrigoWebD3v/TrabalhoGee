import { Router } from 'express'
import {
  listAllTeachersService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService
} from '../services/teacherService.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const teachers = await listAllTeachersService()
    res.status(200).json({ success: true, teachers: teachers })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar professores' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const teacher = await getTeacherService(req.params.id)
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Professor não encontrado' })
    }
    res.status(200).json({ success: true, data: teacher })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar professor' })
  }
})

router.post('/', async (req, res) => {
  try {
    const teacher = await createTeacherService(req.body)
    res.status(201).json({ success: true, data: teacher, message: 'Professor criado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao criar professor' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const teacher = await updateTeacherService(req.params.id, req.body)
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Professor não encontrado' })
    }
    res.status(200).json({ success: true, data: teacher, message: 'Professor atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar professor' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteTeacherService(req.params.id)
    if (!success) {
      return res.status(404).json({ success: false, error: 'Professor não encontrado' })
    }
    res.status(200).json({ success: true, message: 'Professor removido com sucesso' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: 'Erro ao remover professor' })
  }
})

export default router 