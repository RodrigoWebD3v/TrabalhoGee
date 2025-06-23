import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.ts'

// Carregar variáveis de ambiente
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())

// Importar e usar rotas
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

