"use client"

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import AppointmentCard from "@/components/AppointmentCard"
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Search } from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/ProtectedRoute"


interface Doctor {
  name: string
  specialization: string
  image?: string
}

type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled'

interface Appointment {
  id: number
  doctor: Doctor
  date: string
  time: string
  type: string
  status: AppointmentStatus
}

interface DecodedToken {
  sub: string
  email: string
  iat: number
  exp: number
}

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("Aucun token trouvé. Veuillez vous connecter.")
      setIsLoading(false)
      return
    }

    const decoded = jwtDecode<DecodedToken>(token)
    const patientId = decoded.sub
    console.log("Patient ID:", patientId)

    axios
      .get(`http://localhost:3000/appointments/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!Array.isArray(res.data)) {
          throw new Error("Format de données invalide depuis l'API")
        }
        setAppointments(res.data)
        setError(null)
      })
      .catch((err) => {
        console.error("Erreur API:", err)
        setError(err.response?.data?.message || err.message)
        setAppointments([])
      })
      .finally(() => setIsLoading(false))
  }, [])

  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName = appointment.doctor?.name?.toLowerCase() || ""
    const specialization = appointment.doctor?.specialization?.toLowerCase() || ""

    const matchesSearch =
      doctorName.includes(searchTerm.toLowerCase()) ||
      specialization.includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesType = typeFilter === "all" || appointment.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const upcoming = filteredAppointments.filter((a) => a.status === "confirmed")
  const past = filteredAppointments.filter((a) => a.status === "completed")
  const cancelled = filteredAppointments.filter((a) => a.status === "cancelled")

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar userType="patient" />
        <div className="flex-1 p-8 flex items-center justify-center text-muted-foreground">
          Chargement des rendez-vous...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar userType="patient" />
        <div className="flex-1 p-8 flex items-center justify-center text-red-500 font-medium">
          Erreur : {error}
        </div>
      </div>
    )
  }

  return (
            <ProtectedRoute allowedRoles={["patient"]}>
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userType="patient" />

      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Mes rendez-vous</h1>
              <p className="text-muted-foreground">Gérez tous vos rendez-vous médicaux</p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/patient/book">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau rendez-vous
              </Link>
            </Button>
          </header>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un médecin ou une spécialité"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger><SelectValue placeholder="Statut" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="confirmed">Confirmés</SelectItem>
                    <SelectItem value="completed">Terminés</SelectItem>
                    <SelectItem value="cancelled">Annulés</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="Au cabinet">Au cabinet</SelectItem>
                    <SelectItem value="Téléconsultation">Téléconsultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">À venir ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Passés ({past.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Annulés ({cancelled.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcoming.length > 0 ? (
                upcoming.map((a) => <AppointmentCard key={a.id} appointment={a} />)
              ) : (
                <EmptyMessage />
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {past.length > 0 ? (
                past.map((a) => <AppointmentCard key={a.id} appointment={a} />)
              ) : (
                <EmptyMessage />
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {cancelled.length > 0 ? (
                cancelled.map((a) => <AppointmentCard key={a.id} appointment={a} />)
              ) : (
                <EmptyMessage />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
     </ProtectedRoute>
  )
}

function EmptyMessage() {
  return (
    <div className="text-center py-12 bg-white rounded-lg border">
      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">Aucun rendez-vous</h3>
      <p className="text-muted-foreground mb-4">Aucune donnée disponible pour cette catégorie</p>
      <Button asChild className="bg-blue-600 hover:bg-blue-700">
        <Link href="/patient/book">Prendre rendez-vous</Link>
      </Button>
    </div>
       
    
  )
}
