
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Usa o router principal para todas as rotas /api
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Servidor Node.js com Express está rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 