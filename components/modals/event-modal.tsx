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
import { Textarea } from "@/components/ui/textarea"
import { Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  title: string
  mode: "create" | "edit"
  initialData?: any
}

export function EventModal({ isOpen, onClose, onSubmit, title, mode, initialData }: EventModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    description: "",
    comments: "",
    date: "",
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
        description: "",
        comments: "",
        date: "",
      })
    }
  }, [mode, initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.description || !formData.date) {
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
      title: mode === "create" ? "Evento criado!" : "Evento atualizado!",
      description: `${formData.description} foi ${mode === "create" ? "criado" : "atualizado"} com sucesso.`,
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
            {mode === "create" ? "Preencha os dados do novo evento" : "Edite as informações do evento"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#2b2c34]">
                Descrição *
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Ex: Palestra sobre inclusão escolar"
                required
              />
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
              placeholder="Informações adicionais sobre o evento..."
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
