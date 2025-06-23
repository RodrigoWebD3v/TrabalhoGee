import { Router } from 'express'
import userRoutes from './user.ts'
import professionalRoutes from './professional.ts'
import studentRoutes from './student.ts'
import teacherRoutes from './teacher.ts'
import eventRoutes from './event.ts'

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
