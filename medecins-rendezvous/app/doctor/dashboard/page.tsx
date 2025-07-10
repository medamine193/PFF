'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, FileText, MessageSquare, User } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { jwtDecode } from "jwt-decode"

type Appointment = {
  id: number
  date: string
  time: string
  type: string
  status: string
  reason: string
  patient: {
    name: string
    age: number
    image?: string
  }
}

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [doctorName, setDoctorName] = useState("")

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      const decoded: any = jwtDecode(token)
      const doctorId = decoded?.id
      setDoctorName(decoded?.name || "")

      const res = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`)
      const data = await res.json()
      setAppointments(data)
    }

    fetchAppointments()
  }, [])

  const today = new Date().toISOString().split("T")[0]
  const todayAppointments = appointments.filter(a => a.date === today)
  const upcomingAppointments = appointments.filter(a => a.date > today)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userType="doctor" />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue, {doctorName}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rendez-vous aujourd'hui</p>
                    <p className="text-2xl font-bold">{todayAppointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rendez-vous à venir</p>
                    <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Patients</p>
                    <p className="text-2xl font-bold">–</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Messages non lus</p>
                    <p className="text-2xl font-bold">–</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TODAY APPOINTMENTS */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Rendez-vous d'aujourd'hui</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
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
                        <div className="flex items-center">
                          <h3 className="font-medium">{appointment.patient.name}</h3>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({appointment.patient.age} ans)
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{appointment.time}</span>
                          <span className="mx-2">•</span>
                          <span>{appointment.type}</span>
                        </div>
                        <p className="text-sm">{appointment.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/doctor/appointments">Voir</Link>
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Commencer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Aucun rendez-vous aujourd'hui</p>
              )}
            </CardContent>
          </Card>

          {/* UPCOMING APPOINTMENTS */}
          <Card>
            <CardHeader>
              <CardTitle>Rendez-vous à venir</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
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
                        <div className="text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 inline-block mr-1" />
                          {appointment.date}
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 inline-block mr-1" />
                          {appointment.time}
                          <span className="mx-2">•</span>
                          {appointment.type}
                        </div>
                        <p className="text-sm">{appointment.reason}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/doctor/appointments">Détails</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Aucun rendez-vous à venir</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
