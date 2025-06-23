const { MongoClient } = require("mongodb")
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME

const seedData = {
  users: [
    {
      name: "Andre Faria Ruaro",
      email: "andre.ruaro@unesc.net",
      user: "andre.ruaro",
      pwd: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDjS", // admin123
      level: "admin",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Maria Silva Santos",
      email: "maria.santos@unesc.net",
      user: "maria.santos",
      pwd: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDjS", // user123
      level: "user",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "João Pedro Oliveira",
      email: "joao.oliveira@unesc.net",
      user: "joao.oliveira",
      pwd: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDjS", // user123
      level: "user",
      status: "off",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  teachers: [
    {
      name: "Judite Heeler",
      school_disciplines: "Artes, Português",
      contact: "j.heeler@gmail.com",
      phone_number: "48 9696 5858",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Carlos Eduardo Silva",
      school_disciplines: "Matemática, Física",
      contact: "carlos.silva@gmail.com",
      phone_number: "48 9999 1234",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ana Paula Costa",
      school_disciplines: "História, Geografia",
      contact: "ana.costa@gmail.com",
      phone_number: "48 8888 5678",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  students: [
    {
      name: "Bingo Heeler",
      age: "6",
      parents: "Bandit Heeler e Chilli Heeler",
      phone_number: "48 9696 5858",
      special_needs: "Síndrome de Down",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Bluey Heeler",
      age: "7",
      parents: "Bandit Heeler e Chilli Heeler",
      phone_number: "48 9696 5858",
      special_needs: "Autismo",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Muffin Heeler",
      age: "4",
      parents: "Stripe Heeler e Trixie Heeler",
      phone_number: "48 7777 9999",
      special_needs: "TDAH",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  professionals: [
    {
      name: "Winton Blake",
      specialty: "Fisioterapeuta",
      contact: "wb.fisio@gmail.com",
      phone_number: "48 9696 5858",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Calypso Santos",
      specialty: "Psicólogo",
      contact: "calypso.psi@gmail.com",
      phone_number: "48 8888 7777",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Lucky Costa",
      specialty: "Fonoaudiólogo",
      contact: "lucky.fono@gmail.com",
      phone_number: "48 7777 6666",
      status: "on",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  appointments: [
    {
      specialty: "Fisioterapeuta",
      comments: "Realizar sessão de fisioterapia",
      date: new Date("2024-01-15T16:00:00"),
      student: "Bingo Heeler",
      professional: "Winton Blake",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      specialty: "Psicólogo",
      comments: "Sessão de acompanhamento psicológico",
      date: new Date("2024-01-16T14:00:00"),
      student: "Bluey Heeler",
      professional: "Calypso Santos",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      specialty: "Fonoaudiólogo",
      comments: "Terapia da fala",
      date: new Date("2024-01-17T10:00:00"),
      student: "Muffin Heeler",
      professional: "Lucky Costa",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  events: [
    {
      description: "Palestra bem viver com saúde",
      comments: "Profissionais de saúde da Unesc",
      date: new Date("2024-01-20T16:00:00"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      description: "Workshop sobre inclusão escolar",
      comments: "Capacitação para professores",
      date: new Date("2024-01-25T14:00:00"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      description: "Reunião de pais e responsáveis",
      comments: "Discussão sobre desenvolvimento dos alunos",
      date: new Date("2024-01-30T19:00:00"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
}

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(DB_NAME)

    console.log("Clearing existing data...")
    await Promise.all([
      db.collection("users").deleteMany({}),
      db.collection("teachers").deleteMany({}),
      db.collection("students").deleteMany({}),
      db.collection("professionals").deleteMany({}),
      db.collection("appointments").deleteMany({}),
      db.collection("events").deleteMany({}),
    ])

    console.log("Inserting seed data...")
    await Promise.all([
      db.collection("users").insertMany(seedData.users),
      db.collection("teachers").insertMany(seedData.teachers),
      db.collection("students").insertMany(seedData.students),
      db.collection("professionals").insertMany(seedData.professionals),
      db.collection("appointments").insertMany(seedData.appointments),
      db.collection("events").insertMany(seedData.events),
    ])

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
