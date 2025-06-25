"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, UserCheck, Calendar, Heart, BookOpen } from "lucide-react"

export default function AdminDashboard() {
  // Dados mocados
  const stats = [
    { title: "Usuários", value: 12, icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Professores", value: 5, icon: GraduationCap, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Alunos", value: 20, icon: BookOpen, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { title: "Profissionais", value: 3, icon: UserCheck, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Agendamentos", value: 8, icon: Calendar, color: "text-pink-600", bgColor: "bg-pink-100" },
    { title: "Eventos", value: 4, icon: Heart, color: "text-red-600", bgColor: "bg-red-100" },
  ]
  const events = [
    { id: 1, description: "Reunião pedagógica", comments: "Sala 1", date: new Date().toISOString() },
    { id: 2, description: "Palestra inclusão", comments: "Auditório", date: new Date(Date.now() + 86400000).toISOString() },
    { id: 3, description: "Atividade lúdica", comments: "Pátio", date: new Date(Date.now() + 2*86400000).toISOString() },
  ]

  return (
    <div className="space-y-6 min-h-screen h-full flex flex-col flex-1">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral do sistema GEE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <CardDescription>Total de {stat.title.toLowerCase()} cadastrados</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
          <CardDescription>Eventos programados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.description}</p>
                  <p className="text-sm text-gray-600">{event.comments}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(event.date).toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 