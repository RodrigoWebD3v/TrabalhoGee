import { Router } from 'express'
import {
  getTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService
} from '../services/teacherService.ts'

const router = Router()

router.get('/', async (req, res) => {
  const teachers = await getTeachersService()
  res.json(teachers)
})

router.get('/:id', async (req, res) => {
  const teacher = await getTeacherByIdService(req.params.id)
  if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' })
  res.json(teacher)
})

router.post('/', async (req, res) => {
  const teacher = await createTeacherService(req.body)
  res.status(201).json(teacher)
})

router.put('/:id', async (req, res) => {
  const teacher = await updateTeacherService(req.params.id, req.body)
  if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' })
  res.json(teacher)
})

router.delete('/:id', async (req, res) => {
  const success = await deleteTeacherService(req.params.id)
  if (!success) return res.status(404).json({ error: 'Professor não encontrado' })
  res.json({ success })
})

export default router 
