"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { AppointmentModal } from "@/components/modals/appointment-modal"
import { AppointmentDetailsModal } from "@/components/modals/appointment-details-modal"
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal"
import { fetchAppointments, createAppointment, updateAppointment, deleteAppointment } from "@/api/appointmentsApi"
import { fetchStudents } from "@/api/studentsApi"
import { fetchProfessionals } from "@/api/professionalsApi"

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [appointments, setAppointments] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [students, setStudents] = useState([])
  const [professionals, setProfessionals] = useState([])

  async function getAppointments() {
    const {data, status} = await fetchAppointments()
    if(status != 200){
      return
    }
    setAppointments(data.appointments)
  }
  async function getStudentsAndProfessionals(setStudents) {

    const {data, status} = await fetchStudents()
    if(status != 200){
      return
    }

    const {data: professionals, status: professionalsStatus} = await fetchProfessionals()

    if(professionalsStatus != 200){
      return
    }

    setStudents(data.students)
    setProfessionals(professionals.professionals)
  }

  useEffect(() => {
    getAppointments()
    getStudentsAndProfessionals(setStudents)
  }, [])

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.professional.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = async (appointmentData) => {
    const {data, status} = await createAppointment(appointmentData)
    if(status!= 201){
      return
    }
    getAppointments()
    setIsCreateModalOpen(false)
  }

  const handleEdit = async (appointmentData) => {
    const id = selectedAppointment?._id || selectedAppointment?.id;
    if (!id) return;
    const {data, status} = await updateAppointment(id, appointmentData)
    if(status != 200){
      return
    }

    getAppointments()
    setIsEditModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleDelete = async (id) => {
    if (!id) return;
    const {data, status} = await deleteAppointment(id)
    if(status != 200){
      return
    }

    getAppointments()
    setIsDeleteModalOpen(false)
    setSelectedAppointment(null)
  }

  const openEditModal = (appointment) => {
    setSelectedAppointment(appointment)
    setIsEditModalOpen(true)
  }

  const openDetailsModal = (appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsModalOpen(true)
  }

  const openDeleteModal = (appointment) => {
    setSelectedAppointment(appointment)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6 min-h-screen h-full flex flex-col flex-1">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2c34]">Agendamentos</h1>
          <p className="text-[#2b2c34] mt-2">Gerencie os agendamentos do sistema</p>
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
              placeholder="Buscar por aluno, especialidade ou profissional..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.student}</TableCell>
                    <TableCell>{appointment.specialty}</TableCell>
                    <TableCell>{appointment.professional}</TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Badge variant={appointment.status === "scheduled" ? "default" : "secondary"}>
                        {appointment.status === "scheduled" ? "Agendado" : "Concluído"}
                      </Badge>
                    </TableCell>
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
        students={students}
        professionals={professionals}
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
        students={students}
        professionals={professionals}
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
        description={`Tem certeza que deseja excluir o agendamento do aluno "${selectedAppointment?.student}"? Esta ação não pode ser desfeita.`}
        id={selectedAppointment?._id || selectedAppointment?.id}
      />
    </div>
  )
} 