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

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  title: string
  mode: "create" | "edit"
  initialData?: any
}

export function AppointmentModal({ isOpen, onClose, onSubmit, title, mode, initialData }: AppointmentModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    specialty: "",
    comments: "",
    date: "",
    student: "",
    professional: "",
  })

  useEffect(() => {
    if (mode === "edit" && initialData) {
      // Convert date to datetime-local format
      const dateForInput = initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : ""
      setFormData({
        ...initialData,
        date: dateForInput,
      })
    } else {
      setFormData({
        specialty: "",
        comments: "",
        date: "",
        student: "",
        professional: "",
      })
    }
  }, [mode, initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.specialty || !formData.date || !formData.student || !formData.professional) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Convert datetime-local back to ISO string
    const submitData = {
      ...formData,
      date: new Date(formData.date).toISOString(),
    }

    onSubmit(submitData)
    toast({
      title: mode === "create" ? "Agendamento criado!" : "Agendamento atualizado!",
      description: `Agendamento para ${formData.student} foi ${mode === "create" ? "criado" : "atualizado"} com sucesso.`,
    })
  }

  const handleChange = (field: string, value: string) => {
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
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#2b2c34]">{title}</DialogTitle>
          <DialogDescription className="text-[#2b2c34]">
            {mode === "create" ? "Preencha os dados do novo agendamento" : "Edite as informações do agendamento"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student" className="text-[#2b2c34]">
                Aluno *
              </Label>
              <Select value={formData.student} onValueChange={(value) => handleChange("student", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent>
                  {/* {mockData.students.map((student) => (
                    <SelectItem key={student.id} value={student.name}>
                      {student.name}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="professional" className="text-[#2b2c34]">
                Profissional *
              </Label>
              <Select value={formData.professional} onValueChange={(value) => handleChange("professional", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {/* {mockData.professionals.map((professional) => (
                    <SelectItem key={professional.id} value={professional.name}>
                      {professional.name} - {professional.specialty}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
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
              <Label htmlFor="date" className="text-[#2b2c34]">
                Data e Hora *
              </Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-[#2b2c34]">
              Comentários
            </Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleChange("comments", e.target.value)}
              placeholder="Observações sobre o agendamento..."
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
