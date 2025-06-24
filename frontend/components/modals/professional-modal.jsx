"use client"

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

export function ProfessionalModal({ isOpen, onClose, onSubmit, title, mode, initialData }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
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
        specialty: "",
        contact: "",
        phone_number: "",
        status: "on",
      })
    }
  }, [mode, initialData, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.specialty || !formData.contact || !formData.phone_number) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    onSubmit(formData)
    toast({
      title: mode === "create" ? "Profissional criado!" : "Profissional atualizado!",
      description: `${formData.name} foi ${mode === "create" ? "adicionado" : "atualizado"} com sucesso.`,
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const specialties = [
    "Fisioterapeuta",
    "Psicólogo",
    "Fonoaudiólogo",
    "Terapeuta Ocupacional",
    "Psicopedagogo",
    "Neurologista",
    "Pediatra",
    "Psiquiatra",
    "Nutricionista",
    "Outro",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#2b2c34]">{title}</DialogTitle>
          <DialogDescription className="text-[#2b2c34]">
            {mode === "create" ? "Preencha os dados do novo profissional" : "Edite as informações do profissional"}
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
              <Label htmlFor="specialty" className="text-[#2b2c34]">
                Especialidade *
              </Label>
              <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a especialidade" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-[#2b2c34]">
                Email *
              </Label>
              <Input
                id="contact"
                type="email"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
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