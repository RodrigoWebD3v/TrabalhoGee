"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { UserModal } from "@/components/modals/user-modal"
import { UserDetailsModal } from "@/components/modals/user-details-modal"
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal"
import { fetchUsers, createUser, updateUser, deleteUser } from "@/api/usersApi"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  async function getUsers() {
    try {
      const { data, status } = await fetchUsers();
      if (status !== 200) return;
      setUsers(data.users); // Certifique-se de que data.users é um array
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

 
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.toLowerCase().includes(searchTerm.toLowerCase())
  ) 

  const handleCreate = async (userData) => {
    const { data, status } = await createUser(userData)
    if (status != 201) {
     return 
    }
    getUsers()
    setIsCreateModalOpen(false)
  }

  const handleEdit = async (userData) => {
    if (!selectedUser?._id) return;
    const { data, status, message} = await updateUser(selectedUser._id, userData)
    if (status != 200) {
     return
    }
    getUsers()
    setIsEditModalOpen(false)
    setSelectedUser(null)
  }

  const handleDelete = async (id) => {
    if (!id) return;
    const { data, status, message} = await deleteUser(id)
    if (status != 200) {
      return
    }
    const users = await fetchUsers()
    getUsers()
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const openDetailsModal = (user) => {
    setSelectedUser(user)
    setIsDetailsModalOpen(true)
  }

  const openDeleteModal = (user) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6 min-h-screen h-full flex flex-col flex-1">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2c34]">Usuários</h1>
          <p className="text-[#2b2c34] mt-2">Gerencie os usuários do sistema</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#6246ea] text-[#fffffe] hover:bg-[#5a3fd8]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2b2c34]">Lista de Usuários</CardTitle>
          <CardDescription className="text-[#2b2c34]">{filteredUsers.length} usuário(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, email ou usuário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                {users.length === 0 
                  ? "Nenhum usuário encontrado no sistema." 
                  : "Nenhum usuário encontrado com os critérios de busca."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#2b2c34]">Nome</TableHead>
                    <TableHead className="text-[#2b2c34]">Email</TableHead>
                    <TableHead className="text-[#2b2c34]">Usuário</TableHead>
                    <TableHead className="text-[#2b2c34]">Nível</TableHead>
                    <TableHead className="text-[#2b2c34]">Status</TableHead>
                    <TableHead className="text-right text-[#2b2c34]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id || user._id}>
                      <TableCell className="font-medium text-[#2b2c34]">{user.name}</TableCell>
                      <TableCell className="text-[#2b2c34]">{user.email}</TableCell>
                      <TableCell className="text-[#2b2c34]">{user.user}</TableCell>
                      <TableCell>
                        <Badge variant={user.level === "admin" ? "default" : "secondary"}>{user.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "on" ? "default" : "destructive"}>
                          {user.status === "on" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => openDetailsModal(user)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => openDeleteModal(user)}
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
          )}
        </CardContent>
      </Card>

      <UserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Novo Usuário"
        mode="create"
      />

      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        onSubmit={handleEdit}
        title="Editar Usuário"
        mode="edit"
        initialData={selectedUser}
      />

      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedUser(null)
        }}
        onConfirm={handleDelete}
        title="Excluir Usuário"
        description={`Tem certeza que deseja excluir o usuário "${selectedUser?.name}"? Esta ação não pode ser desfeita.`}
        id={selectedUser?._id}
      />
    </div>
  )
} 