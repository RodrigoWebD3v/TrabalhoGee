"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2, Calendar } from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { AppointmentModal } from "@/components/modals/appointment-modal"
import { AppointmentDetailsModal } from "@/components/modals/appointment-details-modal"
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal"

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [appointments, setAppointments] = useState(mockData.appointments)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.professional.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = (appointmentData: any) => {
    const newAppointment = {
      ...appointmentData,
      id: (appointments.length + 1).toString(),
    }
    setAppointments([...appointments, newAppointment])
    setIsCreateModalOpen(false)
  }

  const handleEdit = (appointmentData: any) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === selectedAppointment.id ? { ...appointmentData, id: selectedAppointment.id } : appointment,
      ),
    )
    setIsEditModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleDelete = () => {
    setAppointments(appointments.filter((appointment) => appointment.id !== selectedAppointment.id))
    setIsDeleteModalOpen(false)
    setSelectedAppointment(null)
  }

  const openEditModal = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsEditModalOpen(true)
  }

  const openDetailsModal = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsDetailsModalOpen(true)
  }

  const openDeleteModal = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2c34]">Agendamentos</h1>
          <p className="text-[#2b2c34] mt-2">Gerencie os agendamentos de saúde</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#6246ea] text-[#fffffe] hover:bg-[#5a3fd8]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2b2c34]">Lista de Agendamentos</CardTitle>
          <CardDescription className="text-[#2b2c34]">
            {filteredAppointments.length} agendamento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por aluno, profissional ou especialidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#2b2c34]">Data/Hora</TableHead>
                  <TableHead className="text-[#2b2c34]">Aluno</TableHead>
                  <TableHead className="text-[#2b2c34]">Profissional</TableHead>
                  <TableHead className="text-[#2b2c34]">Especialidade</TableHead>
                  <TableHead className="text-[#2b2c34]">Comentários</TableHead>
                  <TableHead className="text-right text-[#2b2c34]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-[#2b2c34]">
                            {new Date(appointment.date).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(appointment.date).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[#2b2c34]">{appointment.student}</TableCell>
                    <TableCell className="text-[#2b2c34]">{appointment.professional}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{appointment.specialty}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-[#2b2c34]">{appointment.comments}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openDetailsModal(appointment)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(appointment)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteModal(appointment)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AppointmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Novo Agendamento"
        mode="create"
      />

      <AppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedAppointment(null)
        }}
        onSubmit={handleEdit}
        title="Editar Agendamento"
        mode="edit"
        initialData={selectedAppointment}
      />

      <AppointmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedAppointment(null)
        }}
        appointment={selectedAppointment}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedAppointment(null)
        }}
        onConfirm={handleDelete}
        title="Excluir Agendamento"
        description={`Tem certeza que deseja excluir o agendamento de "${selectedAppointment?.student}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
}
