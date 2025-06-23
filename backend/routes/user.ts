import { Router } from 'express'
import {
  listAllUsersService,
  getUserDetailsService,
  registerUserService,
  updateUserDetailsService,
  removeUserService
} from '../services/userService'

const router = Router()

router.get('/', async (req, res) => {
  const users = await listAllUsersService()
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await getUserDetailsService(req.params.id)
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })
  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await registerUserService(req.body)
  res.status(201).json(user)
})

router.put('/:id', async (req, res) => {
  const user = await updateUserDetailsService(req.params.id, req.body)
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })
  res.json(user)
})

router.delete('/:id', async (req, res) => {
  const success = await removeUserService(req.params.id)
  if (!success) return res.status(404).json({ error: 'Usuário não encontrado' })
  res.json({ success })
})

export default router 