import { Router } from 'express'

import {
  listAllUsersService,
  getUserDetailsService,
  registerUserService,
  updateUserDetailsService,
  removeUserService
} from '../services/userService.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const users = await listAllUsersService()
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar usuários' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await getUserDetailsService(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' })
    }
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar usuário' })
  }
})

router.post('/', async (req, res) => {
  try {
    console.log("Chamou criar usuario")
    const user = await registerUserService(req.body)
    res.status(201).json({ success: true, data: user, message: 'Usuário criado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao criar usuário' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const user = await updateUserDetailsService(req.params.id, req.body)
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' })
    }
    res.status(200).json({ success: true, data: user, message: 'Usuário atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar usuário' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const success = await removeUserService(req.params.id)
    if (!success) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' })
    }
    res.status(200).json({ success: true, message: 'Usuário removido com sucesso' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao remover usuário' })
  }
})

export default router