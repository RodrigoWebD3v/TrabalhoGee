"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { TeacherModal } from "@/components/modals/teacher-modal"
import { TeacherDetailsModal } from "@/components/modals/teacher-details-modal"
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal"

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.school_disciplines.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.contact.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = (teacherData) => {
    const newTeacher = {
      ...teacherData,
      id: (teachers.length + 1).toString(),
    }
    setTeachers([...teachers, newTeacher])
    setIsCreateModalOpen(false)
  }

  const handleEdit = (teacherData) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === selectedTeacher.id ? { ...teacherData, id: selectedTeacher.id } : teacher,
      ),
    )
    setIsEditModalOpen(false)
    setSelectedTeacher(null)
  }

  const handleDelete = () => {
    setTeachers(teachers.filter((teacher) => teacher.id !== selectedTeacher.id))
    setIsDeleteModalOpen(false)
    setSelectedTeacher(null)
  }

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher)
    setIsEditModalOpen(true)
  }

  const openDetailsModal = (teacher) => {
    setSelectedTeacher(teacher)
    setIsDetailsModalOpen(true)
  }

  const openDeleteModal = (teacher) => {
    setSelectedTeacher(teacher)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2c34]">Professores</h1>
          <p className="text-[#2b2c34] mt-2">Gerencie os professores do sistema</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#6246ea] text-[#fffffe] hover:bg-[#5a3fd8]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Professor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2b2c34]">Lista de Professores</CardTitle>
          <CardDescription className="text-[#2b2c34]">
            {filteredTeachers.length} professor(es) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, disciplinas ou contato..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Disciplinas</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.school_disciplines}</TableCell>
                    <TableCell>{teacher.contact}</TableCell>
                    <TableCell>{teacher.phone_number}</TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === "on" ? "default" : "destructive"}>
                        {teacher.status === "on" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openDetailsModal(teacher)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(teacher)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteModal(teacher)}
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

      <TeacherModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Novo Professor"
        mode="create"
      />

      <TeacherModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedTeacher(null)
        }}
        onSubmit={handleEdit}
        title="Editar Professor"
        mode="edit"
        initialData={selectedTeacher}
      />

      <TeacherDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedTeacher(null)
        }}
        teacher={selectedTeacher}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedTeacher(null)
        }}
        onConfirm={handleDelete}
        title="Excluir Professor"
        description={`Tem certeza que deseja excluir o professor "${selectedTeacher?.name}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
} 