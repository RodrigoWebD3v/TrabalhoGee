import { Router } from 'express'
import {
  listAllStudentsService,
  getStudentsService,
  createStudentService,
  updateStudentService,
  deleteStudentService
} from '../services/studentService.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const students = await listAllStudentsService()
    res.status(200).json({ success: true, data: students })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar alunos' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const student = await getStudentsService(req.params.id)
    if (!student) {
      return res.status(404).json({ success: false, error: 'Aluno não encontrado' })
    }
    res.status(200).json({ success: true, data: student })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar aluno' })
  }
})

router.post('/', async (req, res) => {
  try {
    const student = await createStudentService(req.body)
    res.status(201).json({ success: true, data: student, message: 'Aluno criado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao criar aluno' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const student = await updateStudentService(req.params.id, req.body)
    if (!student) {
      return res.status(404).json({ success: false, error: 'Aluno não encontrado' })
    }
    res.status(200).json({ success: true, data: student, message: 'Aluno atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar aluno' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteStudentService(req.params.id)
    if (!success) {
      return res.status(404).json({ success: false, error: 'Aluno não encontrado' })
    }
    res.status(200).json({ success: true, message: 'Aluno removido com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao remover aluno' })
  }
})

export default router 