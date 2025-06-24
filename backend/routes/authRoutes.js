import { Router } from 'express'
import { authenticateUserCredentialsService } from '../services/authService.js'

const router = Router()

router.post('/', async (req, res) => {
  const user = await authenticateUserCredentialsService(req.body)
  res.status(201).json(user)
})

export default router 