"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { EventModal } from "@/components/modals/event-modal"
import { EventDetailsModal } from "@/components/modals/event-details-modal"
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [events, setEvents] = useState([
    { id: 1, description: "Reunião pedagógica", comments: "Sala 1", date: new Date().toISOString(), status: "ativo" },
    { id: 2, description: "Palestra inclusão", comments: "Auditório", date: new Date(Date.now() + 86400000).toISOString(), status: "ativo" },
    { id: 3, description: "Atividade lúdica", comments: "Pátio", date: new Date(Date.now() + 2*86400000).toISOString(), status: "inativo" },
  ])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const filteredEvents = events.filter(
    (event) =>
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.comments.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = (eventData) => {
    const newEvent = {
      ...eventData,
      id: (events.length + 1).toString(),
    }
    setEvents([...events, newEvent])
    setIsCreateModalOpen(false)
  }

  const handleEdit = (eventData) => {
    setEvents(
      events.map((event) =>
        event.id === selectedEvent.id ? { ...eventData, id: selectedEvent.id } : event,
      ),
    )
    setIsEditModalOpen(false)
    setSelectedEvent(null)
  }

  const handleDelete = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id))
    setIsDeleteModalOpen(false)
    setSelectedEvent(null)
  }

  const openEditModal = (event) => {
    setSelectedEvent(event)
    setIsEditModalOpen(true)
  }

  const openDetailsModal = (event) => {
    setSelectedEvent(event)
    setIsDetailsModalOpen(true)
  }

  const openDeleteModal = (event) => {
    setSelectedEvent(event)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6 min-h-screen h-full flex flex-col flex-1">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2c34]">Eventos</h1>
          <p className="text-[#2b2c34] mt-2">Gerencie os eventos do sistema</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#6246ea] text-[#fffffe] hover:bg-[#5a3fd8]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2b2c34]">Lista de Eventos</CardTitle>
          <CardDescription className="text-[#2b2c34]">{filteredEvents.length} evento(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por descrição ou comentários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Comentários</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.description}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.comments}</TableCell>
                    <TableCell>
                      <Badge variant={event.status === "scheduled" ? "default" : "secondary"}>
                        {event.status === "scheduled" ? "Agendado" : "Concluído"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openDetailsModal(event)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(event)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteModal(event)}
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

      <EventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Novo Evento"
        mode="create"
      />

      <EventModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedEvent(null)
        }}
        onSubmit={handleEdit}
        title="Editar Evento"
        mode="edit"
        initialData={selectedEvent}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedEvent(null)
        }}
        event={selectedEvent}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedEvent(null)
        }}
        onConfirm={handleDelete}
        title="Excluir Evento"
        description={`Tem certeza que deseja excluir o evento "${selectedEvent?.description}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
} 