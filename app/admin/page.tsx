"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, UserCheck, Calendar, Heart, BookOpen } from "lucide-react"
import { mockData } from "@/lib/mock-data"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Usuários",
      value: mockData.users.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Professores",
      value: mockData.teachers.length,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Alunos",
      value: mockData.students.length,
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Profissionais",
      value: mockData.professionals.length,
      icon: UserCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Agendamentos",
      value: mockData.appointments.length,
      icon: Calendar,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Eventos",
      value: mockData.events.length,
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ]

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
            <CardDescription>Agendamentos para os próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.appointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{appointment.student}</p>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.date).toLocaleTimeString("pt-BR", {
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

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Eventos programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.events.slice(0, 3).map((event) => (
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
    </div>
  )
}
