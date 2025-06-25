import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from 'mongoose';
import connectDB from '../mongodb.js';
import { registerUserRepository } from '../repository/userRepository.js';

async function seedUsers() {
  await connectDB();

  // Usuários de exemplo
  const users = [
    {
      name: 'Admin',
      email: 'admin@email.com',
      user: 'admin',
      pwd: 'admin123',
      level: 'admin',
      status: 'on',
    },
    {
      name: 'Usuário Comum',
      email: 'user@email.com',
      user: 'user',
      pwd: 'user123',
      level: 'user',
      status: 'on',
    },
  ];

  // Limpa a coleção antes de inserir
  const { default: User } = await import('../models/User.js');
  await User.deleteMany({});

  for (const user of users) {
    await registerUserRepository(user);
  }

  console.log('Usuários inseridos com sucesso!');
  mongoose.connection.close();
}

seedUsers().catch((err) => {
  console.error('Erro ao inserir usuários:', err);
  mongoose.connection.close();
});
