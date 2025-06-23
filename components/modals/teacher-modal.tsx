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
import { Textarea } from "@/components/ui/textarea"
import { Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeacherModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  title: string
  mode: "create" | "edit"
  initialData?: any
}

export function TeacherModal({ isOpen, onClose, onSubmit, title, mode, initialData }: TeacherModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    school_disciplines: "",
    contact: "",
    phone_number: "",
    status: "on",
  })

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: "",
        school_disciplines: "",
        contact: "",
        phone_number: "",
        status: "on",
      })
    }
  }, [mode, initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.school_disciplines || !formData.contact || !formData.phone_number) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    onSubmit(formData)
    toast({
      title: mode === "create" ? "Professor criado!" : "Professor atualizado!",
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
            {mode === "create" ? "Preencha os dados do novo professor" : "Edite as informações do professor"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Email *</Label>
              <Input
                id="contact"
                type="email"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number">Telefone *</Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                required
              />
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

          <div className="space-y-2">
            <Label htmlFor="school_disciplines">Disciplinas *</Label>
            <Textarea
              id="school_disciplines"
              value={formData.school_disciplines}
              onChange={(e) => handleChange("school_disciplines", e.target.value)}
              placeholder="Ex: Matemática, Física, Química"
              required
            />
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
