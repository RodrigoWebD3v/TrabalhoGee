"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  title: string
  mode: "create" | "edit"
  initialData?: any
}

export function UserModal({ isOpen, onClose, onSubmit, title, mode, initialData }: UserModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    user: "",
    pwd: "",
    level: "",
    status: "on",
  })

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: "",
        email: "",
        user: "",
        pwd: "",
        level: "",
        status: "on",
      })
    }
  }, [mode, initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.user || !formData.level) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    if (mode === "create" && !formData.pwd) {
      toast({
        title: "Erro de validação",
        description: "A senha é obrigatória para novos usuários.",
        variant: "destructive",
      })
      return
    }

    onSubmit(formData)
    toast({
      title: mode === "create" ? "Usuário criado!" : "Usuário atualizado!",
      description: `${formData.name} foi ${mode === "create" ? "adicionado" : "atualizado"} com sucesso.`,
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Preencha os dados do novo usuário" : "Edite as informações do usuário"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user">Usuário *</Label>
              <Input id="user" value={formData.user} onChange={(e) => handleChange("user", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pwd">Senha {mode === "create" ? "*" : "(deixe vazio para manter)"}</Label>
              <Input
                id="pwd"
                type="password"
                value={formData.pwd}
                onChange={(e) => handleChange("pwd", e.target.value)}
                required={mode === "create"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Nível de Acesso *</Label>
              <Select value={formData.level} onValueChange={(value) => handleChange("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">Ativo</SelectItem>
                  <SelectItem value="off">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#6246ea] text-[#fffffe] hover:bg-[#5a3fd8]">
              <Save className="mr-2 h-4 w-4" />
              {mode === "create" ? "Criar" : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
