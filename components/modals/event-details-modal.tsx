"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, FileText, MessageSquare } from "lucide-react"

interface EventDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  event: any
}

export function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-[#2b2c34]">
            <Calendar className="h-5 w-5" />
            <span>Detalhes do Evento</span>
          </DialogTitle>
          <DialogDescription className="text-[#2b2c34]">Informações completas do evento</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Descrição</p>
                <p className="text-lg font-semibold text-[#2b2c34]">{event.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Data e Hora</p>
                <p className="text-lg font-semibold text-[#2b2c34]">
                  {new Date(event.date).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(event.date).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {event.comments && (
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Comentários</p>
                  <p className="text-lg font-semibold text-[#2b2c34]">{event.comments}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
