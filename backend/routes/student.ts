import { Router } from 'express'
import {
  getStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService
} from '../services/studentService.ts'

const router = Router()

router.get('/', async (req, res) => {
  const students = await getStudentsService()
  res.json(students)
})

router.get('/:id', async (req, res) => {
  const student = await getStudentByIdService(req.params.id)
  if (!student) {
    res.status(404).json({ error: 'Estudante não encontrado' })
    return
  }
  res.json(student)
})

router.post('/', async (req, res) => {
  const student = await createStudentService(req.body)
  res.status(201).json(student)
})

router.put('/:id', async (req, res) => {
  const student = await updateStudentService(req.params.id, req.body)
  if (!student) {
    res.status(404).json({ error: 'Estudante não encontrado' })
    return
  }
  res.json(student)
})

router.delete('/:id', async (req, res) => {
  const success = await deleteStudentService(req.params.id)
  if (!success) {
    res.status(404).json({ error: 'Estudante não encontrado' })
    return
  }
  res.json({ success })
})

export default router 
