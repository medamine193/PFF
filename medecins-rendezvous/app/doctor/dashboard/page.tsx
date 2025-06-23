"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, FileText, MessageSquare, User } from "lucide-react"
import Sidebar from "@/components/Sidebar"

// Mock data for today's appointments
const todayAppointments = [
  {
    id: 1,
    patient: {
      name: "Jean Dupont",
      age: 45,
      image: "/placeholder.svg?height=100&width=100",
    },
    time: "09:00",
    type: "Au cabinet",
    status: "confirmed",
    reason: "Consultation de routine",
  },
  {
    id: 2,
    patient: {
      name: "Marie Lambert",
      age: 32,
      image: "/placeholder.svg?height=100&width=100",
    },
    time: "10:30",
    type: "Téléconsultation",
    status: "confirmed",
    reason: "Suivi traitement",
  },
  {
    id: 3,
    patient: {
      name: "Pierre Martin",
      age: 58,
      image: "/placeholder.svg?height=100&width=100",
    },
    time: "14:00",
    type: "Au cabinet",
    status: "confirmed",
    reason: "Douleurs lombaires",
  },
]

// Mock data for upcoming appointments
const upcomingAppointments = [
  {
    id: 4,
    patient: {
      name: "Sophie Moreau",
      age: 29,
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "Demain",
    time: "11:00",
    type: "Au cabinet",
    status: "confirmed",
    reason: "Consultation de routine",
  },
  {
    id: 5,
    patient: {
      name: "Lucas Bernard",
      age: 41,
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "15 Juin 2023",
    time: "15:30",
    type: "Téléconsultation",
    status: "confirmed",
    reason: "Renouvellement ordonnance",
  },
]

// Mock data for doctor
const doctor = {
  name: "Dr. Sophie Martin",
  specialization: "Médecine générale",
  email: "dr.sophie.martin@example.com",
  image: "/placeholder.svg?height=200&width=200",
}

export default function DoctorDashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userType="doctor" />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue, {doctor.name}</p>
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
                    <p className="text-2xl font-bold">128</p>
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
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Aucun rendez-vous prévu pour aujourd'hui</p>
                    </div>
                  )}
                </CardContent>
              </Card>

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
                            <div className="flex items-center">
                              <h3 className="font-medium">{appointment.patient.name}</h3>
                              <span className="text-sm text-muted-foreground ml-2">
                                ({appointment.patient.age} ans)
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{appointment.date}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{appointment.time}</span>
                              <span className="mx-2">•</span>
                              <span>{appointment.type}</span>
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
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Aucun rendez-vous à venir</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Mon profil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.specialization}</p>
                  </div>

                  <Button variant="outline" className="w-full mb-4" asChild>
                    <Link href="/doctor/profile/edit">
                      <User className="h-4 w-4 mr-2" />
                      Modifier mon profil
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Messages récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={appointment.patient.image || "/placeholder.svg"}
                              alt={appointment.patient.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.patient.name}</p>
                            <p className="text-xs text-muted-foreground">il y a 2 heures</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/doctor/chat">
                            <MessageSquare className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/doctor/chat">Voir tous les messages</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tâches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 text-blue-600 mr-2" />
                        <p className="text-sm font-medium">Ordonnances à renouveler</p>
                      </div>
                      <p className="text-sm text-muted-foreground">3 ordonnances en attente de renouvellement</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 text-blue-600 mr-2" />
                        <p className="text-sm font-medium">Résultats d'analyses à consulter</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2 résultats d'analyses à consulter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
