import { Router } from 'express'
import userRoutes from './user.js'
import professionalRoutes from './professional.js'
import studentRoutes from './student.js'
import teacherRoutes from './teacher.js'
import eventRoutes from './event.js'
import authRoutes from './authRoutes.js'
import appointmentRoutes from './appointment.js'


const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/professionals', professionalRoutes)
router.use('/students', studentRoutes)
router.use('/teachers', teacherRoutes)
router.use('/events', eventRoutes)
router.use('/appointments', appointmentRoutes)


// Rota de teste
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

export default router 

module.exports = {
  userRoutes,
  teacherRoutes,
  studentRoutes,
  professionalRoutes,
  eventRoutes,
  appointmentRoutes,
  authRoutes,
}; 