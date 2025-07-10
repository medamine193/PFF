"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, MessageSquare, Plus, User } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import AppointmentCard from "@/components/AppointmentCard"
import ProtectedRoute from "@/components/ProtectedRoute"


// Mock data for upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    doctor: {
      name: "Dr. Sophie Martin",
      specialization: "Médecine générale",
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "15 Juin 2023",
    time: "10:00",
    type: "Au cabinet",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: {
      name: "Dr. Thomas Dubois",
      specialization: "Cardiologie",
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "22 Juin 2023",
    time: "14:30",
    type: "Téléconsultation",
    status: "confirmed",
  },
]

// Mock data for past appointments
const pastAppointments = [
  {
    id: 3,
    doctor: {
      name: "Dr. Sophie Martin",
      specialization: "Médecine générale",
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "5 Mai 2023",
    time: "11:00",
    type: "Au cabinet",
    status: "completed",
  },
  {
    id: 4,
    doctor: {
      name: "Dr. Emma Bernard",
      specialization: "Dermatologie",
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "20 Avril 2023",
    time: "09:30",
    type: "Au cabinet",
    status: "completed",
  },
]

// Mock data for patient
const patient = {
  name: "Jean Dupont",
  email: "jean.dupont@example.com",
  image: "/placeholder.svg?height=200&width=200",
}

export default function PatientDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["patient"]}>
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userType="patient" />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue, {patient.name}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
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
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rendez-vous passés</p>
                    <p className="text-2xl font-bold">{pastAppointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Documents médicaux</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Mes rendez-vous</CardTitle>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/patient/book">
                        <Plus className="h-4 w-4 mr-2" />
                        Nouveau rendez-vous
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-4">
                      <TabsTrigger value="upcoming">À venir</TabsTrigger>
                      <TabsTrigger value="past">Passés</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="space-y-4">
                      {upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map((appointment) => (
                          <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            actions={[
                              { label: "Modifier", href: "#" },
                              { label: "Annuler", href: "#" },
                            ]}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Vous n'avez pas de rendez-vous à venir</p>
                          <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
                            <Link href="/patient/book">Prendre rendez-vous</Link>
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="past" className="space-y-4">
                      {pastAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          actions={[
                            { label: "Documents", href: "#" },
                            { label: "Donner un avis", href: "#" },
                          ]}
                        />
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Messages récents</CardTitle>
                  <CardDescription>Vos conversations avec vos médecins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                            <Image
                              src={appointment.doctor.image || "/placeholder.svg"}
                              alt={appointment.doctor.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.doctor.name}</p>
                            <p className="text-sm text-muted-foreground">Dernier message: il y a 2 jours</p>
                          </div>
                        </div>
                        <Button variant="outline" asChild>
                          <Link href="/patient/chat">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Voir
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Mon profil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src={patient.image || "/placeholder.svg"}
                        alt={patient.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{patient.name}</h3>
                    <p className="text-muted-foreground">{patient.email}</p>
                  </div>

                  <Button variant="outline" className="w-full mb-4" asChild>
                    <Link href="/patient/profile">
                      <User className="h-4 w-4 mr-2" />
                      Modifier mon profil
                    </Link>
                  </Button>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Médecins consultés récemment</h4>
                      <div className="space-y-3">
                        {pastAppointments.map((appointment) => (
                          <div key={appointment.id} className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              <Image
                                src={appointment.doctor.image || "/placeholder.svg"}
                                alt={appointment.doctor.name}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{appointment.doctor.name}</p>
                              <p className="text-xs text-muted-foreground">{appointment.doctor.specialization}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Documents récents</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">Ordonnance_20230505.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">Analyse_sang_20230420.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Rappels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                          <p className="text-sm font-medium">Rendez-vous à venir</p>
                        </div>
                        <p className="text-sm mb-1">
                          {appointment.doctor.name} - {appointment.doctor.specialization}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.date} à {appointment.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}
