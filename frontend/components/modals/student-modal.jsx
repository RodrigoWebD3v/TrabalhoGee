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

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  title: string
  mode: "create" | "edit"
  initialData?: any
}

export function StudentModal({ isOpen, onClose, onSubmit, title, mode, initialData }: StudentModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    parents: "",
    phone_number: "",
    special_needs: "",
    status: "on",
  })

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: "",
        age: "",
        parents: "",
        phone_number: "",
        special_needs: "",
        status: "on",
      })
    }
  }, [mode, initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.age || !formData.parents || !formData.phone_number || !formData.special_needs) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    onSubmit(formData)
    toast({
      title: mode === "create" ? "Aluno criado!" : "Aluno atualizado!",
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
          <DialogTitle className="text-[#2b2c34]">{title}</DialogTitle>
          <DialogDescription className="text-[#2b2c34]">
            {mode === "create" ? "Preencha os dados do novo aluno" : "Edite as informações do aluno"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#2b2c34]">
                Nome Completo *
              </Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-[#2b2c34]">
                Idade *
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number" className="text-[#2b2c34]">
                Telefone *
              </Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#2b2c34]">
                Status *
              </Label>
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
            <Label htmlFor="parents" className="text-[#2b2c34]">
              Pais/Responsáveis *
            </Label>
            <Input
              id="parents"
              value={formData.parents}
              onChange={(e) => handleChange("parents", e.target.value)}
              placeholder="Ex: João Silva e Maria Silva"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_needs" className="text-[#2b2c34]">
              Necessidades Especiais *
            </Label>
            <Textarea
              id="special_needs"
              value={formData.special_needs}
              onChange={(e) => handleChange("special_needs", e.target.value)}
              placeholder="Ex: Síndrome de Down, Autismo, TDAH"
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
