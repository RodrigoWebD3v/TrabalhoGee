"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, UserCheck, Stethoscope, MessageSquare } from "lucide-react"

interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: any
}

export function AppointmentDetailsModal({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) {
  if (!appointment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-[#2b2c34]">
            <Calendar className="h-5 w-5" />
            <span>Detalhes do Agendamento</span>
          </DialogTitle>
          <DialogDescription className="text-[#2b2c34]">Informações completas do agendamento</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Data e Hora</p>
                <p className="text-lg font-semibold text-[#2b2c34]">
                  {new Date(appointment.date).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(appointment.date).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Aluno</p>
                <p className="text-lg font-semibold text-[#2b2c34]">{appointment.student}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <UserCheck className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Profissional</p>
                <p className="text-lg font-semibold text-[#2b2c34]">{appointment.professional}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Stethoscope className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Especialidade</p>
                <Badge variant="outline" className="mt-1">
                  {appointment.specialty}
                </Badge>
              </div>
            </div>

            {appointment.comments && (
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Comentários</p>
                  <p className="text-lg font-semibold text-[#2b2c34]">{appointment.comments}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
