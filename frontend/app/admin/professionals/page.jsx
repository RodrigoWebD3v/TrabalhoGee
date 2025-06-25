'use client'
import React, { useState } from 'react'

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [professionals, setProfessionals] = useState([
    { id: 1, name: "Patrícia Gomes", specialty: "Psicóloga", contact: "patricia@email.com", phone_number: "11999999999", status: "on" },
    { id: 2, name: "Rafael Torres", specialty: "Fonoaudiólogo", contact: "rafael@email.com", phone_number: "11888888888", status: "off" },
  ])

  const filteredProfessionals = professionals.filter(
    (professional) =>
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.contact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 min-h-screen h-full flex flex-col flex-1">
      {/* Renderização do componente */}
    </div>
  )
} 