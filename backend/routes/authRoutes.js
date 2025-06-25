import { Router } from 'express'
import { authenticateUserCredentialsService } from '../services/authService.js'

const router = Router()

router.post('/', async (req, res) => {
  const result = await authenticateUserCredentialsService(req.body)
  if (!result) {
    return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos' })
  }
  res.status(200).json({ success: true, user: result.user, token: result.token })
})

export default router 