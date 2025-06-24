"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Users, GraduationCap, BookOpen, UserCheck, Calendar, Heart, Home } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Usuários",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Professores",
    url: "/admin/teachers",
    icon: GraduationCap,
  },
  {
    title: "Alunos",
    url: "/admin/students",
    icon: BookOpen,
  },
  {
    title: "Profissionais",
    url: "/admin/professionals",
    icon: UserCheck,
  },
  {
    title: "Agendamentos",
    url: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Eventos",
    url: "/admin/events",
    icon: Heart,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GEE</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">GEE</h2>
            <p className="text-xs text-gray-600">Gestão de Ensino Especial</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
