"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { StudentModal } from "@/components/modals/student-modal"
import { StudentDetailsModal } from "@/components/modals/student-details-modal"
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal"

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState([
    { id: 1, name: "Lucas Alves", parents: "José e Ana", special_needs: "TEA", phone_number: "11999999999", age: 10, status: "on" },
    { id: 2, name: "Fernanda Dias", parents: "Carlos e Paula", special_needs: "TDAH", phone_number: "11888888888", age: 12, status: "off" },
  ])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parents.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.special_needs.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = (studentData) => {
    const newStudent = {
      ...studentData,
      id: (students.length + 1).toString(),
    }
    setStudents([...students, newStudent])
    setIsCreateModalOpen(false)
  }

  const handleEdit = (studentData) => {
    setStudents(
      students.map((student) =>
        student.id === selectedStudent.id ? { ...studentData, id: selectedStudent.id } : student,
      ),
    )
    setIsEditModalOpen(false)
    setSelectedStudent(null)
  }

  const handleDelete = () => {
    setStudents(students.filter((student) => student.id !== selectedStudent.id))
    setIsDeleteModalOpen(false)
    setSelectedStudent(null)
  }

  const openEditModal = (student) => {
    setSelectedStudent(student)
    setIsEditModalOpen(true)
  }

  const openDetailsModal = (student) => {
    setSelectedStudent(student)
    setIsDetailsModalOpen(true)
  }

  const openDeleteModal = (student) => {
    setSelectedStudent(student)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6 min-h-screen h-full flex flex-col flex-1">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2c34]">Alunos</h1>
          <p className="text-[#2b2c34] mt-2">Gerencie os alunos do sistema</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#6246ea] text-[#fffffe] hover:bg-[#5a3fd8]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2b2c34]">Lista de Alunos</CardTitle>
          <CardDescription className="text-[#2b2c34]">{filteredStudents.length} aluno(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, pais ou necessidades especiais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#2b2c34]">Nome</TableHead>
                  <TableHead className="text-[#2b2c34]">Idade</TableHead>
                  <TableHead className="text-[#2b2c34]">Pais/Responsáveis</TableHead>
                  <TableHead className="text-[#2b2c34]">Telefone</TableHead>
                  <TableHead className="text-[#2b2c34]">Necessidades Especiais</TableHead>
                  <TableHead className="text-[#2b2c34]">Status</TableHead>
                  <TableHead className="text-right text-[#2b2c34]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium text-[#2b2c34]">{student.name}</TableCell>
                    <TableCell className="text-[#2b2c34]">{student.age} anos</TableCell>
                    <TableCell className="text-[#2b2c34]">{student.parents}</TableCell>
                    <TableCell className="text-[#2b2c34]">{student.phone_number}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.special_needs}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === "on" ? "default" : "destructive"}>
                        {student.status === "on" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openDetailsModal(student)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(student)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteModal(student)}
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

      <StudentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Novo Aluno"
        mode="create"
      />

      <StudentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedStudent(null)
        }}
        onSubmit={handleEdit}
        title="Editar Aluno"
        mode="edit"
        initialData={selectedStudent}
      />

      <StudentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedStudent(null)
        }}
        student={selectedStudent}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedStudent(null)
        }}
        onConfirm={handleDelete}
        title="Excluir Aluno"
        description={`Tem certeza que deseja excluir o aluno "${selectedStudent?.name}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
} 