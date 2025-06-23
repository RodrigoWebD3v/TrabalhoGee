"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Stethoscope, Mail, Phone, Activity } from "lucide-react"

interface ProfessionalDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  professional: any
}

export function ProfessionalDetailsModal({ isOpen, onClose, professional }: ProfessionalDetailsModalProps) {
  if (!professional) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-[#2b2c34]">
            <UserCheck className="h-5 w-5" />
            <span>Detalhes do Profissional</span>
          </DialogTitle>
          <DialogDescription className="text-[#2b2c34]">Informações completas do profissional</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <UserCheck className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Nome Completo</p>
                <p className="text-lg font-semibold text-[#2b2c34]">{professional.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Stethoscope className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Especialidade</p>
                <Badge variant="outline" className="mt-1">
                  {professional.specialty}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-[#2b2c34]">{professional.contact}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Telefone</p>
                <p className="text-lg font-semibold text-[#2b2c34]">{professional.phone_number}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Activity className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge variant={professional.status === "on" ? "default" : "destructive"} className="mt-1">
                  {professional.status === "on" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
