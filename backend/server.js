require('dotenv').config();

const express = require('express');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Usa o router principal para todas as rotas /api
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Servidor Node.js com Express está rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 