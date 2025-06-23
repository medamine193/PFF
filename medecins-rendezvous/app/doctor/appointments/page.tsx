"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Search } from "lucide-react"
import Sidebar from "@/components/Sidebar"

// Mock data for appointments
const allAppointments = [
  {
    id: 1,
    patient: {
      name: "Jean Dupont",
      age: 45,
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "15 Juin 2023",
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
    date: "15 Juin 2023",
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
    date: "15 Juin 2023",
    time: "14:00",
    type: "Au cabinet",
    status: "confirmed",
    reason: "Douleurs lombaires",
  },
  {
    id: 4,
    patient: {
      name: "Sophie Moreau",
      age: 29,
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "16 Juin 2023",
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
    date: "22 Juin 2023",
    time: "15:30",
    type: "Téléconsultation",
    status: "confirmed",
    reason: "Renouvellement ordonnance",
  },
  {
    id: 6,
    patient: {
      name: "Emma Petit",
      age: 27,
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "5 Mai 2023",
    time: "09:30",
    type: "Au cabinet",
    status: "completed",
    reason: "Consultation de routine",
    notes: "Patient en bonne santé générale. Tension artérielle normale. Prescription de vitamines.",
  },
  {
    id: 7,
    patient: {
      name: "Thomas Leroy",
      age: 52,
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "2 Mai 2023",
    time: "14:00",
    type: "Au cabinet",
    status: "completed",
    reason: "Douleurs articulaires",
    notes: "Arthrose du genou droit. Prescription d'anti-inflammatoires et recommandation de kinésithérapie.",
  },
  {
    id: 8,
    patient: {
      name: "Julie Moreau",
      age: 35,
      image: "/placeholder.svg?height=100&width=100",
    },
    date: "15 Juin 2023",
    time: "16:30",
    type: "Au cabinet",
    status: "cancelled",
    reason: "Consultation de routine",
  },
]

export default function DoctorAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  // Filter appointments based on search and filters
  const filteredAppointments = allAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesType = typeFilter === "all" || appointment.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce((groups: any, appointment) => {
    const date = appointment.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(appointment)
    return groups
  }, {})

  // Separate appointments by status
  const upcomingAppointments = filteredAppointments.filter((a) => a.status === "confirmed")
  const completedAppointments = filteredAppointments.filter((a) => a.status === "completed")
  const cancelledAppointments = filteredAppointments.filter((a) => a.status === "cancelled")

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar userType="doctor" />

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
                  <TabsTrigger value="upcoming">À venir ({upcomingAppointments.length})</TabsTrigger>
                  <TabsTrigger value="completed">Terminés ({completedAppointments.length})</TabsTrigger>
                  <TabsTrigger value="cancelled">Annulés ({cancelledAppointments.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  {Object.keys(groupedAppointments).length > 0 ? (
                    Object.entries(groupedAppointments)
                      .filter(([_, appointments]) => (appointments as any[]).some((a) => a.status === "confirmed"))
                      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                      .map(([date, appointments]) => (
                        <div key={date} className="mb-6">
                          <h3 className="text-lg font-medium mb-4">{date}</h3>
                          <div className="space-y-4">
                            {(appointments as any[])
                              .filter((a) => a.status === "confirmed")
                              .sort((a, b) => a.time.localeCompare(b.time))
                              .map((appointment) => (
                                <div
                                  key={appointment.id}
                                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50 ${selectedAppointment?.id === appointment.id ? "bg-slate-50 border-blue-200" : ""}`}
                                  onClick={() => setSelectedAppointment(appointment)}
                                >
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
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Commencer
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Aucun rendez-vous à venir</h3>
                      <p className="text-muted-foreground mb-4">
                        Vous n'avez pas de rendez-vous planifiés pour le moment
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed">
                  {completedAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {completedAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50 ${selectedAppointment?.id === appointment.id ? "bg-slate-50 border-blue-200" : ""}`}
                          onClick={() => setSelectedAppointment(appointment)}
                        >
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
                            </div>
                            <p className="text-sm">{appointment.reason}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">Aucun rendez-vous terminé</h3>
                      <p className="text-muted-foreground">Votre historique de consultations apparaîtra ici</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="cancelled">
                  {cancelledAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {cancelledAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50 ${selectedAppointment?.id === appointment.id ? "bg-slate-50 border-blue-200" : ""}`}
                          onClick={() => setSelectedAppointment(appointment)}
                        >
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
                            </div>
                            <p className="text-sm">{appointment.reason}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">Aucun rendez-vous annulé</h3>
                      <p className="text-muted-foreground">Les rendez-vous annulés apparaîtront ici</p>
                    </div>
                  )}
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

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{selectedAppointment.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Heure</p>
                          <p className="font-medium">{selectedAppointment.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium">{selectedAppointment.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Statut</p>
                          <p className="font-medium capitalize">
                            {selectedAppointment.status === "confirmed"
                              ? "Confirmé"
                              : selectedAppointment.status === "completed"
                                ? "Terminé"
                                : "Annulé"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Motif de consultation</p>
                        <p>{selectedAppointment.reason}</p>
                      </div>

                      {selectedAppointment.notes && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Notes</p>
                          <p>{selectedAppointment.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {selectedAppointment.status === "confirmed" && (
                        <>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Commencer la consultation</Button>
                          <Button variant="outline" className="w-full">
                            Reprogrammer
                          </Button>
                          <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                            Annuler le rendez-vous
                          </Button>
                        </>
                      )}

                      {selectedAppointment.status === "completed" && (
                        <>
                          <Button className="w-full">Voir le dossier médical</Button>
                          <Button variant="outline" className="w-full">
                            Envoyer un message
                          </Button>
                        </>
                      )}

                      {selectedAppointment.status === "cancelled" && <Button className="w-full">Reprogrammer</Button>}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center p-8 text-center border rounded-lg bg-white">
                  <div>
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Détails du rendez-vous</h3>
                    <p className="text-muted-foreground">Sélectionnez un rendez-vous pour voir les détails</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
