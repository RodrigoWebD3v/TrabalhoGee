"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Mail, Phone, BookOpen, Activity } from "lucide-react"

interface TeacherDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  teacher: any
}

export function TeacherDetailsModal({ isOpen, onClose, teacher }: TeacherDetailsModalProps) {
  if (!teacher) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Detalhes do Professor</span>
          </DialogTitle>
          <DialogDescription>Informações completas do professor</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <GraduationCap className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Nome Completo</p>
                <p className="text-lg font-semibold text-gray-900">{teacher.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Disciplinas</p>
                <p className="text-lg font-semibold text-gray-900">{teacher.school_disciplines}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900">{teacher.contact}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Telefone</p>
                <p className="text-lg font-semibold text-gray-900">{teacher.phone_number}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Activity className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge variant={teacher.status === "on" ? "default" : "destructive"} className="mt-1">
                  {teacher.status === "on" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
