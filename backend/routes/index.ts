import { Router } from 'express'
import userRoutes from './user'
import professionalRoutes from './professional'
import studentRoutes from './student'
import teacherRoutes from './teacher'
import eventRoutes from './event'

const router = Router()

router.use('/users', userRoutes)
router.use('/professionals', professionalRoutes)
router.use('/students', studentRoutes)
router.use('/teachers', teacherRoutes)
router.use('/events', eventRoutes)

// Rota de teste
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

export default router 