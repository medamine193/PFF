"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Star,
  User,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SidebarProps = {
  userType: "patient" | "doctor" | "admin"
}

export default function Sidebar({ userType }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const patientLinks = [
    { href: "/patient/dashboard", label: "Tableau de bord", icon: Home },
    { href: "/patient/appointments", label: "Mes rendez-vous", icon: Calendar },
    { href: "/patient/book", label: "Prendre rendez-vous", icon: Clock },
    { href: "/patient/chat", label: "Messagerie", icon: MessageSquare },
    { href: "/patient/profile", label: "Mon profil", icon: User },
  ]

  const doctorLinks = [
    { href: "/doctor/dashboard", label: "Tableau de bord", icon: Home },
    { href: "/doctor/appointments", label: "Consultations", icon: Calendar },
    { href: "/doctor/chat", label: "Messagerie", icon: MessageSquare },
    { href: "/doctor/feedback", label: "Avis patients", icon: Star },
    { href: "/doctor/profile/edit", label: "Mon profil", icon: User },
  ]

  const adminLinks = [
    { href: "/admin", label: "Tableau de bord", icon: Home },
    { href: "/admin/doctors", label: "Médecins", icon: Users },
    { href: "/admin/patients", label: "Patients", icon: Users },
    { href: "/admin/appointments", label: "Rendez-vous", icon: Calendar },
    { href: "/admin/specializations", label: "Spécialités", icon: Star },
    { href: "/admin/settings", label: "Paramètres", icon: Settings },
  ]

  const links = userType === "patient" ? patientLinks : userType === "doctor" ? doctorLinks : adminLinks

  const userInfo = {
    name: userType === "patient" ? "Jean Dupont" : userType === "doctor" ? "Dr. Marie Laurent" : "Admin",
    email:
      userType === "patient"
        ? "jean.dupont@example.com"
        : userType === "doctor"
          ? "dr.marie@example.com"
          : "admin@example.com",
    image: "/placeholder.svg?height=40&width=40",
  }

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!collapsed && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-2">
                  {userType === "patient" ? "P" : userType === "doctor" ? "D" : "A"}
                </div>
                <span className="font-semibold">Médecins Rendez-vous</span>
              </div>
            )}

            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:flex hidden" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>

              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* User info */}
          <div className={cn("flex items-center p-4 border-b", collapsed ? "justify-center" : "justify-start")}>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={userInfo.image || "/placeholder.svg"}
                alt={userInfo.name}
                className="w-full h-full object-cover"
              />
            </div>

            {!collapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium text-sm truncate">{userInfo.name}</p>
                <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
              </div>
            )}
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {links.map((link) => {
                const isActive = pathname === link.href

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                        isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100",
                        collapsed ? "justify-center" : "justify-start",
                      )}
                    >
                      <link.icon className={cn("h-5 w-5", isActive ? "text-blue-700" : "text-gray-500")} />
                      {!collapsed && <span className="ml-3">{link.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center text-red-600 hover:bg-red-50 hover:text-red-700",
                collapsed ? "justify-center" : "justify-start",
              )}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Déconnexion</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
