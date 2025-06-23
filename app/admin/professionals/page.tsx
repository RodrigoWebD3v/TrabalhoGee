"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { ProfessionalModal } from "@/components/modals/professional-modal"
import { ProfessionalDetailsModal } from "@/components/modals/professional-details-modal"
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal"

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [professionals, setProfessionals] = useState(mockData.professionals)
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const filteredProfessionals = professionals.filter(
    (professional) =>
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.contact.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreate = (professionalData: any) => {
    const newProfessional = {
      ...professionalData,
      id: (professionals.length + 1).toString(),
    }
    setProfessionals([...professionals, newProfessional])
    setIsCreateModalOpen(false)
  }

  const handleEdit = (professionalData: any) => {
    setProfessionals(
      professionals.map((professional) =>
        professional.id === selectedProfessional.id
          ? { ...professionalData, id: selectedProfessional.id }
          : professional,
      ),
    )
    setIsEditModalOpen(false)
    setSelectedProfessional(null)
  }

  const handleDelete = () => {
    setProfessionals(professionals.filter((professional) => professional.id !== selectedProfessional.id))
    setIsDeleteModalOpen(false)
    setSelectedProfessional(null)
  }

  const openEditModal = (professional: any) => {
    setSelectedProfessional(professional)
    setIsEditModalOpen(true)
  }

  const openDetailsModal = (professional: any) => {
    setSelectedProfessional(professional)
    setIsDetailsModalOpen(true)
  }

  const openDeleteModal = (professional: any) => {
    setSelectedProfessional(professional)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2c34]">Profissionais da Saúde</h1>
          <p className="text-[#2b2c34] mt-2">Gerencie os profissionais da saúde</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#6246ea] text-[#fffffe] hover:bg-[#5a3fd8]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Profissional
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2b2c34]">Lista de Profissionais</CardTitle>
          <CardDescription className="text-[#2b2c34]">
            {filteredProfessionals.length} profissional(is) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, especialidade ou contato..."
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
                  <TableHead className="text-[#2b2c34]">Especialidade</TableHead>
                  <TableHead className="text-[#2b2c34]">Contato</TableHead>
                  <TableHead className="text-[#2b2c34]">Telefone</TableHead>
                  <TableHead className="text-[#2b2c34]">Status</TableHead>
                  <TableHead className="text-right text-[#2b2c34]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessionals.map((professional) => (
                  <TableRow key={professional.id}>
                    <TableCell className="font-medium text-[#2b2c34]">{professional.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{professional.specialty}</Badge>
                    </TableCell>
                    <TableCell className="text-[#2b2c34]">{professional.contact}</TableCell>
                    <TableCell className="text-[#2b2c34]">{professional.phone_number}</TableCell>
                    <TableCell>
                      <Badge variant={professional.status === "on" ? "default" : "destructive"}>
                        {professional.status === "on" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openDetailsModal(professional)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(professional)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteModal(professional)}
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

      <ProfessionalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Novo Profissional"
        mode="create"
      />

      <ProfessionalModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedProfessional(null)
        }}
        onSubmit={handleEdit}
        title="Editar Profissional"
        mode="edit"
        initialData={selectedProfessional}
      />

      <ProfessionalDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedProfessional(null)
        }}
        professional={selectedProfessional}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedProfessional(null)
        }}
        onConfirm={handleDelete}
        title="Excluir Profissional"
        description={`Tem certeza que deseja excluir o profissional "${selectedProfessional?.name}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
}
