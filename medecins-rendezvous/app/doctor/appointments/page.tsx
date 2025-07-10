// DoctorAppointmentsPage.tsx

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Search } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { jwtDecode } from "jwt-decode"
import ProtectedRoute from "@/components/ProtectedRoute"

interface Patient {
  id: string
  name: string
  age: number
  image?: string
}

interface Appointment {
  id: number
  patient: Patient
  doctorId: string
  date: string
  time: string
  type: string
  status: string
  reason: string
  notes?: string
}

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    const decoded: any = jwtDecode(token)
    const doctorId = decoded.userId

    fetch(`http://localhost:3001/appointments/doctor/${doctorId}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
  }, [])

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesType = typeFilter === "all" || appointment.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const groupedAppointments = filteredAppointments.reduce((groups: Record<string, Appointment[]>, appointment) => {
    const date = appointment.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(appointment)
    return groups
  }, {})

  const upcomingAppointments = filteredAppointments.filter((a) => a.status === "confirmed")
  const completedAppointments = filteredAppointments.filter((a) => a.status === "completed")
  const cancelledAppointments = filteredAppointments.filter((a) => a.status === "cancelled")

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Rendez-vous</h1>
              <p className="text-muted-foreground">Gérez vos consultations et votre agenda</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Configurer disponibilités</Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher un patient ou un motif"
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="confirmed">Confirmés</SelectItem>
                        <SelectItem value="completed">Terminés</SelectItem>
                        <SelectItem value="cancelled">Annulés</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type de consultation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="Au cabinet">Au cabinet</SelectItem>
                        <SelectItem value="Téléconsultation">Téléconsultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="upcoming">
                <TabsList className="mb-6">
                  <TabsTrigger value="upcoming">A venir ({upcomingAppointments.length})</TabsTrigger>
                  <TabsTrigger value="completed">Terminés ({completedAppointments.length})</TabsTrigger>
                  <TabsTrigger value="cancelled">Annulés ({cancelledAppointments.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  {Object.entries(groupedAppointments)
                    .filter(([_, group]) => (group as Appointment[]).some((a: Appointment) => a.status === "confirmed"))
                    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                    .map(([date, group]) => (
                      <div key={date} className="mb-6">
                        <h3 className="text-lg font-medium mb-4">{date}</h3>
                        <div className="space-y-4">
                          {(group as Appointment[])
                            .filter((a: Appointment) => a.status === "confirmed")
                            .map((appointment: Appointment) => (
                              <div key={appointment.id} className="flex items-center p-4 border rounded-lg">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                  <Image
                                    src={appointment.patient.image || "/placeholder.svg"}
                                    alt={appointment.patient.name}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium">{appointment.patient.name}</h3>
                                  <p className="text-sm">{appointment.time} - {appointment.reason}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </div>

            <div>
              {selectedAppointment ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border">
                        <Image
                          src={selectedAppointment.patient.image || "/placeholder.svg"}
                          alt={selectedAppointment.patient.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{selectedAppointment.patient.name}</h3>
                        <p className="text-muted-foreground">{selectedAppointment.patient.age} ans</p>
                      </div>
                    </div>
                    <p>Date : {selectedAppointment.date}</p>
                    <p>Heure : {selectedAppointment.time}</p>
                    <p>Type : {selectedAppointment.type}</p>
                    <p>Statut : {selectedAppointment.status}</p>
                    <p>Motif : {selectedAppointment.reason}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="p-6 bg-white border rounded-lg text-center">
                  <Calendar className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Détails du rendez-vous</h3>
                  <p className="text-muted-foreground">Sélectionnez un rendez-vous pour voir les détails</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}
